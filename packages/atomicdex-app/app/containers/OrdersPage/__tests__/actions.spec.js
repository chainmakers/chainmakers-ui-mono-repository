import orderbook from '../../__tests__/orderbook.json';
import {
  openDetailModal,
  closeDetailModal,
  openJoyride,
  closeJoyride,
  loadOrderbook,
  skipOrderbook,
  loadOrderbookSuccess,
  loadOrderbookError,
  openDepositCoinModal,
  closeDepositCoinModal,
  openRecevieCoinModal,
  closeRecevieCoinModal,
  setNewOrder,
  skipNewOrder,
  setNewOrderSuccess,
  setNewOrderError,
  openConfirmNewOrderModal,
  closeConfirmNewOrderModal
} from '../actions';

import {
  SWAP_DETAIL_MODAL_OPEN,
  SWAP_DETAIL_MODAL_CLOSE,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  ORDERBOOK_LOAD,
  ORDERBOOK_LOAD_SKIP,
  ORDERBOOK_LOAD_SUCCESS,
  ORDERBOOK_LOAD_ERROR,
  DEPOSIT_COIN_MODAL_OPEN,
  DEPOSIT_COIN_MODAL_CLOSE,
  RECEVIE_COIN_MODAL_OPEN,
  RECEVIE_COIN_MODAL_CLOSE,
  NEW_ORDER_SET,
  NEW_ORDER_SET_SKIP,
  NEW_ORDER_SET_SUCCESS,
  NEW_ORDER_SET_ERROR,
  CONFIRM_NEW_ORDER_MODAL_OPEN,
  CONFIRM_NEW_ORDER_MODAL_CLOSE
} from '../constants';

describe('containers/DexPage/actions/openDetailModal', () => {
  const uuid = 'uuid';
  it('should openDetailModal should create openDetailModal action', () => {
    expect(openDetailModal()).toMatchSnapshot();
    expect(openDetailModal(uuid)).toMatchSnapshot();
  });

  it('should return the correct type', () => {
    const expectedResult = {
      type: SWAP_DETAIL_MODAL_OPEN,
      payload: {
        uuid: undefined
      }
    };

    expect(openDetailModal()).toEqual(expectedResult);
  });

  it('should return the correct type and the uuid', () => {
    const expectedResult = {
      type: SWAP_DETAIL_MODAL_OPEN,
      payload: {
        uuid
      }
    };

    expect(openDetailModal(uuid)).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/closeDetailModal', () => {
  it('should closeDetailModal should create closeDetailModal action', () => {
    expect(closeDetailModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SWAP_DETAIL_MODAL_CLOSE
    };

    expect(closeDetailModal()).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/openJoyride', () => {
  it('should openJoyride should create openJoyride action', () => {
    expect(openJoyride()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: JOYRIDE_OPEN
    };

    expect(openJoyride()).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/closeJoyride', () => {
  it('should closeJoyride should create closeJoyride action', () => {
    expect(closeJoyride()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: JOYRIDE_CLOSE
    };

    expect(closeJoyride()).toEqual(expectedResult);
  });
});

describe('containers/OrderPage/actions/loadOrderbook', () => {
  it('should loadOrderbook should create loadOrderbook action', () => {
    expect(loadOrderbook()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ORDERBOOK_LOAD
    };

    expect(loadOrderbook()).toEqual(expectedResult);
  });
});

describe('containers/OrderPage/actions/skipOrderbook', () => {
  it('should skipOrderbook should create skipOrderbook action', () => {
    expect(skipOrderbook()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ORDERBOOK_LOAD_SKIP
    };

    expect(skipOrderbook()).toEqual(expectedResult);
  });
});

describe('containers/OrderPage/actions/loadOrderbookSuccess', () => {
  const payload = orderbook;

  it('should loadOrderbookSuccess should create loadOrderbookSuccess action', () => {
    expect(loadOrderbookSuccess(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ORDERBOOK_LOAD_SUCCESS,
      payload
    };

    expect(loadOrderbookSuccess(payload)).toEqual(expectedResult);
  });
});

describe('containers/OrderPage/actions/loadOrderbookError', () => {
  const error = {
    context: {
      action: ORDERBOOK_LOAD
    },
    message: 'message',
    type: 'RPC'
  };

  it('should loadOrderbookError should create loadOrderbookError action', () => {
    expect(loadOrderbookError(error)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ORDERBOOK_LOAD_ERROR,
      error
    };

    expect(loadOrderbookError(error)).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/openDepositCoinModal', () => {
  it('should openDepositCoinModal should create openDepositCoinModal action', () => {
    expect(openDepositCoinModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: DEPOSIT_COIN_MODAL_OPEN
    };

    expect(openDepositCoinModal()).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/closeDepositCoinModal', () => {
  it('should closeDepositCoinModal should create closeDepositCoinModal action', () => {
    expect(closeDepositCoinModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: DEPOSIT_COIN_MODAL_CLOSE
    };

    expect(closeDepositCoinModal()).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/openRecevieCoinModal', () => {
  it('should openRecevieCoinModal should create openRecevieCoinModal action', () => {
    expect(openRecevieCoinModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: RECEVIE_COIN_MODAL_OPEN
    };

    expect(openRecevieCoinModal()).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/closeRecevieCoinModal', () => {
  it('should closeRecevieCoinModal should create closeRecevieCoinModal action', () => {
    expect(closeRecevieCoinModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: RECEVIE_COIN_MODAL_CLOSE
    };

    expect(closeRecevieCoinModal()).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/setNewOrder', () => {
  const price = 0.1;
  it('should setNewOrder should create setNewOrder action', () => {
    expect(setNewOrder(price)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: NEW_ORDER_SET,
      payload: {
        price
      }
    };

    expect(setNewOrder(price)).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/setNewOrderSuccess', () => {
  it('should setNewOrderSuccess should create setNewOrderSuccess action', () => {
    expect(setNewOrderSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: NEW_ORDER_SET_SUCCESS
    };

    expect(setNewOrderSuccess()).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/setNewOrderError', () => {
  it('should setNewOrderError should create setNewOrderError action', () => {
    expect(setNewOrderError()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: NEW_ORDER_SET_ERROR
    };

    expect(setNewOrderError()).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/skipNewOrder', () => {
  it('should skipNewOrder should create skipNewOrder action', () => {
    expect(skipNewOrder()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: NEW_ORDER_SET_SKIP
    };

    expect(skipNewOrder()).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/openConfirmNewOrderModal', () => {
  it('should openConfirmNewOrderModal should create openConfirmNewOrderModal action', () => {
    expect(openConfirmNewOrderModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: CONFIRM_NEW_ORDER_MODAL_OPEN
    };

    expect(openConfirmNewOrderModal()).toEqual(expectedResult);
  });
});

describe('containers/OrdersPage/actions/closeConfirmNewOrderModal', () => {
  it('should closeConfirmNewOrderModal should create closeConfirmNewOrderModal action', () => {
    expect(closeConfirmNewOrderModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: CONFIRM_NEW_ORDER_MODAL_CLOSE
    };

    expect(closeConfirmNewOrderModal()).toEqual(expectedResult);
  });
});
