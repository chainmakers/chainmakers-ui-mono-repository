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
  ORDER_ALICE_SIDE,
  ORDER_BOB_SIDE
} from '../constants';

describe('containers/OrderPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(buyReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/OrderPage/reducers/openJoyride', () => {
  it('should handle the openJoyride action correctly', () => {
    const expectedResult = initialState.setIn(['joyride', 'open'], true);

    expect(buyReducer(initialState, openJoyride())).toEqual(expectedResult);
  });
});

describe('containers/OrderPage/reducers/closeJoyride', () => {
  it('should handle the closeJoyride action correctly', () => {
    const expectedResult = initialState.setIn(['joyride', 'open'], true);

    expect(buyReducer(expectedResult, closeJoyride())).toEqual(initialState);
  });
});

describe('containers/OrderPage/reducers/loadOrderbook', () => {
  it('should handle the loadOrderbook action correctly', () => {
    const expectedResult = initialState
      .setIn(['orderbook', 'fetchStatus'], LOADING)
      .setIn(['orderbook', 'error'], null);
    expect(buyReducer(initialState, loadOrderbook())).toEqual(expectedResult);
  });
});

describe('containers/OrderPage/reducers/skipOrderbook', () => {
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

describe('containers/OrderPage/reducers/loadOrderbookSuccess', () => {
  const payload = Object.assign({}, orderbook);
  const { base, rel } = payload;
  payload.bids.map(v => {
    v.base = base;
    v.rel = rel;
    v.id = `${v.address}-${rel}-${base}`;
    v.type = ORDER_ALICE_SIDE;
    return v;
  });
  payload.asks.map(v => {
    v.base = base;
    v.rel = rel;
    v.id = `${v.address}-${rel}-${base}`;
    v.type = ORDER_BOB_SIDE;
    return v;
  });
  it('should handle the loadOrderbookSuccess action correctly', () => {
    expect(buyReducer(initialState, loadOrderbookSuccess(payload))).toEqual(
      fromJS({
        selectCoinModal: { open: false },
        myorder: { fetchStatus: null, errors: null, list: [] },
        orders: {
          '12fj3npPKwTNxUgDMN8XcCDcR2Z4DBehj6-KMD-BTC': {
            pubkey:
              'dbd8c73e2e80e4f3cf88d2f04a9d2d0df4269496608b14a3e17556fdcb01e0c1',
            meta: { coin: 'BTC', numutxos: 0, depth: 0, age: 1, zcredits: 0 },
            price: 11765.318803369999,
            avevolume: 0,
            base: 'BTC',
            address: '12fj3npPKwTNxUgDMN8XcCDcR2Z4DBehj6',
            rel: 'KMD',
            type: 'ORDER_BOB_SIDE',
            id: '12fj3npPKwTNxUgDMN8XcCDcR2Z4DBehj6-KMD-BTC',
            maxvolume: 0.15931538
          },
          '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1-KMD-BTC': {
            pubkey:
              '1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8',
            meta: { coin: 'BTC', numutxos: 0, depth: 0, age: 9, zcredits: 0 },
            price: 11751.74655523,
            avevolume: 0,
            base: 'BTC',
            address: '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1',
            rel: 'KMD',
            type: 'ORDER_BOB_SIDE',
            id: '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1-KMD-BTC',
            maxvolume: 0.10416148
          },
          'RAwv8JhfvmFx2V3QpY7ehiYpBJ1eqxxdxR-KMD-BTC': {
            pubkey:
              'dbd8c73e2e80e4f3cf88d2f04a9d2d0df4269496608b14a3e17556fdcb01e0c1',
            meta: { coin: 'KMD', numutxos: 0, depth: 0, age: 1, zcredits: 0 },
            price: 11636.025133814292,
            avevolume: 0,
            base: 'BTC',
            address: 'RAwv8JhfvmFx2V3QpY7ehiYpBJ1eqxxdxR',
            rel: 'KMD',
            type: 'ORDER_ALICE_SIDE',
            id: 'RAwv8JhfvmFx2V3QpY7ehiYpBJ1eqxxdxR-KMD-BTC',
            maxvolume: 570.67205239
          },
          'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd-KMD-BTC': {
            pubkey:
              '1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8',
            meta: { coin: 'KMD', numutxos: 0, depth: 0, age: 9, zcredits: 0 },
            price: 11622.501162250117,
            avevolume: 0,
            base: 'BTC',
            address: 'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd',
            rel: 'KMD',
            type: 'ORDER_ALICE_SIDE',
            id: 'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd-KMD-BTC',
            maxvolume: 19956.77585582
          },
          'RHy2obsEHhAdTag4fDsC4SfCEqm5ZzTUSH-KMD-BTC': {
            pubkey:
              '98d2273b6580b2b3d5c35e43bb7176dc8e60af60e19ec2bfdfb0b40b7ccde792',
            meta: { coin: 'KMD', numutxos: 0, depth: 0, age: 8, zcredits: 0 },
            price: 8333.333333333332,
            avevolume: 0,
            base: 'BTC',
            address: 'RHy2obsEHhAdTag4fDsC4SfCEqm5ZzTUSH',
            rel: 'KMD',
            type: 'ORDER_ALICE_SIDE',
            id: 'RHy2obsEHhAdTag4fDsC4SfCEqm5ZzTUSH-KMD-BTC',
            maxvolume: 208.21649055
          }
        },
        cancelingOrderModal: {
          open: false,
          id: null,
          fetchStatus: null,
          errors: null
        },
        swapDetailModal: { open: false, uuid: null },
        joyride: { open: false },
        orderbook: {
          fetchStatus: 'LOADED',
          errors: null,
          deposit: null,
          recevie: null,
          asks: [
            '12fj3npPKwTNxUgDMN8XcCDcR2Z4DBehj6-KMD-BTC',
            '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1-KMD-BTC'
          ],
          bids: [
            'RAwv8JhfvmFx2V3QpY7ehiYpBJ1eqxxdxR-KMD-BTC',
            'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd-KMD-BTC',
            'RHy2obsEHhAdTag4fDsC4SfCEqm5ZzTUSH-KMD-BTC'
          ]
        },
        depositCoinModal: { open: false },
        recevieCoinModal: { open: false },
        confirmNewOrderModal: { open: false }
      })
    );
  });
});

describe('containers/OrderPage/reducers/loadOrderbookError', () => {
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

describe('containers/OrderPage/reducers/setNewOrder', () => {
  it('should handle the setNewOrder action correctly', () => {
    const expectedResult = initialState
      .setIn(['myorder', 'fetchStatus'], LOADING)
      .setIn(['myorder', 'errors'], null);
    expect(buyReducer(initialState, setNewOrder())).toEqual(expectedResult);
  });
});

describe('containers/OrderPage/reducers/skipNewOrder', () => {
  it('should handle the skipNewOrder action correctly', () => {
    const expectedResult = initialState
      .setIn(['myorder', 'fetchStatus'], LOADED)
      .setIn(['myorder', 'errors'], null);
    expect(buyReducer(initialState, skipNewOrder())).toEqual(expectedResult);
  });
});

describe('containers/OrderPage/reducers/setNewOrderSuccess', () => {
  const { result } = setprice;
  result.address = 'address';
  result.id = 'address';
  result.type = ORDER_ALICE_SIDE;
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
            type: 'ORDER_ALICE_SIDE',
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

describe('containers/OrderPage/reducers/setNewOrderError', () => {
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

describe('containers/OrderPage/reducers/openConfirmNewOrderModal', () => {
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

describe('containers/OrderPage/reducers/closeConfirmNewOrderModal', () => {
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

describe('containers/OrderPage/reducers/reloadOrderbookSuccess', () => {
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

describe('containers/OrderPage/reducers/openCancelingOrderModal', () => {
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

describe('containers/OrderPage/reducers/closeCancelingOrderModal', () => {
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
