import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectSeed = state => state.get(APP_STATE_NAME);

const makeSelectPassphrase = () =>
  createSelector(
    selectSeed,
    walletState => walletState.get('passphrase')
  );

const makeSelectWif = () =>
  createSelector(
    selectSeed,
    walletState => walletState.get('wif')
  );

const makeSelectWifExpansion = () =>
  createSelector(
    selectSeed,
    walletState => walletState.get('wifExpansion')
  );

export {
  selectSeed,
  makeSelectPassphrase,
  makeSelectWif,
  makeSelectWifExpansion
};
