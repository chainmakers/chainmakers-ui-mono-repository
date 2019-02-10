import axios from 'axios';
import userpass from './userpass';
import { DEFAULT_OPTION, StateType, OptionsType } from './schema';

function toError(error: Error): Error {
  throw error;
}

function json(body) {
  return body.data;
}

// https://github.com/redux-saga/redux-saga/blob/master/packages/symbols/src/index.js#L3
const CANCEL = '@@redux-saga/CANCEL_PROMISE';
const headers = {
  Accept: 'application/json'
};
const TIMEOUT = 300000; // 5 min
let queueId = 1;

export default function httpProvider(
  state: StateType,
  url: string
) {
  return {
    setUserpass(up: string) {
      // eslint-disable-next-line no-param-reassign
      state.userpass = userpass(up);
    },
    getUserpass() {
      return state.userpass;
    },
    resetUserpass() {
      // eslint-disable-next-line no-param-reassign
      state.userpass = null;
    },
    // NOTE: only for test
    setQueueId(id: number) {
      queueId = id;
    },
    getQueueId() {
      return queueId;
    },
    // eslint-disable-next-line flowtype/no-weak-types
    privateCall(params: Object, options: OptionsType = DEFAULT_OPTION) {
      const userpass = this.getUserpass();
      const source = axios.CancelToken.source();
      if (!userpass) {
        return Promise.reject(new Error('not found userpass'));
      }
      let id = 0;
      if (options.useQueue) {
        id = queueId;
        queueId += 1;
      }
      const data = Object.assign(
        {
          queueid: id,
          userpass
        },
        params
      );
      const serverparams = {
        timeout: TIMEOUT,
        headers,
        data,
        url,
        method: 'post',
        cancelToken: source.token
      };
      const request = axios(serverparams)
        .then(json)
        .catch(toError);
      request[CANCEL] = () => source.cancel();
      return request;
    },
    // eslint-disable-next-line flowtype/no-weak-types
    post(params: Object = {}) {
      const source = axios.CancelToken.source();
      const serverparams = {
        timeout: TIMEOUT,
        headers,
        params,
        url,
        method: 'post',
        cancelToken: source.token
      };
      const request = axios(serverparams)
        .then(json)
        .catch(toError);
      request[CANCEL] = () => source.cancel();
      return request;
    }
  };
}
