// @flow
import React from 'react';
import injectSaga from '../../utils/inject-saga';
import { APP_STATE_NAME } from './constants';
import saga from './saga';

type Props = {};

class App extends React.PureComponent<Props> {
  render() {
    return null;
  }
}

const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

export default withSaga(App);
