import httpprovider from './http-provider';
import electrumFactory from './electrum';
import enableFactory from './enable';
import balanceFactory from './balance';
import cancelOrderFactory from './cancel-order';
import buyFactory from './buy';
import setpriceFactory from './setprice';
import getendpointFactory from './get-endpoint';
import getfeeFactory from './getfee';
import getTradeFeeFactory from './get-trade-fee';
import getEnabledCoinsFactory from './get-enabled-coins';
import isReadyFactory from './is-ready';
import listTransactionsFactory from './list-transactions';
import listunspentFactory from './listunspent';
import myBalanceFactory from './my-balance';
import orderbookFactory from './orderbook';
import recentswapsFactory from './recentswaps';
import sendRawTransactionFactory from './send-raw-transaction';
import swapstatusFactory from './swapstatus';
import myswapstatusFactory from './my-swapstatus';
import versionFactory from './version';
import waitUntilReadyFactory from './waitUntilReady';
import withdrawFactory from './withdraw';
import { BarterdexApi } from './schema';

interface ClientOption {
  entrypoint: string
};

export default function setupClient({
  entrypoint
}: ClientOption): BarterdexApi {
  const state = {
    userpass: null
  };

  return Object.assign(
    httpprovider(state, entrypoint),
    electrumFactory(),
    enableFactory(),
    balanceFactory(),
    buyFactory(),
    cancelOrderFactory(),
    setpriceFactory(),
    getendpointFactory(),
    getfeeFactory(),
    getTradeFeeFactory(),
    getEnabledCoinsFactory(),
    isReadyFactory(),
    listTransactionsFactory(),
    listunspentFactory(),
    myBalanceFactory(),
    orderbookFactory(),
    recentswapsFactory(),
    sendRawTransactionFactory(),
    swapstatusFactory(),
    myswapstatusFactory(),
    versionFactory(),
    waitUntilReadyFactory(),
    withdrawFactory()
  );
}
