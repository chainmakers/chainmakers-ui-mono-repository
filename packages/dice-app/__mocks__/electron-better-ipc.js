const data = require('./data');

module.exports = {
  callMain(method, path) {
    return new Promise((resolve, reject) => {
      if (method === 'config:get') {
        if (path === 'loginWindowSize')
          return resolve({
            height: 680,
            width: 1156
          });
        return resolve(data);
      }
      if (['komodod:start', 'komodod:stop'].indexOf(method) !== -1) {
        return resolve({
          ok: 'done'
        });
      }
      if (['komodod:rpc'].indexOf(method) !== -1) {
        return resolve(path);
      }
      return reject(new Error(`cant handle: method=${method} path=${path}`));
    });
  },
  answerRenderer(method, path) {
    return new Promise((resolve, reject) => {
      if (method === 'config:get') {
        if (path === 'loginWindowSize')
          return resolve({
            height: 680,
            width: 1156
          });
        return resolve(data);
      }
      return reject(new Error('unknow path'));
    });
  }
};
