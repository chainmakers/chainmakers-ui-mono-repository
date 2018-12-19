import getfeeFactory from '../getfee';

describe('src/getfee', () => {
  it('should handle the getfee correctly', () => {
    const coin = 'BEER';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          method: 'getfee'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, getfeeFactory());
    api.getfee({
      coin
    });
  });
});