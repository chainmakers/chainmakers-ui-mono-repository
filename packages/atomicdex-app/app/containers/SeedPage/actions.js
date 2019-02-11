// @flow
import {
  GENERATE_PASSPHRASE,
  GENERATE_WIF,
  OPEN_WIF_EXPANSION,
  CLOSE_WIF_EXPANSION
} from './constants';
import type { GeneratePassphrasePayload } from './schema';

// eslint-disable-next-line import/prefer-default-export
export function generatePassphrase(payload: GeneratePassphrasePayload) {
  return {
    type: GENERATE_PASSPHRASE,
    payload
  };
}

export function generateWif(wif) {
  return {
    type: GENERATE_WIF,
    payload: {
      wif
    }
  };
}

export function openWifExpansion() {
  return {
    type: OPEN_WIF_EXPANSION
  };
}

export function closeWifExpansion() {
  return {
    type: CLOSE_WIF_EXPANSION
  };
}
