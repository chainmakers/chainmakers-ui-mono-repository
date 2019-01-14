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
  addServer: Function,
  balance: Function,
  buy: Function,
  getendpoint: Function,
  getfee: Function,
  isready: Function,
  listTransactions: Function,
  orderbook: Function,
  login: Function,
  publicCall: Function,
  privateCall: Function,
  get: Function,
  swapstatus: Function,
  setUserpass: Function,
  getUserpass: Function,
  listunspent: Function,
  sendrawtransaction: Function,
  recentswaps: Function,
  resetUserpass: Function,
  withdraw: Function
};

export const DEFAULT_OPTION = {
  useQueue: false
};
