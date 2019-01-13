import config from '../index';

it('main/config', () => {
  expect(typeof config.get).toEqual('function');
  expect(typeof config.set).toEqual('function');
  expect(typeof config.has).toEqual('function');
  expect(typeof config.delete).toEqual('function');
  expect(typeof config.clear).toEqual('function');
});
