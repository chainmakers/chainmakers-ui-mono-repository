// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type UTXOType = {
  height: number,
  tx_hash: string,
  tx_pos: number,
  value: number
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

type BlockchainInfoPayload = {
  blocks: number,
  longestchain: number,
  balance: number
};

type BlockchainInfoType = {
  blocks: number,
  longestchain: number,
  balance: number
};

export type {
  UTXOType,
  CoinConfigType,
  BlockchainInfoPayload,
  BlockchainInfoType
};

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

// type ErrorPayload = {
//   context: {
//     action: string, // eg: COIN_TRANSACTIONS_LOAD
//     params: Array<*>
//   },
//   type: string, // eg: ApiError
//   url: string, // eg: https://127.0.0.1/kmd/transactions.json
//   message: string
// };

// {
//   entities: {

//   },
//   errors: {

//   },
//   fetchStatus: {
//     1085439006433669120: "loaded"
//   },
//   // other value
// }
