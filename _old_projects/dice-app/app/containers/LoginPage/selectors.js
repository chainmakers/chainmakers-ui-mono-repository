import { APP_STATE_NAME } from './constants';

const selectLogin = state => state.get(APP_STATE_NAME);

// eslint-disable-next-line import/prefer-default-export
export { selectLogin };
