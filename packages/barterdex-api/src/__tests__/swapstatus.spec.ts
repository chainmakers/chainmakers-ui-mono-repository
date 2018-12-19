import swapstatus from '../swapstatus';

describe('src/swapstatus', () => {
  it('should handle the swapstatus correctly', () => {
    const requestid = 1914742321;
    const quoteid = 2455665257;
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          requestid,
          quoteid,
          method: 'swapstatus'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, swapstatus());
    api.swapstatus({
      requestid,
      quoteid
    });
  });
});