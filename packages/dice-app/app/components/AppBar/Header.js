// @flow
import React from 'react';
import type { Node } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  appBar__start: {
    position: 'absolute',
    left: 24
  },
  appBar__center: {
    justifyContent: 'center',
    order: 0,
    display: 'inline-flex',
    flex: '1 1 auto'
  },
  appBar__right: {
    position: 'absolute',
    right: 24
  }
});

type IHeaderProps = {
  title: Node
};

class Header extends React.PureComponent<IHeaderProps> {
  render() {
    const { title, classes, children } = this.props;

    return (
      <Toolbar>
        {/* <section className={classes.appBar__start}></section> */}
        <Typography variant="h6" color="inherit" noWrap className={classes.appBar__center}>
          {title}
        </Typography>
        <section className={classes.appBar__right}>
          {children}
        </section>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(Header);
