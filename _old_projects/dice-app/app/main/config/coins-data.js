// https://www.atomicexplorer.com/#/faucet/coqui
// https://github.com/jl777/coins/tree/master/electrums
// https://github.com/jl777/coins/blob/master/coins

const tokenconfig = require('./tokenconfig');

const data = [
  {
    coin: 'KMD',
    name: 'Komodo',
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
    active: 1,
    market_cap: 107340275.0
  },
  {
    coin: 'BTC',
    name: 'Bitcoin',
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
    active: 1,
    market_cap: 97822306639.0
  },
  {
    coin: 'EQL',
    name: 'Equaliser',
    asset: 'EQL',
    rpcport: 10306,
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
    active: 1,
    market_cap: 0
  },
  {
    coin: 'LTC',
    name: 'Litecoin',
    rpcport: 9332,
    pubtype: 48,
    p2shtype: 5,
    wiftype: 176,
    txfee: 100000,
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
    active: 1,
    market_cap: 2578993869.0
  },
  {
    coin: 'PIZZA',
    name: 'Pizza',
    asset: 'PIZZA',
    rpcport: 11116,
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
    active: 1,
    market_cap: -2 // NOTE: we should display test coin at end of the list
  },
  {
    coin: 'BEER',
    name: 'Beer',
    asset: 'BEER',
    rpcport: 8923,
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
    active: 1,
    market_cap: -1 // NOTE: we should display test coin at end of the list
  },
  {
    coin: 'COQUI',
    name: 'Coqui Cash',
    asset: 'COQUI',
    rpcport: 14276,
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
    active: 1,
    market_cap: 0
  },
  {
    coin: 'CHIPS',
    name: 'Chips',
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10053
      },
      {
        host: 'electrum2.cipig.net',
        port: 10053
      }
    ],
    active: 1,
    market_cap: 1609044,
    rpcport: 57776,
    pubtype: 60,
    p2shtype: 85,
    wiftype: 188,
    txfee: 10000
  },
  {
    coin: 'VRSC',
    name: 'VerusCoin',
    electrumServers: [
      {
        host: 'el0.vrsc.0x03.services',
        port: 10000
      },
      {
        host: 'el1.vrsc.0x03.services',
        port: 10000
      },
      {
        host: 'el2.vrsc.0x03.services',
        port: 10000
      }
    ],
    active: 1,
    market_cap: 1609044,
    rpcport: 27486
  }
];

export function generateElectrums(d) {
  const result = [];
  for (let i = 0; i < d.length; i += 1) {
    const record = d[i];
    for (let j = 0; j < record.electrumServers.length; j += 1) {
      const electrum = record.electrumServers[j];
      result.push({
        method: 'electrum',
        coin: record.coin,
        ipaddr: electrum.host,
        port: electrum.port
      });
    }
  }
  return result;
}

export default function loadCoinsData(config) {
  const coinsdata = data.concat([tokenconfig]);

  return config.set('marketmaker', {
    data: coinsdata,
    electrums: generateElectrums(coinsdata),
    tokenconfig
  });
}
