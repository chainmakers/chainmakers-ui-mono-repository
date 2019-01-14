import withdraw from '../withdraw';

describe('packages/barterdex-api/src/client/withdraw', () => {
  it('should handle the withdraw correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'BEER';
    const outputs = [{ RL1XYoxbKaETGSqiS4po3pk1ZjRYqHBqvc: 1 }];
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          outputs,
          method: 'withdraw'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, withdraw());
    api.withdraw({
      coin,
      outputs
    });
  });
});
