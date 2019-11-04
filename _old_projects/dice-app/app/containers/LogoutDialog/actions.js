import {
  SHOW_LOGOUT_DIALOG,
  CANCEL_LOGOUT_DIALOG,
  AGREE_LOGOUT_DIALOG
} from './constants';

export function showLogoutDialog() {
  return {
    type: SHOW_LOGOUT_DIALOG
  };
}

export function cancelLogoutDialog() {
  return {
    type: CANCEL_LOGOUT_DIALOG
  };
}

export function agreeLogoutDialog() {
  return {
    type: AGREE_LOGOUT_DIALOG
  };
}
