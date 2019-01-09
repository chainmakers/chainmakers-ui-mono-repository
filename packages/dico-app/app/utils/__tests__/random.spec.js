import { choice } from '../random';

describe('utils/random/choice', () => {
  it('should handle the choice function correctly', () => {
    const coins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(coins.indexOf(choice(coins)) !== -1).toEqual(true);
  });
});
