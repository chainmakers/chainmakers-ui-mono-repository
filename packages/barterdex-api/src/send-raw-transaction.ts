interface SenDrawTransactionType {
  coin: string,
  signedtx: string
};

export default function sendRawTransactionFactory() {
  return {
    sendrawtransaction(params: SenDrawTransactionType) {
      const serverparams = Object.assign({}, params, {
        method: 'sendrawtransaction'
      });
      return this.privateCall(serverparams);
    }
  };
}
