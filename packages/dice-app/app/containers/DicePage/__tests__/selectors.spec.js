// @flow
import { fromJS } from 'immutable';
import data from '../../__tests__/app-state.json';
import {
  selectDiceRootState,
  makeSelectBetHistory,
  makeSelectBetHistoryLoading,
  makeSelectBetHistoryEntities
} from '../selectors';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';

describe('containers/DicePage/selectors/selectDiceRootState', () => {
  it('should select the dice state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectDiceRootState(mockedState)).toEqual(initialState);
  });
});

describe('containers/DicePage/selectors/makeSelectBetHistory', () => {
  it('should select the bets history state', () => {
    const mockedState = fromJS(data);
    const selectBetHistory = makeSelectBetHistory();
    expect(selectBetHistory(mockedState)).toEqual(
      fromJS({
        entities: {},
        errors: {},
        lists: [],
        loading: false
      })
    );
  });
});

describe('containers/DicePage/selectors/makeSelectBetHistoryLoading', () => {
  it('should select the bets history loading state', () => {
    const mockedState = fromJS(data);
    const selectBetHistoryLoading = makeSelectBetHistoryLoading();
    expect(selectBetHistoryLoading(mockedState)).toEqual(false);
  });
});

describe('containers/DicePage/selectors/makeSelectBetHistoryEntities', () => {
  it('should select the bets history entities state', () => {
    const mockedState = fromJS(data);
    const selectBetHistoryEntities = makeSelectBetHistoryEntities();
    expect(selectBetHistoryEntities(mockedState)).toEqual(fromJS({}));
  });
});
