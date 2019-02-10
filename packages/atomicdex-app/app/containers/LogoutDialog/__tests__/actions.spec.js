import { showLogoutDialog, hideLogoutDialog } from '../actions';
import { LOGOUT_DIALOG_SHOW, LOGOUT_DIALOG_HIDE } from '../constants';

describe('containers/LogoutDialog/actions/showLogoutDialog', () => {
  it('should showLogoutDialog should create showLogoutDialog action', () => {
    expect(showLogoutDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOGOUT_DIALOG_SHOW
    };

    expect(showLogoutDialog()).toEqual(expectedResult);
  });
});

describe('containers/LogoutDialog/actions/hideLogoutDialog', () => {
  it('should hideLogoutDialog should create hideLogoutDialog action', () => {
    expect(hideLogoutDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOGOUT_DIALOG_HIDE
    };

    expect(hideLogoutDialog()).toEqual(expectedResult);
  });
});
