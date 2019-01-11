import {
  validateDate,
  getYear,
  appendZero,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  getDayOfWeek,
  getAM_PM_Hours,
  formatDate,
  TIME_FORMAT,
  dotProp,
  configManager,
  choice,
  fraction,
  hexString,
  generateSeed,
  generateWif
} from '../index';

it('packages/barterdex-utilities/src/index', () => {
  expect(typeof validateDate).toEqual('function');
  expect(typeof getYear).toEqual('function');
  expect(typeof appendZero).toEqual('function');
  expect(typeof getMonth).toEqual('function');
  expect(typeof getDate).toEqual('function');
  expect(typeof getHours).toEqual('function');
  expect(typeof getMinutes).toEqual('function');
  expect(typeof getSeconds).toEqual('function');
  expect(typeof getMilliseconds).toEqual('function');
  expect(typeof getDayOfWeek).toEqual('function');
  expect(typeof getAM_PM_Hours).toEqual('function');
  expect(typeof formatDate).toEqual('function');
  expect(typeof dotProp).toEqual('object');
  expect(typeof configManager).toEqual('function');
  expect(typeof choice).toEqual('function');
  expect(typeof fraction).toEqual('function');
  expect(typeof hexString).toEqual('function');
  expect(typeof generateSeed).toEqual('function');
  expect(typeof generateWif).toEqual('function');
});