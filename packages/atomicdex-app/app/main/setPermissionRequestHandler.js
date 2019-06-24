// @flow
import { session } from 'electron';
import { parseURL } from 'barterdex-utilities';

const debug = require('debug')('atomicapp:main:ipblock');

export function ipblock(details, callback) {
  const matches = parseURL(details.url);
  const whitelist = /fonts.gstatic.com|fonts.googleapis.com|127.0.0.1|localhost/gi;
  if (
    matches.scheme === 'file' ||
    matches.scheme === 'blob' ||
    matches.scheme === 'chrome-devtools' ||
    matches.scheme === 'chrome-extension'
  ) {
    callback({ cancel: false });
  } else if (
    matches.scheme === 'https' ||
    matches.scheme === 'http' ||
    matches.scheme === 'ws'
  ) {
    if (whitelist.test(matches.host)) {
      callback({ cancel: false });
    } else {
      debug(`block request to ${matches.host}`);
      callback({ cancel: true });
    }
  } else {
    // we block all requests
    debug(`block request to ${matches.host}`);
    callback({ cancel: true });
  }
}

export default function initializeBlockingIP() {
  debug('setup');
  session.defaultSession.webRequest.onBeforeRequest(['*://*./*'], ipblock);
  session.defaultSession.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      // const url = webContents.getURL();
      if (permission === 'notifications') {
        // Approves the permissions request
        return callback(true);
      }
      return callback(false);

      // // Verify URL
      // if (!url.startsWith('https://example.com/')) {
      //   // Denies the permissions request
      //   return callback(false)
      // }
    }
  );
}
