// @flow
import { APP_STATE_NAME } from './constants';

const selectSnackbars = state => state.get(APP_STATE_NAME);

export {
  // eslint-disable-next-line import/prefer-default-export
  selectSnackbars
};
