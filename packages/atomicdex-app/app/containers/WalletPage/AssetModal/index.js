// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';
import { makeSelectAssetModal } from '../selectors';
import { closeAssetModal } from '../actions';
import AsseModalContent from './AsseModalContent';

const debug = require('debug')('atomicapp:containers:WalletPage:AssetModal');

function onOpenEmpty() {
  debug('onOpenEmpty');
}

const styles = () => ({
  root__emptystate: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25
  },

  root__iconemptystate: {
    fontSize: 50
  },

  root__content: {
    width: 500,
    textAlign: 'left',
    overflowY: 'hidden'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  assetModal: Map<*, *>
};

class AssetModal extends React.PureComponent<Props> {
  static displayName = 'AssetModal';

  static defaultProps = {};

  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root__emptystate}>
        <Typography variant="title" gutterBottom>
          <CloudOff className={classes.root__iconemptystate} />
        </Typography>
        <Typography variant="subheading" gutterBottom>
          No data found. Please select an asset.
        </Typography>
      </div>
    );
  };

  renderCoin = () => <AsseModalContent />;

  render() {
    debug('render');
    const { classes, assetModal, onClose } = this.props;
    const coin = assetModal.get('coin');
    return (
      <SwipeableDrawer
        anchor="right"
        open={assetModal.get('open')}
        onClose={onClose}
        onOpen={onOpenEmpty}
      >
        <div tabIndex={0} role="button" className={classes.root__content}>
          {!coin && this.renderEmptyState()}
          {coin && this.renderCoin()}
        </div>
      </SwipeableDrawer>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    onClose: () => dispatch(closeAssetModal())
  };
}

const mapStateToProps = createStructuredSelector({
  assetModal: makeSelectAssetModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(AssetModal);
