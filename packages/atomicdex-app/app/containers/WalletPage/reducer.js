/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';

import { handleActions } from 'redux-actions';

import {
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  TRANSACTIONS_LOAD,
  COIN_TRANSACTIONS_LOAD,
  COIN_TRANSACTIONS_SUCCESS,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  WITHDRAW_LOAD,
  WITHDRAW_LOAD_SUCCESS,
  WITHDRAW_LOAD_ERROR,
  WITHDRAW_TAB,
  DEPOSIT_TAB,
  TAB_ASSET_INFO_SWITCH,
  ASSET_MODAL_OPEN,
  ASSET_MODAL_CLOSE
} from './constants';

import { LOGOUT } from '../App/constants';

import type { ErrorType } from '../schema';

// The initial state of the App
export const initialState = fromJS({
  // transactions: {
  //   loading: false,
  //   error: false,
  //   list: [],
  //   entities: {}
  // },
  transactions: {
    loading: false,
    error: false,
    queueids: {},
    coins: {}
  },

  assetModal: {
    open: false,
    coin: null,
    loading: false,
    error: false,
    tab: DEPOSIT_TAB
  },

  utxosModal: {
    open: false,
    coin: null
  },

  joyride: {
    open: false
  }
});

export function generateCoinTransactionRecord() {
  // FIXME: should we change to RECORD type?
  return fromJS({
    list: [],
    entities: {}
  });
}

const walletReducer = handleActions(
  {
    [TRANSACTIONS_LOAD]: state =>
      state.setIn(['transactions', 'loading'], true),

    [LOAD_TRANSACTIONS_SUCCESS]: state =>
      state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], false),

    [LOAD_TRANSACTIONS_ERROR]: (state, { error }) =>
      state
        .setIn(['transactions', 'error'], error)
        .setIn(['transactions', 'loading'], false),

    [COIN_TRANSACTIONS_LOAD]: (state, { payload }) => {
      const { coin, queueId } = payload;
      // step one: update transactions / queueids
      const queueids = state
        .getIn(['transactions', 'queueids'])
        .set(`${queueId}`, coin);
      // step two: update transactions / coins if not found
      let coins = state.getIn(['transactions', 'coins']);
      if (!coins.get(coin)) {
        coins = coins.set(coin, generateCoinTransactionRecord());
        return state
          .setIn(['transactions', 'queueids'], queueids)
          .setIn(['transactions', 'coins'], coins);
      }
      return state.setIn(['transactions', 'queueids'], queueids);
    },

    [COIN_TRANSACTIONS_SUCCESS]: (state, { payload }) => {
      const { coin, queueId, tx } = payload;
      // step one: delete ids transactions / queueids
      const queueids = state
        .getIn(['transactions', 'queueids'])
        .delete(queueId);
      if (tx.length === 0) {
        return state.setIn(['transactions', 'queueids'], queueids);
      }
      // step two: update transactions / coins if not found
      let coins = state.getIn(['transactions', 'coins', coin]);
      let list = coins.get('list');
      let entities = coins.get('entities');
      for (let i = 0; i < tx.length; i += 1) {
        const t = tx[i];
        // step one: update list
        if (!list.find(e => e === t.txid)) {
          list = list.push(t.txid);
        }
        // step two: update entities
        if (!entities.get(t.txid)) {
          entities = entities.set(t.txid, fromJS(t));
        }
      }
      coins = coins.set('list', list).set('entities', entities);

      return state
        .setIn(['transactions', 'queueids'], queueids)
        .setIn(['transactions', 'coins', coin], coins);
    },

    [JOYRIDE_OPEN]: state => state.setIn(['joyride', 'open'], true),

    [JOYRIDE_CLOSE]: state => state.setIn(['joyride', 'open'], false),

    [ASSET_MODAL_OPEN]: (state, { payload }) =>
      state
        .setIn(['assetModal', 'open'], true)
        .setIn(['assetModal', 'coin'], payload.coin)
        .setIn(['assetModal', 'tab'], payload.tab),

    [ASSET_MODAL_CLOSE]: state => state.setIn(['assetModal', 'open'], false),

    [TAB_ASSET_INFO_SWITCH]: (state, { payload }) =>
      state.setIn(['assetModal', 'tab'], payload.tab),

    [WITHDRAW_LOAD]: state =>
      state
        .setIn(['assetModal', 'loading'], true)
        .setIn(['assetModal', 'error'], false),

    [WITHDRAW_LOAD_SUCCESS]: state =>
      state.setIn(['assetModal', 'loading'], false),

    [WITHDRAW_LOAD_ERROR]: (state, { error }: { error: ErrorType }) =>
      state
        .setIn(['assetModal', 'loading'], false)
        .setIn(['assetModal', 'error'], fromJS(error)),

    [LOGOUT]: () => initialState
  },
  initialState
);

export default walletReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
