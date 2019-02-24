// @flow
import React from 'react';
import type { Node, ChildrenArray } from 'react';

type IPlaceholderProps = {
  delay?: number,
  firstLaunchOnly?: boolean,
  ready: boolean,
  placeholder: Node,
  // eslint-disable-next-line flowtype/no-weak-types
  children: ChildrenArray<any>
};

type IPlaceholderState = {
  ready: boolean,
  loaded: boolean
};
class Placeholder extends React.PureComponent<
  IPlaceholderProps,
  IPlaceholderState
> {

  static defaultProps = {
    delay: 0,
    firstLaunchOnly: true
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: props.ready,
      loaded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { firstLaunchOnly } = this.props;
    const { loaded, ready } = this.state;
    if (!firstLaunchOnly && !loaded && ready && !nextProps.ready) {
      this.setNotReady();
    } else if (nextProps.ready) {
      this.setReady();
    }
  }

  setNotReady = () => {
    const { delay } = this.props;
    const state = {
      ready: false
    };
    if (delay > 0) {
      this.timeout = setTimeout(() => {
        this.setState(state);
      }, delay);
    } else {
      this.setState(state);
    }
  };

  setReady = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const { loaded, ready } = this.state;
    const state = {
      ready: true
    };
    if (!loaded) {
      state.loaded = true;
    }
    if (!ready) {
      this.setState(state);
    }
  };

  render() {
    const { children, placeholder } = this.props;
    const { ready } = this.state;

    if (ready) return children;

    return placeholder;
  }
}

export default Placeholder;
