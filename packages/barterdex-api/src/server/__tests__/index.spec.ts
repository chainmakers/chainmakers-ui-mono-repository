import Server from "../index";

describe('packages/barterdex-api/src/server/index', () => {
  it('should create the Server correctly', () => {
    const d = Server({
      gui: 'AtomicDex',
      userhome: '/home/user/atomic',
      bin: '/root/bin'
    });
    expect(typeof d.start).toBe("function");
    expect(typeof d.stop).toBe("function");
    expect(typeof d.isRunning).toBe("function");
    expect(typeof d.on).toBe("function");
    expect(typeof d.getState).toBe("function");
    expect(d.getState()).toEqual({
      netid: 0,
      client: 1,
      gui: 'AtomicDex',
      userhome: '/home/user/atomic',
      bin: '/root/bin',
      rpcport: 7783
    });
  });
});
