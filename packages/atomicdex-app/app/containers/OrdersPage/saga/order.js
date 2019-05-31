// @flow
import { put, call, select, cancelled } from 'redux-saga/effects';
import { CANCEL, delay } from 'redux-saga';
import { floor } from 'barterdex-utilities';
import api from '../../../lib/barter-dex-api';
import { openSnackbars } from '../../Snackbars/actions';
import {
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie
} from '../selectors';
import {
  skipNewOrder,
  loadOrderbook,
  setNewOrderSuccess,
  setNewOrderError
} from '../actions';

const debug = require('debug')('atomicapp:containers:OrdersPage:saga:order');

export default function* listenForCreatingNewOrder({ type, payload }) {
  debug(`listen for creating order`);
  let request = null;
  try {
    const deposit = yield select(makeSelectOrderbookDeposit());
    const recevie = yield select(makeSelectOrderbookRecevie());
    const { price } = payload;

    if (!deposit || !recevie) {
      return yield put(skipNewOrder());
    }

    request = api.setprice({
      base: deposit,
      rel: recevie,
      price: floor(price, 8)
    });

    const result = yield request;
    yield call(delay, 1000);
    yield put(loadOrderbook());
    yield put(setNewOrderSuccess());
  } catch (err) {
    debug(`creating order error: ${err.message}`);
    yield put(openSnackbars(err.message));
    yield put(
      setNewOrderError({
        context: {
          action: type
        },
        type: 'RPC',
        message: err.message
      })
    );
  } finally {
    if (yield cancelled()) {
      debug(`creating order cancelled`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}
