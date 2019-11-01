import { List } from 'immutable';
import { createSelector } from 'reselect';
import { APP_STATE_NAME, LIMIT_TRANSACTIONS_RETURN } from './constants';
import { makeSelectBalanceEntities } from '../App/selectors';

const selectWallet = state => state.get(APP_STATE_NAME);

const makeSelectTransactions = () =>
  createSelector(selectWallet, walletState => walletState.get('transactions'));

const makeSelectTransactionsLoading = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('loading')
  );

const makeSelectTransactionsError = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('error')
  );

const makeSelectTransactionsQueueids = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('queueids')
  );

const makeSelectTransactionsCoins = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('coins')
  );

const makeSelectLatestTransactions = () =>
  createSelector(makeSelectTransactionsCoins(), coins =>
    coins.reduce((accum, data) => {
      let ll = data.get('list').take(LIMIT_TRANSACTIONS_RETURN);
      const en = data.get('entities');
      ll = ll.map(v => en.get(v));
      return accum.concat(ll);
    }, List())
  );

const makeSelectWithdrawModal = () =>
  createSelector(selectWallet, walletState => walletState.get('withdrawModal'));

const makeSelectCoinWithdrawModal = () =>
  createSelector(
    makeSelectWithdrawModal(),
    makeSelectBalanceEntities(),
    (withdrawModal, balance) => balance.get(withdrawModal.get('coin'))
  );

const makeSelectDepositModal = () =>
  createSelector(selectWallet, walletState => walletState.get('depositModal'));

const makeSelectCoinDepositModal = () =>
  createSelector(
    makeSelectDepositModal(),
    makeSelectBalanceEntities(),
    (depositModal, balance) => balance.get(depositModal.get('coin'))
  );

export {
  selectWallet,
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectTransactions,
  makeSelectTransactionsQueueids,
  makeSelectTransactionsCoins,
  makeSelectLatestTransactions,
  makeSelectWithdrawModal,
  makeSelectCoinWithdrawModal,
  makeSelectDepositModal,
  makeSelectCoinDepositModal
};
