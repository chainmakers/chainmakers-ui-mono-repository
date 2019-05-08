import { List } from 'immutable';
import { createSelector } from 'reselect';
import { APP_STATE_NAME, LIMIT_TRANSACTIONS_RETURN } from './constants';

const selectWallet = state => state.get(APP_STATE_NAME);

const makeSelectTransactions = () =>
  createSelector(
    selectWallet,
    walletState => walletState.get('transactions')
  );

const makeSelectTransactionsLoading = () =>
  createSelector(
    makeSelectTransactions(),
    transactionsState => transactionsState.get('loading')
  );

const makeSelectTransactionsError = () =>
  createSelector(
    makeSelectTransactions(),
    transactionsState => transactionsState.get('error')
  );

const makeSelectTransactionsQueueids = () =>
  createSelector(
    makeSelectTransactions(),
    transactionsState => transactionsState.get('queueids')
  );

const makeSelectTransactionsCoins = () =>
  createSelector(
    makeSelectTransactions(),
    transactionsState => transactionsState.get('coins')
  );

const makeSelectLatestTransactions = () =>
  createSelector(
    makeSelectTransactionsCoins(),
    coins =>
      coins.reduce((accum, data) => {
        let ll = data.get('list').take(LIMIT_TRANSACTIONS_RETURN);
        const en = data.get('entities');
        ll = ll.map(v => en.get(v));
        return accum.concat(ll);
      }, List())
  );

const makeSelectAssetModal = () =>
  createSelector(
    selectWallet,
    walletState => walletState.get('assetModal')
  );

const makeSelectCoinAssetModal = () =>
  createSelector(
    makeSelectAssetModal(),
    assetModal => assetModal.get('coin')
  );

const makeSelectLoadingAssetModal = () =>
  createSelector(
    makeSelectAssetModal(),
    assetModal => assetModal.get('loading')
  );

const makeSelectTabAssetModal = () =>
  createSelector(
    makeSelectAssetModal(),
    assetModal => assetModal.get('tab')
  );

const makeSelectErrorAssetModal = () =>
  createSelector(
    makeSelectAssetModal(),
    assetModal => assetModal.get('error')
  );

const makeSelectJoyride = () =>
  createSelector(
    selectWallet,
    walletState => walletState.get('joyride')
  );

const makeSelectJoyrideOpenState = () =>
  createSelector(
    makeSelectJoyride(),
    joyrideState => joyrideState.get('open')
  );

const makeSelectRemovingElectrumModal = () =>
  createSelector(
    selectWallet,
    walletState => walletState.get('removingElectrumModal')
  );

const makeSelectOpenStateRemovingElectrumModal = () =>
  createSelector(
    makeSelectRemovingElectrumModal(),
    removingElectrumModal => removingElectrumModal.get('open')
  );

const makeSelectCoinRemovingElectrumModal = () =>
  createSelector(
    makeSelectRemovingElectrumModal(),
    removingElectrumModal => removingElectrumModal.get('coin')
  );

export {
  selectWallet,
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectTransactions,
  makeSelectTransactionsQueueids,
  makeSelectTransactionsCoins,
  makeSelectLatestTransactions,
  makeSelectAssetModal,
  makeSelectCoinAssetModal,
  makeSelectLoadingAssetModal,
  makeSelectTabAssetModal,
  makeSelectErrorAssetModal,
  makeSelectJoyride,
  makeSelectJoyrideOpenState,
  makeSelectRemovingElectrumModal,
  makeSelectOpenStateRemovingElectrumModal,
  makeSelectCoinRemovingElectrumModal
};
