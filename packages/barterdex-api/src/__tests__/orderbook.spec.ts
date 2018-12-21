import orderbook from '../orderbook';

describe('src/orderbook', () => {
  it('should handle the orderbook correctly', () => {
    const base = 'base';
    const rel = 'rel';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          base,
          rel,
          method: 'orderbook'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, orderbook());
    api.orderbook({
      base,
      rel
    });
  });
});