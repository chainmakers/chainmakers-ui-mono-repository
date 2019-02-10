// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
import reducer from './reducer';
import saga from './saga';
import { EmptyLayout } from '../Layout';
import Passphrase from './components/Passphrase';
import Wif from './components/Wif';
import { APP_STATE_NAME } from './constants';
import routes from '../../constants/routes.json';

const styles = () => ({
  loginContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto'
  },

  center: {
    minHeight: 350,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%) translateY(25%)'
  },

  card: {
    width: 780,
    borderRadius: 8,
    // border: '1px solid #dadce0',
    // boxShadow: 'none'
    boxShadow:
      '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'
  },

  content: {
    width: 758,
    margin: '0px auto',
    textAlign: 'center'
  },

  bottom30: {
    marginBottom: 20
  },

  item: {
    marginBottom: 12
  },

  description: {
    textAlign: 'justify'
  },

  bottomButton: {
    height: 62,
    color: '#333',
    marginTop: 20
  },

  textLeft: {
    textAlign: 'left'
  }
});

const debug = require('debug')('atomicapp:containers:SeedPage');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object
};

type State = {
  openSnackbar: boolean,
  messsageSnackbar: string
};

class SeedPage extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      messsageSnackbar: ''
    };
  }

  gotoLoginPage = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { history } = this.props;
    history.push(routes.LOGIN);
  };

  handleCopySuccessfully = () => {
    this.setState({
      openSnackbar: true,
      messsageSnackbar: 'Copied!'
    });
  };

  handleCopyFailed = () => {
    this.setState({
      openSnackbar: true,
      messsageSnackbar: 'Failed to copy file from text!'
    });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      openSnackbar: false
    });
  };

  render() {
    debug('render');
    const { classes } = this.props;
    const { openSnackbar, messsageSnackbar } = this.state;
    return (
      <React.Fragment>
        <div className={classes.loginContainer}>
          <div className={classes.center}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Typography
                  variant="h5"
                  className={classes.bottom30}
                  gutterBottom
                >
                  <FormattedMessage id="atomicapp.containers.SeedPage.title">
                    {(...content) => content}
                  </FormattedMessage>
                </Typography>
                <Typography
                  gutterBottom
                  className={classNames(classes.description, classes.item)}
                >
                  <FormattedMessage id="atomicapp.containers.SeedPage.instructions">
                    {(...content) => content}
                  </FormattedMessage>
                </Typography>
                <Typography
                  variant="h6"
                  className={classNames(classes.textLeft, classes.item)}
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
                className={classes.bottomButton}
                onClick={this.gotoLoginPage}
              >
                <FormattedMessage id="atomicapp.containers.SeedPage.bottom_button">
                  {(...content) => content}
                </FormattedMessage>
              </Button>
            </Card>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{messsageSnackbar}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </React.Fragment>
    );
  }
}
const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

const SeedPageWapper = compose(
  withReducer,
  withSaga,
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
