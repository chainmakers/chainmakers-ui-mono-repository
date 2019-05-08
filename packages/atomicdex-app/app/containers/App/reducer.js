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
import {
  LOADING,
  LOADED,
  FAILED,
  INITIALIZATION,
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
  LOAD_WITHDRAW_SUCCESS,
  LOAD_SWAP_SUCCESS,
  ELECTRUM_ADD,
  ELECTRUM_ADD_SUCCESS,
  ELECTRUM_ADD_ERROR,
  ELECTRUM_REMOVE,
  BALANCE_LOAD,
  BALANCE_LOAD_SUCCESS,
  BALANCE_LOAD_ERROR,
  DATA_FROM_DB_LOAD_SUCCESS,
  DATA_FROM_DB_LOAD_ERROR,
  DISABLE_COINS
} from './constants';
import type { ErrorType } from '../schema';
import type {
  AddElectrumPayload,
  AddElectrumSuccessPayload,
  LoadbalacePayload,
  LoadBalanceSuccessPayload
} from './schema';

// BALANCE STATUS
// => INITIALIZATION => ENABLE <=> DISABLE

const config = getConfig();
const COIN_DATA = config.get('marketmaker.data');

function getSupportedCoins(data = COIN_DATA) {
  const result = {
    list: [],
    entities: {}
  };
  each(data, (e, k) => {
    if (DISABLE_COINS.indexOf(e.coin) === -1) {
      result.list.push(e.coin);
      result.entities[e.coin] = Object.assign(
        {
          id: k,
          marketcap: 0,
          symbol: e.coin
        },
        e
      );
    }
  });
  return result;
}

// The initial state of the App
export const initialState = fromJS({
  loadedDataFromDB: false,
  marketmaker: {
    state: null,
    errors: null
  },
  balance: {
    fetchStatus: {},
    errors: {},
    list: [
      // {
      //   symbol: 'BTC',
      //   status: ENABLE,
      //   marketcap: 97822306639.0
      // },
      // {
      //   symbol: 'KMD',
      //   status: ENABLE,
      //   marketcap: 107340275.0
      // }
    ],
    entities: {
      // BTC: {
      //   coin: 'BTC',
      //   address: '',
      //   balance: 0,
      //   fee: 0
      // },
      // KMD: {
      //   coin: 'KMD',
      //   address: '',
      //   balance: 0,
      //   fee: 0
      // }
    }
  },
  supported_coins: getSupportedCoins()
});

const appReducer = handleActions(
  {
    [LOAD_WITHDRAW_SUCCESS]: (state, { payload }) => {
      // step one: get coin
      const balance = state.getIn([
        'balance',
        'entities',
        payload.coin,
        'balance'
      ]);
      return state.setIn(
        ['balance', 'entities', payload.coin, 'balance'],
        balance - payload.amount
      );
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
              status: INITIALIZATION,
              marketcap:
                state.getIn(['supported_coins', payload.coin, 'marketcap']) || 0
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

    [ELECTRUM_REMOVE]: (state, { payload }) => {
      const { coin } = payload;

      // step one: update entities
      // state = state.setIn(
      //   ['balance', 'entities'],
      //   state.getIn(['balance', 'entities']).delete(coin)
      // );

      // step two: update key in list
      // let list = state.getIn(['balance', 'list']);
      // list = list.filter(item => item.get('symbol') !== coin);
      // state = state.setIn(['balance', 'list'], list);
      let list = state.getIn(['balance', 'list']);
      const index = list.findIndex(item => item.get('symbol') === coin);
      if (index !== -1) {
        list = list.update(index, item => item.set('status', DISABLE));
        state = state.setIn(['balance', 'list'], list);
      }

      // step three: update fetch status
      state = state.setIn(
        ['balance', 'fetchStatus'],
        state.getIn(['balance', 'fetchStatus']).delete(coin)
      );

      state = state.setIn(
        ['balance', 'errors'],
        state.getIn(['balance', 'errors']).delete(coin)
      );

      return state;
    },

    [BALANCE_LOAD]: (state, { payload }: { payload: LoadbalacePayload }) => {
      let list = state.getIn(['balance', 'list']);
      const index = list.findIndex(item => item.get('symbol') === payload.coin);
      if (index !== -1) {
        list = list.update(index, item => item.set('status', ENABLE));
        state = state.setIn(['balance', 'list'], list);
      }
      return state
        .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
        .setIn(['balance', 'errors', payload.coin], null);
    },

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

    [DATA_FROM_DB_LOAD_SUCCESS]: (state, { payload }) => {
      const supportedCoinsList = state.getIn(['supported_coins', 'list']);

      for (let i = 0; i < payload.length; i += 1) {
        const coin = payload[i];
        if (!supportedCoinsList.find(obj => obj === coin)) {
          // eslint-disable-next-line no-continue
          continue;
        }
        // step one: update entities
        if (!state.hasIn(['balance', 'entities', coin]))
          state = state.setIn(
            ['balance', 'entities', coin],
            fromJS({
              coin,
              address: '',
              balance: 0,
              fee: 0
            })
          );
        // step two: add key in list
        let list = state.getIn(['balance', 'list']);
        if (!list.find(obj => obj.get('symbol') === coin)) {
          list = list
            .push(
              fromJS({
                symbol: coin,
                status: INITIALIZATION,
                marketcap:
                  state.getIn(['supported_coins', coin, 'marketcap']) || 0
              })
            )
            .sort((a, b) => b.get('marketcap') - a.get('marketcap'));
          state = state.setIn(['balance', 'list'], list);
        }
      }

      return state.set('loadedDataFromDB', true);
    },

    [DATA_FROM_DB_LOAD_ERROR]: state => state.set('loadedDataFromDB', true),

    [LOGOUT]: () => initialState
  },
  initialState
);

export default appReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
