// @flow

const defaults = {
  applicationWindow: {
    size: {
      width: 1156,
      height: 710
    },
    position: {
      x: null,
      y: null
    }
  }
};

export default function loadWindows(config) {
  return config.set('windows', defaults);
}
