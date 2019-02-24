module.exports = {
  APPNAME: 'atomicapp',
  barterdex: 'http://127.0.0.1:7783',
  loginWindowSize: {
    height: 680,
    width: 1156
  },
  marketmaker: {
    data: [
      {
        active: 1,
        asset: 'PIZZA',
        coin: 'PIZZA',
        market_cap: -2,
        name: 'Pizza',
        rpcport: 11608,
        txversion: 4,
        urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024']
      },
      {
        active: 1,
        asset: 'BEER',
        coin: 'BEER',
        market_cap: -1,
        name: 'Beer',
        rpcport: 8923,
        txversion: 4,
        urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022']
      }
    ]
  },
  minWindowSize: {
    height: 680,
    width: 1156
  },
  paths: {
    appDir: 'appDir',
    binDir: 'binDir',
    homeDir: 'homeDir',
    marketmaker: 'marketmaker',
    userDataDir: 'userDataDir'
  },
  symbol: {
    symbolToName: {
      BEER: 'Beer',
      BTC: 'Bitcoin',
      COQUI: 'Coqui Cash',
      EQL: 'Equaliser',
      KMD: 'Komodo',
      LTC: 'Litecoin',
      PIZZA: 'Pizza'
    }
  }
};
