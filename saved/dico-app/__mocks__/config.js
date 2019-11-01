module.exports = () => ({
  get(path) {
    if (path === 'barterdex') return 'http://127.0.0.1:7783';
    if (path === 'paths')
      return {
        homeDir: 'homeDir'
      };
  }
});
