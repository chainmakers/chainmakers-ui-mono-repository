import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectCoinsSelectionDialog,
  makeSelectSearch,
  makeSelectSearchState,
  makeSelectSearchErrors,
  makeSelectSearchList
} from '../selectors';

describe('containers/DexPage/selectors/selectCoinsSelectionDialog', () => {
  it('should select the coinsSelectionDialog state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectCoinsSelectionDialog(mockedState)).toEqual(initialState);
  });
});

describe('containers/DexPage/selectors/makeSelectSearch', () => {
  it('should select the Search state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectSearch = makeSelectSearch();
    expect(selectSearch(mockedState)).toEqual(initialState.get('search'));

    const selectSearchState = makeSelectSearchState();
    expect(selectSearchState(mockedState)).toEqual(
      initialState.getIn(['search', 'state'])
    );

    const selectSearchErrors = makeSelectSearchErrors();
    expect(selectSearchErrors(mockedState)).toEqual(
      initialState.getIn(['search', 'errors'])
    );

    const selectSearchList = makeSelectSearchList();
    expect(selectSearchList(mockedState)).toEqual(
      initialState.getIn(['search', 'list'])
    );
  });
});
