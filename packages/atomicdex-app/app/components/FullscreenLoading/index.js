// @flow
import React from 'react';
import ClassNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Placeholder from '../placeholder';

const debug = require('debug')('atomicapp:components:FullscreenLoading');

const useStyles = makeStyles(theme => ({
  root: {},
  root__placeholder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-100px',
    width: '200px',
    textAlign: 'center'
  }
}));

type IFullscreenLoadingProps = {
  open: boolean,
  children: Object
};

function FullscreenLoading(props: IFullscreenLoadingProps) {
  const classes = useStyles();
  const { open, children, ...other } = props;

  debug('render');
  return (
    <Placeholder
      ready={open}
      placeholder={
        <div className={classes.root__placeholder}>
          <Typography variant="overline" gutterBottom>
            LOADING DATA FROM DB
          </Typography>
          <LinearProgress />
        </div>
      }
      {...other}
    >
      {children}
    </Placeholder>
  );
}

FullscreenLoading.defaultProps = {};

FullscreenLoading.displayName = 'components__FullscreenLoading';

export default FullscreenLoading;
