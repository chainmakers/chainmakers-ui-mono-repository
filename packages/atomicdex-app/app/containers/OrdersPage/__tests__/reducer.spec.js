/* eslint no-param-reassign: ["error", { "props": false }] */
import { fromJS } from 'immutable';
import orderbook from '../../__tests__/orderbook.json';
import setprice from '../../__tests__/setprice.json';
import buyReducer, { initialState } from '../reducer';
import {
  openJoyride,
  closeJoyride,
  loadOrderbook,
  skipOrderbook,
  loadOrderbookSuccess,
  loadOrderbookError,
  setNewOrder,
  skipNewOrder,
  setNewOrderSuccess,
  setNewOrderError,
  openConfirmNewOrderModal,
  closeConfirmNewOrderModal,
  reloadOrderbookSuccess,
  openCancelingOrderModal,
  closeCancelingOrderModal
} from '../actions';
import { LOADING, LOADED, FAILED } from '../../../constants';
import {
  ORDERBOOK_LOAD,
  NEW_ORDER_SET,
  ORDER_ALICE_SITE,
  ORDER_BOB_SITE
} from '../constants';

describe('containers/DexPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(buyReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/DexPage/reducers/openJoyride', () => {
  it('should handle the openJoyride action correctly', () => {
    const expectedResult = initialState.setIn(['joyride', 'open'], true);

    expect(buyReducer(initialState, openJoyride())).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/closeJoyride', () => {
  it('should handle the closeJoyride action correctly', () => {
    const expectedResult = initialState.setIn(['joyride', 'open'], true);

    expect(buyReducer(expectedResult, closeJoyride())).toEqual(initialState);
  });
});

describe('containers/DexPage/reducers/loadOrderbook', () => {
  it('should handle the loadOrderbook action correctly', () => {
    const expectedResult = initialState
      .setIn(['orderbook', 'fetchStatus'], LOADING)
      .setIn(['orderbook', 'error'], null);
    expect(buyReducer(initialState, loadOrderbook())).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/skipOrderbook', () => {
  it('should handle the skipOrderbook action correctly', () => {
    const expectedResult = initialState
      .setIn(['orderbook', 'fetchStatus'], LOADING)
      .setIn(['orderbook', 'error'], null);
    expect(buyReducer(expectedResult, skipOrderbook())).toEqual(
      initialState
        .setIn(['orderbook', 'fetchStatus'], LOADED)
        .setIn(['orderbook', 'error'], null)
    );
  });
});

describe('containers/DexPage/reducers/loadOrderbookSuccess', () => {
  const payload = Object.assign({}, orderbook);
  const { base, rel } = payload;
  payload.bids.map(v => {
    v.base = base;
    v.rel = rel;
    v.id = `${v.address}-${rel}-${base}`;
    v.type = ORDER_ALICE_SITE;
    return v;
  });
  payload.asks.map(v => {
    v.base = base;
    v.rel = rel;
    v.id = `${v.address}-${rel}-${base}`;
    v.type = ORDER_BOB_SITE;
    return v;
  });
  it('should handle the loadOrderbookSuccess action correctly', () => {
    expect(buyReducer(initialState, loadOrderbookSuccess(payload))).toEqual(
      fromJS({
        selectCoinModal: { open: false },
        myorder: { fetchStatus: null, errors: null, list: [] },
        orders: {
          '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1-KMD-BTC': {
            pubkey:
              'bab6ad2eebe1e666369cab504d4622b22c1f1ef718ef388e88020f30a1573e01',
            meta: { coin: 'BTC', numutxos: 0, depth: 0, age: 9, zcredits: 0 },
            price: 0.00015473,
            avevolume: 0,
            base: 'BTC',
            address: '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1',
            rel: 'KMD',
            type: 'ORDER_BOB_SITE',
            id: '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1-KMD-BTC',
            maxvolume: 0.02620853
          },
          'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd-KMD-BTC': {
            pubkey:
              'bab6ad2eebe1e666369cab504d4622b22c1f1ef718ef388e88020f30a1573e01',
            meta: { coin: 'KMD', numutxos: 0, depth: 0, age: 9, zcredits: 0 },
            price: 0.0001566,
            avevolume: 0,
            base: 'BTC',
            address: 'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd',
            rel: 'KMD',
            type: 'ORDER_ALICE_SITE',
            id: 'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd-KMD-BTC',
            maxvolume: 36.40686108
          }
        },
        swapDetailModal: { open: false, uuid: null },
        joyride: { open: false },
        orderbook: {
          fetchStatus: 'LOADED',
          errors: null,
          deposit: null,
          recevie: null,
          asks: ['1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1-KMD-BTC'],
          bids: ['RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd-KMD-BTC']
        },
        depositCoinModal: { open: false },
        recevieCoinModal: { open: false },
        confirmNewOrderModal: { open: false },
        cancelingOrderModal: {
          open: false,
          id: null,
          fetchStatus: null,
          errors: null
        }
      })
    );
  });
});

describe('containers/DexPage/reducers/loadOrderbookError', () => {
  const error = {
    context: {
      action: ORDERBOOK_LOAD
    },
    message: 'message',
    type: 'RPC'
  };

  it('should handle the loadOrderbookError action correctly', () => {
    const expectedResult = initialState
      .setIn(['orderbook', 'fetchStatus'], FAILED)
      .setIn(['orderbook', 'error'], fromJS(error));
    expect(buyReducer(initialState, loadOrderbookError(error))).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/setNewOrder', () => {
  it('should handle the setNewOrder action correctly', () => {
    const expectedResult = initialState
      .setIn(['myorder', 'fetchStatus'], LOADING)
      .setIn(['myorder', 'errors'], null);
    expect(buyReducer(initialState, setNewOrder())).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/skipNewOrder', () => {
  it('should handle the skipNewOrder action correctly', () => {
    const expectedResult = initialState
      .setIn(['myorder', 'fetchStatus'], LOADED)
      .setIn(['myorder', 'errors'], null);
    expect(buyReducer(initialState, skipNewOrder())).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/setNewOrderSuccess', () => {
  const { result } = setprice;
  result.address = 'address';
  result.id = 'address';
  result.type = ORDER_ALICE_SITE;
  it('should handle the setNewOrderSuccess action correctly', () => {
    expect(buyReducer(initialState, setNewOrderSuccess(result))).toEqual(
      fromJS({
        selectCoinModal: { open: false },
        myorder: { fetchStatus: null, errors: null, list: ['address'] },
        orders: {
          address: {
            meta: { matches: {}, started_swaps: [] },
            price: 0.1,
            minvolume: 0,
            base: 'BEER',
            address: 'address',
            rel: 'COQUI',
            type: 'ORDER_ALICE_SITE',
            id: 'address',
            createdAt: 1559621086489,
            uuid: '89b47c5b-f441-46c4-aea1-279f6ea0d67d',
            maxvolume: 6729.6392886
          }
        },
        swapDetailModal: { open: false, uuid: null },
        joyride: { open: false },
        orderbook: {
          fetchStatus: null,
          errors: null,
          deposit: null,
          recevie: null,
          asks: [],
          bids: []
        },
        depositCoinModal: { open: false },
        recevieCoinModal: { open: false },
        confirmNewOrderModal: { open: false },
        cancelingOrderModal: {
          open: false,
          id: null,
          fetchStatus: null,
          errors: null
        }
      })
    );
  });
});

describe('containers/DexPage/reducers/setNewOrderError', () => {
  const error = {
    context: {
      action: NEW_ORDER_SET
    },
    message: 'message',
    type: 'RPC'
  };

  it('should handle the setNewOrderError action correctly', () => {
    const expectedResult = initialState
      .setIn(['myorder', 'fetchStatus'], FAILED)
      .setIn(['myorder', 'errors'], fromJS(error));
    expect(buyReducer(initialState, setNewOrderError(error))).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/openConfirmNewOrderModal', () => {
  it('should handle the openConfirmNewOrderModal action correctly', () => {
    const expectedResult = initialState.setIn(
      ['confirmNewOrderModal', 'open'],
      true
    );

    expect(buyReducer(initialState, openConfirmNewOrderModal())).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/closeConfirmNewOrderModal', () => {
  it('should handle the closeConfirmNewOrderModal action correctly', () => {
    const expectedResult = initialState.setIn(
      ['confirmNewOrderModal', 'open'],
      true
    );

    expect(buyReducer(expectedResult, closeConfirmNewOrderModal())).toEqual(
      initialState
    );
  });
});

describe('containers/DexPage/reducers/reloadOrderbookSuccess', () => {
  it('should handle the reloadOrderbookSuccess action correctly', () => {
    const expectedResult = initialState.setIn(
      ['myorder', 'fetchStatus'],
      LOADED
    );

    expect(buyReducer(initialState, reloadOrderbookSuccess())).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/openCancelingOrderModal', () => {
  const id = 'id';
  it('should handle the openCancelingOrderModal action correctly', () => {
    const expectedResult = initialState
      .setIn(['cancelingOrderModal', 'open'], true)
      .setIn(['cancelingOrderModal', 'id'], id);

    expect(buyReducer(initialState, openCancelingOrderModal(id))).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/closeCancelingOrderModal', () => {
  it('should handle the closeCancelingOrderModal action correctly', () => {
    const expectedResult = initialState.setIn(
      ['cancelingOrderModal', 'open'],
      true
    );

    expect(buyReducer(expectedResult, closeCancelingOrderModal())).toEqual(
      initialState
    );
  });
});
