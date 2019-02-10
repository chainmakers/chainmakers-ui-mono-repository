import * as fs from "fs";
import * as path from "path";
import * as split2 from "split2";
import { spawn, ChildProcess } from "child_process";
import {
  getMarketmakerPlatformPath
} from "./paths";
import killProcess from './killprocess';
import { StateType } from "./schema";

const debug = require("debug")("barterdex-api:server:control");

type StartConfigType = {
  marketmakerPath?: string,
  passphrase?: string,
  userData: string,
  coins: any
};

type StartOptionsType = {
  detached?: boolean,
  logs?: boolean,
};

type StopType = {
  force: boolean
};

export default function controlFactory(state: StateType) {
  debug(`setup control for ${state.gui}`);
  let childProcess = null;
  return {
    getLogFile(userData) {
      return path.join(userData, `mm2_info.log`);
    },
    getErrorLogFile(userData) {
      return path.join(userData, `mm2_error.log`);
    },
    start(config: StartConfigType, options: StartOptionsType = {}): Promise<any> {
      debug(`start marketmaker app for ${state.gui}`);

      let marketmakerFile = config.marketmakerPath;
      if (!marketmakerFile) {
        marketmakerFile = getMarketmakerPlatformPath(state.bin);
      }
      
      return new Promise(async (resolve, reject) => {
        try {
          const opts: {
            cwd: string,
            detached?: boolean 
          } = {
            cwd: config.userData
          };

          if (!fs.existsSync(config.userData)) {
            fs.mkdirSync(config.userData);
          }
          
          if (options.detached) {
            opts.detached = true;
          }

          if (childProcess && !childProcess.killed) {
            debug("child process is really started");
            return resolve({
              ok: "done"
            });
          }

          const startparams = Object.assign({
            netid: state.netid,
            client: state.client,
            gui: state.gui,
            passphrase: 'default',
            userhome: state.userhome,
            rpcport: state.rpcport
          }, config);

          childProcess = spawn(marketmakerFile,
            [JSON.stringify(startparams)],
            opts,
          );

          // https://nodejs.org/api/child_process.html#child_process_subprocess_unref
          if (options.detached) {
            childProcess.unref();
          }

          childProcess.on("error", error => {
            debug(error.message);
            reject(error);
          });

          childProcess.stdout.setEncoding("utf8");
          childProcess.stdout
            .pipe(split2())
            .on("data", data => {
              debug(`LOG: ${data}`)
            });

          if (options.logs) {
            const logStream = fs.createWriteStream(this.getLogFile(config.userData), {
              flags: "w"
            });
            childProcess.stdout.pipe(logStream);
          }

          childProcess.stderr.setEncoding("utf8");
          childProcess.stderr
            .pipe(split2())
            .on("data", data => {
              debug(`ERROR: ${data}`)
            });

          if (options.logs) {
            const errorLogStream = fs.createWriteStream(
              this.getErrorLogFile(config.userData),
              {
                flags: "w"
              }
            );
            childProcess.stderr.pipe(errorLogStream);
          }

          childProcess.on("exit", (code, signal) => {
            debug(
              `child process terminated due to receipt of signal ${signal} and code ${code}`
            );
            childProcess = null;
          });

          if (typeof childProcess.pid === "number") {
            resolve({
              ok: "done"
            });
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    stop(
      config: StopType = {
        force: false
      }
    ): Promise<any> {
      debug(`stop marketmaker for ${state.gui}`);
      // return new Promise((resolve, reject) => {
      return new Promise(resolve => {
        if (childProcess) {
          childProcess.kill();
        }

        childProcess = null;
        if (config.force) {
          killProcess('marketmaker');
        }
        resolve({
          ok: "done"
        });
      });
    },
    isRunning(): boolean {
      return !!childProcess;
    },
    on(event: string, callback: Function): void {
      if (childProcess) {
        childProcess.on(event, callback);
      }
    }
  };
}
