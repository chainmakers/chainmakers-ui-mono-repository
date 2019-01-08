import { generateSeed, generateWif } from '../utils';

describe('containers/SeedPage/utils/generateSeed', () => {
  it('should generateSeed should create seed correctly', () => {
    const s = generateSeed();
    expect(s.split(' ').length - 1).toEqual(13);
  });

  it('should generateWif should create wif correctly', () => {
    const s = generateSeed();
    const wif = generateWif(s);
    expect(wif.length).toEqual(52);
  });
});
