import addServerFactory from '../add-server';

describe('src/add-server', () => {
  it('should handle the addServer correctly', () => {
    const coin = 'coin';
    const ipaddr = '127.0.0.1';
    const port = 65000;

    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          ipaddr,
          port,
          method: 'electrum'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, addServerFactory());
    api.addServer({
      coin,
      ipaddr,
      port
    });
  });
});
