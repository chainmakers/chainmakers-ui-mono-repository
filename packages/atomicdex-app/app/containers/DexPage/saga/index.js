import { takeEvery, takeLatest } from 'redux-saga/effects';
// import { takeFirst } from 'barterdex-rssm';
import {
  LOAD_PRICES,
  LOAD_PRICE,
  LOAD_BUY_COIN,
  SELECT_COIN_MODAL_CLICK
} from '../constants';
import loadBuyCoinProcess from './load-buy-coin-process';
import loadPricesProcess, { loadPriceProcess } from './load-prices-process';

/**
 * Root saga manages watcher lifecycle
 */
export default function* buyData() {
  yield takeLatest([LOAD_PRICES, SELECT_COIN_MODAL_CLICK], loadPricesProcess);
  yield takeEvery(LOAD_PRICE, loadPriceProcess);
  yield takeEvery(LOAD_BUY_COIN, loadBuyCoinProcess);
  // yield takeFirst(LOAD_BUY_COIN, loadBuyCoinProcess);
}
