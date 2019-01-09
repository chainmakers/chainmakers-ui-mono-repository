// @flow
import React from 'react';
import { shell } from 'electron';
import type { List } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { Line } from '../../../components/placeholder';
import { formatDate } from '../../../lib/date-format';
import explorer from '../../../lib/explorer';

const debug = require('debug')(
  'dicoapp:containers:WalletPage:TransactionsTable'
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
    const linkExplorer = explorer.tx(t.get('txid'), t.get('coin'));
    const { classes } = this.props;
    return (
      <TableRow key={t.get('txid')}>
        <TableCell>{k + 1}</TableCell>
        <TableCell>{t.get('coin')}</TableCell>
        {t.get('category') === 'receive' && (
          <TableCell className={classes.transactionTable__cellSuccess}>
            + {t.get('amount')}
          </TableCell>
        )}
        {t.get('category') === 'send' && (
          <TableCell className={classes.transactionTable__cellDanger}>
            - {Math.abs(t.get('amount'))}
          </TableCell>
        )}
        <TableCell>
          {formatDate(t.get('blocktime') * 1000, 'yyyy-MM-dd HH:mm:ss')}
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
          {!linkExplorer && t.get('txid')}
        </TableCell>
      </TableRow>
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
              <FormattedMessage id="dicoapp.containers.Wallet.last_transactions_coin">
                {(...content) => content}
              </FormattedMessage>
            </TableCell>
            {/* <TableCell className={classes.th}>
              <FormattedMessage id="dicoapp.containers.Wallet.last_transactions_blockheight">
                {(...content) => content}
              </FormattedMessage>
            </TableCell> */}
            <TableCell className={classes.th}>Amount</TableCell>
            <TableCell className={classes.th}>Date</TableCell>
            <TableCell className={classes.th}>
              <FormattedMessage id="dicoapp.containers.Wallet.last_transactions_transactionid">
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
