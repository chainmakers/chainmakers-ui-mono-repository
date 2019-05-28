import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import { LOGOUT } from '../../App/constants';
import {
  LOAD_PRICES,
  LOAD_PRICE,
  LOAD_BUY_COIN,
  SELECT_COIN_MODAL_SETUP_SEARCH_API,
  SELECT_COIN_MODAL_SEARCH,
  ORDERBOOK_LOAD,
  DEPOSIT_COIN_SELECT,
  RECEVIE_COIN_SELECT
} from '../constants';
import loadBuyCoinProcess from './load-buy-coin-process';
import loadPricesProcess, { loadPriceProcess } from './load-prices-process';
import listenForLoadingOrderbook from './orderbook';

/**
 * Root saga manages watcher lifecycle
 */
export default function* buyData() {
  yield all([
    yield takeLatest(LOAD_PRICES, loadPricesProcess),
    yield takeLatest(
      [ORDERBOOK_LOAD, DEPOSIT_COIN_SELECT, RECEVIE_COIN_SELECT],
      listenForLoadingOrderbook
    ),
    yield takeEvery(LOAD_PRICE, loadPriceProcess),
    yield takeEvery(LOAD_BUY_COIN, loadBuyCoinProcess)
    // yield takeFirst(LOAD_BUY_COIN, loadBuyCoinProcess);
  ]);
}
