// @flow
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  GENERATE_PASSPHRASE,
  GENERATE_WIF,
  OPEN_WIF_EXPANSION,
  CLOSE_WIF_EXPANSION
} from './constants';

export const initialState = fromJS({
  passphrase: '',
  wif: '',
  wifExpansion: false
});

export default handleActions(
  {
    [GENERATE_PASSPHRASE]: (state, { payload }) =>
      state.set('passphrase', payload.passphrase),
    [GENERATE_WIF]: (state, { payload }) => state.set('wif', payload.wif),
    [OPEN_WIF_EXPANSION]: state => state.set('wifExpansion', true),
    [CLOSE_WIF_EXPANSION]: state => state.set('wifExpansion', false)
  },
  initialState
);
