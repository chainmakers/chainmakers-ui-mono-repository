// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type BuyCoinPayload = {
  basecoin: string,
  paymentcoin: string,
  amount: number
};

type BestPricePayload = {
  bestPrice: number,
  price: number, // the max price you are willing to pay for 1 base
  avevolume: number,
  maxvolume: number,
  numutxos: number,
  base: string, // the currency you want to buy
  rel: string, // the currency you are paying with
  age: number,
  zcredits: number,
  address: string,
  pubkey: string,
  depth: number,
  createdAt?: Date,
  updatedAt?: Date
};

type SwapError = {
  code: number,
  message: string
};

type SwapInfo = {
  sentflags: Array<string>,
  bobdeposit: string,
  alicepayment: string,
  bobpayment: string,
  paymentspent: string,
  Apaymentspent: string,
  depositspent: string,
  alicedexfee: string
};

type StepInfo = {
  coin?: string,
  tx: string,
  value: number
};

type SwapCoin = {
  id: number, // the unique id, alias trade id
  uuid: string, // the unique id
  requestid: number,
  quoteid: number,
  expiration: number,
  bob: string, // eg: KMD, BTC, LTC
  alice: string, // eg: KMD, BTC, LTC
  status: string, // eg: pending, finished
  bobsmartaddress: string,
  alicesmartaddress: string,
  requested: {
    bobAmount: number,
    aliceAmount: number
  },
  application: string, // where the request come from? eg: 'AtomicDex'
  error?: SwapError,
  info?: SwapInfo,

  myfee?: StepInfo,
  bobdeposit?: StepInfo,
  alicepayment?: StepInfo,
  bobpayment?: StepInfo,
  alicespend?: StepInfo,

  createdAt?: Date,
  updatedAt?: Date
};

type TimeoutPayload = {
  id: number, // the unique id, alias trade id
  uuid: string, // the unique id
  requestid: number,
  quoteid: number,
  bob: string, // eg: KMD, BTC, LTC
  alice: string // eg: KMD, BTC, LTC
};

export type { BuyCoinPayload, BestPricePayload, SwapCoin, TimeoutPayload };
