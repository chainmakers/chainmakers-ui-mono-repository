/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOADING, LOADED, FAILED } from '../../constants';
import { LOGOUT } from '../App/constants';
import {
  SWAP_DETAIL_MODAL_OPEN,
  SWAP_DETAIL_MODAL_CLOSE,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  ORDERBOOK_LOAD,
  ORDERBOOK_LOAD_SKIP,
  ORDERBOOK_LOAD_SUCCESS,
  ORDERBOOK_LOAD_ERROR,
  DEPOSIT_COIN_MODAL_CLOSE,
  DEPOSIT_COIN_MODAL_OPEN,
  DEPOSIT_COIN_SELECT,
  RECEVIE_COIN_MODAL_OPEN,
  RECEVIE_COIN_MODAL_CLOSE,
  RECEVIE_COIN_SELECT,
  NEW_ORDER_SET,
  NEW_ORDER_SET_SKIP,
  NEW_ORDER_SET_SUCCESS,
  NEW_ORDER_SET_ERROR,
  CONFIRM_NEW_ORDER_MODAL_OPEN,
  CONFIRM_NEW_ORDER_MODAL_CLOSE
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  swapDetailModal: {
    open: false,
    uuid: null
  },

  selectCoinModal: {
    open: false
  },

  currency: {
    name: null,
    symbol: null
    // amount: 0
  },

  payment: {
    name: null,
    symbol: null
    // amount: 0
  },

  joyride: {
    open: false
  },

  depositCoinModal: {
    open: false
  },

  recevieCoinModal: {
    open: false
  },

  confirmNewOrderModal: {
    open: false
  },

  // FIXME: Redesign data struct
  myorder: {
    fetchStatus: null,
    errors: null,
    list: []
  },

  orderbook: {
    fetchStatus: null,
    errors: null,
    // {
    //   BEER: {
    //     context: {
    //       action: 'atomicapp/App/ELECTRUM_ADD',
    //       params: {
    //         urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022'],
    //         active: 0,
    //         rpcport: 8923,
    //         name: 'Beer',
    //         market_cap: -1,
    //         coin: 'BEER',
    //         mm2: 1,
    //         txversion: 4,
    //         marketcap: 0,
    //         symbol: 'BEER',
    //         id: 7
    //       }
    //     },
    //     type: 'RPC',
    //     message: 'Request failed with status code 500'
    //   }
    // }
    deposit: null,
    recevie: null,
    asks: [
      // {
      //   coin: 'KMD',
      //   address: 'RV6YDG8pe8EaqTFUSs41QUF5obm2rqZuBb',
      //   price: 0.00015103,
      //   numutxos: 0,
      //   avevolume: 0,
      //   maxvolume: 50.46521858,
      //   depth: 0,
      //   pubkey:
      //     '90f44b66caae7e0d842a1a3e4f0b50e09d251a300987d85a9a7b136485744c09',
      //   age: 2,
      //   zcredits: 0
      // },
      // {
      //   coin: 'KMD',
      //   address: 'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd',
      //   price: 0.00015103,
      //   numutxos: 0,
      //   avevolume: 0,
      //   maxvolume: 36.40686108,
      //   depth: 0,
      //   pubkey:
      //     'bab6ad2eebe1e666369cab504d4622b22c1f1ef718ef388e88020f30a1573e01',
      //   age: 10,
      //   zcredits: 0
      // }
    ],
    bids: [
      // {
      //   coin: 'BTC',
      //   address: '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1',
      //   price: 0.00014923,
      //   numutxos: 0,
      //   avevolume: 0,
      //   maxvolume: 0.02620853,
      //   depth: 0,
      //   pubkey:
      //     'bab6ad2eebe1e666369cab504d4622b22c1f1ef718ef388e88020f30a1573e01',
      //   age: 10,
      //   zcredits: 0
      // },
      // {
      //   coin: 'BTC',
      //   address: '1LpM8kFY3JS1mStGyh4tJwut3LJS8opQiw',
      //   price: 0.00014923,
      //   numutxos: 0,
      //   avevolume: 0,
      //   maxvolume: 0.01812016,
      //   depth: 0,
      //   pubkey:
      //     '90f44b66caae7e0d842a1a3e4f0b50e09d251a300987d85a9a7b136485744c09',
      //   age: 2,
      //   zcredits: 0
      // }
    ]
  }
});

