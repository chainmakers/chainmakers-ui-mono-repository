import { fork, call, take } from 'redux-saga/effects';

// NOTE: Dont use cancel() function in takeFirst;

export default function takeFirst(pattern: string, saga: Function, ...args: any[]) {
  // eslint-disable-next-line func-names
  return fork(function*() {
    while (true) {
      const action = yield take(pattern);
      const params = args.concat(action);
      params.unshift(saga);
      yield call.apply(null, params);
    }
  });
}
