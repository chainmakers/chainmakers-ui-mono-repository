// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#getfee

interface GetFeeType {
  coin: string
};

export default function getFeeFactory() {
  return {
    getfee(params: GetFeeType) {
      const serverparams = Object.assign({}, params, {
        method: 'getfee'
      });
      return this.privateCall(serverparams);
    }
  };
}
