import { all, takeLatest } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import {
  ORDERBOOK_LOAD,
  ORDERBOOK_RELOAD,
  DEPOSIT_COIN_SELECT,
  RECEVIE_COIN_SELECT,
  NEW_ORDER_SET,
  NEW_ORDER_CANCEL
} from '../constants';
import listenForLoadingOrderbook, {
  listenForReloadingOrderbook
} from './orderbook';
import listenForCreatingNewOrder, { listenForCancelOrder } from './order';

/**
 * Root saga manages watcher lifecycle
 */
export default function* buyData() {
  yield all([
    yield takeLatest(
      [ORDERBOOK_LOAD, DEPOSIT_COIN_SELECT, RECEVIE_COIN_SELECT],
      listenForLoadingOrderbook
    ),
    yield takeFirst(ORDERBOOK_RELOAD, listenForReloadingOrderbook),
    yield takeFirst(NEW_ORDER_SET, listenForCreatingNewOrder),
    yield takeFirst(NEW_ORDER_CANCEL, listenForCancelOrder)
  ]);
}
