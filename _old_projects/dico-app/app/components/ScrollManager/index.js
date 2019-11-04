// @flow
import * as React from 'react';
// $FlowFixMe
import { withRouter } from 'react-router';
// $FlowFixMe
import debounceFn from 'lodash/debounce';

type Props = {
  scrollCaptureDebounce?: number,
  scrollSyncDebounce?: number,
  scrollSyncAttemptLimit?: number,
  children: React.Node,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  location: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onLocationChange: Function
};

class ScrollManager extends React.Component<Props> {
  static defaultProps = {
    scrollCaptureDebounce: 50,
    scrollSyncDebounce: 100,
    scrollSyncAttemptLimit: 5
  };

  constructor(props) {
    super(props);

    this.scrollSyncData = {
      x: 0,
      y: 0,
      attemptsRemaining: props.scrollSyncAttemptLimit
    };

    const scrollCapture = () => {
      requestAnimationFrame(() => {
        const { pageXOffset, pageYOffset } = window;
        // eslint-disable-next-line react/destructuring-assignment
        const { pathname } = this.props.location;

        // use browser history instead of router history
        // to avoid infinite history.replace loop
        const historyState = window.history.state || {};
        const { state = {} } = historyState;
        if (
          !state.scroll ||
          state.scroll.x !== pageXOffset ||
          state.scroll.y !== pageYOffset
        ) {
          window.history.replaceState(
            {
              ...historyState,
              state: { ...state, scroll: { x: pageXOffset, y: pageYOffset } }
            },
            null,
            pathname
          );
        }
      });
    };

    // eslint-disable-next-line no-underscore-dangle
    const _scrollSync = () => {
      requestAnimationFrame(() => {
        try {
          const { x, y, attemptsRemaining } = this.scrollSyncData;

          if (attemptsRemaining < 1) {
            return;
          }

          const { pageXOffset, pageYOffset } = window;
          if (
            y < window.document.body.scrollHeight &&
            (x !== pageXOffset || y !== pageYOffset)
          ) {
            window.scrollTo(x, y);
            this.scrollSyncData.attemptsRemaining = attemptsRemaining - 1;
            _scrollSync();
          }
        } catch (err) {
          console.warn(err.message);
        }
      });
    };

    const scrollSync = (x = 0, y = 0) => {
      this.scrollSyncData = {
        x,
        y,
        // eslint-disable-next-line react/destructuring-assignment
        attemptsRemaining: this.props.scrollSyncAttemptLimit
      };
      _scrollSync();
    };

    this.debouncedScroll = debounceFn(
      scrollCapture,
      props.scrollCaptureDebounce
    );
    this.debouncedScrollSync = debounceFn(scrollSync, props.scrollSyncDebounce);
  }

  componentWillMount() {
    const { location, onLocationChange } = this.props;
    if (onLocationChange) {
      onLocationChange(location);
    }
  }

  componentDidMount() {
    this.onPop(this.props);
    window.addEventListener('scroll', this.debouncedScroll, { passive: true });
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.history.action) {
      case 'PUSH':
      case 'REPLACE':
        this.onPush();
        break;
      case 'POP':
        this.onPop(nextProps);
        break;
      default:
        console.warn(
          `Unrecognized location change action! "${nextProps.history.action}"`
        );
    }
    if (nextProps.onLocationChange) {
      nextProps.onLocationChange(nextProps.location);
    }
  }

  componentWillUnmount() {
    this.scrollSyncPending = false;
    window.removeEventListener('scroll', this.debouncedScroll, {
      passive: true
    });
  }

  onPush() {
    this.debouncedScrollSync(0, 0);
  }

  onPop({ location: { state = {} } }) {
    // attempt location restore
    const { x = 0, y = 0 } = state.scroll || {};
    this.debouncedScrollSync(x, y);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default withRouter(ScrollManager);
