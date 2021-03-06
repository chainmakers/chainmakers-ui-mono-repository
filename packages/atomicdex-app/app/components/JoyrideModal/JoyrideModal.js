// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import { fromJS, Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import BackdropComponent from './Backdrop';
import JoyrideBeaconDom from './JoyrideBeaconDom';
import JoyrideSpotlightDom from './JoyrideSpotlightDom';
import JoyrideTooltip from './JoyrideTooltip';
import {
  scrollTo,
  getElement,
  getScrollTo,
  getElementPosition,
  getScrollParent
} from './dom';

const debug = require('debug')('atomicapp:components:JoyrideModal');

const styles = theme => ({
  /* Styles applied to the root element if the `Modal` has exited. */
  joyridemodal__hidden: {
    visibility: 'hidden'
  },
  joyridemodal__blankSpace: {
    width: '100%',
    height: '120px'
  },
  joyridemodal__backdrop: {
    mixBlendMode: 'hard-light',
    zIndex: theme.zIndex.modal
  },
  joyridemodal__modal: {
    mixBlendMode: 'hard-light'
  }
});

type IJoyrideModalProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseJoyride: Function,
  joyrideState: boolean,
  scrollOffset: number
};

class JoyrideModal extends React.PureComponent<IJoyrideModalProps> {
  static displayName = 'JoyrideModal';

  static defaultProps = {
    scrollOffset: 300
  };

  state = {
    index: 0
  };

  list = Map({});

  setItemIntoList = (index, value) => {
    this.list = this.list.set(index, fromJS(value));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.joyrideState === true && this.props.joyrideState === false) {
      // close
      // document.body.style.overflow = 'visible';
      if (this.backdropRef) {
        this.backdropRef.style.height = 'auto';
      }
    }
    if (prevProps.joyrideState === false && this.props.joyrideState === true) {
      // open
      // document.body.style.overflow = 'hidden';
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
    let { index } = this.state;
    let id;
    let iddom;
    let target;
    index -= 1;
    while (index >= 0) {
      iddom = this.list.get(index);
      id = iddom.get('id');
      target = getElement(id);
      if (target) break;
      else {
        debug(`not found the ${id}`);
      }
      index -= 1;
    }

    if (index < 0) {
      // not found
      index = this.list.size - 1;
      iddom = this.list.get(index);
      id = iddom.get('id');
      target = getElement(id);
    }
    if (!target) {
      return debug(`not found the ${id}`);
    }

    this.toggle(target, index);
  };

  next = () => {
    let { index } = this.state;
    let id;
    let iddom;
    let target;
    index += 1;
    while (index < this.list.size) {
      iddom = this.list.get(index);
      id = iddom.get('id');
      target = getElement(id);
      if (target) break;
      else {
        debug(`not found the ${id}`);
      }
      index += 1;
    }

    if (index >= this.list.size) {
      // not found
      index = 0;
      iddom = this.list.get(index);
      id = iddom.get('id');
      target = getElement(id);
    }
    if (!target) {
      return debug(`not found the ${id}`);
    }
    this.toggle(target, index);
  };

  toggle = async (target, index) => {
    const { scrollOffset } = this.props;
    const state = {};
    // const react = getRelativeClientRect(target);
    // const hasCustomScroll = hasCustomScrollParent(
    //   target /* disableScrollParentFix */
    // );
    const disableScrollParentFix = true;
    const scrollParent = getScrollParent(target /* disableScrollParentFix */);
    let scrollY =
      Math.floor(getScrollTo(target, scrollOffset, disableScrollParentFix)) ||
      0;
    const top = getElementPosition(
      target,
      scrollOffset /* disableScrollParentFix */
    );
    scrollY = scrollY >= 0 ? scrollY : 0;

    // document.body.style.overflow = 'visible';
    scrollTo(top, scrollParent);
    // document.body.style.overflow = 'hidden';
    state.index = index;
    this.setState(state);
  };

  render() {
    debug(`render`);
    const {
      classes,
      children: childrenProp,
      joyrideState,
      dispatchCloseJoyride
    } = this.props;
    const { index } = this.state;

    const iddom = this.list.get(index);

    const children = React.Children.map(childrenProp, (child, key) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      // warning(
      //   child.type !== React.Fragment,
      //   [
      //     "Material-UI: the Tabs component doesn't accept a Fragment as a child.",
      //     'Consider providing an array instead.',
      //   ].join('\n'),
      // );

      const i = child.props.index === undefined ? key : child.props.index;
      // this.valueToIndex.set(childValue, childIndex);
      const selected = i === index;

      return React.cloneElement(child, {
        index: i,
        setData: this.setItemIntoList,
        selected
      });
    });

    return (
      <Portal>
        {children}
        <div className={classes.joyridemodal__blankSpace} />
        <BackdropComponent
          onClick={dispatchCloseJoyride}
          className={ClassNames(classes.joyridemodal__backdrop, {
            [classes.joyridemodal__hidden]: !joyrideState
          })}
          ref={ref => {
            // eslint-disable-next-line react/no-find-dom-node
            this.backdropRef = ReactDOM.findDOMNode(ref);
          }}
          open={joyrideState}
        >
          <JoyrideSpotlightDom
            id={iddom && iddom.get('id')}
            in={joyrideState}
          />
        </BackdropComponent>
        <JoyrideTooltip
          id={iddom && iddom.get('id')}
          in={joyrideState}
          title={iddom && iddom.get('title')}
          message={iddom && iddom.get('message')}
          onNext={this.next}
          onPrev={this.prev}
          onSkip={dispatchCloseJoyride}
          index={index + 1}
          total={this.list.size}
        />
        <JoyrideBeaconDom
          in={joyrideState}
          id={iddom && iddom.get('idBeacon')}
        />
      </Portal>
    );
  }
}

export default withStyles(styles)(JoyrideModal);
