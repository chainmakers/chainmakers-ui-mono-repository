import version from '../version';

describe('packages/barterdex-api/src/client/version', () => {
  it('should handle the version correctly', () => {
    const state = {
      userpass: null
    };
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'version'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, version());
    api.version();
  });
});
