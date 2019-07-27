import enableFactory from '../enable';

describe('packages/barterdex-api/src/client/enable', () => {
  it('should handle the enable correctly', () => {
    const coin = 'ETH';
    const urls = ['eth1.cipig.net:8555', 'eth2.cipig.net:8555', 'eth3.cipig.net:8555'];
    const name = 'Ethereum';
    const swap_contract_address = '0x8500AFc0bc5214728082163326C2FF0C73f4a871';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          urls,
          name,
          swap_contract_address,
          method: 'enable'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, enableFactory());
    api.enable({
      coin,
      urls,
      name,
      swap_contract_address
    });
  });
});
