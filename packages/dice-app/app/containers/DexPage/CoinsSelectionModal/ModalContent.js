// @flow
import React from 'react';
import { MemoizedRender } from 'react-memoize';
import Grid from '@material-ui/core/Grid';
import CoinSelectable from '../components/CoinSelectable';
import { getCoin } from '../../../components/CryptoIcons';
import { covertSymbolToName } from '../../../utils/coin';

const debug = require('debug')(
  'atomicapp:containers:DexPage:CoinsSelectionModal:ModalContent'
);

type Props = {
  className: string,
  // eslint-disable-next-line flowtype/no-weak-types
  data: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  handleSelectCoin: Function,
  disabled: boolean
};

type State = {};

class ModalContent extends React.PureComponent<Props, State> {
  renderListItem = e => {
    const { className, handleSelectCoin, disabled } = this.props;
    return (
      <MemoizedRender
        value={{
          data: e,
          handleSelectCoin,
          className,
          disabled
        }}
        key={`coinsSelectionModal${e.symbol}${e.id}`}
      >
        {state => {
          const CIcon = getCoin(state.data.symbol);
          return (
            <Grid item xs={3}>
              <CoinSelectable
                disabled={state.disabled}
                className={state.className}
                icon={<CIcon width={56} height={56} viewBox="0 0 32 32" />}
                title={covertSymbolToName(state.data.symbol)}
                onClick={state.handleSelectCoin}
                data={state.data}
              />
            </Grid>
          );
        }}
      </MemoizedRender>
    );
  };

  render() {
    debug(`render`);
    const { data } = this.props;

    return data.map(this.renderListItem);
  }
}

export default ModalContent;
