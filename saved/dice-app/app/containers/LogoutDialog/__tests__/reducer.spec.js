import logoutDialogReducer, { initialState } from '../reducer';
import {
  showLogoutDialog,
  cancelLogoutDialog,
  agreeLogoutDialog
} from '../actions';

describe('containers/LogoutDialog/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(logoutDialogReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/LogoutDialog/reducers/showLogoutDialog', () => {
  it('should handle the showLogoutDialog action correctly', () => {
    const expectedResult = initialState.set('show', true);

    expect(logoutDialogReducer(initialState, showLogoutDialog())).toEqual(
      expectedResult
    );
  });
});

describe('containers/LogoutDialog/reducers/cancelLogoutDialog', () => {
  it('should handle the cancelLogoutDialog action correctly', () => {
    const expectedResult = initialState.set('show', false);

    expect(logoutDialogReducer(initialState, cancelLogoutDialog())).toEqual(
      expectedResult
    );
  });
});

describe('containers/LogoutDialog/reducers/agreeLogoutDialog', () => {
  it('should handle the agreeLogoutDialog action correctly', () => {
    const expectedResult = initialState.set('show', false);

    expect(logoutDialogReducer(initialState, agreeLogoutDialog())).toEqual(
      expectedResult
    );
  });
});
