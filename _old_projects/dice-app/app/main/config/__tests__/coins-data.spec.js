import { generateElectrums } from '../coins-data';

describe('main/config', () => {
  describe('coins-data', () => {
    it('generate electrums', () => {
      const data = [
        {
          coin: 'KMD',
          name: 'Komodo',
          electrumServers: [
            {
              host: 'electrum1.cipig.net',
              port: 10001
            },
            {
              host: 'electrum2.cipig.net',
              port: 10001
            }
          ],
          active: 1
        }
      ];

      const expected = [
        {
          method: 'electrum',
          coin: 'KMD',
          ipaddr: 'electrum1.cipig.net',
          port: 10001
        },
        {
          method: 'electrum',
          coin: 'KMD',
          ipaddr: 'electrum2.cipig.net',
          port: 10001
        }
      ];
      expect(generateElectrums(data)).toEqual(expected);
    });
  });
});
