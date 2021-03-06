// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import type { Dispatch } from 'redux';
import { withRouter } from 'react-router';
import type { Location } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import StoreIcon from '@material-ui/icons/Store';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import SettingsIcon from '@material-ui/icons/Settings';
import CachedIcon from '@material-ui/icons/Cached';
import { withStyles } from '@material-ui/core/styles';
import getCoinMemoize from '../../components/CryptoIcons';
import { showLogoutDialog } from '../LogoutDialog/actions';
import { routes } from '../../constants';

const debug = require('debug')('atomicapp:containers:Drawer');

const drawerWidth = 240;

const accountBalanceWalletIconCache = <AccountBalanceWalletIcon />;

const cachedIconIconCache = <CachedIcon />;

const storeIconCache = <StoreIcon />;

const settingsIconCache = <SettingsIcon />;

const liveHelpIconCache = <LiveHelpIcon />;

const powerSettingsNewIconCache = <PowerSettingsNewIcon />;

const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 0,
    ...theme.mixins.toolbar
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    borderRight: 'none',
    background: 'transparent'
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },

  docked: {
    height: '100%'
  },

  logoButton: {
    height: 'auto',
    margin: '0 auto',
    justifyContent: 'center',
    padding: 12
  },

  drawer__list: {
    paddingTop: 36
  },

  drawer__icon: {
    position: 'relative',
    width: 72,
    height: 72,
    paddingTop: 0,
    justifyContent: 'center'
  },

  drawer__iconCenter: {
    margin: '0 auto',
    justifyContent: 'center'
  },

  drawer__iconSelected: {
    '& svg': {
      fill: theme.palette.primary.light
    },
    color: theme.palette.primary.light
  },

  drawer__text: {
    fontSize: 10,
    marginTop: 6,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    textAlign: 'center'
  }
});

type Props = {
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object,
  location: Location,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchShowLogoutDialog: Function
};

type State = {
  anchor: string,
  fakeURL: string | null
};

class DICDrawer extends Component<Props, State> {
  static defaultProps = {};

  static displayName = 'DICDrawer';

  state = {
    anchor: 'left',
    fakeURL: null
  };

  goto = router => {
    this.setState(
      {
        fakeURL: router
      },
      () => {
        const { history } = this.props;
        history.push(router);
      }
    );
  };

  gotoHomePage = () => {
    this.goto(routes.WALLET);
  };

  gotoWalletPage = () => {
    this.goto(routes.WALLET);
  };

  gotoBuyPage = () => {
    this.goto(routes.BUY);
  };

  gotoOrderPage = () => {
    this.goto(routes.ORDER);
  };

  gotoHelpPage = () => {
    this.goto(routes.HELP);
  };

  gotoSettingsPage = () => {
    this.goto(routes.SETTINGS);
  };

  render() {
    debug(`render`);

    const { classes, location, dispatchShowLogoutDialog } = this.props;
    const { anchor, fakeURL } = this.state;
    let { pathname = '/' } = location;
    if (fakeURL) {
      pathname = fakeURL;
    }

    return (
      <Drawer
        id="drawer-navigation-layout"
        variant="permanent"
        classes={{
          docked: classes.docked,
          paper: classNames(classes.drawerPaper, classes.drawerPaperClose)
        }}
        anchor={anchor}
      >
        <div className={classes.toolbar}>
          <IconButton
            className={classes.logoButton}
            onClick={this.gotoHomePage}
          >
            {getCoinMemoize('CHAIN', 32, 32)}
          </IconButton>
        </div>
        <List className={classes.drawer__list}>
          <ListItem
            button
            id="wallet-drawer-navigation-layout"
            className={classNames(classes.drawer__icon, {
              [classes.drawer__iconSelected]:
                pathname === routes.WALLET || pathname === routes.HOME
            })}
            onClick={this.gotoWalletPage}
          >
            <ListItemIcon className={classes.drawer__iconCenter}>
              {accountBalanceWalletIconCache}
            </ListItemIcon>
            <span className={classes.drawer__text}>
              <FormattedMessage id="atomicapp.containers.Drawer.wallet">
                {(...content) => content}
              </FormattedMessage>
            </span>
          </ListItem>

          <ListItem
            button
            id="dex-drawer-navigation-layout"
            className={classNames(classes.drawer__icon, {
              [classes.drawer__iconSelected]: pathname === routes.BUY
            })}
            onClick={this.gotoBuyPage}
          >
            <ListItemIcon className={classes.drawer__iconCenter}>
              {cachedIconIconCache}
            </ListItemIcon>
            <span className={classes.drawer__text}>
              <FormattedMessage id="atomicapp.containers.Drawer.buy">
                {(...content) => content}
              </FormattedMessage>
            </span>
          </ListItem>

          <ListItem
            button
            id="dex-drawer-navigation-layout"
            className={classNames(classes.drawer__icon, {
              [classes.drawer__iconSelected]: pathname === routes.ORDER
            })}
            onClick={this.gotoOrderPage}
          >
            <ListItemIcon className={classes.drawer__iconCenter}>
              {storeIconCache}
            </ListItemIcon>
            <span className={classes.drawer__text}>
              <FormattedMessage id="atomicapp.containers.Drawer.order">
                {(...content) => content}
              </FormattedMessage>
            </span>
          </ListItem>

          <ListItem
            button
            className={classNames(classes.drawer__icon, {
              [classes.drawer__iconSelected]: pathname === routes.HELP
            })}
            onClick={this.gotoHelpPage}
          >
            <ListItemIcon className={classes.drawer__iconCenter}>
              {liveHelpIconCache}
            </ListItemIcon>
            <span className={classes.drawer__text}>
              <FormattedMessage id="atomicapp.containers.Drawer.help">
                {(...content) => content}
              </FormattedMessage>
            </span>
          </ListItem>

          <ListItem
            button
            className={classNames(classes.drawer__icon, {
              [classes.drawer__iconSelected]: pathname === routes.SETTINGS
            })}
            onClick={this.gotoSettingsPage}
          >
            <ListItemIcon className={classes.drawer__iconCenter}>
              {settingsIconCache}
            </ListItemIcon>
            <span className={classes.drawer__text}>
              <FormattedMessage id="atomicapp.containers.Drawer.settings">
                {(...content) => content}
              </FormattedMessage>
            </span>
          </ListItem>

          <ListItem
            button
            className={classes.drawer__icon}
            onClick={dispatchShowLogoutDialog}
          >
            <ListItemIcon className={classes.drawer__iconCenter}>
              {powerSettingsNewIconCache}
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchShowLogoutDialog: () => dispatch(showLogoutDialog())
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withRouter,
  withConnect
)(withStyles(styles)(DICDrawer));
