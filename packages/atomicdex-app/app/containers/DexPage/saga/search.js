// @flow
import * as JsSearch from 'js-search';
import isNumber from 'lodash/isNumber';
import { call, put, select, all, cancelled } from 'redux-saga/effects';
import {
  makeSelectBalanceList,
  makeSelectSupportedCoinsEntities
} from '../../App/selectors';
import { ENABLE } from '../../../constants';
import {
  setupSearchApiForSelectCoinModalSuccess,
  searchSelectCoinModalSuccess
} from '../actions';

const debug = require('debug')('atomicapp:containers:DexPage:saga:search');

let api = null;
let cacheData = null;

export function* setupSearchApiForSelectCoinModal() {
  let balanceList = yield select(makeSelectBalanceList());
  balanceList = balanceList
    .filter(item => item.get('status') === ENABLE)
    .map(e => e.get('symbol'));
  const supportedCoinsEntities = yield select(
    makeSelectSupportedCoinsEntities()
  );
  balanceList = balanceList.map(e => supportedCoinsEntities.get(e));

  if (balanceList.equals(cacheData)) {
    return debug('Nothing change. Ignore this time.');
  }

  cacheData = balanceList;
  balanceList = balanceList
    .toJS()
    .map((e, k) => ({
      id: k,
      name: e.name,
      symbol: e.coin,
      market_cap: e.market_cap
    }))
    .filter(e => isNumber(e.market_cap))
    .sort((a, b) => b.market_cap - a.market_cap);

  api = new JsSearch.Search('id');
  // this index strategy is built for all substrings matches.
  api.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  api.addIndex('name');
  api.addIndex('symbol');
  api.addDocuments(balanceList);
  return yield put(setupSearchApiForSelectCoinModalSuccess(cacheData.toJS()));
}

export default function* handlingSearch({ payload }) {
  const { input } = payload;
  if (input === '')
    return yield put(searchSelectCoinModalSuccess(cacheData.toJS()));
  const d = api.search(input);
  return yield put(
    searchSelectCoinModalSuccess(d.sort((a, b) => b.market_cap - a.market_cap))
  );
}
