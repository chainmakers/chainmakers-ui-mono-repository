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
        coin: 'KMD',
        electrumServers: [
          {
            host: 'electrum1.cipig.net',
            port: 10001
          },
          {
            host: 'electrum2.cipig.net',
            port: 10001
          }
        ],
        market_cap: 107340275.0,
        name: 'Komodo'
      },
      {
        active: 1,
        coin: 'BTC',
        electrumServers: [
          {
            host: 'electrum1.cipig.net',
            port: 10000
          },
          {
            host: 'electrum2.cipig.net',
            port: 10000
          }
        ],
        name: 'Bitcoin',
        market_cap: 97822306639.0
      },
      {
        active: 1,
        asset: 'EQL',
        coin: 'EQL',
        electrumServers: [
          {
            host: '159.65.91.235',
            port: 10801
          },
          {
            host: '167.99.204.42',
            port: 10801
          }
        ],
        name: 'Equaliser',
        market_cap: 0,
        rpcport: 10306
      },
      {
        active: 1,
        coin: 'LTC',
        electrumServers: [
          {
            host: 'electrum1.cipig.net',
            port: 10065
          },
          {
            host: 'electrum2.cipig.net',
            port: 10065
          }
        ],
        name: 'Litecoin',
        p2shtype: 5,
        pubtype: 48,
        rpcport: 9332,
        txfee: 100000,
        wiftype: 176,
        market_cap: 2578993869.0
      },
      {
        active: 1,
        asset: 'PIZZA',
        coin: 'PIZZA',
        electrumServers: [
          {
            host: 'electrum1.cipig.net',
            port: 10024
          },
          {
            host: 'electrum2.cipig.net',
            port: 10024
          }
        ],
        name: 'Pizza',
        rpcport: 11116,
        market_cap: 0
      },
      {
        active: 1,
        asset: 'BEER',
        coin: 'BEER',
        electrumServers: [
          {
            host: 'electrum1.cipig.net',
            port: 10022
          },
          {
            host: 'electrum2.cipig.net',
            port: 10022
          }
        ],
        name: 'Beer',
        rpcport: 8923,
        market_cap: 0
      },
      {
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
        rpcport: 14276,
        market_cap: 0
      },
      {
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
    ],
    electrums: [
      {
        coin: 'KMD',
        ipaddr: 'electrum1.cipig.net',
        method: 'electrum',
        port: 10001
      },
      {
        coin: 'KMD',
        ipaddr: 'electrum2.cipig.net',
        method: 'electrum',
        port: 10001
      },
      {
        coin: 'BTC',
        ipaddr: 'electrum1.cipig.net',
        method: 'electrum',
        port: 10000
      },
      {
        coin: 'BTC',
        ipaddr: 'electrum2.cipig.net',
        method: 'electrum',
        port: 10000
      },
      {
        coin: 'EQL',
        ipaddr: '159.65.91.235',
        method: 'electrum',
        port: 10801
      },
      {
        coin: 'EQL',
        ipaddr: '167.99.204.42',
        method: 'electrum',
        port: 10801
      },
      {
        coin: 'LTC',
        ipaddr: 'electrum1.cipig.net',
        method: 'electrum',
        port: 10065
      },
      {
        coin: 'LTC',
        ipaddr: 'electrum2.cipig.net',
        method: 'electrum',
        port: 10065
      },
      {
        coin: 'PIZZA',
        ipaddr: 'electrum1.cipig.net',
        method: 'electrum',
        port: 10024
      },
      {
        coin: 'PIZZA',
        ipaddr: 'electrum2.cipig.net',
        method: 'electrum',
        port: 10024
      },
      {
        coin: 'BEER',
        ipaddr: 'electrum1.cipig.net',
        method: 'electrum',
        port: 10022
      },
      {
        coin: 'BEER',
        ipaddr: 'electrum2.cipig.net',
        method: 'electrum',
        port: 10022
      },
      {
        coin: 'COQUI',
        ipaddr: 'electrum1.cipig.net',
        method: 'electrum',
        port: 10011
      },
      {
        coin: 'COQUI',
        ipaddr: 'electrum2.cipig.net',
        method: 'electrum',
        port: 10011
      },
      {
        coin: 'COQUI',
        ipaddr: 'electrum1.cipig.net',
        method: 'electrum',
        port: 10011
      },
      {
        coin: 'COQUI',
        ipaddr: 'electrum2.cipig.net',
        method: 'electrum',
        port: 10011
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
