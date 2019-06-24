import electrumFactory from '../electrum';

describe('packages/barterdex-api/src/client/electrum', () => {
  it('should handle the electrum correctly', () => {
    const coin = 'coin';
    const txversion = 4;
    const urls = ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024'];

    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          txversion,
          urls,
          method: 'electrum'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, electrumFactory());
    api.electrum({
      coin,
      txversion,
      urls
    });
  });
});
