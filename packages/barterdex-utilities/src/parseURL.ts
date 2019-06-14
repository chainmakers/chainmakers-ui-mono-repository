// https://github.com/hirak/phpjs/blob/master/functions/url/parse_url.js
//       discuss at: http://phpjs.org/functions/parse_url/
//      original by: Steven Levithan (http://blog.stevenlevithan.com)
// reimplemented by: Brett Zamir (http://brett-zamir.me)
//         input by: Lorenzo Pisani
//         input by: Tony
//      improved by: Brett Zamir (http://brett-zamir.me)
//             note: original by http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
//             note: blog post at http://blog.stevenlevithan.com/archives/parseuri
//             note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
//             note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
//             note: a seriously malformed URL.
//             note: Besides function name, is essentially the same as parseUri as well as our allowing
//             note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
//        example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
//        returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
//        example 2: parse_url('http://en.wikipedia.org/wiki/%22@%22_%28album%29');
//        returns 2: {scheme: 'http', host: 'en.wikipedia.org', path: '/wiki/%22@%22_%28album%29'}
//        example 3: parse_url('https://host.domain.tld/a@b.c/folder')
//        returns 3: {scheme: 'https', host: 'host.domain.tld', path: '/a@b.c/folder'}
//        example 4: parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar');
//        returns 4: { scheme: 'https', host: 'www.example.com', path: '/a@b.c/folder', query: 'foo=bar', user: 'gooduser', pass: 'secretpassword' }

const parser = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;
 const key = [
  'source',
  'scheme',
  'authority',
  'userInfo',
  'user',
  'pass',
  'host',
  'port',
  'relative',
  'path',
  'directory',
  'file',
  'query',
  'fragment'
];

const name ='queryKey';

const parserQuery = /(?:^|&)([^&=]*)=?([^&]*)/g;

export default function parseURL(url: string) {
  let query;
  const m = parser.exec(url);
  const uri = {};
  let i = 14;

  while (i--) {
    if (m[i]) {
      uri[key[i]] = m[i];
    }
  }

  uri[name] = {};
  query = uri[key[12]] || '';
  query.replace(parserQuery, (_, $1, $2) => {
    if ($1) {
      uri[name][$1] = $2;
    }
  });

  return uri;
}
