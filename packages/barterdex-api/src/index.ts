import httpprovider from './http-provider';
import addServerFactory from './add-server';
import balanceFactory from './balance';
import buyFactory from './buy';
import getendpointFactory from './get-endpoint';
import getfeeFactory from './getfee';
import isReadyFactory from './is-ready';
import listTransactionsFactory from './list-transactions';
import listunspentFactory from './listunspent';
import orderbookFactory from './orderbook';
import loginFactory from './login';
import recentswapsFactory from './recentswaps';
import sendRawTransactionFactory from './send-raw-transaction';
import swapstatusFactory from './swapstatus';
import withdrawFactory from './withdraw';
import { BarterdexApi } from './schema';

// eslint-disable-next-line flowtype/no-weak-types
function barterDexAPI(barterdexRpc: string, homeDir: string): BarterdexApi {
  const state = {
    userpass: null
  };

  return Object.assign(
    httpprovider(state, barterdexRpc),
    addServerFactory(),
    balanceFactory(),
    buyFactory(),
    getendpointFactory(),
    getfeeFactory(),
    isReadyFactory(),
    listTransactionsFactory(),
    listunspentFactory(),
    orderbookFactory(),
    loginFactory(homeDir),
    recentswapsFactory(),
    sendRawTransactionFactory(),
    swapstatusFactory(),
    withdrawFactory()
  );
}

let api: BarterdexApi | null = null;

export default function setup(barterdexRpc: string, homeDir: string) {
  if (api) return api;

  api = barterDexAPI(barterdexRpc, homeDir);

  return api;
}
