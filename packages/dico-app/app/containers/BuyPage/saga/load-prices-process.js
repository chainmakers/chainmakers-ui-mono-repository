import { call, put, select, all, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import getConfig from '../../../utils/config';
import api from '../../../lib/barter-dex-api';
import { loadBestPrice, loadPricesSuccess, loadPricesError } from '../actions';
import { makeSelectBalanceList } from '../selectors';

const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');
const numcoin = 100000000;
const debug = require('debug')(
  'dicoapp:containers:BuyPage:saga:load-prices-process'
);

export function* loadPrice(coin) {
  const getprices = {
    base: COIN_BASE.coin,
    rel: coin
  };
  const buf = 1.08 * numcoin;
  const bob = COIN_BASE.pubkey;
  let bestprice = 0;
  let request = null;
  try {
    request = api.orderbook(getprices);
    const result = yield request;
    const ask = result.asks.find(e => e.pubkey === bob);
    if (!ask) {
      throw new Error('dICO Bob is offline!');
    }

    bestprice = Number((ask.price * numcoin).toFixed(0));
    bestprice = Number(
      (((buf / numcoin) * bestprice) / numcoin).toFixed(8) * numcoin
    ).toFixed(0);
    debug(`best prices:`, ask);
    return yield put(
      loadBestPrice({
        bestPrice: Number(bestprice / numcoin),
        price: ask.price,
        avevolume: ask.avevolume,
        maxvolume: ask.maxvolume,
        numutxos: ask.numutxos,
        base: COIN_BASE.coin,
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
        base: COIN_BASE.coin,
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

    // const tokenconfig = config.get('marketmaker.tokenconfig');

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
