import floor from '../floor';

it('floor', () => {
  const number = 10.123456789;
  expect(floor(number)).toEqual(10.1);
  expect(floor(number, 2)).toEqual(10.12);
  expect(floor(number, 8)).toEqual(10.12345678);
});