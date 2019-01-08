import search from '../search-api';

describe('containers/DexPage/CoinsSelectionModal/search-api', () => {
  it('should handle search-api correctly', () => {
    expect(typeof search).toEqual('function');
    expect(search('BTC')).toEqual([
      { id: 1, market_cap: 97822306639, name: 'Bitcoin', symbol: 'BTC' }
    ]);
    expect(search('bitcoin')).toEqual([
      { id: 1, market_cap: 97822306639, name: 'Bitcoin', symbol: 'BTC' }
    ]);
    expect(search('o')).toEqual([
      { id: 1, market_cap: 97822306639, name: 'Bitcoin', symbol: 'BTC' },
      { id: 3, market_cap: 2578993869, name: 'Litecoin', symbol: 'LTC' },
      { id: 0, market_cap: 107340275, name: 'Komodo', symbol: 'KMD' },
      { id: 6, market_cap: 0, name: 'Coqui Cash', symbol: 'COQUI' }
    ]);
    expect(search('')).toEqual([
      { id: 1, market_cap: 97822306639, name: 'Bitcoin', symbol: 'BTC' },
      { id: 3, market_cap: 2578993869, name: 'Litecoin', symbol: 'LTC' },
      { id: 0, market_cap: 107340275, name: 'Komodo', symbol: 'KMD' },
      { id: 2, market_cap: 0, name: 'Equaliser', symbol: 'EQL' },
      { id: 4, market_cap: 0, name: 'Pizza', symbol: 'PIZZA' },
      { id: 5, market_cap: 0, name: 'Beer', symbol: 'BEER' },
      { id: 6, market_cap: 0, name: 'Coqui Cash', symbol: 'COQUI' }
    ]);
  });
});
