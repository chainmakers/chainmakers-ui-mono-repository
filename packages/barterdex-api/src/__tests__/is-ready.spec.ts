import isReadyFactory from '../is-ready';

describe('packages/barterdex-api/src/is-ready', () => {
  it('should handle the isReadyFactory correctly', async () => {
    const fakeHttpProvider = {
      get() {
        return 'OK';
      }
    };
    const api = Object.assign({}, fakeHttpProvider, isReadyFactory());
    const res = await api.isready();
    expect(res).toEqual('OK');
  });
});