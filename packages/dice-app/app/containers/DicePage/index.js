// @flow
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ErrorBoundary from '../../components/ErrorBoundary';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
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
  },

  borderRed: {
    // border: '1px solid red'
  }
};

type IDicePageProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class DicePage extends React.PureComponent<IDicePageProps> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

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
      <MDCAppBar>
        <MDCHeader title="KMDice Game">
          <Button color="inherit">Logout</Button>
        </MDCHeader>
      </MDCAppBar>
      <DicePageWapper />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
