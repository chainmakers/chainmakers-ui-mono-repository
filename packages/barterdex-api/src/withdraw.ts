interface WithdrawType {
  coin: string,
  outputs: Object
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
