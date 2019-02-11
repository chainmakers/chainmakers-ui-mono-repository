// @flow
/* eslint-disable no-case-declarations, no-param-reassign */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import each from 'lodash/each';
import isNumber from 'lodash/isNumber';
import {
  LOADING,
  LOADED,
  FAILED,
  ENABLE,
  DISABLE,
  STATE_STARTED,
  STATE_RUNNING,
  STATE_TERMINATED
} from '../../constants';
import getConfig from '../../utils/config';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOAD_WITHDRAW,
  LOAD_WITHDRAW_SUCCESS,
  LOAD_WITHDRAW_ERROR,
  LOAD_SWAP_SUCCESS,
  ELECTRUM_ADD,
  ELECTRUM_ADD_SUCCESS,
  ELECTRUM_ADD_ERROR,
  BALANCE_LOAD,
  BALANCE_LOAD_SUCCESS,
  BALANCE_LOAD_ERROR
} from './constants';
import type { ErrorType } from '../schema';
import type {
  AddElectrumPayload,
  AddElectrumSuccessPayload,
  LoadbalacePayload,
  LoadBalanceSuccessPayload
} from './schema';

const config = getConfig();
const COIN_DATA = config.get('marketmaker.data');

function getDataMarketcap(data = COIN_DATA) {
  const result = {};
  each(data, (e, k) => {
    if (isNumber(e.market_cap)) {
      result[e.coin] = {
        id: k,
        name: e.name,
        symbol: e.coin,
        marketcap: e.market_cap
      };
    }
  });
  return result;
}

// The initial state of the App
export const initialState = fromJS({
  marketmaker: {
    state: null,
    errors: null
  },
  balance: {
    fetchStatus: {},
    errors: {},
    list: [
      {
        symbol: 'BTC',
        status: ENABLE,
        marketcap: 97822306639.0
      },
      {
        symbol: 'KMD',
        status: ENABLE,
        marketcap: 107340275.0
      }
    ],
    entities: {
      BTC: {
        coin: 'BTC',
        address: '',
        balance: 0,
        fee: 0
      },
      KMD: {
        coin: 'KMD',
        address: '',
        balance: 0,
        fee: 0
      }
    }
  },
  marketcap: getDataMarketcap()
});

const appReducer = handleActions(
  {
    [LOGIN]: state =>
      state
        .setIn(['marketmaker', 'errors'], null)
        .setIn(['marketmaker', 'state'], STATE_STARTED),

    [LOGIN_SUCCESS]: state =>
      state.setIn(['marketmaker', 'state'], STATE_RUNNING),

    [LOGIN_ERROR]: (state, { error }) =>
      state
        .setIn(['marketmaker', 'errors'], error)
        .setIn(['marketmaker', 'state'], STATE_TERMINATED),

    [LOAD_WITHDRAW]: (state, { payload }) =>
      state
        .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
        .setIn(['balance', 'entities', payload.coin, 'error'], null),

    [LOAD_WITHDRAW_SUCCESS]: (state, { payload }) => {
      // step one: get coin
      const balance = state.getIn([
        'balance',
        'entities',
        payload.coin,
        'balance'
      ]);
      return state
        .setIn(['balance', 'fetchStatus', payload.coin], LOADED)
        .setIn(
          ['balance', 'entities', payload.coin, 'balance'],
          balance - payload.amount
        );
    },

    [LOAD_WITHDRAW_ERROR]: (state, { error }: { error: ErrorType }) => {
      const {
        context: { params }
      } = error;

      return state
        .setIn(['balance', 'fetchStatus', params.coin], FAILED)
        .setIn(['balance', 'entities', params.coin, 'error'], fromJS(error));
    },

    [LOAD_SWAP_SUCCESS]: (state, { payload }) => {
      // step one: get coin
      let entities = state.getIn(['balance', 'entities']);
      // step two: update loading
      for (let i = 0; i < payload.length; i += 1) {
        const c = payload[i];
        const w = entities.get(c.coin);
        entities = entities.set(
          c.coin,
          w.set('balance', w.get('balance') + c.value)
        );
      }
      return state.setIn(['balance', 'entities'], entities);
    },

    // -- //

    [ELECTRUM_ADD]: (state, { payload }: { payload: AddElectrumPayload }) => {
      // step one: update entities
      if (!state.hasIn(['balance', 'entities', payload.coin]))
        state = state.setIn(
          ['balance', 'entities', payload.coin],
          fromJS({
            coin: payload.coin,
            address: '',
            balance: 0,
            fee: 0
          })
        );
      // step two: add key in list
      let list = state.getIn(['balance', 'list']);
      if (!list.find(obj => obj.get('symbol') === payload.coin)) {
        list = list
          .push(
            fromJS({
              symbol: payload.coin,
              status: DISABLE,
              marketcap:
                state.getIn(['marketcap', payload.coin, 'marketcap']) || 0
            })
          )
          .sort((a, b) => b.get('marketcap') - a.get('marketcap'));
        state = state.setIn(['balance', 'list'], list);
      }
      return state
        .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
        .setIn(['balance', 'errors', payload.coin], null);
    },

    [ELECTRUM_ADD_SUCCESS]: (
      state,
      { payload }: { payload: AddElectrumSuccessPayload }
    ) => {
      // step one: update entities
      state = state.setIn(
        ['balance', 'entities', payload.coin],
        fromJS(payload)
      );
      // step two: update key in list
      let list = state.getIn(['balance', 'list']);
      const index = list.findIndex(item => item.get('symbol') === payload.coin);
      if (index !== -1) {
        list = list.update(index, item => item.set('status', ENABLE));
        state = state.setIn(['balance', 'list'], list);
      }
      // step three: update fetch status
      state = state
        .setIn(['balance', 'fetchStatus', payload.coin], LOADED)
        .setIn(['balance', 'errors', payload.coin], null);

      return state;
    },

    [ELECTRUM_ADD_ERROR]: (state, { error }: { error: ErrorType }) => {
      const {
        context: { params }
      } = error;
      return state
        .setIn(['balance', 'fetchStatus', params.coin], FAILED)
        .setIn(['balance', 'errors', params.coin], fromJS(error));
    },

    [BALANCE_LOAD]: (state, { payload }: { payload: LoadbalacePayload }) =>
      state
        .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
        .setIn(['balance', 'errors', payload.coin], null),

    [BALANCE_LOAD_SUCCESS]: (
      state,
      { payload }: { payload: LoadBalanceSuccessPayload }
    ) => {
      // step one: update entities
      state = state.setIn(
        ['balance', 'entities', payload.coin],
        fromJS(payload)
      );
      // step three: update fetch status
      state = state
        .setIn(['balance', 'fetchStatus', payload.coin], LOADED)
        .setIn(['balance', 'errors', payload.coin], null);

      return state;
    },

    [BALANCE_LOAD_ERROR]: (state, { error }: { error: ErrorType }) => {
      const {
        context: { params }
      } = error;
      return state
        .setIn(['balance', 'fetchStatus', params.coin], FAILED)
        .setIn(['balance', 'errors', params.coin], fromJS(error));
    },

    [LOGOUT]: () => initialState
  },
  initialState
);

export default appReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
