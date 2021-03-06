import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from 'utils/barterdex-api';
import { loadCoinTransactionsProcess } from '../transactions';
import { loadCoinTransactions } from '../../actions';
import data from '../../../__tests__/app-state.json';

const TEST_URL = 'http://127.0.0.1:7783';
const TIME_OUT = 30 * 1000;

describe('containers/WalletPage/saga/loadCoinTransactionsProcess', () => {
  const coin = 'KMD';
  const address = 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu';
  const userpass = 'userpass';
  const queueId = 23;
  const listtransactionsdata = {
    result: 'success',
    status: 'queued'
  };
  api.setUserpass(userpass);
  it(
    'should handle loadCoinTransactionsProcess correctly',
    async done => {
      try {
        api.setQueueId(queueId);
        nock(TEST_URL)
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .persist()
          .post('/', () => true)
          .reply(200, (uri, body, cb) => {
            const b = JSON.parse(body);
            expect(b).toEqual({
              userpass:
                '05d49692b755f99c4504b510418efeeeebfd466892540f27acf9a31a326d6504',
              coin,
              address,
              queueid: queueId,
              method: 'listtransactions',
              count: 10
            });
            cb(null, listtransactionsdata);
          });

        const dispatched = [];

        const saga = await runSaga(
          {
            dispatch: action => dispatched.push(action),
            getState: () => fromJS(data)
          },
          loadCoinTransactionsProcess,
          coin,
          address
        ).done;

        expect(saga).toEqual(1);
        expect(dispatched).toEqual([
          loadCoinTransactions(
            Object.assign(
              {
                coin,
                queueId
              },
              listtransactionsdata
            )
          )
        ]);

        nock.cleanAll();
        nock.enableNetConnect();
        done();
      } catch (err) {
        done.fail(err);
      }
    },
    TIME_OUT
  );
  it(
    'should throw error when handle loadCoinTransactionsProcess',
    async done => {
      try {
        api.setQueueId(queueId);
        nock(TEST_URL)
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .persist()
          .post('/', () => true)
          .reply(200, (uri, body, cb) => {
            const b = JSON.parse(body);
            expect(b).toEqual({
              userpass:
                '05d49692b755f99c4504b510418efeeeebfd466892540f27acf9a31a326d6504',
              coin,
              address,
              queueid: queueId,
              method: 'listtransactions',
              count: 10
            });
            cb(new Error('some thing wrong'));
          });

        const dispatched = [];

        const saga = await runSaga(
          {
            dispatch: action => dispatched.push(action),
            getState: () => fromJS(data)
          },
          loadCoinTransactionsProcess,
          coin,
          address
        ).done;
        expect(saga).toEqual([]);
        expect(dispatched).toEqual([]);

        nock.cleanAll();
        nock.enableNetConnect();
        done();
      } catch (err) {
        done.fail(err);
      }
    },
    TIME_OUT
  );
});
