import { Client, Server } from '../index';

it('packages/barterdex-api/src/index', () => {
  expect(typeof Client).toEqual('function');
  expect(typeof Server).toEqual('function');
});
