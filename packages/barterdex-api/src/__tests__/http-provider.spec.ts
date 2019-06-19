import * as nock from 'nock'
import httpProvider from '../http-provider';

const TEST_URL = 'http://127.0.0.1:7783';

describe('packages/barterdex-api/src/client/http-provider', () => {

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

  it('should handle the userpass correctly', async () => {
    const state = {
      userpass: null
    };
    const api = Object.assign({}, httpProvider(state, TEST_URL));
    expect(api.getUserpass()).toEqual(null);
    api.setUserpass('a');
    expect(api.getUserpass()).toEqual('ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb');
    api.resetUserpass();
    expect(api.getUserpass()).toEqual(null);
  });
});
