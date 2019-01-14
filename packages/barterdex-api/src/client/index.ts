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

interface ClientOption {
  entrypoint: string,
  home: string
};

export default function setupClient({
  entrypoint,
  home
}: ClientOption): BarterdexApi {
  const state = {
    userpass: null
  };

  return Object.assign(
    httpprovider(state, entrypoint),
    addServerFactory(),
    balanceFactory(),
    buyFactory(),
    getendpointFactory(),
    getfeeFactory(),
    isReadyFactory(),
    listTransactionsFactory(),
    listunspentFactory(),
    orderbookFactory(),
    loginFactory(home),
    recentswapsFactory(),
    sendRawTransactionFactory(),
    swapstatusFactory(),
    withdrawFactory()
  );
}
