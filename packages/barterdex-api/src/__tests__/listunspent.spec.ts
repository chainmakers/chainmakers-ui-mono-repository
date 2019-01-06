import listunspentFactory from '../listunspent';

describe('packages/barterdex-api/src/listunspent', () => {
  it('should handle the listunspent correctly', () => {
    const coin = 'BEER';
    const address = 'address';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          address,
          method: 'listunspent'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, listunspentFactory());
    api.listunspent({
      coin,
      address
    });
  });
});
