import { call, put, select, all, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import api from '../../../lib/barter-dex-api';
import { makeSelectBalanceList } from '../../App/selectors';
import { loadBestPrice, loadPricesSuccess, loadPricesError } from '../actions';
import { makeSelectCurrency } from '../selectors';
import { BUFF_PRICES, NUMCOIN } from '../constants';

const debug = require('debug')(
  'atomicapp:containers:DexPage:saga:load-prices-process'
);

export function* loadPrice(coin) {
  const currency = yield select(makeSelectCurrency());

  const getprices = {
    base: currency.get('symbol'),
    rel: coin
  };
  let bestprice = 0;
  let request = null;
  try {
    if (!currency.get('symbol')) {
      throw new Error('not found the currency');
    }
    if (coin === currency.get('symbol')) {
      throw new Error('coin is equal to currency');
    }
    request = api.orderbook(getprices);
    const result = yield request;
    const ask = result.asks.find(e => e.maxvolume > 0);
    if (!ask) {
      throw new Error('not found the best price');
    }
    bestprice = Number((ask.price * NUMCOIN).toFixed(0));
    bestprice = Number(
      (((BUFF_PRICES / NUMCOIN) * bestprice) / NUMCOIN).toFixed(8) * NUMCOIN
    ).toFixed(0);
    debug(`best prices:`, ask);
    return yield put(
      loadBestPrice({
        bestPrice: Number(bestprice / NUMCOIN),
        price: ask.price,
        avevolume: ask.avevolume,
        maxvolume: ask.maxvolume,
        numutxos: ask.numutxos,
        base: currency.get('symbol'),
        rel: coin,
        age: ask.age,
        zcredits: ask.zcredits,
        address: ask.address,
        pubkey: ask.pubkey,
        depth: ask.depth
      })
    );
  } catch (err) {
    debug(`load price process: ${err.message}`);
    return yield put(
      loadBestPrice({
        bestPrice: 0,
        price: 0,
        avevolume: 0,
        maxvolume: 0,
        numutxos: 0,
        base: currency.get('symbol'),
        rel: coin,
        age: 0,
        zcredits: 0,
        address: '',
        pubkey: '',
        depth: 0
      })
    );
  } finally {
    if (yield cancelled()) {
      debug(`load price process cancelled ${coin}`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}

export function* loadPriceProcess({ payload }) {
  try {
    const { coin } = payload;

    return yield call(loadPrice, coin);
  } catch (err) {
    // FIXME: handling error
    return yield put(loadPricesError(err.message));
  }
}

export default function* loadPricesProcess() {
  try {
    const balance = yield select(makeSelectBalanceList());

    const requests = [];
    for (let i = 0; i < balance.size; i += 1) {
      const coin = balance.get(i);
      requests.push(call(loadPrice, coin));
    }

    const data = yield all(requests);
    debug('load prices process', data);

    return yield put(loadPricesSuccess());
  } catch (err) {
    return yield put(loadPricesError(err.message));
  }
}
