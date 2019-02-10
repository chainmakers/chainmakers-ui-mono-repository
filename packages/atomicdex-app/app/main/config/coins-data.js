// @flow
// @docs
// https://www.atomicexplorer.com/#/faucet/coqui
// https://github.com/jl777/coins/tree/master/electrums
// https://github.com/jl777/coins/blob/master/coins

const data = [
  {
    coin: 'BTC',
    name: 'Bitcoin',
    asset: 'BTC',
    txversion: 4, // to activate Sapling tx format
    urls: ['electrum1.cipig.net:10000', 'electrum2.cipig.net:10000'],
    active: 1,
    market_cap: 97822306639.0
  },
  {
    coin: 'KMD',
    name: 'Komodo',
    asset: 'KMD',
    txversion: 4, // to activate Sapling tx format
    urls: ['electrum1.cipig.net:10001', 'electrum2.cipig.net:10001'],
    active: 1,
    market_cap: 107340275.0
  },
  {
    coin: 'EQL',
    name: 'Equaliser',
    asset: 'EQL',
    txversion: 4, // to activate Sapling tx format
    rpcport: 10306,
    urls: ['159.65.91.235:10801', '167.99.204.42:10801'],
    active: 1,
    market_cap: 0
  },
  {
    coin: 'LTC',
    name: 'Litecoin',
    asset: 'LTC',
    txversion: 4, // to activate Sapling tx format
    urls: ['electrum1.cipig.net:10065', 'electrum2.cipig.net:10065'],
    rpcport: 9332,
    pubtype: 48,
    p2shtype: 5,
    wiftype: 176,
    txfee: 100000,
    active: 1,
    market_cap: 2578993869.0
  },
  {
    coin: 'COQUI',
    name: 'Coqui Cash',
    asset: 'COQUI',
    txversion: 4, // to activate Sapling tx format
    urls: ['electrum1.cipig.net:10011', 'electrum2.cipig.net:10011'],
    rpcport: 14276,
    active: 1,
    market_cap: 0
  },
  {
    coin: 'CHIPS',
    name: 'Chips',
    asset: 'CHIPS',
    txversion: 4, // to activate Sapling tx format
    urls: ['electrum1.cipig.net:10053', 'electrum2.cipig.net:10053'],
    active: 1,
    rpcport: 57776,
    pubtype: 60,
    p2shtype: 85,
    wiftype: 188,
    txfee: 10000,
    market_cap: 1609044
  },
  {
    coin: 'VRSC',
    name: 'VerusCoin',
    asset: 'VRSC',
    txversion: 4, // to activate Sapling tx format
    urls: [
      'el0.vrsc.0x03.services:10000',
      'el1.vrsc.0x03.services:10000',
      'el2.vrsc.0x03.services:10000'
    ],
    active: 1,
    rpcport: 27486,
    market_cap: 1609044
  },
  {
    coin: 'KMDICE',
    name: 'KMDICE',
    asset: 'KMDice',
    txversion: 4, // to activate Sapling tx format
    urls: [
      'electrum1.cipig.net:10031',
      'electrum2.cipig.net:10031',
      'electrum3.cipig.net:10031'
    ],
    rpcport: 30177,
    market_cap: 0
  },
  {
    coin: 'CHAIN',
    name: 'Chainmakers',
    asset: 'CHAIN',
    txversion: 4, // to activate Sapling tx format
    urls: [
      'electrum1.cipig.net:10032',
      'electrum2.cipig.net:10032',
      'electrum3.cipig.net:10032'
    ],
    rpcport: 15587,
    market_cap: 0
  },
  {
    coin: 'BCH',
    name: 'Bitcoin Cash',
    asset: 'bch',
    txversion: 4, // to activate Sapling tx format
    urls: [
      'bch.imaginary.cash:50001',
      'electroncash.dk:50001',
      'electrum.imaginary.cash:50001',
      'abc1.hsmiths.com:60001'
    ],
    rpcport: 33333,
    pubtype: 0,
    p2shtype: 5,
    wiftype: 128,
    txfee: 1000,
    market_cap: 2197468013
  },
  {
    coin: 'QTUM',
    name: 'Qtum',
    asset: 'qtum',
    txversion: 4, // to activate Sapling tx format
    urls: [
      's4.qtum.info:50001',
      's5.qtum.info:50001',
      's7.qtum.info:50001',
      's8.qtum.info:50001'
    ],
    rpcport: 3889,
    pubtype: 58,
    p2shtype: 50,
    wiftype: 128,
    txfee: 400000,
    market_cap: 167615207
  },
  {
    coin: 'ZEC',
    name: 'Zcash',
    asset: 'zcash',
    txversion: 4, // to activate Sapling tx format
    urls: [
      'electrum1.cipig.net:10058',
      'electrum2.cipig.net:10058',
      'electrum3.cipig.net:10058'
    ],
    rpcport: 8232,
    taddr: 28,
    pubtype: 184,
    p2shtype: 189,
    wiftype: 128,
    txfee: 10000,
    market_cap: 289458275
  },
  {
    coin: 'PIZZA',
    name: 'Pizza',
    asset: 'PIZZA',
    txversion: 4, // to activate Sapling tx format
    rpcport: 11608,
    urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024'],
    active: 1,
    market_cap: -2 // NOTE: we should display test coin at end of the list
  },
  {
    coin: 'BEER',
    name: 'Beer',
    asset: 'BEER',
    txversion: 4, // to activate Sapling tx format
    rpcport: 8923,
    urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022'],
    active: 1,
    market_cap: -1 // NOTE: we should display test coin at end of the list
  }
];

export default function loadCoinsData(config) {
  return config.set('marketmaker', {
    data
  });
}
