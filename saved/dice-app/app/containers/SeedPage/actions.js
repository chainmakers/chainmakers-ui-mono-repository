import {
  GENERATE_PASSPHRASE,
  GENERATE_WIF,
  OPEN_WIF_EXPANSION,
  CLOSE_WIF_EXPANSION
} from './constants';

// eslint-disable-next-line import/prefer-default-export
export function generatePassphrase(passphrase) {
  return {
    type: GENERATE_PASSPHRASE,
    payload: {
      passphrase
    }
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
