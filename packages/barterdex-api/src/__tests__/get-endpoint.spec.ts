import getendpoint from '../get-endpoint';

describe('src/getendpoint', () => {
  it('should handle the getendpoint correctly', () => {
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'getendpoint'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, getendpoint());
    api.getendpoint();
  });
});