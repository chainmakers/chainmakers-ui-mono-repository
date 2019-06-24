/* eslint import/no-unresolved: off, import/no-self-import: off */
require('@babel/register');

const path = require('path');

const config = require('./webpack.config.renderer.dev.babel').default;

config.resolve = {
  extensions: ['.js', '.jsx', '.json'],
  alias: {
    utils: path.join(__dirname, '..', 'app', 'utils')
  }
};

module.exports = config;
