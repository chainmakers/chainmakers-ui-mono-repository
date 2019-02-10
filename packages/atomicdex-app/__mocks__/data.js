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
    ],
    tokenconfig: {
      active: 1,
      asset: 'COQUI',
      coin: 'COQUI',
      electrumServers: [
        {
          host: 'electrum1.cipig.net',
          port: 10011
        },
        {
          host: 'electrum2.cipig.net',
          port: 10011
        }
      ],
      name: 'Coqui Cash',
      pubkey:
        '01c1b9f76447ce8aef87e55e10f8480ddec704ea16a2f14b834276b6257bc768',
      rpcport: 11557
    }
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
