// @flow
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import handlingSearch, { setupSearchApiForSelectCoinModal } from '../search';
import { searchSelectCoinModal } from '../../actions';
import {
  SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS,
  SEARCH_STATE_SKIP_CREATION,
  SELECT_COIN_MODAL_SEARCH_SUCCESS
} from '../../constants';
import data from '../../../__tests__/app-state.json';

const store = fromJS(data);

describe('containers/CoinsSelectionDialog/saga/search', () => {
  it('should handle setupSearchApiForSelectCoinModal correctly', async done => {
    let dispatched = [];

    let saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      setupSearchApiForSelectCoinModal
    ).done;
    expect(dispatched).toEqual([
      {
        type: SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS,
        payload: [
          {
            urls: ['electrum1.cipig.net:10000', 'electrum2.cipig.net:10000'],
            active: 1,
            name: 'Bitcoin',
            market_cap: 97822306639,
            coin: 'BTC',
            marketcap: 0,
            symbol: 'BTC',
            id: 0
          },
          {
            txfee: 10000,
            urls: [
              'electrum1.cipig.net:10058',
              'electrum2.cipig.net:10058',
              'electrum3.cipig.net:10058'
            ],
            taddr: 28,
            active: 0,
            rpcport: 8232,
            name: 'Zcash',
            wiftype: 128,
            market_cap: 289458275,
            coin: 'ZEC',
            p2shtype: 189,
            txversion: 4,
            marketcap: 0,
            pubtype: 184,
            symbol: 'ZEC',
            id: 12
          },
          {
            urls: ['electrum1.cipig.net:10001', 'electrum2.cipig.net:10001'],
            active: 1,
            name: 'Komodo',
            market_cap: 107340275,
            coin: 'KMD',
            txversion: 4,
            marketcap: 0,
            symbol: 'KMD',
            id: 1
          },
          {
            txfee: 10000,
            urls: ['electrum1.cipig.net:10053', 'electrum2.cipig.net:10053'],
            active: 0,
            rpcport: 57776,
            name: 'Chips',
            wiftype: 188,
            market_cap: 1609044,
            coin: 'CHIPS',
            p2shtype: 85,
            txversion: 4,
            marketcap: 0,
            pubtype: 60,
            symbol: 'CHIPS',
            id: 5
          },
          {
            urls: [
              'el0.vrsc.0x03.services:10000',
              'el1.vrsc.0x03.services:10000',
              'el2.vrsc.0x03.services:10000'
            ],
            active: 0,
            rpcport: 27486,
            name: 'VerusCoin',
            market_cap: 1609044,
            coin: 'VRSC',
            txversion: 4,
            marketcap: 0,
            symbol: 'VRSC',
            id: 7
          },
          {
            urls: ['159.65.91.235:10801', '167.99.204.42:10801'],
            active: 0,
            rpcport: 10306,
            name: 'Equaliser',
            market_cap: 0,
            coin: 'EQL',
            marketcap: 0,
            symbol: 'EQL',
            id: 2
          },
          {
            urls: ['electrum1.cipig.net:10011', 'electrum2.cipig.net:10011'],
            active: 0,
            rpcport: 14276,
            name: 'Coqui Cash',
            market_cap: 0,
            coin: 'COQUI',
            txversion: 4,
            marketcap: 0,
            symbol: 'COQUI',
            id: 4
          },
          {
            urls: [
              'electrum1.cipig.net:10031',
              'electrum2.cipig.net:10031',
              'electrum3.cipig.net:10031'
            ],
            active: 0,
            rpcport: 30177,
            name: 'KMDice',
            market_cap: 0,
            coin: 'KMDICE',
            txversion: 4,
            marketcap: 0,
            symbol: 'KMDICE',
            id: 8
          },
          {
            urls: [
              'electrum1.cipig.net:10032',
              'electrum2.cipig.net:10032',
              'electrum3.cipig.net:10032'
            ],
            active: 0,
            rpcport: 15587,
            name: 'Chainmakers',
            market_cap: 0,
            coin: 'CHAIN',
            txversion: 4,
            marketcap: 0,
            symbol: 'CHAIN',
            id: 9
          },
          {
            urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022'],
            active: 0,
            rpcport: 8923,
            name: 'Beer',
            market_cap: -1,
            coin: 'BEER',
            txversion: 4,
            marketcap: 0,
            symbol: 'BEER',
            id: 13
          },
          {
            urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024'],
            active: 1,
            rpcport: 11608,
            name: 'Pizza',
            market_cap: -2,
            coin: 'PIZZA',
            txversion: 4,
            marketcap: 0,
            symbol: 'PIZZA',
            id: 14
          }
        ]
      }
    ]);
    expect(saga).toEqual(1);

    dispatched = [];

    saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      setupSearchApiForSelectCoinModal
    ).done;
    expect(dispatched).toEqual([{ type: SEARCH_STATE_SKIP_CREATION }]);
    expect(saga).toEqual(1);
    done();
  });
  it('should handle handlingSearch correctly', async done => {
    let dispatched = [];

    let saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      handlingSearch,
      searchSelectCoinModal('')
    ).done;
    expect(dispatched).toEqual([
      {
        payload: [
          {
            active: 1,
            coin: 'BTC',
            id: 0,
            market_cap: 97822306639,
            marketcap: 0,
            name: 'Bitcoin',
            symbol: 'BTC',
            urls: ['electrum1.cipig.net:10000', 'electrum2.cipig.net:10000']
          },
          {
            active: 0,
            coin: 'ZEC',
            id: 12,
            market_cap: 289458275,
            marketcap: 0,
            name: 'Zcash',
            p2shtype: 189,
            pubtype: 184,
            rpcport: 8232,
            symbol: 'ZEC',
            taddr: 28,
            txfee: 10000,
            txversion: 4,
            urls: [
              'electrum1.cipig.net:10058',
              'electrum2.cipig.net:10058',
              'electrum3.cipig.net:10058'
            ],
            wiftype: 128
          },
          {
            active: 1,
            coin: 'KMD',
            id: 1,
            market_cap: 107340275,
            marketcap: 0,
            name: 'Komodo',
            symbol: 'KMD',
            txversion: 4,
            urls: ['electrum1.cipig.net:10001', 'electrum2.cipig.net:10001']
          },
          {
            active: 0,
            coin: 'CHIPS',
            id: 5,
            market_cap: 1609044,
            marketcap: 0,
            name: 'Chips',
            p2shtype: 85,
            pubtype: 60,
            rpcport: 57776,
            symbol: 'CHIPS',
            txfee: 10000,
            txversion: 4,
            urls: ['electrum1.cipig.net:10053', 'electrum2.cipig.net:10053'],
            wiftype: 188
          },
          {
            active: 0,
            coin: 'VRSC',
            id: 7,
            market_cap: 1609044,
            marketcap: 0,
            name: 'VerusCoin',
            rpcport: 27486,
            symbol: 'VRSC',
            txversion: 4,
            urls: [
              'el0.vrsc.0x03.services:10000',
              'el1.vrsc.0x03.services:10000',
              'el2.vrsc.0x03.services:10000'
            ]
          },
          {
            active: 0,
            coin: 'EQL',
            id: 2,
            market_cap: 0,
            marketcap: 0,
            name: 'Equaliser',
            rpcport: 10306,
            symbol: 'EQL',
            urls: ['159.65.91.235:10801', '167.99.204.42:10801']
          },
          {
            active: 0,
            coin: 'COQUI',
            id: 4,
            market_cap: 0,
            marketcap: 0,
            name: 'Coqui Cash',
            rpcport: 14276,
            symbol: 'COQUI',
            txversion: 4,
            urls: ['electrum1.cipig.net:10011', 'electrum2.cipig.net:10011']
          },
          {
            active: 0,
            coin: 'KMDICE',
            id: 8,
            market_cap: 0,
            marketcap: 0,
            name: 'KMDice',
            rpcport: 30177,
            symbol: 'KMDICE',
            txversion: 4,
            urls: [
              'electrum1.cipig.net:10031',
              'electrum2.cipig.net:10031',
              'electrum3.cipig.net:10031'
            ]
          },
          {
            active: 0,
            coin: 'CHAIN',
            id: 9,
            market_cap: 0,
            marketcap: 0,
            name: 'Chainmakers',
            rpcport: 15587,
            symbol: 'CHAIN',
            txversion: 4,
            urls: [
              'electrum1.cipig.net:10032',
              'electrum2.cipig.net:10032',
              'electrum3.cipig.net:10032'
            ]
          },
          {
            active: 0,
            coin: 'BEER',
            id: 13,
            market_cap: -1,
            marketcap: 0,
            name: 'Beer',
            rpcport: 8923,
            symbol: 'BEER',
            txversion: 4,
            urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022']
          },
          {
            active: 1,
            coin: 'PIZZA',
            id: 14,
            market_cap: -2,
            marketcap: 0,
            name: 'Pizza',
            rpcport: 11608,
            symbol: 'PIZZA',
            txversion: 4,
            urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024']
          }
        ],
        type: SELECT_COIN_MODAL_SEARCH_SUCCESS
      }
    ]);
    expect(saga).toEqual(1);

    dispatched = [];

    saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      handlingSearch,
      searchSelectCoinModal('bt')
    ).done;
    expect(dispatched).toEqual([
      {
        payload: [
          { id: 0, market_cap: 97822306639, name: 'Bitcoin', symbol: 'BTC' }
        ],
        type: SELECT_COIN_MODAL_SEARCH_SUCCESS
      }
    ]);
    expect(saga).toEqual(1);

    dispatched = [];
    saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      handlingSearch,
      searchSelectCoinModal('abcdefz')
    ).done;
    expect(dispatched).toEqual([
      {
        payload: [],
        type: SELECT_COIN_MODAL_SEARCH_SUCCESS
      }
    ]);
    expect(saga).toEqual(1);

    done();
  });
});
