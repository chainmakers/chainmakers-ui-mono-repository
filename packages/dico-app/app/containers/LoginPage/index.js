// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
// import Avatar from '@material-ui/core/Avatar';
import swal from 'sweetalert';
import getConfig from '../../utils/config';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import CryptoIcons, { UNKNOW } from '../../components/CryptoIcons';
import ErrorBoundary from '../../components/ErrorBoundary';
import routes from '../../constants/routes.json';
import { EmptyLayout } from '../Layout';
import Passphrase from './components/Passphrase';
import reducer from './reducer';
import saga from './saga';
import { login } from '../App/actions';
import {
  makeSelectLoading,
  makeSelectAuthenticated,
  makeSelectError
} from '../App/selectors';
import { APP_STATE_NAME } from './constants';

// import image from './components/logo.png';
const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');

// const styles = theme => ({
const styles = () => ({
  loginContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto',
    background: '#fff'
  },

  loginContainer__center: {
    minHeight: 350,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%) translateY(25%)'
  },

  loginContainer__card: {
    width: 430,
    borderRadius: 8,
    boxShadow:
      '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'
  },

  loginContainer__logo: {
    margin: '14px auto 0px',
    position: 'relative',
    height: 85,
    width: 85,
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

const debug = require('debug')('dicoapp:containers:LoginPage');

type Props = {
  loading: boolean,
  authenticated: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  error: Object | boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLogin: Function,
  intl: IntlShape
};

type State = {
  passphrase: string
};

class LoginPage extends Component<Props, State> {
  props: Props;

  state = {
    passphrase: ''
  };

  componentDidUpdate = prevProps => {
    const { authenticated, error, history, intl } = this.props;
    if (authenticated && !prevProps.authenticated) {
      swal(
        'Success',
        intl.formatMessage({
          defaultMessage: 'Login Successful Message',
          id: 'dicoapp.containers.LoginPage.login_successful_message'
        }),
        'success'
      );
      history.push('/buy');
    }
    if (!authenticated && error) {
      swal('Something went wrong:', error.message, 'error');
    }
  };

  onLoginButtonClick = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { passphrase } = this.state;
    if (passphrase === '' || passphrase.length < 4) {
      return swal(
        'Oops!',
        'The passphrase you entered is either empty or too short.',
        'error'
      );
    }
    const { dispatchLogin } = this.props;
    dispatchLogin(passphrase);
  };

  onChange = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
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
    const symbol = COIN_BASE.coin;
    let Icon = CryptoIcons[symbol];
    if (!Icon) {
      Icon = UNKNOW;
    }

    return (
      <div className={classes.loginContainer}>
        <div className={classes.loginContainer__center}>
          <Card className={classes.loginContainer__card}>
            {loading && <LinearProgress />}
            <Icon className={classes.loginContainer__logo} alt="logo" />

            <CardContent className={classes.loginContainer__content}>
              <Typography
                variant="h5"
                className={classes.loginContainer__item}
                gutterBottom
              >
                <FormattedMessage id="dicoapp.containers.LoginPage.headline">
                  {(...content) => content}
                </FormattedMessage>
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <FormattedMessage id="dicoapp.containers.LoginPage.subheading">
                  {(...content) => content}
                </FormattedMessage>
              </Typography>

              <Passphrase
                loading={loading}
                passphrase={passphrase}
                className={classes.loginContainer__item}
                onChange={this.onChange}
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
                <FormattedMessage id="dicoapp.containers.LoginPage.submit">
                  {(...content) => content}
                </FormattedMessage>
              </Button>
            </CardContent>

            <Button
              fullWidth
              className={classes.loginContainer__bottomButton}
              onClick={this.gotoSeedPage}
            >
              <FormattedMessage id="dicoapp.containers.LoginPage.new_account">
                {(...content) => content}
              </FormattedMessage>
            </Button>
          </Card>
        </div>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: (passphrase?: string) => dispatch(login(passphrase))
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  authenticated: makeSelectAuthenticated(),
  error: makeSelectError()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const LoginPageWapper = compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
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
