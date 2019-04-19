import setupClient from '../index';

const entrypoint = 'http://localhost:7083';
const BarterDexAPI = setupClient({
  entrypoint
});

describe('packages/barterdex-api/src/index', () => {
  it('should create the Client correctly', () => {
    expect(typeof BarterDexAPI.electrum).toEqual('function');
    expect(typeof BarterDexAPI.balance).toEqual('function');
    expect(typeof BarterDexAPI.buy).toEqual('function');
    expect(typeof BarterDexAPI.getendpoint).toEqual('function');
    expect(typeof BarterDexAPI.getfee).toEqual('function');
    expect(typeof BarterDexAPI.isready).toEqual('function');
    expect(typeof BarterDexAPI.listTransactions).toEqual('function');
    expect(typeof BarterDexAPI.orderbook).toEqual('function');
    expect(typeof BarterDexAPI.privateCall).toEqual('function');
    expect(typeof BarterDexAPI.swapstatus).toEqual('function');
    expect(typeof BarterDexAPI.myswapstatus).toEqual('function');
    expect(typeof BarterDexAPI.setUserpass).toEqual('function');
    expect(typeof BarterDexAPI.getUserpass).toEqual('function');
    expect(typeof BarterDexAPI.listunspent).toEqual('function');
    expect(typeof BarterDexAPI.myBalance).toEqual('function');
    expect(typeof BarterDexAPI.sendrawtransaction).toEqual('function');
    expect(typeof BarterDexAPI.recentswaps).toEqual('function');
    expect(typeof BarterDexAPI.resetUserpass).toEqual('function');
    expect(typeof BarterDexAPI.version).toEqual('function');
    expect(typeof BarterDexAPI.withdraw).toEqual('function');
  });
});
