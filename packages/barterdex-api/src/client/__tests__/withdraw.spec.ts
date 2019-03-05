import withdraw from '../withdraw';

describe('packages/barterdex-api/src/client/withdraw', () => {
  it('should handle the withdraw correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'BEER';
    const to = 'RL1XYoxbKaETGSqiS4po3pk1ZjRYqHBqvc';
    const amount = 0.1;
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          to,
          amount,
          method: 'withdraw'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, withdraw());
    api.withdraw({
      coin,
      to,
      amount
    });
  });
});
