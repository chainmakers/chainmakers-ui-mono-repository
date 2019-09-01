import myOrdersFactory from '../my-orders';

describe('packages/barterdex-api/src/client/myOrders', () => {
  it('should handle the myOrders correctly', () => {
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'my_orders'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, myOrdersFactory());
    api.myOrders();
  });
});