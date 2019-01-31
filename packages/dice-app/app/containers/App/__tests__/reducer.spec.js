// @flow

import appReducer, { initialState } from '../reducer';
import {
  getInfoKMDiceChainSuccess,
  startKMDiceChain,
  startKMDiceChainSuccess,
  logout
} from '../actions';
import { KOMODOD_STATE_RUNNING } from '../constants';

describe('containers/App/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/App/reducers/logout', () => {
  it('should handle the logout action correctly', () => {
    const state = initialState
      .setIn(['blockchainInfo', 'blocks'], 123)
      .setIn(['blockchainInfo', 'longestchain'], 123)
      .setIn(['blockchainInfo', 'balance'], 10.123);

    expect(appReducer(state, logout())).toEqual(initialState);
  });
});

describe('containers/App/reducers/getInfoKMDiceChainSuccess', () => {
  it('should handle the getInfoKMDiceChainSuccess action correctly', () => {
    const expectedResult = initialState
      .setIn(['blockchainInfo', 'blocks'], 123)
      .setIn(['blockchainInfo', 'longestchain'], 123)
      .setIn(['blockchainInfo', 'balance'], 10.123);

    expect(
      appReducer(
        initialState,
        getInfoKMDiceChainSuccess({
          blocks: 123,
          longestchain: 123,
          balance: 10.123
        })
      )
    ).toEqual(expectedResult);
  });
});

describe('containers/App/reducers/startKMDiceChain', () => {
  it('should handle the startKMDiceChain action correctly', () => {
    const state = initialState
      .setIn(['komodod', 'state'], KOMODOD_STATE_RUNNING)
      .setIn(['komodod', 'pubkey'], 'pubkey');

    expect(appReducer(state, startKMDiceChain())).toEqual(initialState);
  });
});

describe('containers/App/reducers/startKMDiceChainSuccess', () => {
  const pubkey = 'pubkey';
  it('should handle the startKMDiceChainSuccess action correctly', () => {
    const state = initialState
      .setIn(['komodod', 'state'], KOMODOD_STATE_RUNNING)
      .setIn(['komodod', 'pubkey'], pubkey);

    expect(appReducer(initialState, startKMDiceChainSuccess(pubkey))).toEqual(
      state
    );
  });
});
