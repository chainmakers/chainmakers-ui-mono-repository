// @flow
import {
  loadTransactions,
  loadTransactionsSuccess,
  loadCoinTransactions,
  openJoyride,
  closeJoyride,
  loadWithdraw,
  loadWithdrawSuccess,
  loadWithdrawError,
  switchTabAssetInfo,
  openAssetModal,
  closeAssetModal,
  openRemoveElectrumModal,
  closeRemoveElectrumModal
} from '../actions';
import {
  TRANSACTIONS_LOAD,
  LOAD_TRANSACTIONS_SUCCESS,
  COIN_TRANSACTIONS_LOAD,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  WITHDRAW_LOAD,
  WITHDRAW_LOAD_SUCCESS,
  WITHDRAW_LOAD_ERROR,
  WITHDRAW_TAB,
  // DEPOSIT_TAB,
  TAB_ASSET_INFO_SWITCH,
  ASSET_MODAL_OPEN,
  ASSET_MODAL_CLOSE,
  REMOVING_ELECTRUM_MODAL_OPEN,
  REMOVING_ELECTRUM_MODAL_CLOSE
} from '../constants';
import type { ErrorType } from '../../schema';

describe('containers/WalletPage/actions/loadTransactions', () => {
  it('should loadTransactions should create loadTransactions action', () => {
    expect(loadTransactions()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: TRANSACTIONS_LOAD
    };

    expect(loadTransactions()).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/loadTransactionsSuccess', () => {
  it('should loadTransactionsSuccess should create loadTransactionsSuccess action', () => {
    expect(loadTransactionsSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_TRANSACTIONS_SUCCESS
    };

    expect(loadTransactionsSuccess()).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/loadCoinTransactions', () => {
  const data = {
    result: 'success',
    status: 'queued',
    coin: 'KMD',
    queueId: 23
  };
  it('should loadCoinTransactions should create loadCoinTransactions action', () => {
    expect(loadCoinTransactions(data)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: COIN_TRANSACTIONS_LOAD,
      payload: data
    };

    expect(loadCoinTransactions(data)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/openJoyride', () => {
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

describe('containers/WalletPage/actions/closeJoyride', () => {
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

describe('containers/WalletPage/actions/loadWithdraw', () => {
  const payload = {
    amount: 0.1,
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    coin: 'BEER'
  };
  it('should loadWithdraw should create loadWithdraw action', () => {
    expect(loadWithdraw(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: WITHDRAW_LOAD,
      payload
    };

    expect(loadWithdraw(payload)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/loadWithdrawSuccess', () => {
  const payload = {
    amount: 0.1,
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    coin: 'BEER'
  };
  it('should loadWithdrawSuccess should create loadWithdrawSuccess action', () => {
    expect(loadWithdrawSuccess(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: WITHDRAW_LOAD_SUCCESS,
      payload
    };

    expect(loadWithdrawSuccess(payload)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/loadWithdrawError', () => {
  const error: ErrorType = {
    context: {
      action: WITHDRAW_LOAD,
      params: {
        amount: 0.1,
        address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
        coin: 'BEER'
      }
    },
    type: 'RPC',
    message: "can't connect to electrum server"
  };

  it('should loadWithdrawError should create loadWithdrawError action', () => {
    expect(loadWithdrawError(error)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: WITHDRAW_LOAD_ERROR,
      error
    };

    expect(loadWithdrawError(error)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/switchTabAssetInfo', () => {
  const payload = {
    tab: WITHDRAW_TAB
  };
  it('should switchTabAssetInfo should create switchTabAssetInfo action', () => {
    expect(switchTabAssetInfo(WITHDRAW_TAB)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: TAB_ASSET_INFO_SWITCH,
      payload
    };

    expect(switchTabAssetInfo(WITHDRAW_TAB)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/openAssetModal', () => {
  const payload = {
    coin: 'KMD',
    tab: 1
  };
  it('should loadTransactionsSuccess should create openAssetModal action', () => {
    expect(openAssetModal(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ASSET_MODAL_OPEN,
      payload
    };

    expect(openAssetModal(payload)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/closeAssetModal', () => {
  it('should loadTransactionsSuccess should create closeAssetModal action', () => {
    expect(closeAssetModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ASSET_MODAL_CLOSE
    };

    expect(closeAssetModal()).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/openRemoveElectrumModal', () => {
  const coin = 'KMD';

  it('should loadTransactionsSuccess should create openRemoveElectrumModal action', () => {
    expect(openRemoveElectrumModal(coin)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: REMOVING_ELECTRUM_MODAL_OPEN,
      payload: {
        coin
      }
    };

    expect(openRemoveElectrumModal(coin)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/closeRemoveElectrumModal', () => {
  it('should loadTransactionsSuccess should create closeRemoveElectrumModal action', () => {
    expect(closeRemoveElectrumModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: REMOVING_ELECTRUM_MODAL_CLOSE
    };

    expect(closeRemoveElectrumModal()).toEqual(expectedResult);
  });
});
