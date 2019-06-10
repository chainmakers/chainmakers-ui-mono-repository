// @doc
// https://github.com/artemii235/developer-docs/blob/mm/docs/basic-docs/atomic-swap-dex/dex-api.md#cancel_order

interface CancelOrderType {
  uuid: string
};

export default function cancelOrderFactory() {
  return {
    cancelOrder(params: CancelOrderType) {
      const serverparams = Object.assign({}, params, {
        method: 'cancel_order'
      });
      return this.privateCall(serverparams);
    }
  };
}
