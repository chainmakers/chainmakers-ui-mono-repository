// @flow
import { fromJS } from 'immutable';
import {
  LOADING,
  LOADED,
  FAILED,
  DISABLE,
  ENABLE,
  INITIALIZATION,
  STATE_STARTED,
  STATE_RUNNING,
  STATE_TERMINATED
} from '../../../constants';
import appReducer, { initialState } from '../reducer';
import {
  logout,
  login,
  loginSuccess,
  loginError,
  addElectrum,
  addElectrumSuccess,
  addElectrumError,
  loadBalance,
  loadDataFromDBError,
  loadDataFromDBSuccess,
  removeElectrum,
  loadWithdrawBalanceSuccess
} from '../actions';
import { ELECTRUM_ADD, LOGIN } from '../constants';
import type { ErrorType } from '../../schema';
import type {
  AddElectrumPayload,
  AddElectrumSuccessPayload,
  LoadbalacePayload,
  LoginPayload
} from '../schema';

describe('containers/App/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/App/reducers/logout', () => {
  it('should handle the logout action correctly', () => {
    const state = initialState
      .setIn(['balance', 'loading'], true)
      .setIn(['balance', 'error'], false);

    expect(appReducer(state, logout())).toEqual(initialState);
  });
});

describe('containers/App/reducers/login', () => {
  const payload: LoginPayload = {
    passphrase: 'passphrase'
  };
  it('should handle the login action correctly', () => {
    const state = initialState
      .setIn(['marketmaker', 'errors'], null)
      .setIn(['marketmaker', 'state'], STATE_STARTED);

    expect(appReducer(initialState, login(payload))).toEqual(state);
  });
});

describe('containers/App/reducers/loginSuccess', () => {
  it('should handle the loginSuccess action correctly', () => {
    const state = initialState
      .setIn(['marketmaker', 'errors'], null)
      .setIn(['marketmaker', 'state'], STATE_RUNNING);

    expect(appReducer(initialState, loginSuccess())).toEqual(state);
  });
});

describe('containers/App/reducers/loginError', () => {
  const error: ErrorType = {
    context: {
      action: LOGIN,
      params: {
        passphrase: 'passphrase'
      }
    },
    type: 'RPC',
    message: "can't start marketmaker app"
  };
  it('should handle the loginError action correctly', () => {
    const state = initialState
      .setIn(['marketmaker', 'errors'], error)
      .setIn(['marketmaker', 'state'], STATE_TERMINATED);

    expect(appReducer(initialState, loginError(error))).toEqual(state);
  });
});

describe('containers/App/reducers/addElectrum', () => {
  const payload: AddElectrumPayload = {
    txversion: 4,
    servers: [
      {
        url: 'electrum1.cipig.net:10024'
      },
      {
        url: 'electrum2.cipig.net:10024'
      }
    ],
    coin: 'BEER'
  };
  let state;
  it('should handle the addElectrum action correctly', () => {
    state = initialState
      .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
      .setIn(['balance', 'errors', payload.coin], null)
      .setIn(
        ['balance', 'entities', payload.coin],
        fromJS({
          coin: payload.coin,
          address: '',
          balance: 0,
          fee: 0
        })
      )
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: 'BEER',
            status: INITIALIZATION,
            marketcap: 0
          }
        ])
      );

    expect(appReducer(initialState, addElectrum(payload))).toEqual(state);
  });

  it('should ignore update the updating entities', () => {
    state = initialState
      .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
      .setIn(['balance', 'errors', payload.coin], null)
      .setIn(
        ['balance', 'entities', payload.coin],
        fromJS({
          coin: payload.coin,
          address: 'address',
          balance: 12,
          fee: 0
        })
      )
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: 'BEER',
            marketcap: 0
          }
        ])
      );

    expect(appReducer(state, addElectrum(payload))).toEqual(state);
  });
});

describe('containers/App/reducers/addElectrumSuccess', () => {
  const payload: AddElectrumSuccessPayload = {
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    balance: 6502.66989074,
    coin: 'BEER',
    fee: 0.00001
  };
  it('should handle the addElectrumSuccess action correctly', () => {
    const state = initialState
      .setIn(['balance', 'fetchStatus', payload.coin], LOADED)
      .setIn(['balance', 'errors', payload.coin], null)
      .setIn(['balance', 'entities', payload.coin], fromJS(payload))
      .setIn(['balance', 'list'], fromJS([]));

    expect(appReducer(initialState, addElectrumSuccess(payload))).toEqual(
      state
    );
  });
});

