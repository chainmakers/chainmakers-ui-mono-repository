// @flow

import {
  login,
  logout,
  startKMDiceChain,
  startKMDiceChainSuccess,
  getInfoKMDiceChain,
  getInfoKMDiceChainSuccess,
  stopKMDiceChain
} from '../actions';
import {
  LOGOUT,
  LOGIN,
  KMDICE_CHAIN_START,
  KMDICE_CHAIN_START_SUCCESS,
  KMDICE_CHAIN_GET_INFO,
  KMDICE_CHAIN_GET_INFO_SUCCESS,
  KMDICE_CHAIN_STOP
} from '../constants';

describe('containers/App/actions/login', () => {
  const passphrase = 'passphrase';
  it('should login should create login action', () => {
    expect(login(passphrase)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOGIN,
      payload: {
        passphrase
      }
    };

    expect(login(passphrase)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/logout', () => {
  it('should logout should create logout action', () => {
    expect(logout()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOGOUT
    };

    expect(logout()).toEqual(expectedResult);
  });
});

describe('containers/App/actions/startKMDiceChain', () => {
  const pubkey = 'pubkey';
  it('should startKMDiceChain should create startKMDiceChain action', () => {
    expect(startKMDiceChain()).toMatchSnapshot();
  });

  it('should startKMDiceChain should create startKMDiceChain action with pubkey', () => {
    expect(startKMDiceChain(pubkey)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_CHAIN_START,
      payload: {
        pubkey: null
      }
    };

    expect(startKMDiceChain()).toEqual(expectedResult);

    expectedResult.payload = {
      pubkey
    };

    expect(startKMDiceChain(pubkey)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/startKMDiceChainSuccess', () => {
  const pubkey = 'pubkey';
  it('should startKMDiceChainSuccess should create startKMDiceChainSuccess action', () => {
    expect(startKMDiceChainSuccess()).toMatchSnapshot();
  });

  it('should startKMDiceChainSuccess should create startKMDiceChainSuccess action with pubkey', () => {
    expect(startKMDiceChainSuccess(pubkey)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_CHAIN_START_SUCCESS,
      payload: {
        pubkey: null
      }
    };

    expect(startKMDiceChainSuccess()).toEqual(expectedResult);

    expectedResult.payload = {
      pubkey
    };

    expect(startKMDiceChainSuccess(pubkey)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/getInfoKMDiceChain', () => {
  it('should getInfoKMDiceChain should create getInfoKMDiceChain action', () => {
    expect(getInfoKMDiceChain()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_CHAIN_GET_INFO
    };

    expect(getInfoKMDiceChain()).toEqual(expectedResult);
  });
});

describe('containers/App/actions/getInfoKMDiceChainSuccess', () => {
  const payload = {
    blocks: 100,
    longestchain: 100
  };
  it('should getInfoKMDiceChainSuccess should create getInfoKMDiceChainSuccess action', () => {
    expect(getInfoKMDiceChainSuccess(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_CHAIN_GET_INFO_SUCCESS,
      payload
    };

    expect(getInfoKMDiceChainSuccess(payload)).toEqual(expectedResult);
  });
});

describe('containers/App/actions/stopKMDiceChain', () => {
  it('should stopKMDiceChain should create stopKMDiceChain action', () => {
    expect(stopKMDiceChain()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_CHAIN_STOP
    };

    expect(stopKMDiceChain()).toEqual(expectedResult);
  });
});
