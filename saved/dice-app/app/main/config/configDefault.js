export const def = {
  barterdex: 'http://127.0.0.1:7783',
  APPNAME: 'kmdice'
};

export default function loadDefault(config) {
  return config.set(def);
}
