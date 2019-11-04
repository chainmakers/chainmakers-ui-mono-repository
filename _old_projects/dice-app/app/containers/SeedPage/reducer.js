import { fromJS } from 'immutable';

import {
  GENERATE_PASSPHRASE,
  GENERATE_WIF,
  OPEN_WIF_EXPANSION,
  CLOSE_WIF_EXPANSION
} from './constants';

// The initial state of the App
const initialState = fromJS({
  passphrase: '',
  wif: '',
  wifExpansion: false
});

function walletReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GENERATE_PASSPHRASE:
      return state.set('passphrase', payload.passphrase);
    case GENERATE_WIF:
      return state.set('wif', payload.wif);
    case OPEN_WIF_EXPANSION:
      return state.set('wifExpansion', true);
    case CLOSE_WIF_EXPANSION:
      return state.set('wifExpansion', false);
    default:
      return state;
  }
}

export default walletReducer;
