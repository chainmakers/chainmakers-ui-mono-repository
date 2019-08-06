// @flow
import React from 'react';
import type { Node } from 'react';
// import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import CloudOff from '@material-ui/icons/CloudOff';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { formatDate, floor } from 'barterdex-utilities';
import { BuyButton } from 'barterdex-components';
import explorer from '../../lib/explorer';
import openNewWindow from '../../utils/openNewWindow';
import getCoinMemoize from '../../components/CryptoIcons';
import ExplorerLink from '../../components/ExplorerLink';
import CoinSelectable from '../../components/CoinSelectable';
import { STATE_SWAPS, FINISHED_SWAPS_STATE } from '../../constants';
import { SWAP_TX_DEFAULT } from './constants';
import { closeDetailModal } from './actions';
import {
  makeSelectSwapDetailModal,
  makeSelectSwapInDetailModal
} from './selectors';

const debug = require('debug')('atomicapp:containers:DexPage:SwapDetailModal');

const emptyLink = (
  <Typography variant="caption" display="block" gutterBottom>
    Open TX in block explorer
  </Typography>
);

function onOpenEmpty() {
  debug('onOpenEmpty');
}

const styles = theme => ({
  swapDetail__content: {
    width: 500,
    textAlign: 'center'
  },

  amountform: {
    width: '50%'
  },

  amountform__item: {
    width: '100%'
  },

  amountform__itemCenter: {
    textAlign: 'center'
  },

  amountform__switchBtn: {
    position: 'absolute',
    textAlign: 'center',
    // top: '20%',
    top: 90,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25,
    width: 100
  },

  swapform_button: {
    margin: '0 auto'
  },

  swapDetail__container: {
    position: 'relative'
  },

  swapDetail__listitem: {
    paddingLeft: 0,
    paddingRight: 0
  },

  swapDetail__divider: {
    width: '35%',
    margin: '0 auto'
  },

  swapDetail__success: {
    color: theme.colors.success
  },

  swapDetail__danger: {
    color: theme.colors.danger
  },

  swapform__iconemptystate: {
    fontSize: 50
  },

  swapform__emptystate: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25
  },

  swapform__uppercase: {
    textTransform: 'uppercase'
  },

  amountform__uuidlink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: '1.375em'
  },

  swapDetail__ListItemRight: {
    top: 12,
    transform: 'none'
  },

  root__warningPlate: {
    textAlign: 'center',
    padding: 12,
    border: `1px dashed ${theme.colors.warning}`,
    borderRadius: 4,
    width: '100%'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  detailModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  swap: Map<*, *>
};

export class SwapDetail extends React.PureComponent<Props> {
  renderNotFound = () => {
    const { classes } = this.props;
    return (
      <div className={classes.swapform__emptystate}>
        <Typography variant="h6" gutterBottom>
          <CloudOff className={classes.swapform__iconemptystate} />
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          No data found. Please start making a swap.
        </Typography>
      </div>
    );
  };

