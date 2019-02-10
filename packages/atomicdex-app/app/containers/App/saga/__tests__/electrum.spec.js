// @flow
import { put } from 'redux-saga/effects';
import listenForLoadingElectrums from '../electrums';
import { addElectrum } from '../../actions';

describe('containers/App/saga/electrums', () => {
  it('should handle listenForLoadingElectrums correctly', done => {
    const gen = listenForLoadingElectrums();
    expect(gen.next().value).toEqual(
      put(
        addElectrum({
          coin: 'PIZZA',
          name: 'Pizza',
          asset: 'PIZZA',
          txversion: 4,
          rpcport: 11608,
          urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024'],
          active: 1,
          market_cap: -2
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(
        addElectrum({
          coin: 'BEER',
          name: 'Beer',
          asset: 'BEER',
          txversion: 4,
          rpcport: 8923,
          urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022'],
          active: 1,
          market_cap: -1
        })
      )
    );
    done();
  });
});
