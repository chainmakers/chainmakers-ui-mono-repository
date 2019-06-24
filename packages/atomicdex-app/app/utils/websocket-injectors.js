import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import invariant from 'invariant';
import conformsTo from 'lodash/conformsTo';

import checkStore from './check-store';
import barterDexSocket from './barterdex-socket';
import { WEBSOCKET_DAEMON, WEBSOCKET_RESTART_ON_REMOUNT } from './constants';

const allowedModes = [WEBSOCKET_DAEMON, WEBSOCKET_RESTART_ON_REMOUNT];

const debug = require('debug')('atomicapp:utils:websocket-injectors');

const checkKey = key =>
  invariant(
    isString(key) && !isEmpty(key),
    '(app/utils...) injectWebsocket: Expected `key` to be a non empty string'
  );

const checkDescriptor = descriptor => {
  const shape = {
    subscribe: isFunction,
    mode: mode => isString(mode) && allowedModes.includes(mode)
  };
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectWebsocket: Expected a valid subscribe descriptor'
  );
};

export function injectWebsocketFactory(store, isValid) {
  return function injectWebsocket(key, descriptor = {}, args) {
    if (!isValid) checkStore(store);

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || WEBSOCKET_RESTART_ON_REMOUNT
    };
    const { subscribe, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasWebsocket = Reflect.has(store.injectedWebsocket, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedWebsocket[key];
      // enable hot reloading of daemon and once-till-unmount subscribe
      if (hasWebsocket && oldDescriptor.subscribe !== subscribe) {
        oldDescriptor.unsubscribe();
        hasWebsocket = false;
      }
    }
    if (!hasWebsocket || (hasWebsocket && mode !== WEBSOCKET_DAEMON)) {
      const { dispatch, getState } = store;
      debug(`new subscribe with ${key}`);
      const newSubscribe = message => subscribe(message, dispatch, getState);
      /* eslint-disable no-param-reassign */
      store.injectedWebsocket[key] = {
        ...newDescriptor,
        unsubscribe: barterDexSocket.subscribe(newSubscribe, args)
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

export function ejectWebsocketFactory(store, isValid) {
  return function ejectWebsocket(key) {
    if (!isValid) checkStore(store);
    checkKey(key);

    if (Reflect.has(store.injectedWebsocket, key)) {
      const descriptor = store.injectedWebsocket[key];
      if (descriptor.mode && descriptor.mode !== WEBSOCKET_DAEMON) {
        debug(`unsubscribe with ${key}`);
        descriptor.unsubscribe();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedWebsocket[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectWebsocket: injectWebsocketFactory(store, true),
    ejectWebsocket: ejectWebsocketFactory(store, true)
  };
}
