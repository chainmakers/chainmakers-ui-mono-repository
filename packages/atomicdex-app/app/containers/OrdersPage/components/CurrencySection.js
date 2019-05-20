// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add';
import { floor } from 'barterdex-utilities';
// import getConfig from '../../../utils/config';
import getCoinMemoize from '../../../components/CryptoIcons';
import { openSelectCoinModal } from '../actions';
import { makeSelectCurrency } from '../selectors';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('atomicapp:containers:DexPage:CurrencySection');

// const line = (
//   <Line
//     width={60}
//     style={{
//       margin: 0
//     }}
//   />
// );

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  currency: Object
};

class CurrencySection extends React.PureComponent<Props> {
  static defaultProps = {};

  static displayName = 'CurrencySection';

  onClick = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenSelectCoinModal } = this.props;
    setTimeout(dispatchOpenSelectCoinModal, 5);
  };

  render() {
    debug(`render`);
    const {
      dispatchOpenSelectCoinModal,
      currency,
      balance,
      ...rest
    } = this.props;
    if (!currency.get('name'))
      return (
        <CoinSelectable
          id="add-icon-placeorder-dexpage"
          key="baseCoinAddIcon"
          icon={<AddIcon color="primary" />}
          onClick={this.onClick}
          {...rest}
        />
      );
    const icon = getCoinMemoize(currency.get('symbol'));
    const b = balance.get(currency.get('symbol'));
    return (
      <CoinSelectable
        id="add-icon-placeorder-dexpage"
        key={`baseCoin${currency.get('symbol')}`}
        selected
        data={currency.get('symbol')}
        icon={icon}
        title={currency.get('name')}
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
  currency: makeSelectCurrency()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const CurrencySectionWapper = withConnect(CurrencySection);

export default CurrencySectionWapper;
