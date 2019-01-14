// @doc
// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#balance

interface BalanceType {
  coin: string,
  address: string
};

export default function balanceFactory() {
  return {
    balance(params: BalanceType) {
      const serverparams = Object.assign({}, params, {
        method: 'balance'
      });
      return this.privateCall(serverparams);
    }
  };
}
