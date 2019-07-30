// @flow
import { shell } from 'electron';
import ipc from 'electron-better-ipc';

export default function setup() {
  ipc.answerRenderer('open-new-github-issue', () => {
    shell.openExternal('http://electron.atom.io');
    return {
      ok: 'done'
    };
  });
}
