// @doc
// https://github.com/KomodoPlatform/atomicDEX-API/blob/mm2/mm2src/rpc.rs#L146

export default function getEnabledCoinsFactory() {
  return {
    getEnabledCoins() {
      const serverparams = {
        method: 'get_enabled_coins'
      };
      return this.privateCall(serverparams);
    }
  };
}
