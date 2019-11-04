import { loadCoinTransactionsSuccess } from './actions';
import { makeSelectTransactionsQueueids } from './selectors';

export default async function walletSubscribe(
  { result, queueid },
  dispatch,
  getState
) {
  if (queueid > 0) {
    const selectTransactionsQueueids = makeSelectTransactionsQueueids();
    const queueids = selectTransactionsQueueids(getState());
    const coin = queueids.get(`${queueid}`);
    if (coin) {
      // FIXME this case
      // {error: "timeout"}
      // {error: "no coin"}
      if (!result || !result.sort) return;
      // sort
      let data = result.sort((a, b) => b.blockindex - a.blockindex);

      // only take 10 records
      // data = data.slice(0, 10);

      // add coin symbol
      data = data.map(e => {
        e.coin = coin;
        return e;
      });

      dispatch(
        loadCoinTransactionsSuccess({
          queueId: `${queueid}`,
          coin,
          tx: data
        })
      );
    }
  }
}
