import { fromJS } from 'immutable';
import orderbook from '../../__tests__/orderbook.json';
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
  closeConfirmNewOrderModal
} from '../actions';
import { LOADING, LOADED, FAILED } from '../../../constants';
import { ORDERBOOK_LOAD, NEW_ORDER_SET } from '../constants';

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
  const payload = orderbook;
  it('should handle the loadOrderbookSuccess action correctly', () => {
    const { asks, bids } = payload;
    const expectedResult = initialState
      .setIn(['orderbook', 'fetchStatus'], LOADED)
      .setIn(['orderbook', 'asks'], fromJS(asks))
      .setIn(['orderbook', 'bids'], fromJS(bids));
    expect(buyReducer(initialState, loadOrderbookSuccess(payload))).toEqual(
      expectedResult
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
      .setIn(['myorder', 'error'], null);
    expect(buyReducer(initialState, setNewOrder())).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/skipNewOrder', () => {
  it('should handle the skipNewOrder action correctly', () => {
    const expectedResult = initialState
      .setIn(['myorder', 'fetchStatus'], LOADED)
      .setIn(['myorder', 'error'], null);
    expect(buyReducer(initialState, skipNewOrder())).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/setNewOrderSuccess', () => {
  it('should handle the setNewOrderSuccess action correctly', () => {
    const expectedResult = initialState.setIn(
      ['myorder', 'fetchStatus'],
      LOADED
    );
    expect(buyReducer(initialState, setNewOrderSuccess())).toEqual(
      expectedResult
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
      .setIn(['myorder', 'error'], fromJS(error));
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
