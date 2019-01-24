// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = {};

let id = 0;
function createData(time, amount, calories, fat, carbs, protein) {
  id += 1;
  return { id, time, amount, calories, fat, carbs, protein };
}

const rows = [
  createData(5, '2013-02-04 23:44:30', '4.0', 'pending', '+ 1.0', 4.0),
  createData(4, '2013-02-04 23:44:30', '4.0', 'win', '+ 0.6', 4.3),
  createData(3, '2013-02-04 23:44:30', '4.0', 'win', '+ 0.7', 6.0),
  createData(2, '2013-02-04 23:44:30', '4.0', 'lose', '- 2.0', 4.3),
  createData(1, '2013-02-04 23:44:30', '4.0', 'win', '+ 2.0', 3.9)
];

type IBetTableProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class BetTable extends React.PureComponent<IBetTableProps> {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">TIME</TableCell>
            <TableCell align="center">AMOUNT</TableCell>
            <TableCell align="center">RESULT</TableCell>
            <TableCell align="center">PAYOUT</TableCell>
            <TableCell align="right">BALANCE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(BetTable);
