// @flow
import React from 'react';
import type { Node } from 'react';
// import { remote } from 'electron';
// import { centerWindow } from 'electron-util';
// import { loginWindowSize } from '../../config/config-default';

const debug = require('debug')('atomicapp:containers:layout:EmptyLayout');

// const setLoginWindowBounds = (size = loginWindowSize) => {
//   const win = remote.getCurrentWindow();
//   win.setFullScreen(false);
//   win.setFullScreenable(false);
//   win.setResizable(false);
//   win.setMaximizable(false);
//   win.setMinimumSize(size.width, size.height);
//   centerWindow({
//     size: {
//       width: size.width,
//       height: size.height
//     },
//     animated: true
//   });
// };

type IEmptyLayoutProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  children: Node
};

export default class EmptyLayout extends React.PureComponent<IEmptyLayoutProps> {
  // constructor(props) {
  //   super(props);
  //   setLoginWindowBounds();
  // }
  static displayName = 'EmptyLayout';

  render() {
    debug(`render`);

    const { children } = this.props;

    return children;
  }
}
