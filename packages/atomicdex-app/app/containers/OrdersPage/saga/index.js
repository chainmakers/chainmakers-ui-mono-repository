import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import { LOGOUT } from '../../App/constants';
import {
  LOAD_PRICES,
  LOAD_PRICE,
  LOAD_BUY_COIN,
  SELECT_COIN_MODAL_CLICK,
  SELECT_COIN_MODAL_SETUP_SEARCH_API,
  SELECT_COIN_MODAL_SEARCH
} from '../constants';
import loadBuyCoinProcess from './load-buy-coin-process';
import loadPricesProcess, { loadPriceProcess } from './load-prices-process';
import handlingSearch, {
  setupSearchApiForSelectCoinModal,
  handlingLogout
} from './search';

/**
 * Root saga manages watcher lifecycle
 */
export default function* buyData() {
  yield all([
    yield takeLatest([LOAD_PRICES, SELECT_COIN_MODAL_CLICK], loadPricesProcess),
    yield takeLatest(SELECT_COIN_MODAL_SEARCH, handlingSearch),
    yield takeEvery(LOAD_PRICE, loadPriceProcess),
    yield takeEvery(LOAD_BUY_COIN, loadBuyCoinProcess),
    yield takeFirst(
      SELECT_COIN_MODAL_SETUP_SEARCH_API,
      setupSearchApiForSelectCoinModal
    ),
    yield takeEvery(LOGOUT, handlingLogout)
    // yield takeFirst(LOAD_BUY_COIN, loadBuyCoinProcess);
  ]);
}
