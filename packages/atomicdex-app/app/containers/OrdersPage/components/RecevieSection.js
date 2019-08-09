// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add';
import getCoinMemoize from '../../../components/CryptoIcons';
import CoinSelectable from '../../../components/CoinSelectable';
import { covertSymbolToName } from '../../../utils/coin';
import { openRecevieCoinModal } from '../actions';
import { makeSelectOrderbookRecevie } from '../selectors';

const debug = require('debug')('atomicapp:containers:OrderPage:RecevieSection');

type IRecevieSectionProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenRecevieCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  recevie: string | null,
  price: string
};

class RecevieSection extends React.PureComponent<IRecevieSectionProps> {
  static defaultProps = {};

  static displayName = 'RecevieSection';

  onClick = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenRecevieCoinModal } = this.props;
    setTimeout(dispatchOpenRecevieCoinModal, 5);
  };

  render() {
    debug(`render`);
    const {
      dispatchOpenRecevieCoinModal,
      recevie,
      price,
      ...rest
    } = this.props;
    if (!recevie) {
      return (
        <CoinSelectable
          id="recevie-add-icon-placeorder-orderpage"
          key="recevieCoinAddIcon"
          icon={<AddIcon color="primary" />}
          onClick={this.onClick}
          {...rest}
        />
      );
    }
    const icon = getCoinMemoize(recevie);
    return (
      <CoinSelectable
        id="recevie-add-icon-placeorder-orderpage"
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
    dispatchOpenRecevieCoinModal: () => {
      dispatch(openRecevieCoinModal());
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
