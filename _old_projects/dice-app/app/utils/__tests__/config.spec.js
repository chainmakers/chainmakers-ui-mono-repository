import getConfig, { setup } from '../config';

const TIME_OUT = 500;

describe('utils/config', () => {
  it(
    'should create the config correctly',
    async () => {
      const config = await setup();
      expect(typeof config.get).toEqual('function');
      expect(typeof config.set).toEqual('function');
      expect(typeof config.has).toEqual('function');
      expect(typeof config.delete).toEqual('function');
      expect(typeof config.clear).toEqual('function');
      expect(typeof config.getFromIPC).toEqual('function');
    },
    TIME_OUT
  );
  it(
    'should handle getFromIPC correctly',
    async () => {
      const config = getConfig();
      expect(await config.getFromIPC('APPNAME')).toEqual('atomicapp');
      expect(await config.getFromIPC('barterdex')).toEqual(
        'http://127.0.0.1:7783'
      );
      expect(await config.getFromIPC('loginWindowSize')).toEqual({
        height: 680,
        width: 1156
      });
      // clear
      config.clear();
      expect(config.get()).toEqual({});
      expect(await config.getFromIPC('loginWindowSize')).toEqual({
        height: 680,
        width: 1156
      });
      expect(config.get()).toEqual({
        loginWindowSize: {
          height: 680,
          width: 1156
        }
      });
    },
    TIME_OUT
  );
});
