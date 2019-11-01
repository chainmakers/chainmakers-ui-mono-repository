import { take, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import routes from '../../../constants/routes.json';
import { logoutFlow } from '../saga';
import { logout } from '../actions';
import { LOGOUT } from '../constants';

describe('containers/App/saga/logoutFlow', () => {
  it('should handle loadBuyCoinProcess correctly', done => {
    const gen = logoutFlow();

    expect(gen.next().value).toEqual(take(LOGOUT));

    expect(gen.next(logout()).value).toEqual(put(push(routes.LOGIN)));

    done();
  });
});
