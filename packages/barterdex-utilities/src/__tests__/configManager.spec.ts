import configManager from '../configManager';

describe('packages/barterdex-utilities/src/configManager', () => {
  it('get', () => {
    expect(typeof configManager).toEqual('function');

    const config = configManager();

    expect(config.get()).toEqual({});
    expect(config.get('api')).toEqual(undefined);
    expect(config.get('api.path1.path2')).toEqual(undefined);
    expect(config.get('')).toEqual(undefined);
  });

  it('set', () => {
    const config = configManager();

    config.set('foo.bar', 2);
    expect(config.get('foo.bar')).toEqual(2);

    config.set({
      hello: 'word'
    });
    expect(config.get('hello')).toEqual('word');
  });

  it('has', () => {
    const config = configManager();

    const f1 = { foo: { bar: 1 } };
    config.set('foo', f1.foo);
    expect(config.has('foo.bar')).toEqual(true);
    expect(config.has()).toEqual(false);
    expect(config.has('foo')).toEqual(true);
  });

  it('delete', () => {
    const config = configManager();

    const f1 = { foo: { bar: 1 } };
    config.set('foo', f1.foo);
    expect(config.has('foo.bar')).toEqual(true);
    expect(config.has('foo')).toEqual(true);

    config.delete('foo.bar');
    expect(config.has('foo.bar')).toEqual(false);
    expect(config.has('foo')).toEqual(true);
  });

  it('clear', () => {
    const config = configManager();

    const f1 = { foo: { bar: 1 } };
    config.set('foo', f1.foo);
    expect(config.has('foo.bar')).toEqual(true);
    expect(config.has('foo')).toEqual(true);

    config.clear();
    expect(config.has('foo.bar')).toEqual(false);
    expect(config.has('foo')).toEqual(false);
    expect(config.get()).toEqual({});
  });
});
