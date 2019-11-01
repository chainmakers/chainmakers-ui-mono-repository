import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectWebsocket = state => state.get(APP_STATE_NAME);

const makeSelectIsStartWebsocket = () =>
  createSelector(
    selectWebsocket,
    websocket => websocket.get('isStartWebsocket')
  );

// eslint-disable-next-line import/prefer-default-export
export { selectWebsocket, makeSelectIsStartWebsocket };
