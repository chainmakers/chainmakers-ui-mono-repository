import explorer from '../explorer';

describe('app/lib/explorer', () => {
  it('tx', () => {
    const uuid =
      'c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e';
    expect(explorer.tx(uuid, 'KMD')).toEqual(
      `https://www.kmdexplorer.io/tx/${uuid}`
    );
    expect(explorer.tx(uuid, 'zzz')).toEqual('#not-found');
  });
  it('address', () => {
    const uuid =
      'c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e';
    expect(explorer.address(uuid, 'KMD')).toEqual(
      `https://www.kmdexplorer.io/address/${uuid}`
    );
    expect(explorer.address(uuid, 'zzz')).toEqual('#not-found');
  });
});
