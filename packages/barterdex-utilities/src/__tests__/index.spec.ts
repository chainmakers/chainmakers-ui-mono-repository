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
  TIME_FORMAT
} from '../index';

it('packages/barterdex-utilities/src/dateFormat', () => {
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
});