// @flow
import React from 'react';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
import { openSnackbars } from '../Snackbars/actions';
import reducer from './reducer';
import saga from './saga';
import { EmptyLayout } from '../Layout';
import Passphrase from './components/Passphrase';
import Wif from './components/Wif';
import { APP_STATE_NAME } from './constants';
import { routes } from '../../constants';

const styles = () => ({
  seedContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  seedContainer__card: {
    minHeight: 350,
    width: 780,
    borderRadius: 8,
    boxShadow:
      '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'
  },

  seedContainer__content: {
    width: 758,
    margin: '0px auto',
    textAlign: 'center'
  },

  seedContainer__bottom30: {
    marginBottom: 20
  },

  seedContainer__item: {
    marginBottom: 12
  },

  seedContainer__description: {
    textAlign: 'justify'
  },

  seedContainer__bottomButton: {
    height: 62,
    color: '#333',
    marginTop: 20
  },

  seedContainer__textLeft: {
    textAlign: 'left'
  }
});

const debug = require('debug')('atomicapp:containers:SeedPage');

type ISeedPageProps = {
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSnackbars: Function
};

type ISeedPageState = {};

class SeedPage extends React.PureComponent<ISeedPageProps, ISeedPageState> {
  gotoLoginPage = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { history } = this.props;
    history.push(routes.LOGIN);
  };

  handleCopySuccessfully = () => {
    const { dispatchOpenSnackbars } = this.props;
    dispatchOpenSnackbars('Copied!');
  };

  handleCopyFailed = () => {
    const { dispatchOpenSnackbars } = this.props;
    dispatchOpenSnackbars('Failed to copy file from text!');
  };

  render() {
    debug('render');
    const { classes } = this.props;
    return (
      <div className={classes.seedContainer}>
        <Card className={classes.seedContainer__card}>
          <CardContent className={classes.seedContainer__content}>
            <Typography
              variant="h5"
              className={classes.seedContainer__bottom30}
              gutterBottom
            >
              <FormattedMessage id="atomicapp.containers.SeedPage.title">
                {(...content) => content}
              </FormattedMessage>
            </Typography>
            <Typography
              gutterBottom
              className={classNames(
                classes.seedContainer__description,
                classes.seedContainer__item
              )}
            >
              <FormattedMessage id="atomicapp.containers.SeedPage.instructions">
                {(...content) => content}
              </FormattedMessage>
            </Typography>
            <Typography
              variant="h6"
              className={classNames(
                classes.seedContainer__textLeft,
                classes.seedContainer__item
              )}
              gutterBottom
            >
              <FormattedMessage id="atomicapp.containers.SeedPage.copy">
                {(...content) => content}
              </FormattedMessage>
            </Typography>
            <Passphrase
              handleCopySuccessfully={this.handleCopySuccessfully}
              handleCopyFailed={this.handleCopyFailed}
            />
            <Wif
              handleCopySuccessfully={this.handleCopySuccessfully}
              handleCopyFailed={this.handleCopyFailed}
            />
          </CardContent>
          <Button
            fullWidth
            className={classes.seedContainer__bottomButton}
            onClick={this.gotoLoginPage}
          >
            <FormattedMessage id="atomicapp.containers.SeedPage.bottom_button">
              {(...content) => content}
            </FormattedMessage>
          </Button>
        </Card>
      </div>
    );
  }
}
// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchOpenSnackbars: (message: string) => dispatch(openSnackbars(message))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

const SeedPageWapper = compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles)
)(SeedPage);

type RouterType = {
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object
};

const Index = ({ history }: RouterType) => (
  <EmptyLayout>
    <ErrorBoundary>
      <SeedPageWapper history={history} />
    </ErrorBoundary>
  </EmptyLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
