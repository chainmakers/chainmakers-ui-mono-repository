// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ErrorBoundary from '../../components/ErrorBoundary';
import { routes } from '../../constants';
import { EmptyLayout } from '../Layout';
import UndrawTaken from './undraw_empty.svg';

const styles = {
  notFoundPage__container: {
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
};

type INotFoundPageProps = {
  classes: Styles
};

class NotFoundPage extends React.PureComponent<INotFoundPageProps> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.notFoundPage__container}>
        <UndrawTaken width="496.5" height="430" />
        <br />
        <Typography variant="h5" gutterBottom>
          Not Found Page
        </Typography>
        <Link to={routes.HOME}>
          <Typography variant="subheading" gutterBottom>
            Back to HomePage
          </Typography>
        </Link>
      </div>
    );
  }
}
const NotFoundPageWapper = withStyles(styles)(NotFoundPage);

const Index = () => (
  <EmptyLayout>
    <ErrorBoundary>
      <NotFoundPageWapper />
    </ErrorBoundary>
  </EmptyLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
