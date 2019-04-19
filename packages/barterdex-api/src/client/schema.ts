export interface CancelRequest {
  userpass: string,
  uuid: string
};

export interface StateType {
  userpass: string | null
};

export interface OptionsType {
  useQueue: boolean
};

export interface BarterdexApi {
  electrum: Function,
  balance: Function,
  buy: Function,
  getendpoint: Function,
  getfee: Function,
  isready: Function,
  listTransactions: Function,
  orderbook: Function,
  privateCall: Function,
  swapstatus: Function,
  myswapstatus: Function,
  setUserpass: Function,
  getUserpass: Function,
  listunspent: Function,
  myBalance: Function,
  sendrawtransaction: Function,
  recentswaps: Function,
  resetUserpass: Function,
  version: Function,
  waitUntilReady: Function,
  withdraw: Function
};

export const DEFAULT_OPTION = {
  useQueue: false
};
