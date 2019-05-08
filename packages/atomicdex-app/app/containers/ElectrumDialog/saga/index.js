// @flow
import { takeFirst } from 'barterdex-rssm';
import { all, takeEvery } from 'redux-saga/effects';
import { ELECTRUM_ADD, ELECTRUM_REMOVE } from '../constants';
import listenForAddingElectrums, {
  listenForRemovingElectrums
} from './electrum';

export default function* root() {
  yield all([
    yield takeFirst(ELECTRUM_ADD, listenForAddingElectrums),
    yield takeEvery(ELECTRUM_REMOVE, listenForRemovingElectrums)
  ]);
}
