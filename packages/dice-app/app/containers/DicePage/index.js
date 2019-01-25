// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ErrorBoundary from '../../components/ErrorBoundary';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import { NavigationLayout } from '../Layout';
import Betbox from './components/Betbox';
import BetTable from './components/BetTable';
import ProgressBar from './ProgressBar';

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

        <Grid
          item
          xs={12}
          style={{
            // backgroundColor: '#e8eaed',
            backgroundColor: '#fafafa',
            marginTop: 40
          }}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classNames(classes.borderRed)}
            style={{
              marginBottom: 19
            }}
          >
            <Tab label="All Bets" />
            <Tab label="Win" />
            <Tab label="Lose" />
          </Tabs>
          <BetTable />
        </Grid>
      </Grid>
    );
  }
}

const DicePageWapper = withStyles(styles)(DicePage);

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
