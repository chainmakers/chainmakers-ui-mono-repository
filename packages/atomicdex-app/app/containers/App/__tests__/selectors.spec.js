// @flow
import { fromJS } from 'immutable';
import {
  FAILED,
  DISABLE,
  INITIALIZATION,
  STATE_STARTED,
  STATE_RUNNING,
  STATE_TERMINATED
} from '../../../constants';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectGlobal,
  makeSelectLocation,
  makeSelectBalanceLoading,
  makeSelectBalanceFetchStatus,
  makeSelectBalanceList,
  makeSelectBalanceEntities,
  makeSelectBalanceErrors,
  makeSelectBalanceAvailable,
  makeSelectLoading,
  makeSelectError
} from '../selectors';
import data from '../../__tests__/app-state.json';
import type { ErrorType } from '../../schema';

describe('containers/App/selectors/selectGlobal', () => {
  it('should select the global state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectGlobal(mockedState)).toEqual(initialState);
  });
});

describe('containers/App/selectors/makeSelectLocation', () => {
  it('should select the location state', () => {
    const mockedState = fromJS(data);
    const selectLocation = makeSelectLocation();
    expect(selectLocation(mockedState)).toEqual({
      hash: '',
      pathname: '/buy',
      search: ''
    });
  });
});

// -- //

describe('containers/App/selectors/makeSelectBalanceLoading', () => {
  it('should select the balance loading state', () => {
    let mockedState = fromJS(data);
    const selectBalanceLoading = makeSelectBalanceLoading();
    expect(selectBalanceLoading(mockedState)).toEqual(true);
    mockedState = mockedState.setIn(
      [APP_STATE_NAME, 'balance', 'fetchStatus', 'QTUM'],
      FAILED
    );
    expect(selectBalanceLoading(mockedState)).toEqual(false);
  });
});

describe('containers/App/selectors/makeSelectBalanceFetchStatus', () => {
  it('should select the balance fetch status state', () => {
    const mockedState = fromJS(data);
    const selectBalanceFetchStatus = makeSelectBalanceFetchStatus();
    expect(selectBalanceFetchStatus(mockedState)).toEqual(
      fromJS({
        EQL: 'LOADED',
        CHAIN: 'LOADED',
        KMD: 'LOADED',
        BCH: 'LOADED',
        CHIPS: 'LOADED',
        PIZZA: 'LOADED',
        KMDICE: 'LOADED',
        VRSC: 'LOADED',
        BEER: 'LOADED',
        BTC: 'LOADED',
        ZEC: 'LOADED',
        COQUI: 'LOADED',
        LTC: 'FAILED',
        QTUM: 'LOADING'
      })
    );
  });
});

describe('containers/App/selectors/makeSelectBalanceList', () => {
  it('should select the balance list state', () => {
    const mockedState = fromJS(data);
    const selectBalanceList = makeSelectBalanceList();
    expect(selectBalanceList(mockedState)).toEqual(
      fromJS([
        { symbol: 'BTC', status: 'ENABLE', marketcap: 97822306639 },
        { symbol: 'BCH', status: INITIALIZATION, marketcap: 2197468013 },
        { symbol: 'ZEC', status: 'ENABLE', marketcap: 289458275 },
        { symbol: 'KMD', status: 'ENABLE', marketcap: 107340275 },
        { symbol: 'CHIPS', status: 'ENABLE', marketcap: 1609044 },
        { symbol: 'VRSC', status: 'ENABLE', marketcap: 1609044 },
        { symbol: 'EQL', status: 'ENABLE', marketcap: 0 },
        { symbol: 'COQUI', status: 'ENABLE', marketcap: 0 },
        { symbol: 'KMDICE', status: 'ENABLE', marketcap: 0 },
        { symbol: 'CHAIN', status: 'ENABLE', marketcap: 0 },
        { symbol: 'BEER', status: 'ENABLE', marketcap: 0 },
        { symbol: 'PIZZA', status: 'ENABLE', marketcap: 0 }
      ])
    );
  });
});

describe('containers/App/selectors/makeSelectBalanceEntities', () => {
  it('should select the balance entities state', () => {
    const mockedState = fromJS(data);
    const selectBalanceEntities = makeSelectBalanceEntities();
    expect(selectBalanceEntities(mockedState)).toEqual(
      fromJS({
        EQL: {
          coin: 'EQL',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 2.11114249,
          fee: 0.00001
        },
        CHAIN: {
          coin: 'CHAIN',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 0,
          fee: 0.00001
        },
        KMD: {
          coin: 'KMD',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 0.5046568,
          fee: 0.00001
        },
        BCH: {
          coin: 'BCH',
          address: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
          balance: 0,
          fee: 0.00001
        },
        CHIPS: {
          coin: 'CHIPS',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 8.48405383,
          fee: 0.0001
        },
        PIZZA: {
          coin: 'PIZZA',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 10.4758253,
          fee: 0.00001
        },
        KMDICE: {
          coin: 'KMDICE',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 0,
          fee: 0.00001
        },
        VRSC: {
          coin: 'VRSC',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 0,
          fee: 0.00001
        },
        BEER: {
          coin: 'BEER',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 6502.66989074,
          fee: 0.00001
        },
        BTC: {
          coin: 'BTC',
          address: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
          balance: 0,
          fee: 0.0002
        },
        ZEC: {
          coin: 'ZEC',
          address: 't1a5i7dgvjJdVKgHLdGYP8wgE1FF6ShTR2G',
          balance: 0,
          fee: 0.0001
        },
        COQUI: {
          coin: 'COQUI',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 777.45382428,
          fee: 0.00001
        },
        LTC: { coin: 'LTC', address: '', balance: 0, fee: 0 },
        QTUM: {
          coin: 'QTUM',
          address: 'Qcp6DbZVwSiiABKU7B3k8QMwFqzir5gWz5',
          balance: 0,
          fee: 0.004
        }
      })
    );
  });
});

