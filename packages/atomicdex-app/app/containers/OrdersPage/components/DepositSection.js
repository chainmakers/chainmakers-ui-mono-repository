// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add';
import { floor } from 'barterdex-utilities';
import getCoinMemoize from '../../../components/CryptoIcons';
import CoinSelectable from '../../../components/CoinSelectable';
import { covertSymbolToName } from '../../../utils/coin';
import { openSelectCoinModal } from '../actions';
import { makeSelectOrderbookDeposit } from '../selectors';

const debug = require('debug')('atomicapp:containers:OrderPage:DepositSection');

type IDepositSectionProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  deposit: string | null
};

class DepositSection extends React.PureComponent<IDepositSectionProps> {
  static defaultProps = {};

  static displayName = 'DepositSection';

  onClick = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenSelectCoinModal } = this.props;
    setTimeout(dispatchOpenSelectCoinModal, 5);
  };

  render() {
    debug(`render`);
    const {
      dispatchOpenSelectCoinModal,
      balance,
      deposit,
      ...rest
    } = this.props;
    if (!deposit)
      return (
        <CoinSelectable
          id="add-icon-placeorder-orderpage"
          key="depositCoinAddIcon"
          icon={<AddIcon color="primary" />}
          onClick={this.onClick}
          {...rest}
        />
      );
    const icon = getCoinMemoize(deposit);
    const b = balance.get(deposit);
    return (
      <CoinSelectable
        id="add-icon-placeorder-orderpage"
        key={`depositCoin${deposit}`}
        selected
        data={deposit}
        icon={icon}
        title={covertSymbolToName(deposit)}
        onClick={this.onClick}
        subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
        {...rest}
      />
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchOpenSelectCoinModal: () => {
      dispatch(openSelectCoinModal());
    }
  };
}

const mapStateToProps = createStructuredSelector({
  deposit: makeSelectOrderbookDeposit()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(DepositSection);
