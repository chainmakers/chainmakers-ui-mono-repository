import { execFileSync } from 'child_process';

export default function killProcess(name) {
  try {
    if (process.platform === 'win32') {
      execFileSync('taskkill', ['/f', '/im', `${name}.exe`]);
    } else {
      execFileSync('killall', ['-9', name]);
    }
    /* tslint:disable no-empty */
  } catch (_) {}
}
