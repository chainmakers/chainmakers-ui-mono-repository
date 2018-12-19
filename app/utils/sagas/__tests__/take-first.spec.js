// https://github.com/redux-saga/redux-saga/blob/50efcd293414d6c73db93d09faebaadb47b06387/packages/core/__tests__/sagaHelpers/takeEvery.js
import { createStore, applyMiddleware } from 'redux';
import sagaMiddleware, { delay } from 'redux-saga';
import { call, cancel, take } from 'redux-saga/effects';
import takeFirst from '../take-first';

const middleware = sagaMiddleware();
const type = 'TESTS_TAKE_FIRST';
const TIMEOUT = 15000;
const DELAY = 2000;
const actual = [];

function* testSagaFunc(payload) {
  yield call(delay, DELAY);
  actual.push(payload);
}

function* root() {
  const task = yield takeFirst(type, testSagaFunc);
  yield take('CANCEL_WATCHER');
  yield cancel(task);
}

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

describe('utils/take-first', () => {
  it(
    'should handle the takeFirst function correctly',
    async done => {
      const store = applyMiddleware(middleware)(createStore)(() => {});
      const mainTask = middleware.run(root);
      store.dispatch({
        type
      });
      store.dispatch({
        type
      });
      store.dispatch({
        type
      });
      store.dispatch({
        type
      });
      await wait(DELAY + 500);
      store.dispatch({
        type: 'CANCEL_WATCHER'
      });
      store.dispatch({
        type
      });
      const result = await mainTask.done;
      expect(result).toEqual(undefined);
      expect([{ type }]).toEqual(actual);
      done();
    },
    TIMEOUT
  );
});
