// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import type { Dispatch } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { openWifExpansion, closeWifExpansion } from '../actions';
import { makeSelectWif, makeSelectWifExpansion } from '../selectors';
import clipboardCopy from '../../../utils/clipboard-copy';

const styles = () => ({
  wifContainer: {
    '-ms-box-orient': 'horizontal',
    display: 'flex',
    '-webkit-justify-content': 'space-around',
    'justify-content': 'space-around',
    '-webkit-flex-flow': 'row wrap',
    'flex-flow': 'row wrap',
    '-webkit-align-items': 'stretch',
    'align-items': 'stretch'
  },
  wifContent: {
    padding: '13px 0'
  }
});

const debug = require('debug')('atomicapp:containers:SeedPage:Wif');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  wif: string,
  open: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenWifExpansion: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseWifExpansion: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  handleCopyFailed: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  handleCopySuccessfully: Function
};

type State = {
  supportedCopyCommandSupported: boolean
};

class Wif extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      supportedCopyCommandSupported:
        document && document.queryCommandSupported('copy')
    };
  }

  copyWifToClipboard = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { wif, handleCopySuccessfully, handleCopyFailed } = this.props;
    const success = clipboardCopy(wif);
    if (success) {
      handleCopySuccessfully();
    } else {
      handleCopyFailed();
    }
    evt.target.focus();
  };

  onChange = (evt: SyntheticInputEvent<>, expanded: boolean) => {
    evt.preventDefault();
    const { dispatchOpenWifExpansion, dispatchCloseWifExpansion } = this.props;
    if (expanded) {
      dispatchOpenWifExpansion();
    } else {
      dispatchCloseWifExpansion();
    }
  };

  render() {
    debug('render');
    const { classes, wif, open } = this.props;
    const { supportedCopyCommandSupported } = this.state;
    return (
      <ExpansionPanel expanded={open} onChange={this.onChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <FormattedMessage id="atomicapp.containers.SeedPage.Passphrase.reveal_wif">
              {(...content) => content}
            </FormattedMessage>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.wifContainer}>
          <Typography className={classes.wifContent}>{wif}</Typography>
          {wif && supportedCopyCommandSupported && (
            <IconButton aria-label="Copy" onClick={this.copyWifToClipboard}>
              <FileCopyIcon />
            </IconButton>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchOpenWifExpansion: () => dispatch(openWifExpansion()),
    dispatchCloseWifExpansion: () => dispatch(closeWifExpansion())
  };
}

const mapStateToProps = createStructuredSelector({
  wif: makeSelectWif(),
  open: makeSelectWifExpansion()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Wif);
