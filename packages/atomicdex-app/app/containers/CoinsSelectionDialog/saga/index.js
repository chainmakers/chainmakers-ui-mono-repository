import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import { LOGOUT } from '../../App/constants';
import {
  SELECT_COIN_MODAL_SETUP_SEARCH_API,
  SELECT_COIN_MODAL_SEARCH
} from '../constants';
import handlingSearch, {
  setupSearchApiForSelectCoinModal,
  handlingLogout
} from './search';

export default function* coinsSlectionDialogSaga() {
  yield all([
    yield takeLatest(SELECT_COIN_MODAL_SEARCH, handlingSearch),
    yield takeFirst(
      SELECT_COIN_MODAL_SETUP_SEARCH_API,
      setupSearchApiForSelectCoinModal
    ),
    yield takeEvery(LOGOUT, handlingLogout)
  ]);
}
