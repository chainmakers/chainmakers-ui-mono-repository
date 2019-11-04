export const def = {
  barterdex: 'http://127.0.0.1:7783',
  APPNAME: 'dicoapp',
  minWindowSize: {
    width: 1156,
    height: process.platform === 'darwin' ? 680 : 730
  },
  loginWindowSize: {
    width: 1156,
    height: process.platform === 'darwin' ? 680 : 730
  }
};

export default function loadDefault(config) {
  return config.set(def);
}
