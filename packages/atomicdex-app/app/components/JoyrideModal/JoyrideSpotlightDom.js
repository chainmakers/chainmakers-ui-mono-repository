// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';
import { withStyles } from '@material-ui/core/styles';
import { duration } from '@material-ui/core/styles/transitions';
import { noob, opacity, getTransitionProps } from './utils';
import { getElement, getClientRect, isFixed, getElementPosition } from './dom';

const spotlightPadding = 2;

function stylesSpotlight(id: string, node: HTMLElement): undefined {
  const element = getElement(id);
  const isFixedTarget = isFixed(element);
  const elementRect = getClientRect(element);
  const top = getElementPosition(
    element,
    spotlightPadding /* disableScrollParentFix */
  );
  // eslint-disable-next-line no-param-reassign
  node.style.width = `${Math.round(
    elementRect.width + spotlightPadding * 2
  )}px`;
  // eslint-disable-next-line no-param-reassign
  node.style.height = `${Math.round(
    elementRect.height + spotlightPadding * 2
  )}px`;
  node.style.position = isFixedTarget ? 'fixed' : 'absolute';
  // eslint-disable-next-line no-param-reassign
  const transform = `translate(${Math.round(
    elementRect.left - spotlightPadding
  )}px, ${top}px)`;
  node.style.webkitTransform = transform;
  // eslint-disable-next-line no-param-reassign
  node.style.transform = transform;
}

const debug = require('debug')(
  'atomicapp:components:JoyrideModal:JoyrideSpotlightDom'
);

const styles = () => ({
  joyridemodal__spotlight: {
    borderRadius: 4,
    position: 'absolute',
    backgroundColor: '#929292',
    left: 0,
    top: 0,
    pointerEvents: 'auto',
    height: 0,
    width: 0
  }
});

type IJoyrideSpotlightProps = {
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

class JoyrideSpotlightDom extends React.PureComponent<IJoyrideSpotlightProps> {
  static displayName = 'JoyrideSpotlightDom';

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
    if (prevProps.id !== this.props.id && this.mounted === true) {
      this.updatePosition();
    }
  }

  mounted = false;

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

    stylesSpotlight(id, node);

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

      stylesSpotlight(id, this.transitionRef);
    }
  }

  render() {
    debug(`render`);
    const { classes, in: inProp, timeout } = this.props;
    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExited={this.handleExited}
        appear
        in={inProp}
        timeout={timeout}
        ref={ref => {
          // eslint-disable-next-line react/no-find-dom-node
          this.transitionRef = ReactDOM.findDOMNode(ref);
        }}
      >
        {(state, childProps) => (
          <div
            id="joyride-spotlight"
            className={classes.joyridemodal__spotlight}
            style={{
              opacity: 0,
              visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
              ...opacity[state]
            }}
            {...childProps}
          />
        )}
      </Transition>
    );
  }
}

export default withStyles(styles, { withTheme: true })(JoyrideSpotlightDom);
