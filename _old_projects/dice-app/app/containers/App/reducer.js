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
import getConfig from '../../utils/config';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOAD_SWAP_SUCCESS,
  KMDICE_CHAIN_START,
  KMDICE_CHAIN_START_SUCCESS,
  KMDICE_CHAIN_GET_INFO_SUCCESS,
  KOMODOD_STATE_STARTED,
  KOMODOD_STATE_RUNNING
} from './constants';

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
  loading: false,
  error: false,
  currentUser: null,
  marketcap: getDataMarketcap(),
  komodod: {
    state: KOMODOD_STATE_STARTED,
    pubkey: null
  },
  blockchainInfo: {
    blocks: null,
    longestchain: null,
    balance: 0
  }
});

const appReducer = handleActions(
  {
    [LOGIN]: state => state.set('loading', true).set('error', false),

    [LOGIN_SUCCESS]: (state, { payload }) =>
      state.set('loading', false).set('currentUser', fromJS(payload.user)),

    [LOGIN_ERROR]: (state, { error }) =>
      state.set('error', error).set('loading', false),

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

    [KMDICE_CHAIN_START]: state =>
      state
        .setIn(['komodod', 'state'], KOMODOD_STATE_STARTED)
        .setIn(['komodod', 'pubkey'], null),

    [KMDICE_CHAIN_START_SUCCESS]: (state, { payload }) =>
      state
        .setIn(['komodod', 'state'], KOMODOD_STATE_RUNNING)
        .setIn(['komodod', 'pubkey'], payload.pubkey),

    [KMDICE_CHAIN_GET_INFO_SUCCESS]: (state, { payload }) => {
      // step one: get blockchain info
      let blockchainInfo = state.get('blockchainInfo');
      // step two: update blockchain info
      if (isNumber(payload.blocks)) {
        blockchainInfo = blockchainInfo.set('blocks', payload.blocks);
      }

      if (isNumber(payload.blocks)) {
        blockchainInfo = blockchainInfo.set(
          'longestchain',
          payload.longestchain
        );
      }

      if (isNumber(payload.blocks)) {
        blockchainInfo = blockchainInfo.set('balance', payload.balance);
      }
      return state.set('blockchainInfo', blockchainInfo);
    },

    [LOGOUT]: () => initialState
  },
  initialState
);

export default appReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
