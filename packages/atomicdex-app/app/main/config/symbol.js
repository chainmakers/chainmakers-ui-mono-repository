export default function loadSymbol(config) {
  const coins = config.get('marketmaker.data');
  const symbolToName = coins.reduce((acc, cur) => {
    acc[cur.coin] = cur.fname;
    return acc;
  }, {});

  return config.set('symbol', {
    symbolToName
  });
}
