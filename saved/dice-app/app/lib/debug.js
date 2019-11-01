// @flow
const APPLICATION = 'kmdice';

export default function getDebug(info: string) {
  // eslint-disable-next-line global-require
  return require('debug')(`${APPLICATION}:${info}`);
}
