import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from 'utils/barterdex-api';
import loadWithdrawProcess, { generateMessage } from '../withdraw';
import data from '../../../__tests__/app-state.json';
import withdraw from '../../../__tests__/withdraw.json';
import sendRawTransaction from '../../../__tests__/send_raw_transaction.json';

const TEST_URL = 'http://127.0.0.1:7783';
const TIME_OUT = 30 * 1000;

describe('containers/WalletPage/saga/loadWithdrawProcess', () => {
  const payload = {
    amount: withdraw.total_amount,
    address: withdraw.from[0],
    coin: withdraw.coin
  };
  const userpass = 'userpass';

  api.setUserpass(userpass);
  it(
    'should handle loadWithdrawProcess correctly',
    async done => {
      try {
        nock(TEST_URL)
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .persist()
          .post('/', () => true)
          .reply(200, (uri, body, cb) => {
            const { method } = JSON.parse(body);
            if (method === 'withdraw') {
              cb(null, withdraw);
            }
            if (method === 'send_raw_transaction') {
              cb(null, sendRawTransaction);
            }
            return cb(new Error('unexpected api'));
          });

        const dispatched = [];

        const saga = await runSaga(
          {
            dispatch: action => {
              if (action.type === 'atomicapp/BuyPage/SNACKBARS_OPEN') {
                return dispatched.push({
                  type: action.type,
                  payload: JSON.stringify(action.payload)
                });
              }
              return dispatched.push(action);
            },
            getState: () => fromJS(data)
          },
          loadWithdrawProcess,
          { payload }
        ).done;

        expect(saga).toEqual(3);
        expect(dispatched).toEqual([
          {
            payload: JSON.stringify({
              message: generateMessage(sendRawTransaction.tx_hash, withdraw.coin)
            }),
            type: 'atomicapp/BuyPage/SNACKBARS_OPEN'
          },
          {
            payload: {
              address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
              amount: 1.88264532,
              coin: 'KMD'
            },
            type: 'atomicapp/App/LOAD_WITHDRAW_SUCCESS'
          },
          {
            payload: {
              address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
              amount: 1.88264532,
              coin: 'KMD'
            },
            type: 'atomicapp/WalletPage/WITHDRAW_LOAD_SUCCESS'
          }
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
    'should throw error when handle loadWithdrawProcess',
    async done => {
      try {
        nock(TEST_URL)
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .persist()
          .post('/', () => true)
          .reply(200, (uri, body, cb) => {
            const b = JSON.parse(body);
            expect(b).toEqual({
              amount: 1.88264532,
              coin: 'KMD',
              method: 'withdraw',
              queueid: 0,
              to: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
              userpass:
                '05d49692b755f99c4504b510418efeeeebfd466892540f27acf9a31a326d6504'
            });
            cb(new Error('some thing wrong'));
          });

        const dispatched = [];

        const saga = await runSaga(
          {
            dispatch: action => dispatched.push(action),
            getState: () => fromJS(data)
          },
          loadWithdrawProcess,
          { payload }
        ).done;
        expect(saga).toEqual(2);
        expect(dispatched).toEqual([
          {
            payload: {
              message: 'Withdrawal: Request failed with status code 500'
            },
            type: 'atomicapp/BuyPage/SNACKBARS_OPEN'
          },
          {
            error: {
              context: {
                action: 'atomicapp/WalletPage/WITHDRAW_LOAD',
                params: {
                  address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
                  amount: 1.88264532,
                  coin: 'KMD'
                }
              },
              message: 'Request failed with status code 500',
              type: 'RPC'
            },
            type: 'atomicapp/WalletPage/WITHDRAW_LOAD_ERROR'
          }
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
});
