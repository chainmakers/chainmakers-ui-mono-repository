// @flow
import { all, takeEvery } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import { ELECTRUM_ADD_SUCCESS } from '../../App/constants';
import { TRANSACTIONS_LOAD, ACTION_RETRY } from '../constants';
import loadTransactionsProcess, {
  listenForElectrumSuccess
} from './transactions';
import retryActionProcess from './retryActionProcess';

export default function* root() {
  yield all([
    yield takeFirst(TRANSACTIONS_LOAD, loadTransactionsProcess),
    yield takeEvery(ACTION_RETRY, retryActionProcess),
    yield takeEvery(ELECTRUM_ADD_SUCCESS, listenForElectrumSuccess)
  ]);
}
