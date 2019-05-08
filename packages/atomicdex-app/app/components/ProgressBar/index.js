// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  linearprogress: {
    zIndex: theme.zIndex.modal + 10,
    height: 3,
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 0
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

const ProgressBar = ({ classes }: Props) => (
  <LinearProgress className={classes.linearprogress} />
);

export default withStyles(styles)(ProgressBar);
