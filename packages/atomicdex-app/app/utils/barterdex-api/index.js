// @flow
import Client from 'barterdex-api';
import getConfig from 'utils/config';

const config = getConfig();

let api = null;

function setup() {
  if (api) return api;

  const paths = config.get('paths');
  api = Client({
    entrypoint: config.get('barterdex'),
    home: paths.homeDir
  });
  window.api = api;
  return api;
}

export default setup();
