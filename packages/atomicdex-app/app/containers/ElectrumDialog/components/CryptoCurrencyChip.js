// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import getCoinMemoize from '../../../components/CryptoIcons';

const debug = require('debug')(
  'atomicapp:containers:ElectrumDialog:components:CryptoCurrencyChip'
);

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
    borderRadius: 32,
    height: 40
  }
});

type ICryptoCurrencyChipProps = {
  selected: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  data: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClick: Function
};

class CryptoCurrencyChip extends React.PureComponent<ICryptoCurrencyChipProps> {
  static defaultProps = {
    selected: false,
    onClick: () => {}
  };

  static displayName = 'CryptoCurrencyChip';

  onClickChip = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { onClick, data } = this.props;
    onClick(data.coin);
  };

  render() {
    debug(`render`);
    const { classes, data, selected } = this.props;
    return (
      <Chip
        clickable
        color={selected ? 'primary' : ''}
        icon={getCoinMemoize(data.coin)}
        label={data.name || data.coin}
        className={classes.chip}
        onClick={this.onClickChip}
        variant="outlined"
      />
    );
  }
}

export default withStyles(styles)(CryptoCurrencyChip);
