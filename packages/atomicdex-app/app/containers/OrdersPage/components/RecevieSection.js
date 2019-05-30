// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import getCoinMemoize from '../../../components/CryptoIcons';
import CoinSelectable from '../../../components/CoinSelectable';
import { covertSymbolToName } from '../../../utils/coin';
import { openRecevieCoinModal, setNewOrderPrice } from '../actions';
import {
  makeSelectOrderbookRecevie,
  makeSelectOrderbookPrice
} from '../selectors';

const debug = require('debug')('atomicapp:containers:OrderPage:RecevieSection');

type IRecevieSectionProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenRecevieCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  recevie: string | null,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSetNewOrderPrice: Function,
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

  onChangeTextField = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    const { dispatchSetNewOrderPrice } = this.props;
    dispatchSetNewOrderPrice(value);
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
        <div {...rest}>
          <CoinSelectable
            id="add-icon-placeorder-orderpage"
            key="recevieCoinAddIcon"
            icon={<AddIcon color="primary" />}
            onClick={this.onClick}
            {...rest}
          />
          <TextField
            inputProps={{
              style: {
                textAlign: 'center'
              }
            }}
            id="disabled-textfield-recevie-orderpage"
            style={{
              width: 184
            }}
            margin="none"
            disabled
            value="N/A"
          />
        </div>
      );
    }
    const icon = getCoinMemoize(recevie);
    return (
      <div {...rest}>
        <CoinSelectable
          id="add-icon-placeorder-orderpage"
          key={`recevieCoin${recevie}`}
          selected
          data={recevie}
          icon={icon}
          title={covertSymbolToName(recevie)}
          onClick={this.onClick}
        />
        <TextField
          inputProps={{
            style: {
              textAlign: 'center'
            }
          }}
          onChange={this.onChangeTextField}
          id="textfield-recevie-orderpage"
          style={{
            width: 184
          }}
          margin="none"
          value={price}
        />
      </div>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchOpenRecevieCoinModal: () => {
      dispatch(openRecevieCoinModal());
    },
    dispatchSetNewOrderPrice: (price: string) => {
      dispatch(setNewOrderPrice(price));
    }
  };
}

const mapStateToProps = createStructuredSelector({
  recevie: makeSelectOrderbookRecevie(),
  price: makeSelectOrderbookPrice()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(RecevieSection);
