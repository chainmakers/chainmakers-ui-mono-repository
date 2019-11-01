// https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/js/redux-saga.md#usage

// A mode argument can be one of three constants (import them from utils/constants):

// RESTART_ON_REMOUNT (default value) — starts a saga when a component is being mounted and cancels with task.cancel() on component un-mount for improved performance;
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';

// DAEMON — starts a saga on component mount and never cancels it or starts again;
export const DAEMON = '@@saga-injector/daemon';

// ONCE_TILL_UNMOUNT — behaves like RESTART_ON_REMOUNT but never runs the saga again.
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

// RESTART_ON_REMOUNT (default value) — starts a websocket when a component is being mounted and cancels with task.cancel() on component un-mount for improved performance;
export const WEBSOCKET_RESTART_ON_REMOUNT =
  '@@websocket-injector/restart-on-remount';

// DAEMON — starts a websocket on component mount and never cancels it or starts again;
export const WEBSOCKET_DAEMON = '@@websocket-injector/daemon';
