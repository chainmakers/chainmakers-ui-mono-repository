// @flow
import * as JsSearch from 'js-search';
import getConfig from './config';

const config = getConfig();
const data = config
  .get('marketmaker.data')
  .map((e, k) => ({
    id: k,
    name: e.name,
    coin: e.coin,
    market_cap: e.market_cap || 0
  }))
  .sort((a, b) => b.market_cap - a.market_cap);

let api = null;

export function setup() {
  if (api) return api;
  api = new JsSearch.Search('id');
  // this index strategy is built for all substrings matches.
  api.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  api.addIndex('name');
  api.addIndex('coin');
  api.addDocuments(data);
  return api;
}

export default function search(text: string) {
  if (text === '') return data;
  const sa = setup();
  const d = sa.search(text);
  return d.sort((a, b) => b.market_cap - a.market_cap);
}
