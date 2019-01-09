// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/inject-reducer';
import barterDexApi from '../../lib/barter-dex-api';
import barterDexSocket from '../../utils/barter-dex-socket';
import reducer from './reducer';
import { APP_STATE_NAME } from './constants';
import { makeSelectIsStartWebsocket } from './selectors';

const debug = require('debug')('dicoapp:containers:WebSocketComponent');

type Props = {
  isStartWebsocket: boolean
};

class WebSocket extends React.Component<Props> {
  async componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const { isStartWebsocket } = this.props;
    if (isStartWebsocket !== prevProps.isStartWebsocket) {
      if (isStartWebsocket) {
        debug(`isStartWebsocket = ${isStartWebsocket.toString()} start`);

        const info = await barterDexApi.getendpoint();
        barterDexSocket.start(info.endpoint);
      } else {
        debug(`isStartWebsocket = ${isStartWebsocket.toString()} stop`);
        barterDexSocket.stop();
      }
    }
  }

  render() {
    debug('render');
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  isStartWebsocket: makeSelectIsStartWebsocket()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(
  withReducer,
  withConnect
)(WebSocket);
