// @flow
import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { routes } from '../../../../constants';
import { handlingLoginSuccess } from '../login';

describe('containers/App/saga/login', () => {
  it('should handle handlingLoginSuccess correctly', done => {
    const gen = handlingLoginSuccess();
    expect(gen.next().value).toEqual(put(push(routes.HOME)));
    expect(gen.next().value).toEqual();
    done();
  });
});
