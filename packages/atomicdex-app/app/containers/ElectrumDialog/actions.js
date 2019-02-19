// @flow
import {
  ELECTRUM_DIALOG_SHOW,
  ELECTRUM_DIALOG_HIDE,
  ELECTRUM_ADD
} from './constants';
import type { AddElectrumPayload } from '';

export function showElectrumDialog() {
  return {
    type: ELECTRUM_DIALOG_SHOW
  };
}

export function hideElectrumDialog() {
  return {
    type: ELECTRUM_DIALOG_HIDE
  };
}

export function addElectrum(payload: AddElectrumPayload) {
  return {
    type: ELECTRUM_ADD,
    payload
  };
}
