import {
  getMarketmakerPlatformPath
} from "../paths";

describe("packages/barterdex-server/src/server/paths", () => {
  const bin = '/root/bin';

  it("getMarketmakerPlatformPath", () => {
    expect(getMarketmakerPlatformPath(bin, "darwin")).toEqual(
      "/root/bin/marketmaker/mac/marketmaker"
    );
    expect(getMarketmakerPlatformPath(bin, "linux")).toEqual("/root/bin/marketmaker/linux/marketmaker");
    expect(getMarketmakerPlatformPath(bin, "win32")).toEqual("/root/bin/marketmaker/win/marketmaker.exe");
    expect(getMarketmakerPlatformPath(bin, "")).toEqual("");
  });

});