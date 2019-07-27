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
            active: 1,
            name: 'bitcoin',
            market_cap: 97822306639,
            servers: [
              { url: 'electrum1.cipig.net:10000' },
              { url: 'electrum2.cipig.net:10000' }
            ],
            coin: 'BTC',
            fname: 'Bitcoin',
            marketcap: 0,
            symbol: 'BTC',
            id: 0
          },
          {
            txfee: 10000,
            taddr: 28,
            active: 0,
            rpcport: 8232,
            name: 'zcash',
            wiftype: 128,
            market_cap: 289458275,
            servers: [
              { url: 'electrum1.cipig.net:10058' },
              { url: 'electrum2.cipig.net:10058' },
              { url: 'electrum3.cipig.net:10058' }
            ],
            coin: 'ZEC',
            p2shtype: 189,
            fname: 'Zcash',
            txversion: 4,
            marketcap: 0,
            pubtype: 184,
            symbol: 'ZEC',
            id: 12
          },
          {
            active: 1,
            name: 'komodo',
            market_cap: 107340275,
            servers: [
              { url: 'electrum1.cipig.net:10001' },
              { url: 'electrum2.cipig.net:10001' }
            ],
            coin: 'KMD',
            fname: 'Komodo',
            txversion: 4,
            marketcap: 0,
            symbol: 'KMD',
            id: 1
          },
          {
            txfee: 10000,
            active: 0,
            rpcport: 57776,
            name: 'chips',
            wiftype: 188,
            market_cap: 1609044,
            servers: [
              { url: 'electrum1.cipig.net:10053' },
              { url: 'electrum2.cipig.net:10053' }
            ],
            coin: 'CHIPS',
            p2shtype: 85,
            fname: 'Chips',
            txversion: 4,
            marketcap: 0,
            pubtype: 60,
            symbol: 'CHIPS',
            id: 5
          },
          {
            active: 0,
            rpcport: 27486,
            name: 'VRSC',
            market_cap: 1609044,
            servers: [
              { url: 'el0.vrsc.0x03.services:10000' },
              { url: 'el1.vrsc.0x03.services:10000' },
              { url: 'el2.vrsc.0x03.services:10000' }
            ],
            coin: 'VRSC',
            fname: 'VerusCoin',
            txversion: 4,
            marketcap: 0,
            symbol: 'VRSC',
            id: 7
          },
          {
            active: 0,
            rpcport: 10306,
            name: 'EQL',
            market_cap: 0,
            servers: [
              { url: '159.65.91.235:10801' },
              { url: '167.99.204.42:10801' }
            ],
            coin: 'EQLI',
            fname: 'Equaliser',
            marketcap: 0,
            symbol: 'EQL',
            id: 2
          },
          {
            active: 0,
            rpcport: 14276,
            name: 'COQUI',
            market_cap: 0,
            servers: [
              { url: 'electrum1.cipig.net:10011' },
              { url: 'electrum2.cipig.net:10011' }
            ],
            coin: 'COQUI',
            fname: 'Coqui Cash',
            txversion: 4,
            marketcap: 0,
            symbol: 'COQUI',
            id: 4
          },
          {
            active: 0,
            rpcport: 30177,
            name: 'KMDICE',
            market_cap: 0,
            servers: [
              { url: 'electrum1.cipig.net:10031' },
              { url: 'electrum2.cipig.net:10031' },
              { url: 'electrum3.cipig.net:10031' }
            ],
            coin: 'KMDICE',
            fname: 'KMDice',
            txversion: 4,
            marketcap: 0,
            symbol: 'KMDICE',
            id: 8
          },
          {
            active: 0,
            rpcport: 15587,
            name: 'CHAIN',
            market_cap: 0,
            servers: [
              { url: 'electrum1.cipig.net:10032' },
              { url: 'electrum2.cipig.net:10032' },
              { url: 'electrum3.cipig.net:10032' }
            ],
            coin: 'CHAIN',
            fname: 'Chainmakers',
            txversion: 4,
            marketcap: 0,
            symbol: 'CHAIN',
            id: 9
          },
          {
            active: 0,
            rpcport: 8923,
            name: 'beer',
            market_cap: -1,
            servers: [
              { url: 'electrum1.cipig.net:10022' },
              { url: 'electrum2.cipig.net:10022' }
            ],
            coin: 'BEER',
            fname: 'Beer',
            txversion: 4,
            marketcap: 0,
            symbol: 'BEER',
            id: 13
          },
          {
            active: 1,
            rpcport: 11608,
            name: 'pizza',
            market_cap: -2,
            servers: [
              { url: 'electrum1.cipig.net:10024' },
              { url: 'electrum2.cipig.net:10024' }
            ],
            coin: 'PIZZA',
            fname: 'Pizza',
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
        type: SELECT_COIN_MODAL_SEARCH_SUCCESS,
        payload: [
          {
            active: 1,
            name: 'bitcoin',
            market_cap: 97822306639,
            servers: [
              { url: 'electrum1.cipig.net:10000' },
              { url: 'electrum2.cipig.net:10000' }
            ],
            coin: 'BTC',
            fname: 'Bitcoin',
            marketcap: 0,
            symbol: 'BTC',
            id: 0
          },
          {
            txfee: 10000,
            taddr: 28,
            active: 0,
            rpcport: 8232,
            name: 'zcash',
            wiftype: 128,
            market_cap: 289458275,
            servers: [
              { url: 'electrum1.cipig.net:10058' },
              { url: 'electrum2.cipig.net:10058' },
              { url: 'electrum3.cipig.net:10058' }
            ],
            coin: 'ZEC',
            p2shtype: 189,
            fname: 'Zcash',
            txversion: 4,
            marketcap: 0,
            pubtype: 184,
            symbol: 'ZEC',
            id: 12
          },
          {
            active: 1,
            name: 'komodo',
            market_cap: 107340275,
            servers: [
              { url: 'electrum1.cipig.net:10001' },
              { url: 'electrum2.cipig.net:10001' }
            ],
            coin: 'KMD',
            fname: 'Komodo',
            txversion: 4,
            marketcap: 0,
            symbol: 'KMD',
            id: 1
          },
          {
            txfee: 10000,
            active: 0,
            rpcport: 57776,
            name: 'chips',
            wiftype: 188,
            market_cap: 1609044,
            servers: [
              { url: 'electrum1.cipig.net:10053' },
              { url: 'electrum2.cipig.net:10053' }
            ],
            coin: 'CHIPS',
            p2shtype: 85,
            fname: 'Chips',
            txversion: 4,
            marketcap: 0,
            pubtype: 60,
            symbol: 'CHIPS',
            id: 5
          },
          {
            active: 0,
            rpcport: 27486,
            name: 'VRSC',
            market_cap: 1609044,
            servers: [
              { url: 'el0.vrsc.0x03.services:10000' },
              { url: 'el1.vrsc.0x03.services:10000' },
              { url: 'el2.vrsc.0x03.services:10000' }
            ],
            coin: 'VRSC',
            fname: 'VerusCoin',
            txversion: 4,
            marketcap: 0,
            symbol: 'VRSC',
            id: 7
          },
          {
            active: 0,
            rpcport: 10306,
            name: 'EQL',
            market_cap: 0,
            servers: [
              { url: '159.65.91.235:10801' },
              { url: '167.99.204.42:10801' }
            ],
            coin: 'EQLI',
            fname: 'Equaliser',
            marketcap: 0,
            symbol: 'EQL',
            id: 2
          },
          {
            active: 0,
            rpcport: 14276,
            name: 'COQUI',
            market_cap: 0,
            servers: [
              { url: 'electrum1.cipig.net:10011' },
              { url: 'electrum2.cipig.net:10011' }
            ],
            coin: 'COQUI',
            fname: 'Coqui Cash',
            txversion: 4,
            marketcap: 0,
            symbol: 'COQUI',
            id: 4
          },
          {
            active: 0,
            rpcport: 30177,
            name: 'KMDICE',
            market_cap: 0,
            servers: [
              { url: 'electrum1.cipig.net:10031' },
              { url: 'electrum2.cipig.net:10031' },
              { url: 'electrum3.cipig.net:10031' }
            ],
            coin: 'KMDICE',
            fname: 'KMDice',
            txversion: 4,
            marketcap: 0,
            symbol: 'KMDICE',
            id: 8
          },
          {
            active: 0,
            rpcport: 15587,
            name: 'CHAIN',
            market_cap: 0,
            servers: [
              { url: 'electrum1.cipig.net:10032' },
              { url: 'electrum2.cipig.net:10032' },
              { url: 'electrum3.cipig.net:10032' }
            ],
            coin: 'CHAIN',
            fname: 'Chainmakers',
            txversion: 4,
            marketcap: 0,
            symbol: 'CHAIN',
            id: 9
          },
          {
            active: 0,
            rpcport: 8923,
            name: 'beer',
            market_cap: -1,
            servers: [
              { url: 'electrum1.cipig.net:10022' },
              { url: 'electrum2.cipig.net:10022' }
            ],
            coin: 'BEER',
            fname: 'Beer',
            txversion: 4,
            marketcap: 0,
            symbol: 'BEER',
            id: 13
          },
          {
            active: 1,
            rpcport: 11608,
            name: 'pizza',
            market_cap: -2,
            servers: [
              { url: 'electrum1.cipig.net:10024' },
              { url: 'electrum2.cipig.net:10024' }
            ],
            coin: 'PIZZA',
            fname: 'Pizza',
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
