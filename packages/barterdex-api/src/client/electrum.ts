// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#electrum

interface ElectrumType {
  coin: string,
  urls: Array<string>,
  txversion: number // to activate Sapling tx format
};

export default function electrumFactory() {
  return {
    electrum(params: ElectrumType) {
      const serverparams = Object.assign({}, params, {
        method: 'electrum'
      });
      return this.privateCall(serverparams);
    }
  };
}
