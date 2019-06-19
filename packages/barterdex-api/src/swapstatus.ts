// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#swapstatus-requestid-quoteid-pending-0

interface SwapstatusType {
  requestid: number,
  quoteid: number
};

export default function swapstatusFactory() {
  return {
    swapstatus(params: SwapstatusType) {
      const serverparams = Object.assign({}, params, {
        method: 'swapstatus'
      });
      return this.privateCall(serverparams);
    }
  };
}
