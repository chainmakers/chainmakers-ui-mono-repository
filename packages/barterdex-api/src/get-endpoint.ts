// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#getendpoint

export default function getendpointFactory() {
  return {
    getendpoint() {
      const serverparams = {
        method: 'getendpoint'
      };
      return this.privateCall(serverparams);
    }
  };
}
