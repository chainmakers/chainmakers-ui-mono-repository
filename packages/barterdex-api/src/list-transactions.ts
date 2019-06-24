// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#listtransactions
import { OptionsType } from './schema';

interface ListTransactionsType {
  coin: string,
  address: string
};

export default function listTransactionsFactory() {
  return {
    listTransactions(params: ListTransactionsType, options?: OptionsType) {
      const serverparams = Object.assign({}, params, {
        method: 'listtransactions',
        count: 10
      });
      return this.privateCall(serverparams, options);
    }
  };
}
