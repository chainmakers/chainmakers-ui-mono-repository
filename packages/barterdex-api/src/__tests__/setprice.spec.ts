import setpriceFactory from '../setprice';

describe('packages/barterdex-api/src/client/setprice', () => {
  const base = 'COQUI';
  const rel = 'KMD';
  const price = 0.1;
  const volume = 0.1;

  it('should handle the setprice correctly', () => {
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'setprice',
          base,
          rel,
          broadcast: 1,
          max: true,
          price
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, setpriceFactory());
    api.setprice({
      base,
      rel,
      price
    });
  });

  it('should handle the setprice correctly with broadcast param', () => {
    const broadcast = 0;
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'setprice',
          base,
          rel,
          broadcast,
          max: true,
          price
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, setpriceFactory());
    api.setprice({
      base,
      rel,
      price,
      broadcast
    });
  });

  it('should handle the setprice correctly with volume param', () => {
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'setprice',
          base,
          rel,
          broadcast: 1,
          price,
          max: false,
          volume
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, setpriceFactory());
    api.setprice({
      base,
      rel,
      price,
      volume
    });
  });

});
