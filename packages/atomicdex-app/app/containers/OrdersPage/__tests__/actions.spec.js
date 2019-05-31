import orderbook from '../../__tests__/orderbook.json';
import {
  loadPrice,
  loadPrices,
  loadPricesSuccess,
  loadBestPrice,
  loadBuyCoin,
  loadBuyCoinError,
  checkTimeoutEvent,
  checkUpdateSwapEvent,
  timeoutSwap,
  makeANewSwap,
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
  selectCoinDeposit,
  openRecevieCoinModal,
  closeRecevieCoinModal,
  selectCoinRecevie,
  setNewOrder,
  skipNewOrder,
  setNewOrderSuccess,
  setNewOrderError,
  openConfirmNewOrderModal,
  closeConfirmNewOrderModal
} from '../actions';

import {
  LOAD_PRICE,
  LOAD_PRICES,
  LOAD_PRICES_SUCCESS,
  LOAD_BEST_PRICE,
  LOAD_BUY_COIN,
  LOAD_BUY_COIN_ERROR,
  CHECK_TIMEOUT_EVENT,
  CHECK_UPDATE_SWAP_EVENT,
  SWAP_TIMEOUT,
  SWAP_MAKE_A_NEW,
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

describe('containers/DexPage/actions/loadPrice', () => {
  const coin = 'coin';

  it('should loadPrice should create loadPrice action', () => {
    expect(loadPrice(coin)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICE,
      payload: {
        coin
      }
    };

    expect(loadPrice(coin)).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/loadPrices', () => {
  it('should loadPrices should create loadPrices action', () => {
    expect(loadPrices()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICES
    };

    expect(loadPrices()).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/loadPricesSuccess', () => {
  it('should loadPricesSuccess should create loadPricesSuccess action', () => {
    expect(loadPricesSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICES_SUCCESS
    };

    expect(loadPricesSuccess()).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/loadBestPrice', () => {
  const payload = {
    address: '',
    age: 0,
    avevolume: 0,
    base: 'COQUI',
    bestPrice: 0,
    depth: 0,
    maxvolume: 0,
    numutxos: 0,
    price: 0,
    pubkey: '',
    rel: 'PIZZA',
    zcredits: 0
  };
  it('should loadBestPrice should create loadBestPrice action', () => {
    expect(loadBestPrice(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BEST_PRICE,
      payload
    };

    expect(loadBestPrice(payload)).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/loadBuyCoin', () => {
  const payload = {
    basecoin: 'BTC',
    paymentcoin: 'KMD',
    amount: 1.234
  };

  it('should loadBuyCoin should create loadBuyCoin action', () => {
    expect(loadBuyCoin(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BUY_COIN,
      payload
    };

    expect(loadBuyCoin(payload)).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/loadBuyCoinError', () => {
  const message = 'Value is large than balance';

  it('should loadBuyCoin should create loadBuyCoinError action', () => {
    expect(loadBuyCoinError(message)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BUY_COIN_ERROR,
      error: {
        message
      }
    };

    expect(loadBuyCoinError(message)).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/checkTimeoutEvent', () => {
  it('should checkTimeoutEvent should create checkTimeoutEvent action', () => {
    expect(checkTimeoutEvent()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: CHECK_TIMEOUT_EVENT
    };

    expect(checkTimeoutEvent()).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/checkUpdateSwapEvent', () => {
  it('should checkUpdateSwapEvent should create checkUpdateSwapEvent action', () => {
    expect(checkUpdateSwapEvent()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: CHECK_UPDATE_SWAP_EVENT
    };

    expect(checkUpdateSwapEvent()).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/timeoutSwap', () => {
  const payload = {
    alice: 'BEER',
    bob: 'COQUI',
    id: 3624682363,
    quoteid: 0,
    requestid: 0,
    uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811'
  };
  it('should timeoutSwap should create timeoutSwap action', () => {
    expect(timeoutSwap(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SWAP_TIMEOUT,
      payload
    };

    expect(timeoutSwap(payload)).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/makeANewSwap', () => {
  it('should makeANewSwap should create makeANewSwap action', () => {
    expect(makeANewSwap()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SWAP_MAKE_A_NEW
    };

    expect(makeANewSwap()).toEqual(expectedResult);
  });
});

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
