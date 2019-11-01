// @flow
import { fromJS } from 'immutable';
import data from '../../__tests__/app-state.json';
import { selectLogoutState, makeSelectLogoutState } from '../selectors';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';

describe('containers/LogoutDialog/selectors/selectLogoutState', () => {
  it('should select the logout state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectLogoutState(mockedState)).toEqual(initialState);
  });
});

describe('containers/LogoutDialog/selectors/makeSelectLogoutState', () => {
  it('should select the logout state', () => {
    const mockedState = fromJS(data);
    const selectBetHistory = makeSelectLogoutState();
    expect(selectBetHistory(mockedState)).toEqual(fromJS(false));
  });
});
