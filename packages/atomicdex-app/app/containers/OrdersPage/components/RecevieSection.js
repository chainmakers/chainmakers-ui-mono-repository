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
import { makeSelectOrderbookRecevie } from '../selectors';

const debug = require('debug')('atomicapp:containers:OrderPage:RecevieSection');

type IRecevieSectionProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  recevie: string | null
};

class RecevieSection extends React.PureComponent<IRecevieSectionProps> {
  static defaultProps = {};

  static displayName = 'RecevieSection';

  onClick = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenSelectCoinModal } = this.props;
    setTimeout(dispatchOpenSelectCoinModal, 5);
  };

  render() {
    debug(`render`);
    const { dispatchOpenSelectCoinModal, recevie, ...rest } = this.props;
    if (!recevie)
      return (
        <CoinSelectable
          id="add-icon-placeorder-orderpage"
          key="recevieCoinAddIcon"
          icon={<AddIcon color="primary" />}
          onClick={this.onClick}
          {...rest}
        />
      );
    const icon = getCoinMemoize(recevie);
    return (
      <CoinSelectable
        id="add-icon-placeorder-orderpage"
        key={`recevieCoin${recevie}`}
        selected
        data={recevie}
        icon={icon}
        title={covertSymbolToName(recevie)}
        onClick={this.onClick}
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
  recevie: makeSelectOrderbookRecevie()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(RecevieSection);
