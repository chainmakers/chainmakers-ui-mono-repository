// @flow
import { fromJS } from 'immutable';
import { LOADING, LOADED, FAILED, ENABLE, DISABLE } from '../../../constants';
import appReducer, { initialState } from '../reducer';
import {
  logout,
  addElectrum,
  addElectrumSuccess,
  addElectrumError,
  loadBalance
} from '../actions';
import { ELECTRUM_ADD } from '../constants';
import type { ErrorType } from '../../schema';
import type {
  AddElectrumPayload,
  AddElectrumSuccessPayload,
  LoadbalacePayload
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

describe('containers/App/reducers/addElectrum', () => {
  const payload: AddElectrumPayload = {
    txversion: 4,
    urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024'],
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
            symbol: 'BTC',
            status: ENABLE,
            marketcap: 97822306639
          },
          {
            symbol: 'KMD',
            status: ENABLE,
            marketcap: 107340275
          },
          {
            symbol: 'BEER',
            status: DISABLE,
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
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: 'BTC',
            status: ENABLE,
            marketcap: 97822306639
          },
          {
            symbol: 'KMD',
            status: ENABLE,
            marketcap: 107340275
          }
        ])
      );

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
        urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024']
      }
    },
    type: 'RPC',
    message: "can't connect to electrum server"
  };
  it('should handle the addElectrumError action correctly', () => {
    const state = initialState
      .setIn(['balance', 'fetchStatus', 'PIZZA'], FAILED)
      .setIn(['balance', 'errors', 'PIZZA'], fromJS(error))
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: 'BTC',
            status: ENABLE,
            marketcap: 97822306639
          },
          {
            symbol: 'KMD',
            status: ENABLE,
            marketcap: 107340275
          }
        ])
      );

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
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: 'BTC',
            status: ENABLE,
            marketcap: 97822306639.0
          },
          {
            symbol: 'KMD',
            status: ENABLE,
            marketcap: 107340275.0
          }
        ])
      );

    expect(appReducer(initialState, loadBalance(payload))).toEqual(state);
  });

  it('should ignore update the updating entities', () => {
    state = initialState
      .setIn(['balance', 'fetchStatus', payload.coin], LOADING)
      .setIn(['balance', 'errors', payload.coin], null)
      .setIn(
        ['balance', 'list'],
        fromJS([
          {
            symbol: 'BTC',
            status: ENABLE,
            marketcap: 97822306639.0
          },
          {
            symbol: 'KMD',
            status: ENABLE,
            marketcap: 107340275.0
          }
        ])
      );

    expect(appReducer(state, loadBalance(payload))).toEqual(state);
  });
});

// -- //
