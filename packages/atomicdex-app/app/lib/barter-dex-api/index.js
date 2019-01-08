// @flow
import barterdexApi from 'barterdex-api';
import getConfig from '../config';

const config = getConfig();

let api = null;

function setup() {
  if (api) return api;

  const paths = config.get('paths');
  api = barterdexApi(config.get('barterdex'), paths.homeDir);

  return api;
}

export default setup();
