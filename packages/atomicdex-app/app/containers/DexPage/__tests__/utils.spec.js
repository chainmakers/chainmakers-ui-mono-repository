import { getMonth, calculateDexfee } from '../utils';

describe('containers/DexPage/utils', () => {
  it('should handle getMonth correctly', async done => {
    const d = 1539375819825;
    expect(getMonth(new Date(d))).toEqual('OCT');
    done();
  });

  it('should handle calculateDexfee correctly', async done => {
    expect(calculateDexfee('COQUI', 'BEER', 777)).toEqual(1);
    expect(calculateDexfee('KMD', 'BEER', 777)).toEqual(0.9);
    expect(calculateDexfee('COQUI', 'KMD', 777)).toEqual(0.9);
    expect(calculateDexfee('COQUI', 'BEER', 0.005)).toEqual(0.0001);
    expect(calculateDexfee('COQUI', 'BEER', 0.777)).toEqual(0.001);
    expect(calculateDexfee('KMD', 'BEER', 0.1554)).toEqual(0.00018);
    expect(calculateDexfee('COQUI', 'KMD', 0.1554)).toEqual(0.00018);
    done();
  });
});
