import { createHash } from 'crypto';

export default function userpass(passphrase: string) {
  const pp = new Buffer(passphrase, 'utf8');
  return createHash('sha256').update(pp).digest('hex');
}
