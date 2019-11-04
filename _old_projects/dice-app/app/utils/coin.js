import getConfig from './config';

const config = getConfig();
const symbolToName = config.get('symbol.symbolToName');

// eslint-disable-next-line import/prefer-default-export
export function covertSymbolToName(syl) {
  const s = symbolToName[syl];
  if (s) return s;
  return '';
}
