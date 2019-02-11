// @flow
// https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UndrawBugFixing from './undraw_bug_fixing.svg';

const styles = () => ({
  errorBoundary__container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',

    '& a': {
      textDecoration: 'none',
      color: '#08a0ff',
      borderBottom: '1px solid transparent',
      transition: 'color 0.3s, border-color 0.3s'
    }
  }
});

type IErrorBoundaryProps = {
  classes: Styles,
  children: Node
};

type IErrorBoundaryState = {
  hasError: boolean
};

const debug = require('debug')('atomicapp:components:ErrorBoundary');

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    debug(error);
    debug(info);
  }

  reload = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  render() {
    const { children, classes } = this.props;
    const { hasError } = this.state;
    // You can render any custom fallback UI
    return hasError ? (
      <div className={classes.errorBoundary__container}>
        <UndrawBugFixing width="560" height="430" />
        <br />
        <Typography variant="h5" gutterBottom>
          There are something wrong
        </Typography>
        <a href="/" onClick={this.reload}>
          <Typography variant="subheading" gutterBottom>
            Please try to reload
          </Typography>
        </a>
      </div>
    ) : (
      children
    );
  }
}

export default withStyles(styles)(ErrorBoundary);
