// @flow
import React, { PureComponent } from 'react';
import type { ChildrenArray } from 'react';
// import { remote } from 'electron';
// import { setWindowBounds } from 'electron-util';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import { minWindowSize } from '../../config/config-default';
import NavigationBar from './NavigationBar';
import ProgressBar from './ProgressBar';

const debug = require('debug')('atomicapp:containers:layout:NavigationLayout');

// const setAppWindowBounds = (size = minWindowSize) => {
//   const win = remote.getCurrentWindow();
//   win.setResizable(true);
//   win.setMaximizable(true);
//   win.setFullScreenable(true);
//   win.setMinimumSize(size.width, size.height);
//   setWindowBounds(size, { animated: true });
//   win.center();
// };

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: '#fff',
    minHeight: '100%'
  }
});

type INavigationLayoutProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  children: ChildrenArray<any>
};

class NavigationLayout extends PureComponent<INavigationLayoutProps> {
  // constructor(props) {
  //   super(props);
  //   setAppWindowBounds();
  // }

  static defaultProps = {};

  render() {
    debug(`render`);

    const { children, classes } = this.props;

    return (
      <React.Fragment>
        <ProgressBar />
        <NavigationBar />
        <main className={classes.content}>{children}</main>
        {/* <div className={classes.root}> */}
        {/* <DICTypography> */}
        {/* <header className="mdc-toolbar mdc-toolbar--fixed fl-empty-layout__header"> */}

        {/* </header> */}
        {/* <aside className="mdc-drawer mdc-drawer--temporary mdc-drawer--open mdc-drawer--animating"> */}
        {/* </aside> */}

        {/* </DICTypography> */}
        {/* </div> */}
        {/* <div className="mdc-layout-grid">footer</div> */}
      </React.Fragment>
    );
  }
}

NavigationLayout.displayName = 'NavigationLayout';

export default withStyles(styles)(NavigationLayout);
