import path from 'path';
import {
  getCurrentWorkingDirectory,
  getNodeModulePath,
  getBinPath,
  getKomodod,
  getKomodoCLI
} from '../getNodeModulePath';

describe('src/path/getNodeModulePath', () => {
  it('getCurrentWorkingDirectory', () => {
    expect(getCurrentWorkingDirectory()).toEqual(process.cwd());
  });
  it('getNodeModulePath', () => {
    expect(getNodeModulePath()).toEqual(
      path.normalize(path.join(__dirname, '..', '..', '..'))
    );
  });

  it('getBinPath', () => {
    expect(getBinPath('bin-path')).toEqual('bin-path/bin');
  });

  it('getKomodod', () => {
    const exec = 'komodod';
    expect(getKomodod('bin-path', 'darwin')).toEqual(`bin-path/mac/${exec}`);
    expect(getKomodod('bin-path', 'linux')).toEqual(`bin-path/linux/${exec}`);
    expect(getKomodod('bin-path', 'win32')).toEqual(`bin-path/win/${exec}`);
    expect(getKomodod('bin-path', '')).toEqual('');
  });

  it('getKomodoCLI', () => {
    const exec = 'komodo-cli';
    expect(getKomodoCLI('bin-path', 'darwin')).toEqual(`bin-path/mac/${exec}`);
    expect(getKomodoCLI('bin-path', 'linux')).toEqual(`bin-path/linux/${exec}`);
    expect(getKomodoCLI('bin-path', 'win32')).toEqual(`bin-path/win/${exec}`);
    expect(getKomodoCLI('bin-path', '')).toEqual('');
  });
});
