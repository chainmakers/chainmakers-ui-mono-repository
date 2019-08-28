// @flow
/* eslint no-param-reassign: ["error", { "props": false }] */
import each from 'lodash/each';
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

export function* loadingOrderbook(
  deposit: string,
  recevie: string,
  address: string
) {
  debug(`loading orderbook`);

  let request = null;

  try {
    request = api.orderbook({
      base: recevie,
      rel: deposit,
      queueid: undefined
    });

    const data = yield request;

    request = api.myOrders();
    const { result } = yield request;
    const makerOrders = [];
    const takerOrders = [];

    // orders that are currently active in market maker mode (SELL)
    each(result.maker_orders, entity => {
      if (entity.base === deposit && entity.rel === recevie) {
        entity.id = `${address}-${deposit}-${recevie}`;
        makerOrders.push(entity);
      }
    });

    // orders that are currently active in market taker mode (BUY)
    each(result.taker_orders, entity => {
      if (entity.base === deposit && entity.rel === recevie) {
        entity.id = `${address}-${deposit}-${recevie}`;
        takerOrders.push(entity);
      }
    });

    data.bids.map(v => {
      try {
        v.base = recevie;
        v.rel = deposit;
        v.id = `${v.address}-${deposit}-${recevie}`;
        v.type = ORDER_ALICE_SIDE;
        console.log(makerOrders, takerOrders, 'result');
        const f = makerOrders.find(e => {
          try {
            console.log(e);
            return e.id === v.id;
          } catch (err) {
            console.log(err);
          }
        });
        console.log(f);
        if (v) {
          v.uuid = f.uuid;
        }
        return v;
      } catch (err) {
        console.log(err);
      }
    });

    data.asks.map(v => {
      try {
        v.base = recevie;
        v.rel = deposit;
        v.id = `${v.address}-${deposit}-${recevie}`;
        v.type = ORDER_BOB_SIDE;
        console.log(makerOrders, takerOrders, 'result');
        const f = takerOrders.find(e => {
          try {
            console.log(e);
            return e.id === v.id;
          } catch (err) {
            console.log(err);
          }
        });
        console.log(f);
        if (v) {
          v.uuid = f.uuid;
        }
        return v;
      } catch (err) {
        console.log(err);
      }
    });

    console.log(makerOrders, takerOrders, 'result');

    return data;
  } catch (err) {
    debug(`loading orderbook error: ${err.message}`);
    throw err;
  } finally {
    if (yield cancelled()) {
      debug(`loading orderbook cancelled`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}

export function* listenForReloadingOrderbook(action, timeout = 60) {
  debug(`listen for reloading orderbook`);
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

      const result = yield call(loadingOrderbook, deposit, recevie, address);

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
    }
  }
}

export default function* listenForLoadingOrderbook(action) {
  debug(`listen for loading orderbook`);

  try {
    const deposit = yield select(makeSelectOrderbookDeposit());
    const recevie = yield select(makeSelectOrderbookRecevie());
    const balance = yield select(makeSelectBalanceEntities());
    const address = balance.get(deposit).get('address');

    if (!deposit || !recevie) {
      return yield put(skipOrderbook());
    }

    const result = yield call(loadingOrderbook, deposit, recevie, address);

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
    }
  }
}
