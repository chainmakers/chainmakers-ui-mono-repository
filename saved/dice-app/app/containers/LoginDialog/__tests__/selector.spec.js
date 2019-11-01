// @flow
import { fromJS } from 'immutable';
import data from '../../__tests__/app-state.json';
import { selectLoginState, makeSelectLoginState } from '../selectors';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';

describe('containers/LoginDialog/selectors/selectLoginState', () => {
  it('should select the login state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectLoginState(mockedState)).toEqual(initialState);
  });
});

describe('containers/LoginDialog/selectors/makeSelectLoginState', () => {
  it('should select the login state', () => {
    const mockedState = fromJS(data);
    const selectBetHistory = makeSelectLoginState();
    expect(selectBetHistory(mockedState)).toEqual(fromJS(false));
  });
});
