// @flow
import React from 'react';
import { shell } from 'electron';
import type { List } from 'immutable';
import { MemoizedRender } from 'react-memoize';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { formatDate } from 'barterdex-utilities';
import explorer from 'app/lib/explorer';
import { Line } from '../../../components/placeholder';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:TransactionsTable'
);

const line60 = (
  <Line
    width={60}
    style={{
      margin: 0
    }}
  />
);

const line90 = (
  <Line
    width={90}
    style={{
      margin: 0
    }}
  />
);

const line120 = (
  <Line
    width={120}
    style={{
      margin: 0
    }}
  />
);

const styles = theme => ({
  table: {
    maxHeight: 450
  },

  th: {
    color: '#555555',
    fontSize: 15
  },

  transactionTable__cellSuccess: {
    color: theme.colors.success
  },

  transactionTable__cellDanger: {
    color: theme.colors.danger
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  data: List<*>,
  loading: boolean
};

class TransactionsTable extends React.PureComponent<Props> {
  onClickTranstactions = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    // https://github.com/electron/electron/blob/master/docs/api/shell.md#shellopenexternalurl
    shell.openExternal(evt.target.href);
  };

  renderRecord = (t, k) => {
    if (!t) return null;
    const { classes } = this.props;
    return (
      <MemoizedRender
        value={{
          data: t,
          key: k,
          className: classes
        }}
        key={t.get('txid')}
      >
        {state => {
          const { data, key, className } = state;
          const linkExplorer = explorer.tx(data.get('txid'), data.get('coin'));
          return (
            <TableRow>
              <TableCell>{key + 1}</TableCell>
              <TableCell>{data.get('coin')}</TableCell>
              {data.get('category') === 'receive' && (
                <TableCell className={className.transactionTable__cellSuccess}>
                  + {data.get('amount')}
                </TableCell>
              )}
              {data.get('category') === 'send' && (
                <TableCell className={className.transactionTable__cellDanger}>
                  - {Math.abs(data.get('amount'))}
                </TableCell>
              )}
              <TableCell>
                {formatDate(
                  data.get('blocktime') * 1000,
                  'yyyy-MM-dd HH:mm:ss'
                )}
              </TableCell>
              <TableCell>
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                {linkExplorer && (
                  <a
                    style={{ color: '#000' }}
                    href={linkExplorer}
                    // target="_blank"
                    // rel="noopener noreferrer"
                    onClick={this.onClickTranstactions}
                  >
                    Open tx in explorer
                  </a>
                )}
                {!linkExplorer && data.get('txid')}
              </TableCell>
            </TableRow>
          );
        }}
      </MemoizedRender>
    );
  };

  renderLoading = () => (
    <TableRow key="skeleton__row">
      <TableCell>{line60}</TableCell>
      <TableCell>{line60}</TableCell>
      <TableCell>{line90}</TableCell>
      <TableCell>{line120}</TableCell>
      <TableCell>{line120}</TableCell>
    </TableRow>
  );

  render = () => {
    debug(`render`);
    const { classes, data, loading } = this.props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>#</TableCell>
            <TableCell className={classes.th}>
              <FormattedMessage id="atomicapp.containers.Wallet.last_transactions_coin">
                {(...content) => content}
              </FormattedMessage>
            </TableCell>
            {/* <TableCell className={classes.th}>
              <FormattedMessage id="atomicapp.containers.Wallet.last_transactions_blockheight">
                {(...content) => content}
              </FormattedMessage>
            </TableCell> */}
            <TableCell className={classes.th}>Amount</TableCell>
            <TableCell className={classes.th}>Date</TableCell>
            <TableCell className={classes.th}>
              <FormattedMessage id="atomicapp.containers.Wallet.last_transactions_transactionid">
                {(...content) => content}
              </FormattedMessage>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(this.renderRecord)}
          {loading && this.renderLoading()}
        </TableBody>
      </Table>
    );
  };
}

export default withStyles(styles)(TransactionsTable);
