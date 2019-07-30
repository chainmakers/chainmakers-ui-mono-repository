// @flow
import { shell } from 'electron';
import ipc from 'electron-better-ipc';
import config from '../config';

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
}
