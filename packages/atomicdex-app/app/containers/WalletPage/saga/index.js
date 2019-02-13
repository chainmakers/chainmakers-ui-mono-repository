// @flow
import { all, takeEvery } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import { TRANSACTIONS_LOAD, ACTION_RETRY } from '../constants';
import loadTransactionsProcess from './transactions';
import retryActionProcess from './retryActionProcess';

export default function* root() {
  yield all([
    yield takeFirst(TRANSACTIONS_LOAD, loadTransactionsProcess),
    yield takeEvery(ACTION_RETRY, retryActionProcess)
  ]);
}
