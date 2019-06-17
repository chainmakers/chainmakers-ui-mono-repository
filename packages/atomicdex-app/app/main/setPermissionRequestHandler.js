// @flow
import { session } from 'electron';
import url from 'url';

const debug = require('debug')('atomicapp:main:ipblock');

export function ipblock(details, callback) {
  // protocol.interceptHttpProtocol('atom', (request, callback) => {
  //   const url = request.url.substr(7)
  //   callback({ path: path.normalize(`${__dirname}/${url}`) })
  // }, (error) => {
  //   if (error) console.error('Failed to register protocol')
  // })

  // console.log(details.url);
  const matches = url.parse(details.url);
  const whitelist = /fonts.gstatic.com|fonts.googleapis.com|127.0.0.1:7783|localhost:1212/gi;
  if (
    matches.protocol === 'file:' ||
    matches.protocol === 'chrome-devtools:' ||
    matches.protocol === 'chrome-extension:'
  ) {
    callback({ cancel: false });
  } else if (matches.protocol === 'https:' || matches.protocol === 'http:') {
    if (whitelist.test(matches.host)) {
      callback({ cancel: false });
    } else {
      debug(`block request to ${matches.host}`);
      callback({ cancel: true });
    }
  } else {
    // we block all requests
    debug(`block request to ${matches.host}`);
    callback({ cancel: false });
  }
}

export default function initializeBlockingIP() {
  debug('setup');
  session.defaultSession.webRequest.onBeforeRequest(['*://*./*'], ipblock);
  session.defaultSession.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      const url = webContents.getURL();
      console.log(url, permission, 'permission');
      if (permission === 'notifications') {
        // Approves the permissions request
        callback(true);
      }

      // Verify URL
      if (!url.startsWith('https://example.com/')) {
        // Denies the permissions request
        return callback(false);
      }
    }
  );
}
