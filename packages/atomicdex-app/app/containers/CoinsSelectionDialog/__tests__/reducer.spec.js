import { fromJS } from 'immutable';
import buyReducer, { initialState } from '../reducer';
import { SEARCH_STATE_READY, SEARCH_STATE_CREATE } from '../constants';
import {
  skipSearchStateCreation,
  searchSelectCoinModal,
  searchSelectCoinModalSuccess,
  setupSearchApiForSelectCoinModal,
  setupSearchApiForSelectCoinModalSuccess
} from '../actions';

describe('containers/CoinsSelectionDialog/reducers/skipSearchStateCreation', () => {
  it('should handle the skipSearchStateCreation action correctly', () => {
    const expectedResult = initialState.setIn(
      ['search', 'state'],
      SEARCH_STATE_READY
    );

    expect(buyReducer(initialState, skipSearchStateCreation())).toEqual(
      expectedResult
    );
  });
});

describe('containers/CoinsSelectionDialog/reducers/searchSelectCoinModal', () => {
  const input = 'Komodo';
  it('should handle the searchSelectCoinModal action correctly', () => {
    const expectedResult = initialState;

    expect(buyReducer(initialState, searchSelectCoinModal(input))).toEqual(
      expectedResult
    );
  });
});

describe('containers/CoinsSelectionDialog/reducers/searchSelectCoinModalSuccess', () => {
  const result = {
    id: 1,
    market_cap: -2,
    name: 'Pizza',
    symbol: 'PIZZA'
  };
  it('should handle the searchSelectCoinModalSuccess action correctly', () => {
    const expectedResult = initialState.setIn(
      ['search', 'list'],
      fromJS([result])
    );

    expect(
      buyReducer(initialState, searchSelectCoinModalSuccess([result]))
    ).toEqual(expectedResult);
  });
});

describe('containers/CoinsSelectionDialog/reducers/setupSearchApiForSelectCoinModal', () => {
  it('should handle the setupSearchApiForSelectCoinModal action correctly', () => {
    const expectedResult = initialState.setIn(
      ['search', 'state'],
      SEARCH_STATE_CREATE
    );

    expect(
      buyReducer(initialState, setupSearchApiForSelectCoinModal())
    ).toEqual(expectedResult);
  });
});

describe('containers/CoinsSelectionDialog/reducers/setupSearchApiForSelectCoinModalSuccess', () => {
  const result = {
    id: 1,
    market_cap: -2,
    name: 'Pizza',
    symbol: 'PIZZA'
  };
  it('should handle the setupSearchApiForSelectCoinModalSuccess action correctly', () => {
    const expectedResult = initialState
      .setIn(['search', 'state'], SEARCH_STATE_READY)
      .setIn(['search', 'list'], fromJS([result]));

    expect(
      buyReducer(
        initialState,
        setupSearchApiForSelectCoinModalSuccess([result])
      )
    ).toEqual(expectedResult);
  });
});
