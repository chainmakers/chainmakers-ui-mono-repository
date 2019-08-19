import stopFactory from '../stop';

describe('packages/barterdex-api/src/client/stop', () => {
  it('should handle the stop correctly', () => {
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'stop'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, stopFactory());
    api.stop();
  });
});
