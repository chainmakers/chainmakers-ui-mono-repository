// https://github.com/hql287/Manta
// https://jestjs.io/docs/en/mock-functions
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectOrder,
  makeSelectPriceEntities,
  makeSelectSwapDetailModal,
  makeSelectCoinModal,
  makeSelectCurrency,
  makeSelectPayment,
  makeSelectOrderbook,
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie,
  makeSelectOrderbookAsks,
  makeSelectOrderbookBids,
  makeSelectOrderbookFetchStatus,
  makeSelectMyOrder,
  makeSelectMyOrderFetchStatus,
  makeSelectMyOrderErrors,
  makeSelectConfirmNewOrderModal
} from '../selectors';

describe('containers/OrderPage/selectors/selectOrder', () => {
  it('should select the order state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectOrder(mockedState)).toEqual(initialState);
  });
});

describe('containers/DexPage/selectors/makeSelectSwapDetailModal', () => {
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

describe('containers/DexPage/selectors/makeSelectCoinModal', () => {
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

describe('containers/DexPage/selectors/makeSelectCurrency', () => {
  it('should select the makeSelectCurrency state', () => {
    const store = initialState;
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectCurrency = makeSelectCurrency();
    expect(selectCurrency(mockedState)).toEqual(store.get('currency'));
  });
});

describe('containers/DexPage/selectors/makeSelectPayment', () => {
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
  it('should select the orderbook state', () => {
    const mockedState = fromJS({
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
