import listTransactions from '../list-transactions';

describe('packages/barterdex-api/src/client/list-transactions', () => {
  it('should handle the listTransactions correctly', () => {
    const coin = 'KMD';
    const address = '0dxaddress';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          address,
          count: 10,
          method: 'listtransactions'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, listTransactions());
    api.listTransactions({
      coin,
      address
    });
  });
});
