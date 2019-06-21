import explorer from '../explorer';

describe('lib/explorer', () => {
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

  it('isValid', () => {
    expect(
      explorer.isValid(
        'https://beer.explorer.dexstats.info/tx/03394fc8b79fe1ae809d3602818e52ffb89d8efae3c1feba0be69ff17c32fe90'
      )
    ).toEqual(true);
    expect(
      explorer.isValid(
        'https://www.quora.com/How-did-Warren-Buffett-become-such-a-legendary-investor'
      )
    ).toEqual(false);
  });
});
