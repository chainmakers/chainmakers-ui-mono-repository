// @flow
import {
  login,
  loginSuccess,
  logout,
  loadBalance,
  loadElectrums,
  addElectrum,
  addElectrumSuccess,
  addElectrumError,
  loadAllBalance,
  loadBalanceSuccess,
  loadBalanceError,
  loadDataFromDB,
  loadDataFromDBError,
  loadWithdrawBalanceSuccess
} from '../actions';
import {
  LOGIN,
  LOGIN_SUCCESS,
  ELECTRUM_LOAD,
  ELECTRUM_ADD,
  ELECTRUM_ADD_SUCCESS,
  ELECTRUM_ADD_ERROR,
  BALANCE_LOAD_ALL,
  BALANCE_LOAD,
  BALANCE_LOAD_SUCCESS,
  BALANCE_LOAD_ERROR,
  DATA_FROM_DB_LOAD,
  DATA_FROM_DB_LOAD_ERROR,
  LOAD_WITHDRAW_SUCCESS
} from '../constants';
import type { ErrorType } from '../../schema';
import type {
  LoginPayload,
  AddElectrumPayload,
  AddElectrumSuccessPayload,
  LoadBalanceSuccessPayload
} from '../schema';

describe('containers/App/actions/logout', () => {
  it('should logout should create logout action', () => {
    expect(logout()).toMatchSnapshot();
  });
});

// -- //

describe('containers/App/actions/loadElectrums', () => {
  it('should loadElectrums should create loadElectrums action', () => {
    expect(loadElectrums()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ELECTRUM_LOAD
    };

    expect(loadElectrums()).toEqual(expectedResult);
  });
});

describe('containers/App/actions/addElectrum', () => {
  const payload: AddElectrumPayload = {
    txversion: 4,
    urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024'],
    coin: 'BEER'
  };
  it('should addElectrum should create addElectrum action', () => {
    expect(addElectrum(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ELECTRUM_ADD,
      payload
    };

    expect(addElectrum(payload)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/addElectrumSuccess', () => {
  const payload: AddElectrumSuccessPayload = {
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    balance: 6502.66989074,
    coin: 'BEER',
    fee: 0.00001
  };

  it('should addElectrumSuccess should create addElectrumSuccess action', () => {
    expect(addElectrumSuccess(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ELECTRUM_ADD_SUCCESS,
      payload
    };

    expect(addElectrumSuccess(payload)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/addElectrumError', () => {
  const error: ErrorType = {
    context: {
      action: ELECTRUM_ADD,
      params: {
        active: 1,
        asset: 'PIZZA',
        coin: 'PIZZA',
        market_cap: -2,
        name: 'Pizza',
        rpcport: 11608,
        txversion: 4,
        urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024']
      }
    },
    type: 'RPC',
    message: "can't connect to electrum server"
  };

  it('should addElectrumError should create addElectrumError action', () => {
    expect(addElectrumError(error)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ELECTRUM_ADD_ERROR,
      error
    };

    expect(addElectrumError(error)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loadAllBalance', () => {
  it('should loadAllBalance should create loadAllBalance action', () => {
    expect(loadAllBalance()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: BALANCE_LOAD_ALL
    };

    expect(loadAllBalance()).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loadBalance', () => {
  const payload: LoadbalacePayload = {
    coin: 'KMD'
  };
  it('should loadBalance should create loadBalance action', () => {
    expect(loadBalance(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: BALANCE_LOAD,
      payload
    };

    expect(loadBalance(payload)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loadBalanceSuccess', () => {
  const payload: LoadBalanceSuccessPayload = {
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    balance: 6502.66989074,
    coin: 'BEER',
    fee: 0.00001
  };
  it('should loadBalanceSuccess should create loadBalanceSuccess action', () => {
    expect(loadBalanceSuccess(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: BALANCE_LOAD_SUCCESS,
      payload
    };

    expect(loadBalanceSuccess(payload)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loadBalanceError', () => {
  const error: ErrorType = {
    context: {
      action: BALANCE_LOAD,
      params: {
        coin: 'PIZZA'
      }
    },
    type: 'RPC',
    message: "can't connect to electrum server"
  };

  it('should loadBalanceError should create loadBalanceError action', () => {
    expect(loadBalanceError(error)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: BALANCE_LOAD_ERROR,
      error
    };

    expect(loadBalanceError(error)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/login', () => {
  const payload: LoginPayload = {
    passphrase: 'passphrase'
  };
  it('should login should create login action', () => {
    expect(login(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOGIN,
      payload
    };

    expect(login(payload)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loginSuccess', () => {
  it('should loginSuccess should create loginSuccess action', () => {
    expect(loginSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOGIN_SUCCESS
    };

    expect(loginSuccess()).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loadDataFromDB', () => {
  it('should loadDataFromDB should create loadDataFromDB action', () => {
    expect(loadDataFromDB()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: DATA_FROM_DB_LOAD
    };

    expect(loadDataFromDB()).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loadDataFromDBError', () => {
  it('should loadDataFromDBError should create loadDataFromDBError action', () => {
    expect(loadDataFromDBError()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: DATA_FROM_DB_LOAD_ERROR
    };

    expect(loadDataFromDBError()).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loadWithdrawBalanceSuccess', () => {
  const payload = {
    amount: 0.1,
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    coin: 'BEER'
  };

  it('should loadWithdrawBalanceSuccess should create loadWithdrawBalanceSuccess action', () => {
    expect(loadWithdrawBalanceSuccess(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_WITHDRAW_SUCCESS,
      payload
    };

    expect(loadWithdrawBalanceSuccess(payload)).toEqual(expectedResult);
  });
});
