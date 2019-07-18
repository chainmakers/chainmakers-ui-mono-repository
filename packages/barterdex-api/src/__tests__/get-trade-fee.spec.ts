import getTradeFeeFactory from '../get-trade-fee';

describe('packages/barterdex-api/src/client/get-trade-fee', () => {
  it('should handle the getTradeFee correctly', () => {
    const coin = 'BEER';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          method: 'get_trade_fee'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, getTradeFeeFactory());
    api.getTradeFee({
      coin
    });
  });
});