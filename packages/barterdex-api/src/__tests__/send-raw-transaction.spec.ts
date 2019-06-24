import sendRawTransaction from '../send-raw-transaction';

describe('packages/barterdex-api/src/client/send-raw-transaction', () => {
  it('should handle the sendRawTransaction correctly', () => {
    const coin = 'coin';
    const tx_hex = 'tx_hex';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          tx_hex,
          method: 'send_raw_transaction'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, sendRawTransaction());
    api.sendrawtransaction({
      coin,
      tx_hex
    });
  });
});