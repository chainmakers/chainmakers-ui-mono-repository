// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#buy

interface BuyType {
  base: string,
  rel: string,
  relvolume: string,
  price: string
};

export default function buyFactory() {
  return {
    buy(params: BuyType) {
      const serverparams = Object.assign({}, params, {
        method: 'buy'
      });
      return this.privateCall(serverparams);
    }
  };
}
