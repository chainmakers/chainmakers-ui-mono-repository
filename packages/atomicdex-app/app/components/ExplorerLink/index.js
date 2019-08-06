// @flow
import React from 'react';
import ClassNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import explorer from '../../lib/explorer';
import openNewWindow from '../../utils/openNewWindow';

const debug = require('debug')('atomicapp:components:ExplorerLink');

const useStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}));

type IExplorerLinkProps = {
  symbol: string,
  address?: string,
  tx?: string,
  content?: string,
  className?: string
};

function ExplorerLink(props: IExplorerLinkProps) {
  const classes = useStyles();
  const { address, tx, symbol, content, className, ...other } = props;

  const openExplorer = (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();
    openNewWindow(evt.target.href);
  };

  debug('render');
  return (
    <a
      href={
        address ? explorer.address(address, symbol) : explorer.tx(tx, symbol)
      }
      onClick={openExplorer}
      className={ClassNames(classes.root, className)}
      {...other}
    >
      {content || (address || tx)}
    </a>
  );
}

ExplorerLink.defaultProps = {
  address: null,
  tx: null
};

ExplorerLink.displayName = 'components__ExplorerLink';

export default ExplorerLink;
