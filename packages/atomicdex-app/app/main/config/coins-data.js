// @flow

import data from 'barterdex-coin';

export default function loadCoinsData(config) {
  return config.set('marketmaker', {
    data
  });
}
