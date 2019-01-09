import {
  showLogoutDialog,
  cancelLogoutDialog,
  agreeLogoutDialog
} from '../actions';
import {
  SHOW_LOGOUT_DIALOG,
  CANCEL_LOGOUT_DIALOG,
  AGREE_LOGOUT_DIALOG
} from '../constants';

describe('containers/LogoutDialog/actions/showLogoutDialog', () => {
  it('should showLogoutDialog should create showLogoutDialog action', () => {
    expect(showLogoutDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SHOW_LOGOUT_DIALOG
    };

    expect(showLogoutDialog()).toEqual(expectedResult);
  });
});

describe('containers/LogoutDialog/actions/cancelLogoutDialog', () => {
  it('should cancelLogoutDialog should create cancelLogoutDialog action', () => {
    expect(cancelLogoutDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: CANCEL_LOGOUT_DIALOG
    };

    expect(cancelLogoutDialog()).toEqual(expectedResult);
  });
});

describe('containers/LogoutDialog/actions/agreeLogoutDialog', () => {
  it('should agreeLogoutDialog should create agreeLogoutDialog action', () => {
    expect(agreeLogoutDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: AGREE_LOGOUT_DIALOG
    };

    expect(agreeLogoutDialog()).toEqual(expectedResult);
  });
});
