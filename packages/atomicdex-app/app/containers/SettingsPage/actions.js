// @flow
import {
  APPLICATION_DIALOG_OPEN,
  APPLICATION_DIALOG_CLOSE,
  MM2_DIALOG_OPEN,
  MM2_DIALOG_CLOSE,
  TAB_SWITCH,
  MM2_SET
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

export function switchTab(tab: number = 0) {
  return {
    type: TAB_SWITCH,
    payload: {
      tab
    }
  };
}

export function setMM2Version(version: string = 'N/A') {
  return {
    type: MM2_SET,
    payload: {
      version
    }
  };
}
