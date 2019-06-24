import cancelOrderFactory from '..//cancel-order';

describe('packages/barterdex-api/src/client/cancel-order', () => {
  it('should handle the cancelOrder correctly', () => {
    const uuid = 'uuid';

    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          uuid,
          method: 'cancel_order'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, cancelOrderFactory());
    api.cancelOrder({
      uuid
    });
  });
});
