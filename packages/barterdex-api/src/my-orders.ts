// @doc
// https://github.com/KomodoPlatform/atomicDEX-API/blob/mm2/mm2src/rpc.rs#L151

export default function myOrdersFactory() {
  return {
    myOrders() {
      const serverparams = {
        method: 'my_orders'
      };
      return this.privateCall(serverparams);
    }
  };
}
