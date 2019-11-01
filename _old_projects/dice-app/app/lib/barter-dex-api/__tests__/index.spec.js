import BarterDexAPI from '../index';

describe('app/lib/barter-dex-api/index', () => {
  it('should create the BarterDexAPI correctly', () => {
    expect(typeof BarterDexAPI.addServer).toEqual('function');
    expect(typeof BarterDexAPI.balance).toEqual('function');
    expect(typeof BarterDexAPI.buy).toEqual('function');
    expect(typeof BarterDexAPI.getendpoint).toEqual('function');
    expect(typeof BarterDexAPI.getfee).toEqual('function');
    expect(typeof BarterDexAPI.isready).toEqual('function');
    expect(typeof BarterDexAPI.listTransactions).toEqual('function');
    expect(typeof BarterDexAPI.orderbook).toEqual('function');
    expect(typeof BarterDexAPI.login).toEqual('function');
    expect(typeof BarterDexAPI.publicCall).toEqual('function');
    expect(typeof BarterDexAPI.privateCall).toEqual('function');
    expect(typeof BarterDexAPI.get).toEqual('function');
    expect(typeof BarterDexAPI.swapstatus).toEqual('function');
    expect(typeof BarterDexAPI.setUserpass).toEqual('function');
    expect(typeof BarterDexAPI.getUserpass).toEqual('function');
    expect(typeof BarterDexAPI.listunspent).toEqual('function');
    expect(typeof BarterDexAPI.sendrawtransaction).toEqual('function');
    expect(typeof BarterDexAPI.recentswaps).toEqual('function');
    expect(typeof BarterDexAPI.resetUserpass).toEqual('function');
    expect(typeof BarterDexAPI.withdraw).toEqual('function');
  });
});
