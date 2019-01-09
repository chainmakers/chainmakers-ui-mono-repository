import { fromJS } from 'immutable';
import walletSubscribe from '../subscribe';
import { APP_STATE_NAME } from '../constants';
import { loadCoinTransactionsSuccess } from '../actions';
import data from './fake-data';

const fakeDataFromSocket = {
  queueid: '10',
  result: [
    {
      blockindex: 224243,
      time: 1538595828,
      amount: -7.75212001,
      blocktime: 1538595828,
      blockhash:
        '03e747fa909bc31be74f2395b2035271688d52ed39ba4264bf72e3e9a24589af',
      category: 'send',
      confirmations: 15902,
      txid: '2b37dbb0c9cf0273c1bb2642fc810e59a43bfb422b0b63a0b4b9750bd65e6619'
    },
    {
      blockindex: 237134,
      time: 1539371500,
      coin: 'COQUI',
      amount: 8.95496054,
      blocktime: 1539371500,
      blockhash:
        '013ae2c781ce9e27f705fd9d1d68ace3b17dfe72670a16f3b35f6d8ba4f5e282',
      category: 'receive',
      confirmations: 3011,
      txid: '548b372eaa79ec2119735047d0738ed138dfe20c6482b465179e759fb4dcb88d'
    },
    {
      blockindex: 228480,
      time: 1538850475,
      amount: -8.68096961,
      blocktime: 1538850475,
      blockhash:
        '02686c16289112011d29c7d7e4f39ffd42f7f84024cba200cffda8971f360064',
      category: 'send',
      confirmations: 11665,
      txid: '55c767b0297b3a6c0429c92cefd6cc2f82b4bbe3c044273ac475062c5e915d15'
    },
    {
      blockindex: 238434,
      time: 1539811780,
      amount: 1.59445711,
      blocktime: 1539811780,
      blockhash:
        '0a3b9ce60f8a7ea07a0c18a6ae5f5e52684316aa6fe2ce479a19d06611b456ec',
      category: 'receive',
      confirmations: 1711,
      txid: 'c582a83cb927c9ec2158a48e50cade7bd869ff446a00963c6862b707c96f149a'
    }
  ]
};

const TIMEOUT = 20 * 1000;

describe('containers/WalletPage/subscribe/walletSubscribe', () => {
  const coin = 'KMD';
  it(
    'should handle walletSubscribe correctly',
    async done => {
      try {
        expect(typeof walletSubscribe).toEqual('function');
        let store = fromJS(data);
        store = store.setIn(
          [APP_STATE_NAME, 'transactions', 'queueids'],
          fromJS({
            [fakeDataFromSocket.queueid]: coin
          })
        );

        let dispatched = [];

        const dispatch = action => {
          dispatched.push(action);
        };

        const getState = () => store;
        const tx = fakeDataFromSocket.result
          .sort((a, b) => b.blockindex - a.blockindex)
          .map(e => {
            e.coin = coin;
            return e;
          });

        let result = await walletSubscribe(
          fakeDataFromSocket,
          dispatch,
          getState
        );
        expect(result).toEqual(undefined);
        expect(dispatched).toEqual([
          loadCoinTransactionsSuccess({
            queueId: fakeDataFromSocket.queueid,
            coin,
            tx
          })
        ]);
        dispatched = [];

        fakeDataFromSocket.queueid = 23;
        result = await walletSubscribe(fakeDataFromSocket, dispatch, getState);
        expect(result).toEqual(undefined);
        expect(dispatched).toEqual([]);

        done();
      } catch (err) {
        done.fail(err);
      }
    },
    TIMEOUT
  );
});
