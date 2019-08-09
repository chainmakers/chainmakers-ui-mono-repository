// @flow
import React from 'react';
import ClassNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const debug = require('debug')('atomicapp:components:WarningPlate');

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    padding: 12,
    border: `1px dashed ${theme.colors.warning}`,
    borderRadius: 4,
    width: '100%'
  }
}));

type IWarningPlateProps = {
  className?: string,
  children: Object
};

function WarningPlate(props: IWarningPlateProps) {
  const classes = useStyles();
  const { className, children, ...other } = props;

  debug('render');
  return (
    <div className={ClassNames(classes.root, className)} {...other}>
      {children}
    </div>
  );
}

WarningPlate.defaultProps = {};

WarningPlate.displayName = 'components__WarningPlate';

export default WarningPlate;