describe('containers/App/selectors/makeSelectBalanceErrors', () => {
  it('should select the balance errors state', () => {
    const mockedState = fromJS(data);
    const selectBalanceErrors = makeSelectBalanceErrors();
    expect(selectBalanceErrors(mockedState)).toEqual(
      fromJS({
        EQL: null,
        CHAIN: null,
        KMD: null,
        BCH: null,
        CHIPS: null,
        PIZZA: null,
        KMDICE: null,
        VRSC: null,
        BEER: null,
        BTC: null,
        ZEC: null,
        COQUI: null,
        LTC: {
          context: {
            action: 'atomicapp/App/ELECTRUM_ADD',
            params: {
              txfee: 100000,
              servers: [
                { url: 'electrum1.cipig.net:10065' },
                { url: 'electrum2.cipig.net:10065' }
              ],
              active: 1,
              rpcport: 9332,
              name: 'Litecoin',
              wiftype: 176,
              market_cap: 2578993869,
              asset: 'LTC',
              coin: 'LTC',
              p2shtype: 5,
              txversion: 4,
              pubtype: 48
            }
          },
          type: 'RPC',
          message: 'Request failed with status code 500'
        },
        QTUM: null
      })
    );
  });
});

describe('containers/App/selectors/makeSelectBalanceAvailable', () => {
  it('should select the balance state', () => {
    let mockedState = fromJS(data);
    const selectBalanceAvailable = makeSelectBalanceAvailable();
    expect(selectBalanceAvailable(mockedState)).toEqual(
      fromJS([
        {
          coin: 'KMD',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 0.5046568,
          fee: 0.00001
        },
        {
          coin: 'CHIPS',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 8.48405383,
          fee: 0.0001
        },
        {
          coin: 'EQL',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 2.11114249,
          fee: 0.00001
        },
        {
          coin: 'COQUI',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 777.45382428,
          fee: 0.00001
        },
        {
          coin: 'BEER',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 6502.66989074,
          fee: 0.00001
        },
        {
          coin: 'PIZZA',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 10.4758253,
          fee: 0.00001
        }
      ])
    );

    let list = mockedState.getIn(['global', 'balance', 'list']);
    list = list
      .update(list.findIndex(item => item.get('symbol') === 'BEER'), item =>
        item.set('status', DISABLE)
      )
      .update(list.findIndex(item => item.get('symbol') === 'PIZZA'), item =>
        item.set('status', DISABLE)
      );
    mockedState = mockedState.setIn(['global', 'balance', 'list'], list);

    expect(selectBalanceAvailable(mockedState)).toEqual(
      fromJS([
        {
          coin: 'KMD',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 0.5046568,
          fee: 0.00001
        },
        {
          coin: 'CHIPS',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 8.48405383,
          fee: 0.0001
        },
        {
          coin: 'EQL',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 2.11114249,
          fee: 0.00001
        },
        {
          coin: 'COQUI',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 777.45382428,
          fee: 0.00001
        }
      ])
    );
  });
});

describe('containers/App/selectors/makeSelectLoading', () => {
  it('should select the marketmaker loading state', () => {
    let mockedState = fromJS(data);
    const selectLoading = makeSelectLoading();
    expect(selectLoading(mockedState)).toEqual(false);
    mockedState = mockedState.setIn(
      [APP_STATE_NAME, 'marketmaker', 'state'],
      STATE_STARTED
    );
    expect(selectLoading(mockedState)).toEqual(true);
    mockedState = mockedState.setIn(
      [APP_STATE_NAME, 'marketmaker', 'state'],
      STATE_RUNNING
    );
    expect(selectLoading(mockedState)).toEqual(false);
    mockedState = mockedState.setIn(
      [APP_STATE_NAME, 'marketmaker', 'state'],
      STATE_TERMINATED
    );
    expect(selectLoading(mockedState)).toEqual(false);
  });
});

describe('containers/App/selectors/makeSelectError', () => {
  const error: ErrorType = {
    context: {
      action: 'ELECTRUM_ADD',
      params: {
        active: 1
      }
    },
    type: 'RPC',
    message: "can't connect to electrum server"
  };
  it('should select the marketmaker error state', () => {
    let mockedState = fromJS(data);
    const selectError = makeSelectError();
    expect(selectError(mockedState)).toEqual(null);
    mockedState = mockedState.setIn(
      [APP_STATE_NAME, 'marketmaker', 'errors'],
      error
    );
    expect(selectError(mockedState)).toEqual(error);
  });
});
