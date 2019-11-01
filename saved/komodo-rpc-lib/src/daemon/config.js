// @flow
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import readLastLines from '../utils/readLastLines';
import { getKomodoPath, getApplicationPath } from '../paths';
import type { StateType } from './schema';

const debug = require('debug')('kmdrpc:daemon:config');

export default function configFactory(state: StateType) {
  debug(`setup config for ${state.coin}`);
  return {
    getConfigFile(komodoPath: string = getKomodoPath()) {
      const coin = this.getCoin();
      return coin !== 'komodo'
        ? path.join(komodoPath, coin, `${coin}.conf`)
        : path.join(komodoPath, `komodo.conf`);
    },
    getConfig(config: string = this.getConfigFile()): Promise<any> {
      return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(config)) {
          reject(new Error(`not found config file in ${config}`));
        } else {
          const result = {};
          const lineReader = readline.createInterface({
            input: fs.createReadStream(config)
          });

          lineReader.on('line', l => {
            const line = l.trim();
            if (line && line.length > 0) {
              const [v1, v2] = line.split('=');
              // is array
              if (result[v1] && result[v1].push) {
                result[v1].push(v2);
              } else if (result[v1]) {
                const tq = result[v1];
                result[v1] = [tq, v2];
              } else {
                result[v1] = v2;
              }
            }
          });

          lineReader.on('close', () => {
            resolve(result);
          });
        }
      });
    },
    getApplicationName() {
      return state.applicationName;
    },
    getCoin() {
      return state.coin;
    },
    getApplicationPath() {
      return getApplicationPath(this.getApplicationName());
    },
    // https://github.com/KomodoPlatform/Agama/blob/master/routes/api/daemonControl.js#L224
    getLogFile() {
      return path.join(this.getApplicationPath(), `${state.coin}.log`);
    },
    getErrorLogFile() {
      return path.join(this.getApplicationPath(), `${state.coin}_error.log`);
    },
    getLog(maxLineCount?: number): Promise<any> {
      return readLastLines({
        filePath: this.getLogFile(),
        maxLineCount
      });
    },
    getErrorLog(maxLineCount?: number): Promise<any> {
      return readLastLines({
        filePath: this.getErrorLogFile(),
        maxLineCount
      });
    }
  };
}
