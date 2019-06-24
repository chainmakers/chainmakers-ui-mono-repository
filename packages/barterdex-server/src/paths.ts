import * as os from "os";
import * as path from "path";

export function  getMarketmakerPlatformPath(binDir: string, platform: string = os.platform()) {
  if (platform === "darwin") {
    return path.normalize(`${binDir}/marketmaker/mac/marketmaker`);
  }
  if (platform === "linux") {
    return path.normalize(`${binDir}/marketmaker/linux/marketmaker`);
  }
  if (platform === "win32") {
    return path.normalize(`${binDir}/marketmaker/win/marketmaker.exe`);
  }
  return "";
};
