import { ipblock } from '../setPermissionRequestHandler';

it('main/setPermissionRequestHandler', () => {
  expect(typeof ipblock).toEqual('function');
  function expectedTrue({ cancel }) {
    expect(cancel).toEqual(true);
  }
  function expectedFalse({ cancel }) {
    expect(cancel).toEqual(false);
  }

  [
    'https://github.com/chainmakers/komodo-ui-mono-repository',
    'https://www.notion.so/namhoang/ebooks',
    'localhost:1212',
    '127.0.0.1:7783',
    'fonts.googleapis.com'
  ].map(url =>
    ipblock(
      {
        url
      },
      expectedTrue
    )
  );

  [
    'https://fonts.gstatic.com',
    'file:///Volumes/Data/chainswap-app/app/app.html',
    'chrome-extension://devtron/static/devtron.html',
    'chrome-devtools://devtools/bundled/help/help_module.js',
    'http://localhost:1212/dist/renderer.dev.js',
    'ws://localhost:1212/sockjs-node/052/ylqlotee/websocket'
  ].map(url =>
    ipblock(
      {
        url
      },
      expectedFalse
    )
  );
});
