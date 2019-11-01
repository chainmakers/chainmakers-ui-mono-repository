### API

```
import config from './config';

config.set('foo', 'bar');
config.get('foo') === 'bar';

config.set('bar.baz', true);
config.get('bar') === {baz: true};
```
