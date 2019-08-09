/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
// import ScrollManager from '../components/ScrollManager';
import { makeSelectAuthenticated, makeSelectLoading } from './App/selectors';
import connectedRouterRedirect from '../utils/auth-wrapper/connected-router-redirect';
import { routes } from '../constants';
// import App from './App';
// import ElectrumDialog from './ElectrumDialog';
import DexPage from './DexPage';
import WalletPage from './WalletPage';
import OrdersPage from './OrdersPage';
import HelpPage from './HelpPage';
import SeedPage from './SeedPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import SettingsPage from './SettingsPage';
// import LogoutDialog from './LogoutDialog';
// import Snackbars from './Snackbars';
// import WebSocketComponent from './WebSocketComponent';

const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  AuthenticatingComponent: null,
  authenticatedSelector: makeSelectAuthenticated(),
  authenticatingSelector: makeSelectLoading(),
  wrapperDisplayName: 'UserIsAuthenticated'
});

// const HomeFallback = userIsNotAuthenticatedRedir(WalletPage, (props, ...) => {
//   return (<Redirect to={routes.LOGIN} />);
// });
const HomeFallback = userIsNotAuthenticatedRedir(WalletPage, () => (
  <Redirect to={routes.LOGIN} />
));
const WalletFallback = userIsNotAuthenticatedRedir(WalletPage, () => (
  <Redirect to={routes.LOGIN} />
));
const OrdersFallback = userIsNotAuthenticatedRedir(OrdersPage, () => (
  <Redirect to={routes.LOGIN} />
));
const DexFallback = userIsNotAuthenticatedRedir(DexPage, () => (
  <Redirect to={routes.LOGIN} />
));
const HelpFallback = userIsNotAuthenticatedRedir(HelpPage, () => (
  <Redirect to={routes.LOGIN} />
));
const SettingsFallback = userIsNotAuthenticatedRedir(SettingsPage, () => (
  <Redirect to={routes.LOGIN} />
));
const LoginFallback = userIsNotAuthenticatedRedir(
  () => <Redirect to={routes.LOGIN} />,
  LoginPage
);

export default () => (
  <React.Fragment>
    {/* <Route component={App} /> */}
    {/* <Route component={LogoutDialog} /> */}
    {/* <Route component={ElectrumDialog} /> */}
    {/* <Route component={WebSocketComponent} /> */}
    {/* <Route component={Snackbars} /> */}
    <Switch>
      <Route path={routes.BUY} component={DexFallback} />
      <Route path={routes.WALLET} component={WalletFallback} />
      <Route path={routes.ORDER} component={OrdersFallback} />
      <Route path={routes.HELP} component={HelpFallback} />
      <Route path={routes.SETTINGS} component={SettingsFallback} />
      <Route path={routes.LOGIN} component={LoginFallback} />
      <Route path={routes.SEED} component={SeedPage} />
      <Route exact path={routes.HOME} component={HomeFallback} />
      <Route component={NotFoundPage} />
    </Switch>
    {/* <LogoutDialog /> */}
  </React.Fragment>
);
