// @flow
import React from 'react';
import { cloneDeep, last } from 'lodash';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { loadSwapSuccess } from '../../../App/actions';
import {
  // loadBuyCoin,
  loadBuyCoinSuccess,
  loadRecentSwapsCoin
} from '../../actions';
import {
  LOAD_SWAP_SUCCESS
} from '../../../__tests__/fake-data';
// import type { BuyCoinPayload } from '../../schema';
import SWAP_STATE_TEN from '../../../__tests__/swap-status.json';
import SWAP_STATE_ZERO from '../../../__tests__/buy.json';

const debug = require('debug')('atomicapp:containers:DexPage:TestSwap');

const {
  result: { events }
} = SWAP_STATE_TEN;

const { length } = events;

const SWAP_STATE_NINE = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_NINE.result.events = events.slice(0, length - 1);

const SWAP_STATE_EIGHT = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_EIGHT.result.events = events.slice(0, length - 2);

const SWAP_STATE_SEVEN = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_SEVEN.result.events = events.slice(0, length - 3);

const SWAP_STATE_SIX = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_SIX.result.events = events.slice(0, length - 4);

const SWAP_STATE_FIVE = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_FIVE.result.events = events.slice(0, length - 5);

const SWAP_STATE_FOUR = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_FOUR.result.events = events.slice(0, length - 6);

const SWAP_STATE_THREE = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_THREE.result.events = events.slice(0, length - 7);

const SWAP_STATE_TWO = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_TWO.result.events = events.slice(0, length - 8);

const SWAP_STATE_ONE = cloneDeep(SWAP_STATE_TEN);
SWAP_STATE_ONE.result.events = events.slice(0, length - 9);

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  // dispatchLoadBuyCoin: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBuyCoinSuccess: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinOne: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinTwo: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinThree: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinFour: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinFive: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadSwapSuccess: Function
};

class TestSwap extends React.PureComponent<Props> {
  static defaultProps = {};

  componentDidMount = () => {
    const {
      // dispatchLoadBuyCoin,
      dispatchLoadBuyCoinSuccess,
      dispatchLoadRecentSwapsCoinOne,
      dispatchLoadRecentSwapsCoinTwo,
      dispatchLoadRecentSwapsCoinThree,
      dispatchLoadRecentSwapsCoinFour,
      dispatchLoadRecentSwapsCoinFive,
      dispatchLoadSwapSuccess
    } = this.props;
    // window.dispatchLoadBuyCoin = dispatchLoadBuyCoin;
    window.dispatchLoadBuyCoinSuccess = dispatchLoadBuyCoinSuccess;
    window.dispatchLoadRecentSwapsCoinOne = dispatchLoadRecentSwapsCoinOne;
    window.dispatchLoadRecentSwapsCoinTwo = dispatchLoadRecentSwapsCoinTwo;
    window.dispatchLoadRecentSwapsCoinThree = dispatchLoadRecentSwapsCoinThree;
    window.dispatchLoadRecentSwapsCoinFour = dispatchLoadRecentSwapsCoinFour;
    window.dispatchLoadRecentSwapsCoinFive = dispatchLoadRecentSwapsCoinFive;
    window.dispatchLoadSwapSuccess = dispatchLoadSwapSuccess;
  };

  render() {
    debug(`render`);
    return null;
  }
}

TestSwap.displayName = 'TestSwap';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    // dispatchLoadBuyCoin: () =>
    //   dispatch(loadBuyCoin({
    //     basecoin: 'COQUI',
    //     paymentcoin: 'BEER',
    //     amount: 8.61671724
    //   })),
    dispatchLoadSwapSuccess: () => dispatch(loadSwapSuccess(LOAD_SWAP_SUCCESS)),
    dispatchLoadBuyCoinSuccess: () =>
      dispatch(
        loadBuyCoinSuccess(
          Object.assign({}, SWAP_STATE_ZERO.pending, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinOne: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_ONE, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinTwo: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_TWO, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinThree: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_THREE, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinFour: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_FOUR, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinFive: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_FIVE, {
            expiration: Date.now() / 1000 + 60
          })
        )
      )
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default withConnect(TestSwap);
