import sendRawTransaction from '../send-raw-transaction';

describe('packages/barterdex-api/src/send-raw-transaction', () => {
  it('should handle the sendRawTransaction correctly', () => {
    const coin = 'coin';
    const signedtx = 'signedtx';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          signedtx,
          method: 'sendrawtransaction'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, sendRawTransaction());
    api.sendrawtransaction({
      coin,
      signedtx
    });
  });
});