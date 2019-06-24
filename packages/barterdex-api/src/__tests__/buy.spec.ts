import buyFactory from '../buy';

describe('packages/barterdex-api/src/client/buy', () => {
  it('should handle the addServer correctly', () => {
    const base = 'COQUI';
    const rel = 'KMD';
    const relvolume = '2.3';
    const price = '0.1';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'buy',
          base,
      rel,
      relvolume,
      price
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, buyFactory());
    api.buy({
      base,
      rel,
      relvolume,
      price
    });
  });
});
