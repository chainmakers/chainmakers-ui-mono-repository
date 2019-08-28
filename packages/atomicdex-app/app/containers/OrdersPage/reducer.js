/* eslint-disable no-case-declarations, no-param-reassign */
import concat from 'lodash/concat';
import { fromJS } from 'immutable';
import { floor } from 'barterdex-utilities';
import { handleActions } from 'redux-actions';
import { LOADING, LOADED, FAILED } from '../../constants';
import { LOGOUT } from '../App/constants';
import {
  SWAP_DETAIL_MODAL_OPEN,
  SWAP_DETAIL_MODAL_CLOSE,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  ORDERBOOK_LOAD,
  ORDERBOOK_RELOAD_SUCCESS,
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
  CONFIRM_NEW_ORDER_MODAL_CLOSE,
  CANCELING_ORDER_MODAL_OPEN,
  CANCELING_ORDER_MODAL_CLOSE,
  NEW_ORDER_CANCEL,
  NEW_ORDER_CANCEL_SUCCESS
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

  cancelingOrderModal: {
    open: false,
    id: null,
    fetchStatus: null,
    errors: null
  },

  // FIXME: Redesign data struct
  myorder: {
    fetchStatus: null,
    errors: null
  },

  orderbook: {
    fetchStatus: null,
    errors: null,
    // {
    //   BEER: {
    //     context: {
    //       action: 'atomicapp/App/ELECTRUM_ADD',
    //       params: {
    //         servers: [
    //           { url: 'electrum1.cipig.net:10022' },
    //           { url: 'electrum2.cipig.net:10022' }
    //         ],
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
    // },
    deposit: null,
    recevie: null,
    list: [
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
    ]
  },
  orders: {}
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
        .setIn(['orderbook', 'errors'], null),

    [ORDERBOOK_LOAD_SUCCESS]: (state, { payload }) => {
      const { asks, bids } = payload;
      const list = concat(asks, bids);
      const sortedList = [];
      let orders = state.get('orders');

      // step one: update order
      function addOrdersEntities(v) {
        const {
          base,
          rel,
          avevolume,
          maxvolume,
          address,
          price,
          pubkey,
          type,
          id,
          uuid = null,
          ...meta
        } = v;
        sortedList.push(id);
        let entity = orders.find(obj => obj.get('id') === id);

        if (entity) {
          entity = entity.merge(
            fromJS({
              base,
              rel,
              avevolume,
              maxvolume,
              address,
              price,
              pubkey,
              type,
              meta,
              uuid
            })
          );
          orders = orders.set(id, entity);
        } else {
          orders = orders.set(
            id,
            fromJS({
              id,
              base,
              rel,
              avevolume,
              maxvolume,
              address,
              price,
              pubkey,
              type,
              meta,
              uuid
            })
          );
        }
      }

      function sort(a, b) {
        if (a.price === b.price) return a.maxvolume < b.maxvolume;
        return a.price < b.price;
      }
      list.sort(sort).map(addOrdersEntities);

      // step two: update list
      return state
        .setIn(['orderbook', 'fetchStatus'], LOADED)
        .set('orders', orders)
        .setIn(['orderbook', 'list'], fromJS(sortedList));
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
        .setIn(['myorder', 'errors'], null),

    [NEW_ORDER_SET_SKIP]: state =>
      state
        .setIn(['myorder', 'fetchStatus'], LOADED)
        .setIn(['myorder', 'errors'], null),

    [NEW_ORDER_SET_SUCCESS]: (state, { payload }) => {
      const {
        id,
        uuid = null,
        base,
        rel,
        price,
        address,
        // eslint-disable-next-line camelcase
        created_at,
        // eslint-disable-next-line camelcase
        max_base_vol,
        // eslint-disable-next-line camelcase
        min_base_vol,
        type,
        ...meta
      } = payload;

      // step one: update order
      let orders = state.get('orders');
      orders = orders.set(
        id,
        fromJS({
          id,
          uuid,
          base,
          rel,
          price: floor(price, 8),
          address,
          type,
          createdAt: created_at,
          maxvolume: floor(max_base_vol, 8),
          minvolume: floor(min_base_vol, 8),
          meta
        })
      );
      state = state.set('orders', orders);

      // step three:
      return state;
    },

    [NEW_ORDER_SET_ERROR]: (state, { error }) =>
      state
        .setIn(['myorder', 'fetchStatus'], FAILED)
        .setIn(['myorder', 'errors'], fromJS(error)),

    [CONFIRM_NEW_ORDER_MODAL_OPEN]: state =>
      state.setIn(['confirmNewOrderModal', 'open'], true),

    [CONFIRM_NEW_ORDER_MODAL_CLOSE]: state =>
      state.setIn(['confirmNewOrderModal', 'open'], false),

    [ORDERBOOK_RELOAD_SUCCESS]: state =>
      state.setIn(['myorder', 'fetchStatus'], LOADED),

    [CANCELING_ORDER_MODAL_OPEN]: (state, { payload }) =>
      state
        .setIn(['cancelingOrderModal', 'open'], true)
        .setIn(['cancelingOrderModal', 'id'], payload.id),

    [CANCELING_ORDER_MODAL_CLOSE]: state =>
      state.setIn(['cancelingOrderModal', 'open'], false),

    [NEW_ORDER_CANCEL]: state =>
      state
        .setIn(['cancelingOrderModal', 'fetchStatus'], LOADING)
        .setIn(['cancelingOrderModal', 'errors'], null),

    [NEW_ORDER_CANCEL_SUCCESS]: (state, { payload }) => {
      const { id } = payload;

      // Step one: remove it from orderbook
      const list = state.getIn(['orderbook', 'list']).filter(v => v !== id);
      state = state.setIn(['orderbook', 'list'], list);

      // Step three: remove it from orders
      const orders = state.get('orders');
      state = state.set('orders', orders.delete(id));

      return state
        .setIn(['cancelingOrderModal', 'fetchStatus'], LOADED)
        .setIn(['cancelingOrderModal', 'errors'], null);
    },

    [LOGOUT]: () => initialState
  },
  initialState
);

/* eslint-enable no-case-declarations, no-param-reassign */
