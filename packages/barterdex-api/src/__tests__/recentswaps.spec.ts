import recentswaps from '../recentswaps';

describe('src/recentswaps', () => {
  it('should handle the recentswaps correctly', () => {
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'recentswaps'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, recentswaps());
    api.recentswaps();
  });

  it('should handle the recentswaps correctly with limit param', () => {
    const limit = 1;
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          limit,
          method: 'recentswaps'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, recentswaps());
    api.recentswaps({
      limit
    });
  });
});