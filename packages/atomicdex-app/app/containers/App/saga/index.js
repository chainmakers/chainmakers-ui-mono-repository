import { all, takeEvery } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import {
  ELECTRUM_LOAD,
  ELECTRUM_ADD,
  LOGOUT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  BALANCE_LOAD_ALL,
  BALANCE_LOAD,
  BALANCE_LOAD_ERROR,
  DATA_FROM_DB_LOAD,
  ELECTRUM_ADD_SUCCESS,
  BALANCE_LOAD_SUCCESS,
  ELECTRUM_REMOVE
} from '../constants';
import listenForLoadingBalance, {
  handlingLoadBalance,
  handlingLoadBalanceError
} from './balance';
import { handlingLoginError, handlingLoginSuccess } from './login';
import electrums, { loadElectrum } from './electrums';
import listenForLoadingDataFromDB, {
  listenForLoadBalanceOrElectrumSuccessful,
  listenForRemoveElectrum
} from './db';
import logoutFlow from './logout';

export default function* root() {
  yield all([
    yield takeFirst(ELECTRUM_LOAD, electrums),
    yield takeEvery(ELECTRUM_ADD, loadElectrum),
    yield takeFirst(LOGOUT, logoutFlow),
    yield takeFirst(DATA_FROM_DB_LOAD, listenForLoadingDataFromDB),
    yield takeEvery(
      [ELECTRUM_ADD_SUCCESS, BALANCE_LOAD_SUCCESS],
      listenForLoadBalanceOrElectrumSuccessful
    ),
    yield takeFirst(LOGIN_ERROR, handlingLoginError),
    yield takeFirst(LOGIN_SUCCESS, handlingLoginSuccess),
    yield takeFirst(BALANCE_LOAD_ALL, listenForLoadingBalance),
    yield takeEvery(BALANCE_LOAD, handlingLoadBalance),
    yield takeEvery(BALANCE_LOAD_ERROR, handlingLoadBalanceError),
    yield takeEvery(ELECTRUM_REMOVE, listenForRemoveElectrum)
  ]);
}
