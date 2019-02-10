import isReadyFactory from '../is-ready';

describe('packages/barterdex-api/src/client/is-ready', () => {
  it('should handle the isReadyFactory correctly', async () => {
    const fakeHttpProvider = {
      version() {
        return 'OK';
      }
    };
    const api = Object.assign({}, fakeHttpProvider, isReadyFactory());
    const res = await api.isready();
    expect(res).toEqual({ok: 'done'});
  });

  it('should handle the isReadyFactory correctly', async () => {
    const fakeHttpProvider = {
      version() {
        return Promise.reject(new Error('error'));
      }
    };
    const api = Object.assign({}, fakeHttpProvider, isReadyFactory());
    const res = await api.isready();
    expect(res).toEqual({ok: 'failed'});
  });
});