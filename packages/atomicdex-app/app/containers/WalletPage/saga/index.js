// @flow
import { all, takeEvery } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import { ELECTRUM_ADD_SUCCESS } from '../../App/constants';
import { WITHDRAW_LOAD, TRANSACTIONS_LOAD, ACTION_RETRY } from '../constants';
import loadTransactionsProcess, {
  listenForElectrumSuccess
} from './transactions';
import retryActionProcess from './retryActionProcess';
import loadWithdrawProcess from './withdraw';

export default function* root() {
  yield all([
    yield takeFirst(WITHDRAW_LOAD, loadWithdrawProcess),
    yield takeFirst(TRANSACTIONS_LOAD, loadTransactionsProcess),
    yield takeEvery(ACTION_RETRY, retryActionProcess),
    yield takeEvery(ELECTRUM_ADD_SUCCESS, listenForElectrumSuccess)
  ]);
}