export default handleActions(
  {
    [SWAP_DETAIL_MODAL_OPEN]: (state, { payload }) =>
      state
        .setIn(['swapDetailModal', 'open'], true)
        .setIn(['swapDetailModal', 'uuid'], payload.uuid),

    [SWAP_DETAIL_MODAL_CLOSE]: state =>
      state.setIn(['swapDetailModal', 'open'], false),

    [JOYRIDE_OPEN]: state => state.setIn(['joyride', 'open'], true),

    [JOYRIDE_CLOSE]: state => state.setIn(['joyride', 'open'], false),

    [ORDERBOOK_LOAD]: state =>
      state
        .setIn(['orderbook', 'fetchStatus'], LOADING)
        .setIn(['orderbook', 'error'], null),

    [ORDERBOOK_LOAD_SKIP]: state =>
      state
        .setIn(['orderbook', 'fetchStatus'], LOADED)
        .setIn(['orderbook', 'error'], null),

    [ORDERBOOK_LOAD_SUCCESS]: (state, { payload }) => {
      const { asks, bids } = payload;
      return state
        .setIn(['orderbook', 'fetchStatus'], LOADED)
        .setIn(['orderbook', 'asks'], fromJS(asks))
        .setIn(['orderbook', 'bids'], fromJS(bids));
    },

    [ORDERBOOK_LOAD_ERROR]: (state, { error }) =>
      state
        .setIn(['orderbook', 'fetchStatus'], FAILED)
        .setIn(['orderbook', 'error'], fromJS(error)),

    [DEPOSIT_COIN_MODAL_OPEN]: state =>
      state.setIn(['depositCoinModal', 'open'], true),

    [DEPOSIT_COIN_MODAL_CLOSE]: state =>
      state.setIn(['depositCoinModal', 'open'], false),

    [DEPOSIT_COIN_SELECT]: (state, { payload }) =>
      state
        // .setIn(['orderbook', 'name'], payload.name)
        .setIn(['orderbook', 'deposit'], payload.symbol),

    [RECEVIE_COIN_MODAL_OPEN]: state =>
      state.setIn(['recevieCoinModal', 'open'], true),

    [RECEVIE_COIN_MODAL_CLOSE]: state =>
      state.setIn(['recevieCoinModal', 'open'], false),

    [RECEVIE_COIN_SELECT]: (state, { payload }) =>
      state
        // .setIn(['orderbook', 'name'], payload.name)
        .setIn(['orderbook', 'recevie'], payload.symbol),

    [NEW_ORDER_SET]: state =>
      state
        .setIn(['myorder', 'fetchStatus'], LOADING)
        .setIn(['myorder', 'error'], null),

    [NEW_ORDER_SET_SKIP]: state =>
      state
        .setIn(['myorder', 'fetchStatus'], LOADED)
        .setIn(['myorder', 'error'], null),

    [NEW_ORDER_SET_SUCCESS]: state =>
      state.setIn(['myorder', 'fetchStatus'], LOADED),

    [NEW_ORDER_SET_ERROR]: (state, { error }) =>
      state
        .setIn(['myorder', 'fetchStatus'], FAILED)
        .setIn(['myorder', 'error'], fromJS(error)),

    [CONFIRM_NEW_ORDER_MODAL_OPEN]: state =>
      state.setIn(['confirmNewOrderModal', 'open'], true),

    [CONFIRM_NEW_ORDER_MODAL_CLOSE]: state =>
      state.setIn(['confirmNewOrderModal', 'open'], false),

    [LOGOUT]: () => initialState
  },
  initialState
);

/* eslint-enable no-case-declarations, no-param-reassign */
