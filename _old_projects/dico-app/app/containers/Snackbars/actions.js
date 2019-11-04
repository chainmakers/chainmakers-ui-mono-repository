// @flow

import { SNACKBARS_OPEN, SNACKBARS_CLOSE } from './constants';

export function openSnackbars(message: string) {
  return {
    type: SNACKBARS_OPEN,
    payload: {
      message
    }
  };
}

export function closeSnackbars() {
  return {
    type: SNACKBARS_CLOSE
  };
}
