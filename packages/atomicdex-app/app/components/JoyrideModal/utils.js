// @flow
export function noob() {}

export const opacity = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};

export function getTransitionProps(props, options) {
  const { timeout, style = {} } = props;

  return {
    duration:
      style.transitionDuration || typeof timeout === 'number'
        ? timeout
        : timeout[options.mode],
    delay: style.transitionDelay
  };
}
