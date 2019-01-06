import * as nock from 'nock'
import httpProvider from '../http-provider';

const TEST_URL = 'http://127.0.0.1:7783';

describe('packages/barterdex-api/src/http-provider', () => {
  it('should handle the get correctly', async () => {
    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .get(() => true)
      .reply(200, (uri, body, cb) => {
        cb(null, {
          uri,
          body
        });
      });
    const state = {
      userpass: null
    };
    const api = Object.assign({}, httpProvider(state, TEST_URL));
    let res = await api.get({
      song: 'perfect'
    });
    expect(res).toEqual({ uri: '/?song=perfect', body: '' });
    res = await api.get();
    expect(res).toEqual({ uri: '/', body: '' });
  });

  it('should handle the privateCall correctly', async () => {
    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post(() => true)
      .reply(200, (uri, body, cb) => {
        cb(null, {
          uri,
          body
        });
      });
    const state = {
      userpass: 'userpass'
    };
    const api = Object.assign({}, httpProvider(state, TEST_URL));
    let res = await api.privateCall({
      song: 'perfect'
    });

    expect(res).toEqual({
      uri: '/',
      body: '{"queueid":0,"userpass":"userpass","song":"perfect"}'
    });

    api.setQueueId(1);
    res = await api.privateCall(
      {
        song: 'perfect'
      },
      {
        useQueue: true
      }
    );
    expect(res).toEqual({
      uri: '/',
      body: '{"queueid":1,"userpass":"userpass","song":"perfect"}'
    });
    expect(api.getQueueId()).toEqual(2);
  });

  it('should handle the publicCall correctly', async () => {
    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post(() => true)
      .reply(200, (uri, body, cb) => {
        cb(null, {
          uri,
          body
        });
      });
    const state = {
      userpass: 'userpass'
    };
    const api = Object.assign({}, httpProvider(state, TEST_URL));
    let res = await api.publicCall({
      song: 'perfect'
    });

    expect(res).toEqual({ uri: '/', body: '{"queueid":0,"song":"perfect"}' });

    api.setQueueId(1);
    res = await api.publicCall(
      {
        song: 'perfect'
      },
      {
        useQueue: true
      }
    );
    expect(res).toEqual({ uri: '/', body: '{"queueid":1,"song":"perfect"}' });
    expect(api.getQueueId()).toEqual(2);
  });
});
