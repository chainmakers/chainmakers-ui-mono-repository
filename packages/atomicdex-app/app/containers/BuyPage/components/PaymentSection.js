// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { List, Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { Line, Circle } from '../../../components/placeholder';
import getConfig from '../../../utils/config';
import { covertSymbolToName } from '../../../utils/coin';
import { floor } from '../utils';
import CoinSelectable from './CoinSelectable';
import { makeSelectBalanceList, makeSelectPricesEntities } from '../selectors';

const debug = require('debug')('atomicapp:containers:BuyPage:PaymentSection');

const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');

const line = (
  <Line
    width={60}
    style={{
      marginTop: 8
    }}
  />
);

const lineTitle = (
  <Line
    width={90}
    style={{
      margin: '5px 0px'
    }}
  />
);

const lineContent = (
  <Line
    width={90}
    style={{
      margin: 0
    }}
  />
);

const circle = (
  <Circle
    style={{
      width: 32,
      height: 32
    }}
  />
);

type Props = {
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrice: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onClick: Function,
  paymentCoin: string,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  entities: Map<*, *>,
  list: List<*>
};

class PaymentSection extends React.PureComponent<Props> {
  static defaultProps = {};

  renderPaymentCoin = symbol => {
    const {
      onClick,
      paymentCoin,
      entities,
      balance,
      dispatchLoadPrice
    } = this.props;
    const c = entities.get(symbol);
    const b = balance.get(symbol);
    const icon = getCoinIcon(symbol);
    const name = covertSymbolToName(symbol);
    if (!c) {
      // not found in entities
      return (
        <CoinSelectable
          dispatchLoadPrice={dispatchLoadPrice}
          disabled
          key={`paymentCoin${symbol}`}
          data={symbol}
          icon={icon}
          title={name}
          subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
          price={lineContent}
        />
      );
    }
    return (
      <CoinSelectable
        dispatchLoadPrice={dispatchLoadPrice}
        disabled={c.get('bestPrice') === 0 || b.get('balance') === 0}
        selected={paymentCoin === symbol}
        key={`paymentCoin${symbol}`}
        data={symbol}
        icon={icon}
        title={name}
        subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
        price={`1 ${COIN_BASE.coin} = ${c.get('bestPrice')} ${symbol}`}
        onClick={onClick}
      />
    );
  };

  renderLoading = () => (
    <CoinSelectable
      key="paymentCoinLoading"
      icon={circle}
      title={lineTitle}
      subTitle={line}
      price={lineContent}
    />
  );

  render() {
    debug(`render`);
    const { list, loading } = this.props;
    if (loading && list.size === 0) {
      return this.renderLoading();
    }
    return list.map(this.renderPaymentCoin);
  }
}

PaymentSection.displayName = 'PaymentSection';

const mapStateToProps = createStructuredSelector({
  list: makeSelectBalanceList(),
  entities: makeSelectPricesEntities()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(PaymentSection);
