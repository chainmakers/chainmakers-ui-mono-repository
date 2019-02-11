// @flow
import ipc from 'electron-better-ipc';
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '../../../../lib/barter-dex-api';
import { routes } from '../../../../constants';
import logoutFlow from '../logout';

describe('containers/App/saga/logout', () => {
  it('should handle logoutFlow correctly', done => {
    const gen = logoutFlow();
    api.setUserpass('123');
    expect(api.getUserpass()).toEqual(
      'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
    );
    expect(gen.next().value).toEqual(put(push(routes.LOGIN)));
    expect(gen.next().value).toEqual(
      call([ipc, 'callMain'], 'marketmaker:stop')
    );
    expect(api.getUserpass()).toEqual(null);
    done();
  });
});
