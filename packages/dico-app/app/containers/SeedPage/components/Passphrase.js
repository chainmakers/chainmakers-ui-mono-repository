// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { makeSelectPassphrase } from '../selectors';
import { generatePassphrase } from '../actions';
import { generateSeed } from '../utils';
import clipboardCopy from '../../../utils/clipboard-copy';

const styles = () => ({
  passphraseItem: {
    marginBottom: 12
  },
  passphraseActions: {
    position: 'relative',
    overflow: 'auto'
  },
  passphraseButton: {
    float: 'left',
    marginRight: 10
  },
  passphraseWell: {
    borderRadius: 0,
    backgroundColor: '#f7f7f7',
    height: 80,
    cursor: 'pointer',
    '& p': {
      padding: '20px'
    }
  },
  passphraseCopyIcon: {
    float: 'right',
    marginTop: 5,
    marginRight: 5
  }
});

const debug = require('debug')('dicoapp:containers:SeedPage:Passphrase');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchGeneratePassphrase: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  handleCopySuccessfully: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  handleCopyFailed: Function,
  passphrase: string
};

type State = {
  supportedCopyCommandSupported: boolean
};

class Passphrase extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      supportedCopyCommandSupported:
        document && document.queryCommandSupported('copy')
    };
  }

  copySeedToClipboard = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { passphrase, handleCopySuccessfully, handleCopyFailed } = this.props;
    const success = clipboardCopy(passphrase);
    if (success) {
      handleCopySuccessfully();
    } else {
      handleCopyFailed();
    }
    evt.target.focus();
  };

  handleGenerateSeed = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const passphrase = generateSeed();
    const { dispatchGeneratePassphrase } = this.props;
    dispatchGeneratePassphrase(passphrase);
  };

  render() {
    debug('render');
    const { classes, passphrase } = this.props;
    const { supportedCopyCommandSupported } = this.state;
    return (
      <React.Fragment>
        <div
          className={classNames(classes.passphraseWell, classes.passphraseItem)}
        >
          {supportedCopyCommandSupported && (
            <IconButton
              disabled={passphrase === ''}
              className={classes.passphraseCopyIcon}
              aria-label="Copy"
              onClick={this.copySeedToClipboard}
            >
              <FileCopyIcon />
            </IconButton>
          )}
          <p>{passphrase}</p>
        </div>
        <div
          className={classNames(
            classes.passphraseActions,
            classes.passphraseItem
          )}
        >
          <Button
            size="small"
            variant="outlined"
            className={classes.passphraseButton}
            onClick={this.handleGenerateSeed}
          >
            <FormattedMessage id="dicoapp.containers.SeedPage.Passphrase.generate">
              {(...content) => content}
            </FormattedMessage>
          </Button>
          <Button
            disabled={passphrase === ''}
            size="small"
            variant="outlined"
            color="primary"
            className={classes.passphraseButton}
            onClick={this.copySeedToClipboard}
          >
            <FormattedMessage id="dicoapp.containers.SeedPage.Passphrase.copy_seed">
              {(...content) => content}
            </FormattedMessage>
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchGeneratePassphrase: (passphrase: string) =>
      dispatch(generatePassphrase(passphrase))
  };
}

const mapStateToProps = createStructuredSelector({
  passphrase: makeSelectPassphrase()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Passphrase);
