import waitUntilReadyFactory from '../waitUntilReady';

describe('packages/barterdex-api/src/client/waitUntilReady', () => {
  it('should handle the waitUntilReady correctly', async () => {
    const fakeHttpProvider = {
      version() {
        return 'OK';
      }
    };
    const api = Object.assign({}, fakeHttpProvider, waitUntilReadyFactory());
    const res = await api.waitUntilReady();
    expect(res).toEqual({
      ok: "done"
    });
  });
});
