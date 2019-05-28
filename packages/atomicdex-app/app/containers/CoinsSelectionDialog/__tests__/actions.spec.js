import {
  skipSearchStateCreation,
  searchSelectCoinModal,
  searchSelectCoinModalSuccess,
  setupSearchApiForSelectCoinModal,
  setupSearchApiForSelectCoinModalSuccess
} from '../actions';
import {
  SELECT_COIN_MODAL_SEARCH,
  SEARCH_STATE_SKIP_CREATION,
  SELECT_COIN_MODAL_SEARCH_SUCCESS,
  SELECT_COIN_MODAL_SETUP_SEARCH_API,
  SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS
} from '../constants';

describe('containers/CoinsSelectionDialog/actions/searchSelectCoinModal', () => {
  const input = 'Komodo';
  it('should searchSelectCoinModal should create searchSelectCoinModal action', () => {
    expect(searchSelectCoinModal(input)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SELECT_COIN_MODAL_SEARCH,
      payload: {
        input
      }
    };

    expect(searchSelectCoinModal(input)).toEqual(expectedResult);
  });
});

describe('containers/CoinsSelectionDialog/actions/searchSelectCoinModalSuccess', () => {
  const result = {
    id: 1,
    market_cap: -2,
    name: 'Pizza',
    symbol: 'PIZZA'
  };
  it('should searchSelectCoinModalSuccess should create searchSelectCoinModalSuccess action', () => {
    expect(searchSelectCoinModalSuccess([result])).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SELECT_COIN_MODAL_SEARCH_SUCCESS,
      payload: [result]
    };

    expect(searchSelectCoinModalSuccess([result])).toEqual(expectedResult);
  });
});

describe('containers/CoinsSelectionDialog/actions/skipSearchStateCreation', () => {
  it('should skipSearchStateCreation should create skipSearchStateCreation action', () => {
    expect(skipSearchStateCreation()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SEARCH_STATE_SKIP_CREATION
    };

    expect(skipSearchStateCreation()).toEqual(expectedResult);
  });
});

describe('containers/CoinsSelectionDialog/actions/setupSearchApiForSelectCoinModal', () => {
  it('should setupSearchApiForSelectCoinModal should create setupSearchApiForSelectCoinModal action', () => {
    expect(setupSearchApiForSelectCoinModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SELECT_COIN_MODAL_SETUP_SEARCH_API
    };

    expect(setupSearchApiForSelectCoinModal()).toEqual(expectedResult);
  });
});

describe('containers/CoinsSelectionDialog/actions/setupSearchApiForSelectCoinModalSuccess', () => {
  const payload = [
    {
      txfee: 20000,
      urls: ['electrum1.cipig.net:10000', 'electrum2.cipig.net:10000'],
      active: 1,
      rpcport: 8332,
      name: 'Bitcoin',
      wiftype: 128,
      market_cap: 97822306639,
      coin: 'BTC',
      p2shtype: 5,
      fname: 'Bitcoin',
      mm2: 1,
      marketcap: 0,
      pubtype: 0,
      symbol: 'BTC',
      id: 0
    }
  ];
  it('should setupSearchApiForSelectCoinModalSuccess should create setupSearchApiForSelectCoinModalSuccess action', () => {
    expect(setupSearchApiForSelectCoinModalSuccess(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS,
      payload
    };

    expect(setupSearchApiForSelectCoinModalSuccess(payload)).toEqual(
      expectedResult
    );
  });
});
