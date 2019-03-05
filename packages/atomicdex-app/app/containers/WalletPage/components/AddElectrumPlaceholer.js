// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:AddElectrumPlaceholer'
);

const styles = () => ({
  wallet__card: {
    border: '1px solid #dadce0',
    boxShadow: 'none',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    minHeight: 176
  }
});

type IAddElectrumPlaceholerProps = {
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  onClick: Function
};

class AddElectrumPlaceholer extends React.PureComponent<IAddElectrumPlaceholerProps> {
  static displayName = 'AddElectrumPlaceholer';

  render() {
    debug(`render`);

    const { classes, onClick } = this.props;

    return (
      <Card id="add-electrum-placeholer" className={classes.wallet__card}>
        <IconButton aria-label="AddElectrum" onClick={onClick}>
          <AddIcon color="primary" fontSize="large" />
        </IconButton>
      </Card>
    );
  }
}

export default withStyles(styles)(AddElectrumPlaceholer);
