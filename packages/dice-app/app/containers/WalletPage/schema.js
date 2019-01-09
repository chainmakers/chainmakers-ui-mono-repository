// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type TransactionPayload = {
  coin: string,
  height: number,
  txid: string,
  amount: number,
  // FIXME: use enum
  category: string, // receive | send,
  blocktime: number
};

// amount: 0.5046568
// blockhash: "0c110866c7aeef6f3fc29572d84d9818e9619b438ec7159fbc566f6aceb31f60"
// blockindex: 1074378 // height
// blocktime: 1540842527
// category: "receive"
// coin: "KMD"
// confirmations: 15242
// time: 1540842527
// txid: "81aa8e0b4a16310ccaf7549b4f96b4511a98576894a8fc801aa71566035b1b61" // tx_hash

type CoinTransactionsLoadPayload = {
  result: string,
  status: string,
  coin: string,
  queueId: number
};

type CoinTransactionsSuccessPayload = {
  queueId: number,
  coin: string,
  tx: Array<TransactionPayload>
};

type ErrorPayload = {
  context: {
    action: string, // eg: COIN_TRANSACTIONS_LOAD
    params: Array<*>
  },
  type: string, // eg: ApiError
  url: string, // eg: https://127.0.0.1/kmd/transactions.json
  message: string
};

// eslint-disable-next-line import/prefer-default-export
export type {
  TransactionPayload,
  CoinTransactionsLoadPayload,
  CoinTransactionsSuccessPayload,
  ErrorPayload
};
