// @flow
// https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UndrawBugFixing from './undraw_bug_fixing.svg';

const styles = () => ({
  errorBoundaryBg: {
    background: '#f5f8fa',
    borderTop: '1px solid #e6ecf0',
    padding: '2.625rem 1.3125rem',
    textAlign: 'center',

    '& a': {
      textDecoration: 'none',
      color: '#08a0ff',
      borderBottom: '1px solid transparent',
      transition: 'color 0.3s, border-color 0.3s'
    }
  }
});

type Props = {
  classes: Styles,
  children: Node
};

type State = {
  hasError: boolean
};

const debug = require('debug')('atomicapp:components:ErrorBoundary');

class ErrorBoundary extends React.Component<Props, State> {
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
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className={classes.errorBoundaryBg}>
          <UndrawBugFixing width="560" height="430" />
          <Typography variant="title" gutterBottom>
            There are something wrong
          </Typography>
          <a href="/" onClick={this.reload}>
            <Typography variant="subheading" gutterBottom>
              Please try to reload
            </Typography>
          </a>
        </div>
      );
    }

    return children;
  }
}

export default withStyles(styles)(ErrorBoundary);
