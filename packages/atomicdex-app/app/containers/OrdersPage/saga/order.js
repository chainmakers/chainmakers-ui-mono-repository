// @flow
import { put, select, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import { floor } from 'barterdex-utilities';
import api from 'utils/barterdex-api';
import { openSnackbars } from '../../Snackbars/actions';
import { makeSelectBalanceEntities } from '../../App/selectors';
import { ORDER_ALICE_SITE } from '../constants';
import {
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie
} from '../selectors';
import {
  skipNewOrder,
  reloadOrderbook,
  setNewOrderSuccess,
  setNewOrderError,
  cancelNewOrderSuccess
} from '../actions';

const debug = require('debug')('atomicapp:containers:OrdersPage:saga:order');

export function* listenForCancelOrder({ payload }) {
  debug(`listen for cancel order`);
  let request = null;
  try {
    const { id, uuid } = payload;
    request = api.cancelOrder({
      uuid
    });
    const { error } = yield request;
    if (error) {
      throw new Error(error);
    }
    yield put(cancelNewOrderSuccess(id));
    // yield put(reloadOrderbook());
  } catch (err) {
    debug(`cancel order error: ${err.message}`);
    yield put(openSnackbars(err.message));
  } finally {
    if (yield cancelled()) {
      debug(`cancel order cancelled`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}

export default function* listenForCreatingNewOrder({ type, payload }) {
  debug(`listen for creating order`);
  let request = null;
  try {
    const deposit = yield select(makeSelectOrderbookDeposit());
    const recevie = yield select(makeSelectOrderbookRecevie());
    const balance = yield select(makeSelectBalanceEntities());
    const address =
      balance && balance.get(deposit) && balance.get(deposit).get('address');

    const { price } = payload;

    if (!deposit || !recevie || !address) {
      return yield put(skipNewOrder());
    }

    request = api.setprice({
      base: deposit,
      rel: recevie,
      price: floor(price, 8),
      // volume: 10,
      max: true
    });

    const { result, error } = yield request;
    if (error) {
      throw new Error(error);
    }
    result.address = address;
    result.id = `${address}-${deposit}-${recevie}`;
    result.type = ORDER_ALICE_SITE;
    yield put(setNewOrderSuccess(result));
    yield put(reloadOrderbook());
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
