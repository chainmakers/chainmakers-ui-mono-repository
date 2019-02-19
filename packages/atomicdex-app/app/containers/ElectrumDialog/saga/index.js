// @flow
import { takeFirst } from 'barterdex-rssm';
import { ELECTRUM_ADD } from '../constants';
import listenForAddingElectrums from './electrum';

export default function* root() {
  yield takeFirst(ELECTRUM_ADD, listenForAddingElectrums);
}
