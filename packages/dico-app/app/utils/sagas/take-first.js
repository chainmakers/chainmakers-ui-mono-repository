import { fork, call, take } from 'redux-saga/effects';

// NOTE: Dont use cancel() function in takeFirst;

export default function takeFirst(pattern, saga, ...args) {
  // eslint-disable-next-line func-names
  return fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, ...args.concat(action));
    }
  });
}
