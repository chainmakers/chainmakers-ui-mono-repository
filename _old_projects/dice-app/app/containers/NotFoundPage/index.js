// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorBoundary from '../../components/ErrorBoundary';
import routes from '../../constants/routes.json';
import { NavigationLayout } from '../Layout';
import UndrawTaken from './undraw-taken.svg';

const styles = {
  notFoundPage__container: {
    padding: '40px 0px 0px 0px',
    backgroundColor: '#e8eaed',
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    bottom: 0
  },
  notFoundPage__gridItem: {
    textAlign: 'center'
  },
  notFoundPage__link: {
    textDecoration: 'none'
  }
};

type INotFoundPageProps = {
  classes: Styles
};

class NotFoundPage extends React.PureComponent<INotFoundPageProps> {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={0}
        justify="center"
        className={classes.notFoundPage__container}
      >
        <Grid item xs={12} className={classes.notFoundPage__gridItem}>
          <UndrawTaken width="420" height="363.5" />
        </Grid>
        <Grid item xs={12} className={classes.notFoundPage__gridItem}>
          <Typography variant="h5">Not Found Page</Typography>
          <Typography variant="body1">
            <Link to={routes.HOME} className={classes.notFoundPage__link}>
              Back to HomePage
            </Link>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
const NotFoundPageWapper = withStyles(styles)(NotFoundPage);

const Index = () => (
  <NavigationLayout>
    <ErrorBoundary>
      <NotFoundPageWapper />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
