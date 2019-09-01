// @doc
// https://github.com/KomodoPlatform/AtomicDEX-docs/blob/master/docs/basic-docs/atomicdex/atomicdex-api.md#stop

export default function stopFactory() {
  return {
    stop() {
      const serverparams = {
        method: 'stop'
      };
      return this.privateCall(serverparams);
    }
  };
}
