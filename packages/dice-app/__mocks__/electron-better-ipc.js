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
      return reject(new Error('unknow path'));
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
