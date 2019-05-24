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
  openSelectCoinModal,
  closeSelectCoinModal,
  clickSelectCoinModal,
  selectCoinPayment,
  skipSearchStateCreation,
  openJoyride,
  closeJoyride,
  loadOrderbook,
  loadOrderbookSuccess,
  loadOrderbookError
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
  SELECT_COIN_MODAL_OPEN,
  SELECT_COIN_MODAL_CLOSE,
  SELECT_COIN_MODAL_CLICK,
  COIN_PAYMENT_SELECT,
  SEARCH_STATE_SKIP_CREATION,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  ORDERBOOK_LOAD,
  ORDERBOOK_LOAD_SUCCESS,
  ORDERBOOK_LOAD_ERROR
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

describe('containers/DexPage/actions/openSelectCoinModal', () => {
  it('should openSelectCoinModal should create openSelectCoinModal action', () => {
    expect(openSelectCoinModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SELECT_COIN_MODAL_OPEN
    };

    expect(openSelectCoinModal()).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/closeSelectCoinModal', () => {
  it('should closeSelectCoinModal should create closeSelectCoinModal action', () => {
    expect(closeSelectCoinModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SELECT_COIN_MODAL_CLOSE
    };

    expect(closeSelectCoinModal()).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/clickSelectCoinModal', () => {
  const name = 'Komodo';
  const symbol = 'KMD';
  it('should clickSelectCoinModal should create clickSelectCoinModal action', () => {
    expect(
      clickSelectCoinModal({
        name,
        symbol
      })
    ).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SELECT_COIN_MODAL_CLICK,
      payload: {
        name,
        symbol
      }
    };

    expect(
      clickSelectCoinModal({
        name,
        symbol
      })
    ).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/selectCoinPayment', () => {
  const name = 'Komodo';
  const symbol = 'KMD';
  it('should selectCoinPayment should create selectCoinPayment action', () => {
    expect(
      selectCoinPayment({
        name,
        symbol
      })
    ).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: COIN_PAYMENT_SELECT,
      payload: {
        name,
        symbol
      }
    };

    expect(
      selectCoinPayment({
        name,
        symbol
      })
    ).toEqual(expectedResult);
  });
});

describe('containers/DexPage/actions/skipSearchStateCreation', () => {
  it('should skipSearchStateCreation should create skipSearchStateCreation action', () => {
    expect(skipSearchStateCreation()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SEARCH_STATE_SKIP_CREATION
    };

    expect(skipSearchStateCreation()).toEqual(expectedResult);
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
