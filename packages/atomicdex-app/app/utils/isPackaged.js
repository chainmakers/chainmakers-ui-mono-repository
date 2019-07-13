const path = require('path');

const isPackaged = () => {
  const execFile = path.basename(process.execPath).toLowerCase();
  if (process.platform === 'linux') {
    return execFile !== 'electron';
  }
  if (process.platform === 'win32') {
    return execFile !== 'electron.exe';
  }
  return execFile !== 'electron helper';
};

export default isPackaged;
