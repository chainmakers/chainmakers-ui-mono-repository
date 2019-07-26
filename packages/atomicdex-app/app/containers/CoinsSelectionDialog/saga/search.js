// @flow
import * as JsSearch from 'js-search';
import isNumber from 'lodash/isNumber';
import { put, select } from 'redux-saga/effects';
import { ENABLE } from '../../../constants';
import {
  makeSelectBalanceList,
  makeSelectSupportedCoinsEntities
} from '../../App/selectors';
import {
  setupSearchApiForSelectCoinModalSuccess,
  searchSelectCoinModalSuccess,
  skipSearchStateCreation
} from '../actions';

const debug = require('debug')(
  'atomicapp:containers:CoinsSelectionDialog:saga:search'
);

let searchApi = null;
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
    debug('Nothing change. Ignore this time.');
    return yield put(skipSearchStateCreation());
  }

  cacheData = balanceList;
  balanceList = balanceList
    .toJS()
    .map((e, k) => ({
      id: k,
      name: e.fname,
      symbol: e.coin,
      market_cap: e.market_cap
    }))
    .filter(e => isNumber(e.market_cap))
    .sort((a, b) => b.market_cap - a.market_cap);

  searchApi = new JsSearch.Search('id');
  // this index strategy is built for all substrings matches.
  searchApi.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  searchApi.addIndex('name');
  searchApi.addIndex('symbol');
  searchApi.addDocuments(balanceList);
  return yield put(setupSearchApiForSelectCoinModalSuccess(cacheData.toJS()));
}

export function* handlingLogout() {
  searchApi = null;
  cacheData = null;
}

export default function* handlingSearch({ payload }) {
  const { input } = payload;
  if (input === '')
    return yield put(searchSelectCoinModalSuccess(cacheData.toJS()));
  const d = searchApi.search(input);
  return yield put(
    searchSelectCoinModalSuccess(d.sort((a, b) => b.market_cap - a.market_cap))
  );
}
