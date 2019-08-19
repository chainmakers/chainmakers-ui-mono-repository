import getEnabledCoinsFactory from '../get-enabled-coins';

describe('packages/barterdex-api/src/client/getEnabledCoins', () => {
  it('should handle the getEnabledCoins correctly', () => {
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'get_enabled_coins'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, getEnabledCoinsFactory());
    api.getEnabledCoins();
  });
});