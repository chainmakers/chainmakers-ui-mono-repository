// @flow

import {
  SHOW_LOGIN_DIALOG,
  CANCEL_LOGIN_DIALOG,
  AGREE_LOGIN_DIALOG
} from './constants';

export function showLoginDialog() {
  return {
    type: SHOW_LOGIN_DIALOG
  };
}

export function cancelLoginDialog() {
  return {
    type: CANCEL_LOGIN_DIALOG
  };
}

export function agreeLoginDialog() {
  return {
    type: AGREE_LOGIN_DIALOG
  };
}
