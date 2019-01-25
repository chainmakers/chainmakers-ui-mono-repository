export default function floor(num: number, after: number = 1) {
  const p = Math.pow(10, after);
  return Math.floor(num * p) / p;
}
