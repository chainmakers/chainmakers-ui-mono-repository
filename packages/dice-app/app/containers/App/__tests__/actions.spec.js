import {
  login,
  logout,
  loadBalanceSuccess,
  loadCoinBalanceSuccess,
  loadBalance,
  startKMDiceChain,
  getInfoKMDiceChain,
  getInfoKMDiceChainSuccess,
  stopKMDiceChain
} from '../actions';
import {
  LOGIN,
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  KMDICE_CHAIN_START,
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
});

describe('containers/App/actions/loadCoinBalanceSuccess', () => {
  it('should logout should create loadCoinBalanceSuccess action', () => {
    const payload = {
      coin: 'KMD',
      address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
      balance: 3.5524436,
      utxo: [
        {
          tx_hash:
            '55591c94dc07fb2c58716216bb8c4de3ed604cf6b5fca09c70641b2535fc51cc',
          tx_pos: 1,
          height: 847460,
          value: 49963
        },
        {
          tx_hash:
            '76193ba88387d3c2fb60ae4bc4533f6c4da8cc3301147415741a2ca1094ceb51',
          tx_pos: 1,
          height: 876076,
          value: 2150564
        },
        {
          tx_hash:
            '1e6fb726d4a8643a03dc2d69b35ea9235af4308333b9a5f657b1a0b28da9dccf',
          tx_pos: 1,
          height: 877612,
          value: 1030601
        },
        {
          tx_hash:
            '78bb259267a6a48a22705b3ab6e27cb40ff92a149c102d53a43004545687d7f6',
          tx_pos: 1,
          height: 889625,
          value: 351390
        },
        {
          tx_hash:
            '9de0927a517b3a064748d89bba55325622aa99ed034eb5eb00a3f841ef40243d',
          tx_pos: 0,
          height: 925421,
          value: 3107496
        },
        {
          tx_hash:
            '9d39c0b94374ebb8a9d6c546692c10afdca386c18d8993305ff05508b29fe687',
          tx_pos: 1,
          height: 925428,
          value: 101992
        },
        {
          tx_hash:
            '211c8310831a7a73ffeaaae20e8543d0f772140df4dfc49d009214c822df0f54',
          tx_pos: 1,
          height: 925437,
          value: 115246
        },
        {
          tx_hash:
            '22a06182fe82d260b93d44b1050ee07a7d88766fa5ebf281e9e693952a7af824',
          tx_pos: 1,
          height: 929434,
          value: 300050
        },
        {
          tx_hash:
            '159258e303fe03fee8751aa6dbd239648186e31e902a1341ad806c4dfe1fccf3',
          tx_pos: 1,
          height: 929439,
          value: 322218961
        },
        {
          tx_hash:
            '7c886095c78a671d15e4cca972ac20f4be8c00d83ce9de3e6a147f7b24324a7f',
          tx_pos: 1,
          height: 960844,
          value: 245785
        },
        {
          tx_hash:
            'f8e0ff61d2406c92ed68491275852b61bd16640f9cc40dbc3eda7a527ed30e93',
          tx_pos: 1,
          height: 960850,
          value: 4062532
        },
        {
          tx_hash:
            '5f4cd2b1aef137dbd409e431f401ec7fc7c25020f76f38d87d83db53a1b3b1bf',
          tx_pos: 1,
          height: 1003705,
          value: 51544
        },
        {
          tx_hash:
            'b5a19a3f40d8292d8a3e4d5af3f7e95deb6a87ba66097941108f852d68378322',
          tx_pos: 1,
          height: 1010494,
          value: 223173
        },
        {
          tx_hash:
            'd709c0c9f5742d6e335b433df128097921fdf10f1ed37d49c6fc628232580bcc',
          tx_pos: 1,
          height: 1010499,
          value: 21235063
        }
      ],
      loading: false,
      error: false
    };
    expect(loadCoinBalanceSuccess(payload)).toMatchSnapshot();
  });
});

describe('containers/App/actions/loadBalance', () => {
  it('should loadBalance should create loadBalance action', () => {
    expect(loadBalance()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BALANCE
    };

    expect(loadBalance()).toEqual(expectedResult);
  });
});

describe('containers/App/actions/loadBalanceSuccess', () => {
  it('should loadBalanceSuccess should create loadBalanceSuccess action', () => {
    expect(loadBalanceSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BALANCE_SUCCESS
    };

    expect(loadBalanceSuccess()).toEqual(expectedResult);
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
      payload: {}
    };

    expect(startKMDiceChain()).toEqual(expectedResult);

    expectedResult.payload = {
      pubkey
    };

    expect(startKMDiceChain(pubkey)).toEqual(expectedResult);
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
