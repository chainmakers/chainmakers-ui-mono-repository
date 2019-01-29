// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import injectReducer from '../../utils/inject-reducer';
import { APP_STATE_NAME } from './constants';
import { selectSnackbars } from './selectors';
import { closeSnackbars } from './actions';
import reducer from './reducer';

const debug = require('debug')('kmdice:containers:Snackbars');

type ISnackbarsProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  snackbars: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseSnackbars: Function
};

class Snackbars extends React.PureComponent<ISnackbarsProps> {
  render() {
    debug('render');
    const { snackbars, dispatchCloseSnackbars } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbars.get('open')}
        autoHideDuration={snackbars.get('timeout')}
        onClose={dispatchCloseSnackbars}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{snackbars.get('message')}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={dispatchCloseSnackbars}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchCloseSnackbars: () => dispatch(closeSnackbars())
  };
}

const mapStateToProps = createStructuredSelector({
  snackbars: selectSnackbars
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withConnect
)(Snackbars);
