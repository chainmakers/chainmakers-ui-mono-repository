// @flow
import {
  APPLICATION_DIALOG_OPEN,
  APPLICATION_DIALOG_CLOSE,
  MM2_DIALOG_OPEN,
  MM2_DIALOG_CLOSE
} from './constants';

export function openApplicationDialog() {
  return {
    type: APPLICATION_DIALOG_OPEN
  };
}

export function closeApplicationDialog() {
  return {
    type: APPLICATION_DIALOG_CLOSE
  };
}

export function openMM2Dialog() {
  return {
    type: MM2_DIALOG_OPEN
  };
}

export function closeMM2Dialog() {
  return {
    type: MM2_DIALOG_CLOSE
  };
}
