export const def = {
  barterdex: 'http://127.0.0.1:7783',
  APPNAME: 'atomicapp',
  minWindowSize: {
    width: 768,
    height: 576
  },
  loginWindowSize: {
    width: 1156,
    height: process.platform === 'darwin' ? 680 : 730
  },
  repoUrl: 'https://github.com/chainmakers/chainmakers-ui-mono-repository'
};

export default function loadDefault(config) {
  return config.set(def);
}
