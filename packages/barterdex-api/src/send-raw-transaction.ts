interface SenDrawTransactionType {
  coin: string,
  tx_hex: string
};

export default function sendRawTransactionFactory() {
  return {
    sendrawtransaction(params: SenDrawTransactionType) {
      const serverparams = Object.assign({}, params, {
        method: 'send_raw_transaction'
      });
      return this.privateCall(serverparams);
    }
  };
}
