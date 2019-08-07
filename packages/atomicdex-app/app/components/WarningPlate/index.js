// @flow
import React from 'react';
import ClassNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const debug = require('debug')('atomicapp:components:WarningPlate');

const useStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}));

type IWarningPlateProps = {
  symbol: string,
  className?: string
};

function WarningPlate(props: IWarningPlateProps) {
  const classes = useStyles();
  const { className, ...other } = props;

  debug('render');
  return <>WarningPlate</>;
}

WarningPlate.defaultProps = {};

WarningPlate.displayName = 'components__WarningPlate';

export default WarningPlate;
