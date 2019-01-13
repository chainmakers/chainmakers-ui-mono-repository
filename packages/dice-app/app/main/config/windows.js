// @flow

const defaults = {
  applicationWindow: {
    size: {
      width: 1156,
      height: process.platform === 'darwin' ? 680 : 730
    },
    position: {
      x: null,
      y: null
    }
  },
  splashScreen: {
    size: {
      width: 425,
      height: 325
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
