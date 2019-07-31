// @flow
import path from 'path';
import { shell } from 'electron';
import ipc from 'electron-better-ipc';
import config from '../config';
import readLastLines from '../utils/readLastLines';

const log = require('electron-log');

export default function setup() {
  ipc.answerRenderer('open-new-github-issue', () => {
    shell.openExternal('http://electron.atom.io');
    return {
      ok: 'done'
    };
  });

  ipc.answerRenderer('open-source-code', () => {
    shell.openExternal(
      'https://github.com/chainmakers/chainmakers-ui-mono-repository'
    );
    return {
      ok: 'done'
    };
  });

  ipc.answerRenderer('open-discord-channel', () => {
    shell.openExternal('https://discord.gg/nAPmwPC');
    return {
      ok: 'done'
    };
  });

  ipc.answerRenderer('open-app-folder', () => {
    shell.openItem(config.get('paths.userDataDir'));
    return {
      ok: 'done'
    };
  });

  ipc.answerRenderer('open-mm2-folder', () => {
    shell.openItem(config.get('paths.userDataDir'));
    return {
      ok: 'done'
    };
  });

  ipc.answerRenderer('read-mm2-logs', async (maxLineCount: number) => {
    try {
      const lines = await readLastLines({
        filePath: path.join(config.get('paths.userDataDir'), 'mm2_info.log'),
        maxLineCount
      });
      return lines;
    } catch (err) {
      log.error(err.message);
      throw err;
    }
  });

  ipc.answerRenderer('read-application-logs', async (maxLineCount: number) => {
    try {
      const lines = await readLastLines({
        filePath: path.join(log.transports.file.file),
        maxLineCount
      });
      return lines;
    } catch (err) {
      log.error(err.message);
      throw err;
    }
  });
}
