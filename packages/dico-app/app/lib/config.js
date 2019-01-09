// @flow
const { is } = require('electron-util');

if (is.main) {
  module.exports = require('../main/config'); // eslint-disable-line global-require
} else {
  module.exports = require('../utils/config'); // eslint-disable-line global-require
}
