// @flow
/* eslint no-param-reassign: ["error", { "props": false }] */
import { put, call, select, cancelled } from 'redux-saga/effects';
import { CANCEL, delay } from 'redux-saga';
import api from 'utils/barterdex-api';
import { openSnackbars } from '../../Snackbars/actions';
import { makeSelectBalanceEntities } from '../../App/selectors';
import { ORDER_BOB_SIDE, ORDER_ALICE_SIDE } from '../constants';
import {
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie
} from '../selectors';
import {
  reloadOrderbookSuccess,
  loadOrderbookSuccess,
  loadOrderbookError,
  skipOrderbook
} from '../actions';

const debug = require('debug')(
  'atomicapp:containers:OrdersPage:saga:orderbook'
);

export function* listenForReloadingOrderbook(action, timeout = 60) {
  debug(`listen for reloading orderbook`);
  let request = null;
  try {
    // if not found stop
    const deposit = yield select(makeSelectOrderbookDeposit());
    const recevie = yield select(makeSelectOrderbookRecevie());
    const balance = yield select(makeSelectBalanceEntities());
    const address = balance.get(deposit).get('address');

    if (!deposit || !recevie || deposit === recevie) {
      return yield put(skipOrderbook());
    }
    let n = timeout; // 60s
    while (true) {
      n -= 1;
      debug('start');
      if (n < 0) {
        debug('stop, timeout');
        break;
      }
      request = api.orderbook({
        base: recevie,
        rel: deposit,
        queueid: undefined
      });
      const result = yield request;
      result.bids.map(v => {
        v.base = recevie;
        v.rel = deposit;
        v.id = `${v.address}-${deposit}-${recevie}`;
        v.type = ORDER_ALICE_SIDE;
        return v;
      });
      result.asks.map(v => {
        v.base = recevie;
        v.rel = deposit;
        v.id = `${v.address}-${deposit}-${recevie}`;
        v.type = ORDER_BOB_SIDE;
        return v;
      });
      yield put(loadOrderbookSuccess(result));
      const f = result.bids.find(e => e.address === address);
      if (f && f.maxvolume > 0) {
        break;
      }
      yield call(delay, 1000);
    }
    yield put(reloadOrderbookSuccess());
  } catch (err) {
    debug(`reloading orderbook error: ${err.message}`);
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
      debug(`reloading orderbook cancelled`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}

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
    result.bids.map(v => {
      v.base = recevie;
      v.rel = deposit;
      v.id = `${v.address}-${deposit}-${recevie}`;
      v.type = ORDER_ALICE_SIDE;
      return v;
    });
    result.asks.map(v => {
      v.base = recevie;
      v.rel = deposit;
      v.id = `${v.address}-${deposit}-${recevie}`;
      v.type = ORDER_BOB_SIDE;
      return v;
    });
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
