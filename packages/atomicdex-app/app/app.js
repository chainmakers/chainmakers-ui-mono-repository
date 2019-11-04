/* eslint-disable */
// This is require('source-map-support').install() in the default index.html template.
// window.sourceMapSupport will exist in the browser once preload.js runs.

// window.sourceMapSupport.install();
import { setup } from './utils/config';

(async () => {
  await setup();
  require('./index.renderer');
})();
/* eslint-enable */
