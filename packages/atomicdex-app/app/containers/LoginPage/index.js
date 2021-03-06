// @flow
import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
import { routes } from '../../constants';
import { EmptyLayout } from '../Layout';
import { openSnackbars } from '../Snackbars/actions';
import Passphrase from './components/Passphrase';
import saga from './saga';
import { login } from '../App/actions';
import {
  makeSelectLoading,
  makeSelectAuthenticated,
  makeSelectError
} from '../App/selectors';
import { APP_STATE_NAME } from './constants';
import LOGO from './logo.svg';

const LOGO_SIZE = 120;

// const styles = theme => ({
const styles = () => ({
  loginContainer: {
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

  loginContainer__card: {
    minHeight: 350,
    width: 430,
    borderRadius: 8,
    boxShadow:
      '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'
  },

  loginContainer__logo: {
    margin: '14px auto 0px',
    position: 'relative',
    height: LOGO_SIZE,
    width: LOGO_SIZE,
    display: 'flex'
  },

  loginContainer__content: {
    width: 400,
    margin: '0px auto',
    textAlign: 'center'
  },

  loginContainer__item: {
    marginBottom: 30
  },

  loginContainer__loginButton: {
    boxShadow: 'none',
    border: 0,
    height: 36
  },

  loginContainer__bottomButton: {
    height: 62,
    color: '#333'
  }
});

const debug = require('debug')('atomicapp:containers:LoginPage');

type ILoginPageProps = {
  loading: boolean,
  authenticated: boolean,
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  error: Object | boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLogin: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSnackbars: Function
};

type ILoginPageState = {
  passphrase: string
};

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  state = {
    passphrase: ''
  };

  componentDidUpdate = () => {
    const { authenticated, dispatchOpenSnackbars, error } = this.props;
    if (!authenticated && error) {
      dispatchOpenSnackbars(`Something went wrong: ${error.message}`);
    }
  };

  login = () => {
    const { dispatchLogin, dispatchOpenSnackbars } = this.props;
    const { passphrase } = this.state;
    if (passphrase === '' || passphrase.length < 4) {
      return dispatchOpenSnackbars(
        'Oops! The passphrase you entered is either empty or too short.'
      );
    }
    dispatchLogin({
      passphrase
    });
  };

  onLoginButtonClick = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    this.login();
  };

  onKeyPress = (evt: SyntheticInputEvent<>) => {
    if (evt.which === 13) {
      this.login();
    }
  };

  onChange = (evt: SyntheticInputEvent<>) => {
    const { value } = evt.target;
    this.setState({
      passphrase: value
    });
  };

  gotoSeedPage = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { history } = this.props;
    history.push(routes.SEED);
  };

  render() {
    debug('render');
    const { loading, classes } = this.props;
    const { passphrase } = this.state;

    return (
      <div className={classes.loginContainer}>
        <Card className={classes.loginContainer__card}>
          {loading && <LinearProgress />}
          <LOGO
            className={classes.loginContainer__logo}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            viewBox="0 0 32 32"
            alt="logo"
          />
          <CardContent className={classes.loginContainer__content}>
            <Typography
              variant="h5"
              className={classes.loginContainer__item}
              gutterBottom
            >
              <FormattedMessage id="atomicapp.containers.LoginPage.headline">
                {(...content) => content}
              </FormattedMessage>
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              <FormattedMessage id="atomicapp.containers.LoginPage.subheading">
                {(...content) => content}
              </FormattedMessage>
            </Typography>

            <Passphrase
              loading={loading}
              passphrase={passphrase}
              className={classes.loginContainer__item}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
            />

            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              color="primary"
              type="submit"
              onClick={this.onLoginButtonClick}
              className={classNames(
                classes.loginContainer__item,
                classes.loginContainer__loginButton
              )}
            >
              <FormattedMessage id="atomicapp.containers.LoginPage.submit">
                {(...content) => content}
              </FormattedMessage>
            </Button>
          </CardContent>

          <Button
            fullWidth
            className={classes.loginContainer__bottomButton}
            onClick={this.gotoSeedPage}
          >
            <FormattedMessage id="atomicapp.containers.LoginPage.new_account">
              {(...content) => content}
            </FormattedMessage>
          </Button>
        </Card>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: (passphrase?: string) => dispatch(login(passphrase)),
    dispatchOpenSnackbars: (message: string) => dispatch(openSnackbars(message))
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  authenticated: makeSelectAuthenticated(),
  error: makeSelectError()
});

const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const LoginPageWapper = compose(
  withSaga,
  withConnect,
  withStyles(styles)
)(LoginPage);

type RouterType = {
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object
};

const Index = ({ history }: RouterType) => (
  <EmptyLayout>
    <ErrorBoundary>
      <LoginPageWapper history={history} />
    </ErrorBoundary>
  </EmptyLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
