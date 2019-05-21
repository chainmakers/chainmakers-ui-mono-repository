// @doc
// https://github.com/KomodoPlatform/developer-docs/blob/mm/docs/basic-docs/atomic-swap-dex/dex-api.md#setprice

interface SetpriceType {
  base: string,
  rel: string,
  price: number,
  broadcast?: number
};

export default function setpriceFactory() {
  return {
    setprice(params: SetpriceType) {
      const serverparams = Object.assign({
        broadcast: 1
      }, params, {
        method: 'setprice'
      });
      return this.privateCall(serverparams);
    }
  };
}
