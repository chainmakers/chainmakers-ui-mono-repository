// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import BackdropComponent from './Backdrop';
import { makeSelectJoyrideOpenState } from '../../selectors';
import { closeJoyride } from '../../actions';
import JoyrideBeacon from './JoyrideBeacon';
import JoyrideSpotlight from './JoyrideSpotlight';
import JoyrideTooltip from './JoyrideTooltip';
import {
  // hasCustomScrollParent,
  scrollTo,
  getElement,
  getScrollTo,
  getScrollParent
  // getRelativeClientRect
} from './dom';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:components:JoyrideModal'
);

const styles = theme => ({
  /* Styles applied to the root element if the `Modal` has exited. */
  joyridemodal__hidden: {
    visibility: 'hidden'
  },
  joyridemodal__backdrop: {
    mixBlendMode: 'hard-light',
    zIndex: theme.zIndex.modal
  },
  joyridemodal__modal: {
    mixBlendMode: 'hard-light'
  }
});

const list = [
  // {
  //   id: '#drawer-navigation-layout',
  //   title: 'Drawer Menu',
  //   message: 'This is the drawer menu'
  // },
  // {
  //   id: '#wallet-drawer-navigation-layout',
  //   title: 'Wallet Button',
  //   message: 'Click here to go to wallet page'
  // },
  {
    id: '#app-bar',
    title: 'AppBar',
    message: 'This is the app bar'
  },
  {
    id: '#asset-portfolio-tab-BTC',
    title: 'BTC asset',
    message: 'This is your BTC asset'
  },
  {
    id: '#asset-portfolio-tab-BTC',
    title: 'BTC asset',
    message: 'Click "Deposit" button to deposit your funds',
    idBeacon: '#deposit-button-portfolio-tab-BTC'
  },
  {
    id: '#asset-portfolio-tab-BTC',
    title: 'BTC asset',
    message: 'Click "Withdraw" button to withdraw your funds',
    idBeacon: '#withdraw-button-portfolio-tab-BTC'
  },
  {
    id: '#asset-portfolio-tab-KMD',
    title: 'KMD asset',
    message: 'This is your KMD asset'
  },
  {
    id: '#add-electrum-placeholer',
    title: 'Adding Electron',
    message: 'This is your KMD asset'
  }
];
let i = 0;

type IJoyrideModalProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseJoyride: Function,
  joyrideState: boolean
};

class JoyrideModal extends React.PureComponent<IJoyrideModalProps> {
  static displayName = 'JoyrideModal';

  state = {
    id: null,
    message: '',
    title: '',
    idBeacon: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.joyrideState === true && prevState.id === null) {
      i += 1;
      const iddom = list[i - 1];
      return {
        id: iddom.id,
        message: iddom.message,
        title: iddom.title,
        idBeacon: iddom.idBeacon
      };
    }
    // No state update necessary
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.joyrideState === true && this.props.joyrideState === false) {
      // close
      document.body.style.overflow = 'visible';
      if (this.backdropRef) {
        this.backdropRef.style.height = 'auto';
      }
    }
    if (prevProps.joyrideState === false && this.props.joyrideState === true) {
      // open
      document.body.style.overflow = 'hidden';
      if (this.backdropRef) {
        // https://stackoverflow.com/a/1147768
        const body = document.body;
        const html = document.documentElement;
        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        this.backdropRef.style.height = `${height}px`;
      }
    }
    // step 1:
    // step 2:
    // step 3:
    // step 4:
  }

  // scrollToStep = prevState => {
  // step 1:
  // step 2:
  // step 3:
  // step 4:
  // };

  prev = () => {
    i -= 1;
    if (i < 1) {
      i = list.length;
    }
    const iddom = list[i - 1];

    this.toggle(iddom);
  };

  next = () => {
    i += 1;
    if (i > list.length) {
      i = 1;
    }
    const iddom = list[i - 1];
    this.toggle(iddom);
  };

  toggle = iddom => {
    const scrollOffset = 300;

    const state = {};
    const target = getElement(iddom.id);
    // const react = getRelativeClientRect(target);
    // const hasCustomScroll = hasCustomScrollParent(
    //   target /* disableScrollParentFix */
    // );
    const scrollParent = getScrollParent(target /* disableScrollParentFix */);
    let scrollY =
      Math.floor(
        getScrollTo(target, scrollOffset /* disableScrollParentFix */)
      ) || 0;
    scrollY = scrollY >= 0 ? scrollY : 0;
    scrollTo(scrollY, scrollParent);

    state.id = iddom.id;
    state.message = iddom.message;
    state.title = iddom.title;
    state.idBeacon = iddom.idBeacon;
    this.setState(state);
  };

  render() {
    debug(`render`);
    const { classes, joyrideState, dispatchCloseJoyride } = this.props;
    const { id, idBeacon, message, title } = this.state;
    return (
      <Portal>
        <BackdropComponent
          onClick={this.next}
          className={ClassNames(classes.joyridemodal__backdrop, {
            [classes.joyridemodal__hidden]: !joyrideState
          })}
          ref={ref => {
            // eslint-disable-next-line react/no-find-dom-node
            this.backdropRef = ReactDOM.findDOMNode(ref);
          }}
          open={
            joyrideState
          } /* onClick={this.handleBackdropClick} {...BackdropProps} */
        >
          <JoyrideSpotlight id={id} in={joyrideState} />
        </BackdropComponent>
        <JoyrideTooltip
          id={id}
          in={joyrideState}
          title={title}
          message={message}
          onNext={this.next}
          onPrev={this.prev}
          onSkip={dispatchCloseJoyride}
          index={i}
          total={list.length}
        />
        <JoyrideBeacon id={idBeacon} />
      </Portal>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchCloseJoyride: () => dispatch(closeJoyride())
  };
}

const mapStateToProps = createStructuredSelector({
  joyrideState: makeSelectJoyrideOpenState()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(JoyrideModal);
