// @flow
import { put, select, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import api from '../../../lib/barter-dex-api';
import { openSnackbars } from '../../Snackbars/actions';
import {
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie
} from '../selectors';
import {
  loadOrderbookSuccess,
  loadOrderbookError,
  skipOrderbook
} from '../actions';

const debug = require('debug')(
  'atomicapp:containers:OrdersPage:saga:orderbook'
);

export default function* listenForLoadingOrderbook(action) {
  debug(`listen for loading orderbook`);

  let request = null;
  try {
    const deposit = yield select(makeSelectOrderbookDeposit());
    const recevie = yield select(makeSelectOrderbookRecevie());

    if (!deposit || !recevie) {
      return yield put(skipOrderbook());
    }

    request = api.orderbook({
      base: recevie,
      rel: deposit,
      queueid: undefined
    });
    const result = yield request;

    return yield put(loadOrderbookSuccess(result));
  } catch (err) {
    debug(`loading orderbook error: ${err.message}`);
    yield put(openSnackbars(err.message));
    yield put(
      loadOrderbookError({
        context: {
          action: action.type
        },
        type: 'RPC',
        message: err.message
      })
    );
  } finally {
    if (yield cancelled()) {
      debug(`loading orderbook cancelled`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}
