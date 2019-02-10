import search from '../search-api';

describe('containers/DexPage/CoinsSelectionModal/search-api', () => {
  it('should handle search-api correctly', () => {
    expect(typeof search).toEqual('function');
    expect(search('BEER')).toEqual([
      { id: 1, market_cap: -1, name: 'Beer', symbol: 'BEER' }
    ]);
    expect(search('beer')).toEqual([
      { id: 1, market_cap: -1, name: 'Beer', symbol: 'BEER' }
    ]);
    expect(search('p')).toEqual([
      { id: 0, market_cap: -2, name: 'Pizza', symbol: 'PIZZA' }
    ]);
    expect(search('')).toEqual([
      { id: 1, market_cap: -1, name: 'Beer', symbol: 'BEER' },
      { id: 0, market_cap: -2, name: 'Pizza', symbol: 'PIZZA' }
    ]);
  });
});
