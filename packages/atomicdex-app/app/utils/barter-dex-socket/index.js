// @flow
import WebSocket from 'faye-websocket';

const debug = require('debug')('atomicapp:utils:barter-dex-socket');

function BarterDexWebsocket() {
  // constructor
  let stream = null;
  let currentListeners = [];
  let nextListeners = currentListeners;

  const currentStatus = {
    status: 'connecting',
    connected: false,
    retryCount: 0
  };

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  // eslint-disable-next-line flowtype/no-weak-types
  function subscribe(listener: Function) {
    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  function start(endpoint: string) {
    // Create WebSocket connection.
    stream = new WebSocket.Client(endpoint);
    stream.on('open', onOpen);
    stream.on('message', onMessage);
    stream.on('close', onDisconnect);
  }

  function onOpen(event) {
    debug('open', event);
    currentStatus.status = 'connected';
    currentStatus.connected = true;
    currentStatus.retryCount = 0;
  }

  function onDisconnect(event) {
    if (stream) {
      debug('close', event.code, event.reason);
      currentStatus.status = 'offline';
      currentStatus.connected = false;
      currentStatus.retryCount = 0;
      stream = null;
    }
  }

  function stop() {
    if (stream) {
      stream.removeListener('open', onOpen);
      stream.removeListener('message', onMessage);
      // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
      stream.close();
    }
  }

  async function onMessage(event) {
    const data = JSON.parse(event.data.toString('utf8'));
    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i += 1) {
      const listener = listeners[i];
      listener(data);
    }
  }

  return {
    start,
    stop,
    subscribe
  };
}

let websocket = null;

function setup() {
  if (websocket) return websocket;

  websocket = new BarterDexWebsocket();

  return websocket;
}

export default setup();