describe('containers/App/reducers/addElectrumError', () => {
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
        servers: [
          {
            url: 'electrum1.cipig.net:10024'
          },
          {
            url: 'electrum2.cipig.net:10024'
          }
        ]
      }
    },
    type: 'RPC',
    message: "can't connect to electrum server"
  };
  it('should handle the addElectrumError action correctly', () => {
    const state = initialState
      .setIn(['balance', 'fetchStatus', 'PIZZA'], FAILED)
      .setIn(['balance', 'errors', 'PIZZA'], fromJS(error))
      .setIn(['balance', 'list'], fromJS([]));

    expect(appReducer(initialState, addElectrumError(error))).toEqual(state);
  });
});

describe('containers/App/reducers/loadBalance', () => {
  const payload: LoadbalacePayload = {
    coin: 'BEER'
  };
  let state;
  it('should handle the loadBalance action correctly', () => {
    state = initialState
      .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
      .setIn(['balance', 'errors', payload.coin], null)
      .setIn(['balance', 'list'], fromJS([]));

    expect(appReducer(initialState, loadBalance(payload))).toEqual(state);
  });

  it('should ignore update the updating entities', () => {
    state = initialState
      .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
      .setIn(['balance', 'errors', payload.coin], null)
      .setIn(['balance', 'list'], fromJS([]));

    expect(appReducer(state, loadBalance(payload))).toEqual(state);
  });
});

describe('containers/App/reducers/loadDataFromDBError', () => {
  it('should handle the loadDataFromDBError action correctly', () => {
    const state = initialState.set('loadedDataFromDB', true);

    expect(appReducer(initialState, loadDataFromDBError())).toEqual(state);
  });
});

describe('containers/App/reducers/loadDataFromDBSuccess', () => {
  const coin = 'PIZZA';
  it('should handle the loadDataFromDBSuccess action correctly', () => {
    const state = initialState
      .set('loadedDataFromDB', true)
      .setIn(
        ['balance', 'entities', coin],
        fromJS({
          coin,
          address: '',
          balance: 0,
          fee: 0
        })
      )
      .updateIn(['balance', 'list'], arr =>
        arr.push(fromJS({ symbol: coin, status: INITIALIZATION, marketcap: 0 }))
      );
    expect(
      appReducer(initialState, loadDataFromDBSuccess(['BTC', 'KMD', coin]))
    ).toEqual(state);
  });
});

describe('containers/App/reducers/removeElectrum', () => {
  const coin = 'BEER';
  let state;
  it('should handle the removeElectrum action correctly', () => {
    state = initialState
      .setIn(['balance', 'fetchStatus', coin], LOADED)
      .setIn(['balance', 'errors', coin], null)
      .setIn(
        ['balance', 'entities', coin],
        fromJS({
          coin,
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 6433.39037744,
          fee: 0.00001
        })
      )
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: coin,
            status: ENABLE,
            marketcap: 0
          }
        ])
      );

    const expectedResult = initialState
      .setIn(
        ['balance', 'entities', coin],
        fromJS({
          coin,
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 6433.39037744,
          fee: 0.00001
        })
      )
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: coin,
            status: DISABLE,
            marketcap: 0
          }
        ])
      );

    expect(appReducer(state, removeElectrum(coin))).toEqual(expectedResult);
  });
});

describe('containers/App/reducers/loadWithdrawBalanceSuccess', () => {
  const coin = 'BEER';
  const amount = 3.39037744;
  const address = 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu';
  const payload = {
    coin,
    address,
    amount
  };
  let state;
  it('should handle the loadWithdrawBalanceSuccess action correctly', () => {
    state = initialState
      .setIn(['balance', 'fetchStatus', coin], LOADED)
      .setIn(['balance', 'errors', coin], null)
      .setIn(
        ['balance', 'entities', coin],
        fromJS({
          coin,
          address,
          balance: 6433.39037744,
          fee: 0.00001
        })
      )
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: coin,
            status: ENABLE,
            marketcap: 0
          }
        ])
      );

    const expectedResult = initialState
      .setIn(['balance', 'fetchStatus', coin], LOADED)
      .setIn(['balance', 'errors', coin], null)
      .setIn(
        ['balance', 'entities', coin],
        fromJS({
          coin,
          address,
          balance: 6430,
          fee: 0.00001
        })
      )
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: coin,
            status: ENABLE,
            marketcap: 0
          }
        ])
      );

    expect(appReducer(state, loadWithdrawBalanceSuccess(payload))).toEqual(
      expectedResult
    );
  });
});

// -- //
