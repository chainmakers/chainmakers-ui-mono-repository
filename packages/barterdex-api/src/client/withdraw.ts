interface WithdrawType {
  coin: string,
  to: string,
  amount: number
};

export default function withdrawFactory() {
  return {
    withdraw(params: WithdrawType) {
      const serverparams = Object.assign({}, params, {
        method: 'withdraw'
      });
      return this.privateCall(serverparams);
    }
  };
}
