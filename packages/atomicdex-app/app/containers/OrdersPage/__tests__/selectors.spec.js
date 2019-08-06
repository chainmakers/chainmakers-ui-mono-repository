// https://github.com/hql287/Manta
// https://jestjs.io/docs/en/mock-functions
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectOrder,
  makeSelectSwapDetailModal,
  makeSelectCoinModal,
  makeSelectCurrency,
  makeSelectPayment,
  makeSelectOrderbook,
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie,
  makeSelectOrderbookAsks,
  makeSelectOrderbookBids,
  makeSelectOrderbookAsksFullList,
  makeSelectOrderbookBidsFullList,
  makeSelectOrderbookFetchStatus,
  makeSelectMyOrder,
  makeSelectMyOrderList,
  makeSelectMyOrderFetchStatus,
  makeSelectMyOrderErrors,
  makeSelectConfirmNewOrderModal,
  makeSelectCancelingOrderModal,
  makeSelectCancelingOrderModalOpen,
  makeSelectCancelingOrderModalId,
  makeSelectCancelingOrderModalEntity,
  makeSelectCancelingOrderModalFetchStatus,
  makeSelectOrders
} from '../selectors';

describe('containers/OrderPage/selectors/selectOrder', () => {
  it('should select the order state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectOrder(mockedState)).toEqual(initialState);
  });
});

describe('containers/OrderPage/selectors/makeSelectSwapDetailModal', () => {
  it('should select the SwapDetailModal state', () => {
    let store = initialState;
    store = store.set(
      'swapDetailModal',
      fromJS({
        open: false,
        uuid: null
      })
    );
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectSwapDetailModal = makeSelectSwapDetailModal();
    expect(selectSwapDetailModal(mockedState)).toEqual(
      store.get('swapDetailModal')
    );
  });
});

describe('containers/OrderPage/selectors/makeSelectCoinModal', () => {
  it('should select the selectCoinModal state', () => {
    let store = initialState;
    store = store.set(
      'selectCoinModal',
      fromJS({
        open: false,
        uuid: null
      })
    );
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectCoinModal = makeSelectCoinModal();
    expect(selectCoinModal(mockedState)).toEqual(store.get('selectCoinModal'));
  });
});

describe('containers/OrderPage/selectors/makeSelectCurrency', () => {
  it('should select the makeSelectCurrency state', () => {
    const store = initialState;
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectCurrency = makeSelectCurrency();
    expect(selectCurrency(mockedState)).toEqual(store.get('currency'));
  });
});

describe('containers/OrderPage/selectors/makeSelectPayment', () => {
  it('should select the makeSelectPayment state', () => {
    const store = initialState;
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectPayment = makeSelectPayment();
    expect(selectPayment(mockedState)).toEqual(store.get('payment'));
  });
});

describe('containers/OrderPage/selectors/makeSelectOrderbook', () => {
  const order = {
    pubkey: 'c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833',
    meta: {
      coin: 'BEER',
      numutxos: 0,
      depth: 0,
      age: 1,
      zcredits: 0
    },
    price: 9.99999985,
    avevolume: 0,
    minvolume: 0,
    base: 'BEER',
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    rel: 'COQUI',
    type: 'ORDER_ALICE_SIDE',
    id: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    createdAt: 1559705142940,
    uuid: '61e7fa64-43ff-4858-a148-62d16d0da0d8',
    maxvolume: 6729.6392886
  };
  it('should select the orderbook state', () => {
    let mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectOrderbook = makeSelectOrderbook();
    expect(selectOrderbook(mockedState)).toEqual(initialState.get('orderbook'));

    const selectOrderbookDeposit = makeSelectOrderbookDeposit();
    expect(selectOrderbookDeposit(mockedState)).toEqual(null);

    const selectOrderbookRecevie = makeSelectOrderbookRecevie();
    expect(selectOrderbookRecevie(mockedState)).toEqual(null);

    const selectOrderbookAsks = makeSelectOrderbookAsks();
    expect(selectOrderbookAsks(mockedState)).toEqual(fromJS([]));

    const selectOrderbookBids = makeSelectOrderbookBids();
    expect(selectOrderbookBids(mockedState)).toEqual(fromJS([]));

    mockedState = mockedState
      .setIn(['order', 'orders', order.address], fromJS(order))
      .setIn(['order', 'orderbook', 'asks'], fromJS([order.address]))
      .setIn(['order', 'orderbook', 'bids'], fromJS([order.address]));

    const selectOrderbookAsksFullList = makeSelectOrderbookAsksFullList();
    expect(selectOrderbookAsksFullList(mockedState)).toEqual(fromJS([order]));

    const selectOrderbookBidsFullList = makeSelectOrderbookBidsFullList();
    expect(selectOrderbookBidsFullList(mockedState)).toEqual(fromJS([order]));

    const selectOrders = makeSelectOrders();
    expect(selectOrders(mockedState)).toEqual(
      fromJS({
        [order.address]: order
      })
    );

    const selectOrderbookFetchStatus = makeSelectOrderbookFetchStatus();
    expect(selectOrderbookFetchStatus(mockedState)).toEqual(null);
  });
});

describe('containers/OrderPage/selectors/makeSelectMyOrder', () => {
  it('should select the orderbook state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectMyOrder = makeSelectMyOrder();
    expect(selectMyOrder(mockedState)).toEqual(initialState.get('myorder'));

    const selectMyOrderErrors = makeSelectMyOrderErrors();
    expect(selectMyOrderErrors(mockedState)).toEqual(fromJS(null));

    const selectMyOrderFetchStatus = makeSelectMyOrderFetchStatus();
    expect(selectMyOrderFetchStatus(mockedState)).toEqual(null);

    const selectMyOrderList = makeSelectMyOrderList();
    expect(selectMyOrderList(mockedState)).toEqual(fromJS([]));
  });
});

describe('containers/OrderPage/selectors/makeSelectConfirmNewOrderModal', () => {
  it('should select the orderbook state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectConfirmNewOrderModal = makeSelectConfirmNewOrderModal();
    expect(selectConfirmNewOrderModal(mockedState)).toEqual(
      initialState.get('confirmNewOrderModal')
    );
  });
});

describe('containers/OrderPage/selectors/makeSelectCancelingOrderModal', () => {
  const id = 'id_unique';
  const orders = {
    [id]: {
      id
    }
  };
  it('should select the orderbook state', () => {
    const store = initialState
      .set('orders', fromJS(orders))
      .setIn(['cancelingOrderModal', 'id'], id);
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });

    const selectCancelingOrderModal = makeSelectCancelingOrderModal();
    expect(selectCancelingOrderModal(mockedState)).toEqual(
      store.get('cancelingOrderModal')
    );

    const selectCancelingOrderModalOpen = makeSelectCancelingOrderModalOpen();
    expect(selectCancelingOrderModalOpen(mockedState)).toEqual(false);

    const selectCancelingOrderModalId = makeSelectCancelingOrderModalId();
    expect(selectCancelingOrderModalId(mockedState)).toEqual(id);

    const selectCancelingOrderModalFetchStatus = makeSelectCancelingOrderModalFetchStatus();
    expect(selectCancelingOrderModalFetchStatus(mockedState)).toEqual(null);

    const selectCancelingOrderModalEntity = makeSelectCancelingOrderModalEntity();
    expect(selectCancelingOrderModalEntity(mockedState)).toEqual(
      fromJS({
        id
      })
    );
  });
});
