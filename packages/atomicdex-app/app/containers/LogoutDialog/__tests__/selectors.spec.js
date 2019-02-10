// @flow
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import { selectLogoutState, makeSelectLogoutState } from '../selectors';
import data from '../../__tests__/app-state.json';

describe('containers/LogoutDialog/selectors/selectLogoutState', () => {
  it('should select the logoutDialog state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectLogoutState(mockedState)).toEqual(initialState);
  });
});

describe('containers/LogoutDialog/selectors/makeSelectLogoutState', () => {
  it('should select the logoutDialog state', () => {
    const mockedState = fromJS(data);
    const select = makeSelectLogoutState();
    expect(select(mockedState)).toEqual(false);
  });
});
