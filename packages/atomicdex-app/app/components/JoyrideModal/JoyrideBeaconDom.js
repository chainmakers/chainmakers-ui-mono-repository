// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';
import { withStyles } from '@material-ui/core/styles';
import { duration } from '@material-ui/core/styles/transitions';
import { noob, opacity, getTransitionProps } from './utils';
import { getElement, getRelativeClientRect, getElementPosition } from './dom';

const debug = require('debug')(
  'atomicapp:components:JoyrideModal:JoyrideBeaconDom'
);

const styles = theme => ({
  joyridemodal__beacon: {
    zIndex: theme.zIndex.modal + 1,
    cursor: 'help',
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'absolute',
    willChange: 'transform',
    top: 0,
    left: 0
  },

  joyridemodal__beaconButton: {
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0,
    color: 'rgb(85, 85, 85)',
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
    padding: 8,
    '-webkit-appearance': 'none',
    display: 'inline-block',
    height: 36,
    position: 'relative',
    width: 36
  },

  joyridemodal__beaconInner: {
    animation:
      'joyride-beacon-inner 1.2s ease-in-out 0s infinite normal none running',
    backgroundColor: 'rgb(255, 0, 68)',
    borderRadius: '50%',
    display: 'block',
    height: '50%',
    left: '50%',
    opacity: 0.7,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%'
  },

  joyridemodal__beaconOuter: {
    animation:
      'joyride-beacon-outer 1.2s ease-in-out 0s infinite normal none running',
    backgroundColor: 'rgba(255, 0, 68, 0.2)',
    border: '2px solid rgb(255, 0, 68)',
    borderRadius: '50%',
    boxSizing: 'border-box',
    display: 'block',
    height: '100%',
    left: 0,
    opacity: '0.9',
    position: 'absolute',
    top: 0,
    transformOrigin: 'center center',
    width: '100%'
  },

  '@keyframes joyride-beacon-inner': {
    '20%': {
      opacity: 0.9
    },
    '90%': {
      opacity: 0.7
    }
  },

  '@keyframes joyride-beacon-outer': {
    '0%': {
      transform: 'scale(1)'
    },

    '45%': {
      opacity: 0.7,
      transform: 'scale(0.75)'
    },

    '100%': {
      opacity: 0.9,
      transform: 'scale(1)'
    }
  }
});

type IJoyrideBeaconProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  theme: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onEnter?: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onEntering?: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onEntered?: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onExited?: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onExit?: Function,
  id: string,
  in: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  timeout?: Object
};

class JoyrideBeaconDom extends React.PureComponent<IJoyrideBeaconProps> {
  static displayName = 'JoyrideBeaconDom';

  static defaultProps = {
    onEnter: noob,
    onEntering: noob,
    onEntered: noob,
    onExited: noob,
    onExit: noob,
    timeout: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.id !== this.props.id &&
      this.props.id &&
      this.mounted === true
    ) {
      this.updatePosition();
    }
  }

  mounted = false;

  onClick = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    debug('onClick');
  };

  handleEnter = node => {
    debug('handleEnter');
    const { theme, onEnter, id } = this.props;

    const transitionProps = getTransitionProps(this.props, {
      mode: 'enter'
    });

    // eslint-disable-next-line no-param-reassign
    node.style.webkitTransition = theme.transitions.create(
      'opacity',
      transitionProps
    );
    // eslint-disable-next-line no-param-reassign
    node.style.transition = theme.transitions.create(
      'opacity',
      transitionProps
    );

    const element = getElement(id);
    const top = getElementPosition(element, 0);
    const react = getRelativeClientRect(element);
    const transform = `translate(${react.x - 18 + react.width / 2}px, ${
      /* react.y */ top - 18 + react.height / 2
    }px)`;
    // eslint-disable-next-line no-param-reassign
    node.style.webkitTransform = transform;
    // eslint-disable-next-line no-param-reassign
    node.style.transform = transform;

    if (onEnter) {
      onEnter(node);
    }
  };

  handleEntering = node => {
    debug('handleEntering');
    const { onEntering } = this.props;
    if (onEntering) {
      onEntering(node);
    }
  };

  handleEntered = node => {
    debug('handleEntered');
    this.mounted = true;
    const { onEntered } = this.props;
    if (onEntered) {
      onEntered(node);
    }
  };

  handleExit = node => {
    debug('handleExit');
    const { onExit } = this.props;
    if (onExit) {
      onExit(node);
    }
  };

  handleExited = node => {
    debug('handleExited');
    const { onExited } = this.props;
    if (onExited) {
      onExited(node);
    }
  };

  updatePosition() {
    if (this.transitionRef) {
      const { id } = this.props;
      const element = getElement(id);
      const top = getElementPosition(element, 0);
      const react = getRelativeClientRect(element);
      const transform = `translate(${react.x - 18 + react.width / 2}px, ${top -
        18 +
        react.height / 2}px)`;
      // eslint-disable-next-line no-param-reassign
      this.transitionRef.style.webkitTransform = transform;
      // eslint-disable-next-line no-param-reassign
      this.transitionRef.style.transform = transform;
    }
  }

  render() {
    debug(`render`);
    const { classes, in: inProp, timeout, id } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExited={this.handleExited}
        appear
        in={!!id && inProp}
        timeout={timeout}
        ref={ref => {
          // eslint-disable-next-line react/no-find-dom-node
          this.transitionRef = ReactDOM.findDOMNode(ref);
        }}
      >
        {(state, childProps) => (
          <span
            x-placement="top"
            className={classes.joyridemodal__beacon}
            style={{
              opacity: 0,
              visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
              ...opacity[state]
            }}
            {...childProps}
          >
            <button
              className={classes.joyridemodal__beaconButton}
              type="button"
              data-test-id="button-beacon"
              aria-label="Open the dialog"
              title="Open the dialog"
              onClick={this.onClick}
            >
              <span className={classes.joyridemodal__beaconInner} />
              <span className={classes.joyridemodal__beaconOuter} />
            </button>
          </span>
        )}
      </Transition>
    );
  }
}

export default withStyles(styles, { withTheme: true })(JoyrideBeaconDom);