  openExplorer = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    openNewWindow(evt.target.href);
  };

  renderTXLink = (title: string, value, link: string | Node) => {
    const { classes } = this.props;
    return (
      <ListItem className={classes.swapDetail__listitem}>
        <ListItemText
          primary={
            <Typography variant="caption" gutterBottom>
              {title}
            </Typography>
          }
          secondary={link}
        />

        {/* <ListItemSecondaryAction className={classes.swapDetail__ListItemRight}>
          <Typography variant="caption" gutterBottom>
            {value}
          </Typography>
        </ListItemSecondaryAction>
        */}
      </ListItem>
    );
  };

  renderMyFee = () => {
    const { swap, classes } = this.props;
    const value = swap.getIn(['myfee', 'value']);
    const tx = swap.getIn(['myfee', 'tx']);
    const coin = swap.getIn(['myfee', 'coin']);
    let link = emptyLink;
    if (tx !== SWAP_TX_DEFAULT) {
      link = (
        <ExplorerLink
          tx={tx}
          symbol={coin}
          className={classes.amountform__uuidlink}
          content="Open TX in block explorer"
        />
      );
    }
    return this.renderTXLink(
      'MY FEE',
      value !== 0 ? `${value} ${coin}` : value,
      link
    );
  };

  renderBobDeposit = () => {
    const { swap, classes } = this.props;
    const value = swap.getIn(['bobdeposit', 'value']);
    const tx = swap.getIn(['bobdeposit', 'tx']);
    const coin = swap.getIn(['bobdeposit', 'coin']);
    let link = emptyLink;
    if (tx !== SWAP_TX_DEFAULT) {
      link = (
        <ExplorerLink
          tx={tx}
          symbol={coin}
          className={classes.amountform__uuidlink}
          content="Open TX in block explorer"
        />
      );
    }
    return this.renderTXLink(
      'BOB DEPOSIT',
      value !== 0 ? `${value} ${coin}` : value,
      link
    );
  };

  renderAlicepayment = () => {
    const { swap, classes } = this.props;
    const value = swap.getIn(['alicepayment', 'value']);
    const tx = swap.getIn(['alicepayment', 'tx']);
    const coin = swap.getIn(['alicepayment', 'coin']);
    let link = emptyLink;
    if (tx !== SWAP_TX_DEFAULT) {
      link = (
        <ExplorerLink
          tx={tx}
          symbol={coin}
          className={classes.amountform__uuidlink}
          content="Open TX in block explorer"
        />
      );
    }
    return this.renderTXLink(
      'ALICE PAYMENT',
      value !== 0 ? `${value} ${coin}` : value,
      link
    );
  };

  renderBobpayment = () => {
    const { swap, classes } = this.props;
    const value = swap.getIn(['bobpayment', 'value']);
    const tx = swap.getIn(['bobpayment', 'tx']);
    const coin = swap.getIn(['bobpayment', 'coin']);
    let link = emptyLink;
    if (tx !== SWAP_TX_DEFAULT) {
      link = (
        <ExplorerLink
          tx={tx}
          symbol={coin}
          className={classes.amountform__uuidlink}
          content="Open TX in block explorer"
        />
      );
    }
    return this.renderTXLink(
      'BOB PAYMENT',
      value !== 0 ? `${value} ${coin}` : value,
      link
    );
  };

  renderAlicespend = () => {
    const { swap, classes } = this.props;
    const value = swap.getIn(['alicespend', 'value']);
    const coin = swap.getIn(['alicespend', 'coin']);
    const tx = swap.getIn(['alicespend', 'tx']);
    let link = emptyLink;

    if (tx !== SWAP_TX_DEFAULT) {
      link = (
        <ExplorerLink
          tx={tx}
          symbol={coin}
          className={classes.amountform__uuidlink}
          content="Open TX in block explorer"
        />
      );
    }
    return this.renderTXLink(
      'ALICE SPEND',
      value !== 0 ? `${value} ${coin}` : value,
      link
    );
  };

  renderSwap = () => {
    const { swap, classes, onClose } = this.props;
    const swapsLoading = swap.get('status') !== FINISHED_SWAPS_STATE;
    const swapsError = swap.get('error');
    return (
      <React.Fragment>
        <CardHeader
          title={
            <Typography variant="h6" gutterBottom>
              Swap Detail
            </Typography>
          }
          subheader={
            <Typography variant="caption" gutterBottom>
              {swap.get('uuid')}
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={2} className={classes.swapDetail__container}>
            <Grid item xs={6} className={classes.amountform__itemCenter}>
              <CoinSelectable
                className={classes.swapform_button}
                icon={getCoinMemoize(swap.get('alice'))}
                title="Deposit"
                subTitle={
                  <span className={classes.swapDetail__danger}>
                    {swap.get('aliceamount')} {swap.get('alice')}
                    <Typography variant="caption" display="block" gutterBottom>
                      - {floor(swap.getIn(['requested', 'aliceAmount']), 8)}{' '}
                      {swap.get('alice')}
                    </Typography>
                  </span>
                }
              />
            </Grid>
            <SwapHorizIcon className={classes.amountform__switchBtn} />
            <Grid item xs={6} className={classes.amountform__itemCenter}>
              <CoinSelectable
                className={classes.swapform_button}
                icon={getCoinMemoize(swap.get('bob'))}
                title="Receive"
                subTitle={
                  <span className={classes.swapDetail__success}>
                    {swap.get('bobamount')} {swap.get('bob')}
                    <Typography variant="caption" display="block" gutterBottom>
                      + {floor(swap.getIn(['requested', 'bobAmount']), 8)}{' '}
                      {swap.get('bob')}
                    </Typography>
                  </span>
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.amountform__itemCenter}>
              <Typography variant="body2" gutterBottom>
                Step {swap.get('sentflags').size}/{STATE_SWAPS.length - 1}:{' '}
                {STATE_SWAPS[swap.get('sentflags').size]}
              </Typography>
              <LinearProgress
                color="primary"
                variant="determinate"
                value={
                  (swap.get('sentflags').size * 100) / (STATE_SWAPS.length - 1)
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.amountform__itemCenter}>
              <List>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        DATE
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction
                    className={classes.swapDetail__ListItemRight}
                  >
                    <Typography variant="caption" gutterBottom>
                      {formatDate(
                        swap.get('expiration') * 1000,
                        'yyyy-MM-dd HH:mm:ss'
                      )}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        FROM
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction
                    className={classes.swapDetail__ListItemRight}
                  >
                    <Typography variant="caption">
                      <a
                        href={explorer.address(
                          swap.get('alicesmartaddress'),
                          swap.get('alice')
                        )}
                        onClick={this.openExplorer}
                        className={classes.amountform__uuidlink}
                      >
                        {swap.get('alicesmartaddress')}
                      </a>
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        TO
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction
                    className={classes.swapDetail__ListItemRight}
                  >
                    <Typography variant="caption">
                      <a
                        href={explorer.address(
                          swap.get('bobsmartaddress'),
                          swap.get('bob')
                        )}
                        onClick={this.openExplorer}
                        className={classes.amountform__uuidlink}
                      >
                        {swap.get('bobsmartaddress')}
                      </a>
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider className={classes.swapDetail__divider} />
                {this.renderMyFee()}
                {this.renderBobDeposit()}
                {this.renderAlicepayment()}
                {this.renderBobpayment()}
                {this.renderAlicespend()}
                <Divider className={classes.swapDetail__divider} />
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="caption"
                        gutterBottom
                        className={classes.swapform__uppercase}
                      >
                        Status
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography
                      variant="caption"
                      gutterBottom
                      className={classes.swapform__uppercase}
                    >
                      {swap.get('status')}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              {!swapsLoading && swapsError && (
                <div className={classes.root__warningPlate}>
                  <Typography variant="button" gutterBottom>
                    Error
                  </Typography>
                  <Typography gutterBottom>
                    {swapsError.get('message')}
                  </Typography>
                </div>
              )}
            </Grid>
            <BuyButton
              color="primary"
              variant="contained"
              className={classes.amountform__item}
              onClick={onClose}
            >
              Close
            </BuyButton>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  };

  render() {
    debug('render');
    const { swap, classes, detailModal, onClose } = this.props;
    return (
      <SwipeableDrawer
        anchor="right"
        open={detailModal.get('open')}
        onClose={onClose}
        onOpen={onOpenEmpty}
      >
        <div tabIndex={0} role="button" className={classes.swapDetail__content}>
          {!swap && this.renderNotFound()}
          {swap && this.renderSwap()}
        </div>
      </SwipeableDrawer>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    onClose: () => dispatch(closeDetailModal())
  };
}

const mapStateToProps = createStructuredSelector({
  detailModal: makeSelectSwapDetailModal(),
  swap: makeSelectSwapInDetailModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(SwapDetail);
