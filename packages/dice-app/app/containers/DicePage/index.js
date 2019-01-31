// @flow
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ErrorBoundary from '../../components/ErrorBoundary';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import { NavigationLayout } from '../Layout';
import { APP_STATE_NAME } from './constants';
import reducer from './reducer';
import Betbox from './Betbox';
import BetHistory from './BetHistory';
import ProgressBar from './ProgressBar';
import saga from './saga';

const debug = require('debug')('kmdice:containers:DicePage');

const styles = {
  container: {
    marginTop: 65,
    padding: '40px 0px 0px 0px',
    backgroundColor: '#e8eaed'
  }
};

type IDicePageProps = {
  classes: Styles
};

class DicePage extends React.PureComponent<IDicePageProps> {
  render() {
    debug('render');
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={0}
        justify="center"
        className={classes.container}
      >
        <ProgressBar />
        <Betbox />
        <BetHistory />
      </Grid>
    );
  }
}
const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

const DicePageWapper = compose(
  withReducer,
  withSaga,
  withStyles(styles)
)(DicePage);

const Index = () => (
  <NavigationLayout>
    <ErrorBoundary>
      <DicePageWapper />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
