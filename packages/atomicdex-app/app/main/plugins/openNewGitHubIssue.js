// @flow
import path from 'path';
import os from 'os';
import { shell, app } from 'electron';
import ipc from 'electron-better-ipc';
import config from '../config';
import readLastLines from '../utils/readLastLines';

const log = require('electron-log');

const debugInfo = () =>
  `Application: ${app.getName()} ${app.getVersion()}
Electron: ${process.versions.electron || 'N/A'}
OS: ${process.platform} ${os.release()}
Locale: ${app.getLocale()}
`.trim();

// https://github.com/sindresorhus/new-github-issue-url
// NOTE: we copy this since it's small and security reason
function openNewIssueOnGithub(options = {}) {
  let repoUrl;
  if (options.repoUrl) {
    repoUrl = options.repoUrl;
  } else if (options.user && options.repo) {
    repoUrl = `https://github.com/${options.user}/${options.repo}`;
  } else {
    throw new Error(
      'You need to specify either the `repoUrl` option or both the `user` and `repo` options'
    );
  }

  const url = new URL(`${repoUrl}/issues/new`);

  const types = [
    'body',
    'title',
    'labels',
    'template',
    'milestone',
    'assignee',
    'projects'
  ];

  for (const type of types) {
    let value = options[type];
    if (value === undefined) {
      continue;
    }

    if (type === 'labels' || type === 'projects') {
      if (!Array.isArray(value)) {
        throw new TypeError(`The \`${type}\` option should be an array`);
      }

      value = value.join(',');
    }

    url.searchParams.set(type, value);
  }

  return url.toString();
}

export default function setup() {
  ipc.answerRenderer('open-new-github-issue', async (mm2Version?: string) => {
    try {
      shell.openExternal(
        openNewIssueOnGithub({
          repoUrl: config.get('repoUrl'),
          body: `MM2: ${mm2Version} \n${debugInfo()}`
        })
      );

      return {
        ok: 'done'
      };
    } catch (err) {
      log.error(err.message);
      return {
        ok: 'failed'
      };
    }
  });

  ipc.answerRenderer('open-source-code', () => {
    shell.openExternal(config.get('repoUrl'));
    return {
      ok: 'done'
    };
  });

  ipc.answerRenderer('open-discord-channel', () => {
    shell.openExternal(config.get('discord'));
    return {
      ok: 'done'
    };
  });

  ipc.answerRenderer('open-app-folder', () => {
    shell.openItem(log.transports.file.file);
    return {
      ok: 'done'
    };
  });

  ipc.answerRenderer('open-mm2-folder', () => {
    shell.openItem(path.join(config.get('paths.userDataDir'), 'mm2_info.log'));
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
        filePath: log.transports.file.file,
        maxLineCount
      });
      return lines;
    } catch (err) {
      log.error(err.message);
      throw err;
    }
  });
}
