// @flow
import React from 'react';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { Line } from '../../../components/placeholder';
import { floor } from '../utils';
import getConfig from '../../../utils/config';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('atomicapp:containers:BuyPage:CurrencySection');

const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');
const symbol = COIN_BASE.coin;
const line = (
  <Line
    width={60}
    style={{
      margin: 0
    }}
  />
);

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object
};

class CurrencySection extends React.PureComponent<Props> {
  static defaultProps = {};

  render() {
    debug(`render`);
    const { balance } = this.props;
    const b = balance.get(symbol);
    const icon = getCoinIcon(symbol);
    if (!b) {
      // not found in balance
      return (
        <CoinSelectable
          key={`baseCoin${symbol}`}
          selected
          data={symbol}
          icon={icon}
          title={COIN_BASE.name}
          subTitle={line}
        />
      );
    }
    return (
      <CoinSelectable
        key={`baseCoin${symbol}`}
        selected
        data={symbol}
        icon={icon}
        title={COIN_BASE.name}
        subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
        {...this.props}
      />
    );
  }
}

CurrencySection.displayName = 'CurrencySection';

export default CurrencySection;
