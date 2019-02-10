interface MyBalanceType {
  coin: string
};

export default function myBalanceFactory() {
  return {
    myBalance(params: MyBalanceType) {
      const serverparams = Object.assign({}, params, {
        method: 'my_balance'
      });
      return this.privateCall(serverparams);
    }
  };
}
