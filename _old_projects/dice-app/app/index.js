/* eslint-disable */
import { setup } from './utils/config';

(async () => {
  await setup();
  require('./index.renderer');
})();
/* eslint-enable */
