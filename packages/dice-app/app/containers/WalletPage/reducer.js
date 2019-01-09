/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  WITHDRAW_MODAL_OPEN,
  WITHDRAW_MODAL_CLOSE,
  DEPOSIT_MODAL_OPEN,
  DEPOSIT_MODAL_CLOSE,
  TRANSACTIONS_LOAD,
  COIN_TRANSACTIONS_LOAD,
  COIN_TRANSACTIONS_SUCCESS
} from './constants';

import { LOGOUT } from '../App/constants';

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
  withdrawModal: {
    open: false,
    coin: null
  },
  depositModal: {
    open: false,
    coin: null
  },
  utxosModal: {
    open: false,
    coin: null
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

    [WITHDRAW_MODAL_OPEN]: (state, { payload }) =>
      state
        .setIn(['withdrawModal', 'open'], true)
        .setIn(['withdrawModal', 'coin'], payload.coin),

    [WITHDRAW_MODAL_CLOSE]: state =>
      state.setIn(['withdrawModal', 'open'], false),

    [DEPOSIT_MODAL_OPEN]: (state, { payload }) =>
      state
        .setIn(['depositModal', 'open'], true)
        .setIn(['depositModal', 'coin'], payload.coin),

    [DEPOSIT_MODAL_CLOSE]: state =>
      state.setIn(['depositModal', 'open'], false),

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

    [LOGOUT]: () => initialState
  },
  initialState
);

export default walletReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
