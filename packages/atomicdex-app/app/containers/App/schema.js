// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type UTXOType = {
  height: number,
  tx_hash: string,
  tx_pos: number,
  value: number
};

type BalancePayload = {
  address: string,
  balance: number,
  coin: string,
  fee: number
  // utxo: Array<UTXOType>
};

type EelectrumServerType = {
  host: string,
  port: number
};

type CoinConfigType = {
  id: string,
  coin: string,
  name: string,
  electrumServers: Array<EelectrumServerType>,
  marketCap: number,
  active: number
};

export type { UTXOType, BalancePayload, CoinConfigType };

// {
//   coin: 'KMD',
//   name: 'Komodo',
//   electrumServers: [
//     {
//       host: 'electrum1.cipig.net',
//       port: 10001
//     },
//     {
//       host: 'electrum2.cipig.net',
//       port: 10001
//     }
//   ],
//   active: 1,
//   market_cap: 107340275.0
// }
