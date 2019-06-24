// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#listunspent

interface ListUnspentType {
  coin: string,
  address: string
};

export default function listunspentFactory() {
  return {
    listunspent(params: ListUnspentType) {
      const serverparams = Object.assign({}, params, {
        method: 'listunspent'
      });
      return this.privateCall(serverparams);
    }
  };
}
