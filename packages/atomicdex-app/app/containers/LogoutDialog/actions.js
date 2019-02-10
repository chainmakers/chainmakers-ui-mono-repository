import { LOGOUT_DIALOG_SHOW, LOGOUT_DIALOG_HIDE } from './constants';

export function showLogoutDialog() {
  return {
    type: LOGOUT_DIALOG_SHOW
  };
}

export function hideLogoutDialog() {
  return {
    type: LOGOUT_DIALOG_HIDE
  };
}
