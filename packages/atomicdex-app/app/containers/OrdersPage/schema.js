// @flow
// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type OrderCoin = {
  id: string, // the unique id, alias address
  uuid: string, // the unique id
  createdAt: Date,
  base: string, // sell
  rel: string, // receive
  price: number,
  maxvolume: number,
  minvolume: number,
  address: string, // get this from orderbook
  pubkey: string, // get this from orderbook
  avevolume: number, // get this from orderbook
  from: string, // BOB NODE OR ALICE NODE
  meta: Object
  // {
  //   coin: 'KMD',
  //   numutxos: 0,
  //   avevolume: 0,
  //   maxvolume: 50.46521858,
  //   depth: 0,
  //   age: 2,
  //   zcredits: 0
  // },
};

type SelectCoinPayload = {
  name: string,
  symbol: string
};

type NewOrderSuccessPayload = {};

export type { OrderCoin, SelectCoinPayload, NewOrderSuccessPayload };
