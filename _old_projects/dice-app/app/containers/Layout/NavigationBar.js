// @flow

import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MDCAppBar from '../../components/AppBar';
import routes from '../../constants/routes.json';

const debug = require('debug')('kmdice:containers:layout:NavigationBar');

const TRANSACTION_TIME = 300;

const styles = theme => ({
  navigationBar__start: {
    position: 'absolute',
    left: 24
  },
  navigationBar__center: {
    justifyContent: 'center',
    order: 0,
    display: 'inline-flex',
    flex: '1 1 auto'
  },
  navigationBar__right: {
    position: 'absolute',
    right: 24
  },
  navigationBar__title: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-32px',
    color: '#808080'
  },
  navigationBar__tabs: {
    width: '100%'
  },
  navigationBar__tab: {
    minWidth: 100,
    minHeight: 65,
    flex: '1 1 auto'
  },
  navigationBar__space: {
    flex: '30 1 auto'
  },
  navigationBar__labelContainer: {
    paddingLeft: 12,
    paddingRight: 12
  },
  navigationBar__badge: {
    top: -15,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
});

type INavigationBarProps = {
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object
};

type INavigationBarState = {
  tabIndex: number
};

class NavigationBar extends React.PureComponent<
  INavigationBarProps,
  INavigationBarState
> {
  static displayName = 'NavigationBar';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: props.location.pathname
    };
  }

  goto = router => {
    this.setState(
      {
        tabIndex: router
      },
      () => {
        setTimeout(() => {
          this.props.history.push(router);
        }, TRANSACTION_TIME);
      }
    );
  };

  onClickTab = (evt: SyntheticInputEvent<>, value) => {
    evt.preventDefault();
    this.goto(value);
  };

  render() {
    debug(`render`);

    const { children, classes } = this.props;
    const { tabIndex } = this.state;
    const size = 0;

    return (
      <MDCAppBar>
        <Toolbar>
          {/* <section className={classes.navigationBar__start} /> */}

          <Tabs
            className={classes.navigationBar__tabs}
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.onClickTab}
          >
            <Tab
              value={routes.WALLET}
              label={<span>Wallet</span>}
              className={classes.navigationBar__tab}
            />
            <Tab
              value={routes.HOME}
              label={
                size > 0 ? (
                  <Badge
                    color="secondary"
                    badgeContent={size}
                    classes={{ badge: classes.navigationBar__badge }}
                  >
                    Dice Game
                  </Badge>
                ) : (
                  'Dice Game'
                )
              }
              className={classes.navigationBar__tab}
            />
            <div className={classes.navigationBar__space} />
            <Tab
              value={routes.CARD}
              label={<span>Card Game</span>}
              className={classes.navigationBar__tab}
            />
            <Tab
              value={routes.ABOUT}
              label={<span>About</span>}
              className={classes.navigationBar__tab}
            />
          </Tabs>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.navigationBar__title}
          >
            KMDice Game
          </Typography>
          {/* <section className={classes.navigationBar__right} /> */}
        </Toolbar>
      </MDCAppBar>
    );
  }
}

export default compose(withRouter)(withStyles(styles)(NavigationBar));
