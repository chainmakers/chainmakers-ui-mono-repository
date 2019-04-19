import myswapstatusFactory from '../my-swapstatus';

describe('packages/barterdex-api/src/client/myswapstatus', () => {
  it('should handle the swapstatus correctly', () => {
    const p = {
      uuid: '1234'
    }
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          params: p,
          method: 'my_swap_status'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, myswapstatusFactory());
    api.myswapstatus({
      params: p
    });
  });
});
