import myRecentSwapsFactory from '../my-recent-swaps';

describe('packages/barterdex-api/src/client/myRecentSwaps', () => {
  it('should handle the myRecentSwaps correctly', () => {
    const limit = 10;
    const from_uuid = 'from_uuid';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'my_recent_swaps'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, myRecentSwapsFactory());
    api.myRecentSwaps();
  });
});