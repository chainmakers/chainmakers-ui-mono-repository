// @flow

import {
  showLoginDialog,
  cancelLoginDialog,
  agreeLoginDialog
} from '../actions';
import {
  SHOW_LOGIN_DIALOG,
  CANCEL_LOGIN_DIALOG,
  AGREE_LOGIN_DIALOG
} from '../constants';

describe('containers/LoginDialog/actions/showLoginDialog', () => {
  it('should showLoginDialog should create showLoginDialog action', () => {
    expect(showLoginDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SHOW_LOGIN_DIALOG
    };

    expect(showLoginDialog()).toEqual(expectedResult);
  });
});

describe('containers/LoginDialog/actions/cancelLoginDialog', () => {
  it('should cancelLoginDialog should create cancelLoginDialog action', () => {
    expect(cancelLoginDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: CANCEL_LOGIN_DIALOG
    };

    expect(cancelLoginDialog()).toEqual(expectedResult);
  });
});

describe('containers/LoginDialog/actions/agreeLoginDialog', () => {
  it('should agreeLoginDialog should create agreeLoginDialog action', () => {
    expect(agreeLoginDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: AGREE_LOGIN_DIALOG
    };

    expect(agreeLoginDialog()).toEqual(expectedResult);
  });
});
