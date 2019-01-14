import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import controlFactory from "../control";

describe("packages/barterdex-api/src/server/control", () => {
  const state = {
    netid: 0,
    client: 1,
    gui: 'AtomicDex',
    userhome: '/home/user/atomic',
    bin: '/root/bin',
    rpcport: 7783
  };

  const control = Object.assign(
    {},
    controlFactory(state)
  );

  test("check methods", () => {
    // expect(typeof control.addDefaultParams).toBe("function");
    expect(typeof control.start).toBe("function");
    expect(typeof control.stop).toBe("function");
    expect(typeof control.isRunning).toBe("function");
    expect(typeof control.isReady).toBe("function");
    expect(typeof control.waitUntilReady).toBe("function");
    expect(typeof control.on).toBe("function");
  });

  test("should handle it correctly", async done => {
    // before
    const userData = path.join(__dirname, "user-data");
    if (fs.existsSync(userData)) {
      execSync(`rm -rf ${userData}`);
    }
    control.getInfo = () => Promise.reject(new Error("not ready"));

    let resultStart = await control.start({
      marketmakerPath: path.join(__dirname, "app"),
      passphrase: 'string',
      userData,
      coins: 'any'
    });
    
    expect(resultStart).toEqual({ ok: "done" });

    resultStart = await control.start({
      marketmakerPath: path.join(__dirname, "app"),
      passphrase: 'string',
      userData,
      coins: 'any'
    });

    expect(resultStart).toEqual({ ok: "done" });
    expect(control.isRunning()).toEqual(true);
    expect(await control.isReady()).toEqual({ ok: "failed" });
    expect(fs.existsSync(userData)).toEqual(true);

    control.getInfo = () => Promise.resolve({});
    expect(await control.isReady()).toEqual({ ok: "done" });
    expect(await control.waitUntilReady()).toEqual({ ok: "done" });

    control.on("exit", (code, signal) => {
      expect(code).toEqual(null);
      expect(signal).toEqual("SIGTERM");
      done();
    });

    const resultStop = await control.stop();
    expect(resultStop).toEqual({ ok: "done" });

    control.getInfo = undefined;
  });

});