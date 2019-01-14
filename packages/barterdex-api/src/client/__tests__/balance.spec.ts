import balance from '../balance';

describe('packages/barterdex-api/src/client/balance', () => {
  it('should handle the balance correctly', () => {
    const coin = 'coin';
    const address = 'address';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          address,
          method: 'balance'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, balance());
    api.balance({
      coin,
      address
    });
  });
});
