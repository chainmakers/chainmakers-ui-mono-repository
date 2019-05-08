// @flow
import {
  ELECTRUM_DIALOG_SHOW,
  ELECTRUM_DIALOG_HIDE,
  ELECTRUM_ADD,
  ELECTRUM_REMOVE
} from './constants';
import type { ElectrumPayload } from './schema';

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

export function addElectrum(payload: ElectrumPayload) {
  return {
    type: ELECTRUM_ADD,
    payload
  };
}

export function removeElectrum(payload: ElectrumPayload) {
  return {
    type: ELECTRUM_REMOVE,
    payload
  };
}
