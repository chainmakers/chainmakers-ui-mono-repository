// @flow
import { session } from 'electron';
import { parseURL } from 'barterdex-utilities';

const debug = require('debug')('atomicapp:main:ipblock');

export function ipblock(details, callback) {
  // protocol.interceptHttpProtocol('atom', (request, callback) => {
  //   const url = request.url.substr(7)
  //   callback({ path: path.normalize(`${__dirname}/${url}`) })
  // }, (error) => {
  //   if (error) console.error('Failed to register protocol')
  // })

  const matches = parseURL(details.url);
  const whitelist = /fonts.gstatic.com|fonts.googleapis.com|127.0.0.1|localhost/gi;
  if (
    matches.scheme === 'file' ||
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
  // session.defaultSession.setPermissionRequestHandler(null);
  // session.defaultSession.setPermissionRequestHandler(
  //   (webContents, permission, callback) => {
  //     const url = webContents.getURL();
  //     console.log(url, permission, 'permission');
  //     if (permission === 'notifications') {
  //       // Approves the permissions request
  //       callback(true);
  //     }

  //     // Verify URL
  //     if (!url.startsWith('https://example.com/')) {
  //       // Denies the permissions request
  //       return callback(false);
  //     }
  //   }
  // );
  session.defaultSession.webRequest.onBeforeRequest(['*://*./*'], ipblock);
}
