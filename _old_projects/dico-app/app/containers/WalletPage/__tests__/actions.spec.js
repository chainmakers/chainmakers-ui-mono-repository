import {
  loadTransactions,
  loadTransactionsLoop,
  loadTransactionsSuccess,
  openWithdrawModal,
  closeWithdrawModal,
  openDepositModal,
  closeDepositModal,
  loadCoinTransactions
} from '../actions';
import {
  TRANSACTIONS_LOAD,
  TRANSACTIONS_LOAD_LOOP,
  LOAD_TRANSACTIONS_SUCCESS,
  WITHDRAW_MODAL_OPEN,
  WITHDRAW_MODAL_CLOSE,
  DEPOSIT_MODAL_OPEN,
  DEPOSIT_MODAL_CLOSE,
  COIN_TRANSACTIONS_LOAD
} from '../constants';

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

describe('containers/WalletPage/actions/loadTransactionsLoop', () => {
  it('should loadTransactionsLoop should create loadTransactionsLoop action', () => {
    expect(loadTransactionsLoop()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: TRANSACTIONS_LOAD_LOOP
    };

    expect(loadTransactionsLoop()).toEqual(expectedResult);
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
