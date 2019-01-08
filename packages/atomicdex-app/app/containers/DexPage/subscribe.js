import { loadSwapSuccess } from '../App/actions';
import { loadRecentSwapsDataFromWebsocket } from './actions';
import { makeSelectCurrentSwapsList } from './selectors';

const allowedMethods = [
  // 'request',
  // 'reserved',
  // 'connect',
  // 'connected',
  'update',
  'tradestatus'
];

export default async function buySubscribe(data, dispatch, getState) {
  const { result } = data;
  if (result && allowedMethods.indexOf(result.method) !== -1) {
    const selectSwapsList = makeSelectCurrentSwapsList();
    const list = selectSwapsList(getState());
    if (list.includes(result.uuid)) {
      dispatch(loadRecentSwapsDataFromWebsocket(result));
      if (result.status === 'finished') {
        dispatch(
          loadSwapSuccess([
            {
              coin: result.bob,
              value: result.srcamount
            },
            {
              coin: result.alice,
              value: 0 - result.destamount
            }
          ])
        );
      }
    }
  }
}
