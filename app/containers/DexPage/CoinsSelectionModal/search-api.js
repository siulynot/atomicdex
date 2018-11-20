// @flow
import * as JsSearch from 'js-search';
import isNumber from 'lodash/isNumber';
import getConfig from '../../../utils/config';

const config = getConfig();
const COIN_DATA = config.get('marketmaker.data');
const data = COIN_DATA.map((e, k) => ({
  id: k,
  name: e.name,
  symbol: e.coin,
  market_cap: e.market_cap
}))
  .filter(e => isNumber(e.market_cap))
  .sort((a, b) => b.market_cap - a.market_cap);

let api = null;

export function setup() {
  if (api) return api;
  api = new JsSearch.Search('id');
  // this index strategy is built for all substrings matches.
  api.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  api.addIndex('name');
  api.addIndex('symbol');
  api.addDocuments(data);
  return api;
}

export default function search(text: string) {
  if (text === '') return data;
  const sa = setup();
  const d = sa.search(text);
  return d.sort((a, b) => b.market_cap - a.market_cap);
}
