// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#getfee

interface GetFeeType {
  coin: string
};

export default function getTradeFeeFactory() {
  return {
    getTradeFee(params: GetFeeType) {
      const serverparams = Object.assign({}, params, {
        method: 'get_trade_fee'
      });
      return this.privateCall(serverparams);
    }
  };
}
