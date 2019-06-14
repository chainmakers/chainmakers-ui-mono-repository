import parseURL from '../parseURL';

it('packages/barterdex-utilities/src/parseURL', () => {
  expect(parseURL('http://username:password@hostname/path?arg=value#anchor')).toEqual({
    authority: 'username:password@hostname',
    directory: '/',
    file: 'path',
    fragment: 'anchor',
    host: 'hostname',
    pass: 'password',
    path: '/path',
    query: 'arg=value',
    queryKey: { arg: 'value' },
    relative: '/path?arg=value#anchor',
    scheme: 'http',
    source: 'http://username:password@hostname/path?arg=value#anchor',
    user: 'username',
    userInfo: 'username:password'
  });

  expect(parseURL('http://en.wikipedia.org/wiki/%22@%22_%28album%29')).toEqual({
    authority: 'en.wikipedia.org',
    directory: '/wiki/',
    file: '%22@%22_%28album%29',
    host: 'en.wikipedia.org',
    path: '/wiki/%22@%22_%28album%29',
    queryKey: {},
    relative: '/wiki/%22@%22_%28album%29',
    scheme: 'http',
    source: 'http://en.wikipedia.org/wiki/%22@%22_%28album%29'
  });

  expect(parseURL('https://host.domain.tld/a@b.c/folder')).toEqual({
    authority: 'host.domain.tld',
    directory: '/a@b.c/',
    file: 'folder',
    host: 'host.domain.tld',
    path: '/a@b.c/folder',
    queryKey: {},
    relative: '/a@b.c/folder',
    scheme: 'https',
    source: 'https://host.domain.tld/a@b.c/folder'
  });

  expect(parseURL('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar')).toEqual({
    authority: 'gooduser:secretpassword@www.example.com',
    directory: '/a@b.c/',
    file: 'folder',
    host: 'www.example.com',
    pass: 'secretpassword',
    path: '/a@b.c/folder',
    query: 'foo=bar',
    queryKey: { foo: 'bar' },
    relative: '/a@b.c/folder?foo=bar',
    scheme: 'https',
    source:
      'https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar',
    user: 'gooduser',
    userInfo: 'gooduser:secretpassword'
  });
});