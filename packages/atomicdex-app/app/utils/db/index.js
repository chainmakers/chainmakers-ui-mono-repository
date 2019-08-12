// @flow
import level from 'level';
import getConfig from '../config';

let db = null;
const config = getConfig();

export function open(id: string) {
  if (db) return db;
  db = level(`${config.get('paths.userDataDir')}/${id}`, {
    valueEncoding: 'json'
  });
  window.db = db;
  return db;
}

export function close() {
  if (db) {
    db.close();
    db = null;
    return true;
  }
  return false;
}

export function get() {
  return db;
}
