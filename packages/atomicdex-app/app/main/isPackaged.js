const path = require('path');

const isPackaged = () => {
  const execFile = path.basename(process.execPath).toLowerCase();
  if (process.platform === 'win32') {
    return execFile !== 'electron.exe';
  }
  return execFile !== 'electron';
};

export default isPackaged;
