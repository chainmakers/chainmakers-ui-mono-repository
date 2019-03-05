// @flow
import {
  loadTransactions,
  loadTransactionsSuccess,
  openWithdrawModal,
  closeWithdrawModal,
  openDepositModal,
  closeDepositModal,
  loadCoinTransactions,
  openJoyride,
  closeJoyride,
  loadWithdraw,
  loadWithdrawSuccess,
  loadWithdrawError
} from '../actions';
import {
  TRANSACTIONS_LOAD,
  LOAD_TRANSACTIONS_SUCCESS,
  WITHDRAW_MODAL_OPEN,
  WITHDRAW_MODAL_CLOSE,
  DEPOSIT_MODAL_OPEN,
  DEPOSIT_MODAL_CLOSE,
  COIN_TRANSACTIONS_LOAD,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  WITHDRAW_LOAD,
  WITHDRAW_LOAD_SUCCESS,
  WITHDRAW_LOAD_ERROR
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

describe('containers/WalletPage/actions/openWithdrawModal', () => {
  const coin = 'KMD';
  it('should loadTransactionsSuccess should create openWithdrawModal action', () => {
    expect(openWithdrawModal(coin)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: WITHDRAW_MODAL_OPEN,
      payload: {
        coin
      }
    };

    expect(openWithdrawModal(coin)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/closeWithdrawModal', () => {
  it('should loadTransactionsSuccess should create closeWithdrawModal action', () => {
    expect(closeWithdrawModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: WITHDRAW_MODAL_CLOSE
    };

    expect(closeWithdrawModal()).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/openDepositModal', () => {
  const coin = 'KMD';
  it('should loadTransactionsSuccess should create openDepositModal action', () => {
    expect(openDepositModal(coin)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: DEPOSIT_MODAL_OPEN,
      payload: {
        coin
      }
    };

    expect(openDepositModal(coin)).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/closeDepositModal', () => {
  it('should loadTransactionsSuccess should create closeDepositModal action', () => {
    expect(closeDepositModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: DEPOSIT_MODAL_CLOSE
    };

    expect(closeDepositModal()).toEqual(expectedResult);
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
