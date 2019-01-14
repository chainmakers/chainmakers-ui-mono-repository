// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#orderbook

interface OrderbookType {
  base: string,
  rel: string
};

export default function orderbookFactory() {
  return {
    orderbook(params: OrderbookType) {
      const serverparams = Object.assign({}, params, {
        method: 'orderbook'
      });
      return this.privateCall(serverparams);
    }
  };
}
