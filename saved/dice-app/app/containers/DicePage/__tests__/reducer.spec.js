// @flow
import diceReducer, { initialState } from '../reducer';
import { logout } from '../../App/actions';
import {
  startKmdiceBetting,
  startKmdiceBettingError,
  startKmdiceBettingSuccess
} from '../actions';

describe('containers/DicePage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(diceReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/DicePage/reducers/logout', () => {
  it('should handle the logout action correctly', () => {
    const state = initialState
      .setIn(['blockchainInfo', 'blocks'], 123)
      .setIn(['blockchainInfo', 'longestchain'], 123)
      .setIn(['blockchainInfo', 'balance'], 10.123);

    expect(diceReducer(state, logout())).toEqual(initialState);
  });
});

describe('containers/App/reducers/startKmdiceBetting', () => {
  const startKmdiceBettingPayload = {
    numberToBet: 23,
    amount: 0.1
  };
  it('should handle the startKmdiceBetting action correctly', () => {
    const state = initialState.setIn(['betHistory', 'loading'], true);

    expect(
      diceReducer(initialState, startKmdiceBetting(startKmdiceBettingPayload))
    ).toEqual(state);
  });
});

describe('containers/App/reducers/startKmdiceBettingError', () => {
  const errorRPCType = {
    context: {
      action: 'rpc:call',
      params: []
    },
    type: 'komodod',
    message: 'no message',
    ok: 'failed'
  };
  it('should handle the startKmdiceBettingError action correctly', () => {
    const state = initialState.setIn(['betHistory', 'loading'], true);

    expect(diceReducer(state, startKmdiceBettingError(errorRPCType))).toEqual(
      initialState
    );
  });
});

describe('containers/App/reducers/startKmdiceBettingSuccess', () => {
  const startKmdiceBettingSuccessPayload = {
    bettxid: 'bettxid',
    id: 1,
    status: 'PENDING'
  };
  it('should handle the startKmdiceBettingSuccess action correctly', () => {
    const state = initialState.setIn(['betHistory', 'loading'], true);

    expect(
      diceReducer(
        state,
        startKmdiceBettingSuccess(startKmdiceBettingSuccessPayload)
      )
    ).toEqual(initialState);
  });
});
