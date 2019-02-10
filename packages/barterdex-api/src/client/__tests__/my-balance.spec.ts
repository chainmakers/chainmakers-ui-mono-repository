import myBalanceFactory from '../my-balance';

describe('packages/barterdex-api/src/client/my-balance', () => {
  it('should handle the myBalance correctly', () => {
    const coin = 'coin';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          method: 'my_balance'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, myBalanceFactory());
    api.myBalance({
      coin
    });
  });
});
