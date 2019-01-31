// @flow
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSaga from '../../utils/inject-saga';
import { APP_STATE_NAME } from './constants';
import { startKMDiceChain } from './actions';
import saga from './saga';

type IAppProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchStartKMDiceChain: Function
};

class App extends React.PureComponent<IAppProps> {
  componentDidMount = () => {
    const { dispatchStartKMDiceChain } = this.props;
    dispatchStartKMDiceChain();
  };

  render() {
    return null;
  }
}

const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchStartKMDiceChain: (pubkey?: string) =>
      dispatch(startKMDiceChain(pubkey))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withSaga,
  withConnect
)(App);
