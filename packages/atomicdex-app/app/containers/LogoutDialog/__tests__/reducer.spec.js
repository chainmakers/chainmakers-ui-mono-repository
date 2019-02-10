import logoutDialogReducer, { initialState } from '../reducer';
import { showLogoutDialog, hideLogoutDialog } from '../actions';

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

describe('containers/LogoutDialog/reducers/hideLogoutDialog', () => {
  it('should handle the hideLogoutDialog action correctly', () => {
    const expectedResult = initialState.set('show', false);

    expect(logoutDialogReducer(initialState, hideLogoutDialog())).toEqual(
      expectedResult
    );
  });
});
