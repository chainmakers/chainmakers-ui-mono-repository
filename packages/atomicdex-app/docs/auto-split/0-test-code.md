**Test code**

```js
// TEST NEW BUY
const numcoin = 100000000;
setTimeout(async () => {
  // <dexfee> = amount_of_alice_transaction / 777
  // <alicepayment> = amount_of_alice_transaction
  // <bobdeposit> = 112.5 % of amount_of_bob_transaction
  // <bobpayment> = amount_of_bob_transaction

  // const coin = "PIZZA";
  const coin = 'COQUI';
  // const coin = "BEER";
  const address = 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu';
  const fee = 0.00001;
  let utxo = await api.listunspent({
    coin,
    address
  });
  utxo = utxo.map(e => {
    e.value = e.value / numcoin;
    return e;
  });
  const reducer = utxo.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  console.log(JSON.stringify(utxo), 'utxo');
  console.log(`total = ${reducer}`);

  const amount = 77.7;
  const outputs = [];
  // <alicepayment>
  outputs.push({
    [address]: amount
  });
  // <dexfee>
  outputs.push({
    [address]: amount / 777
  });
  const sendparams = {
    coin,
    outputs
  };
  console.log(JSON.stringify(sendparams), 'sendparams');

  // const resultWithdraw = await api.withdraw(sendparams);
  // const { hex, txfee } = resultWithdraw;
  // console.log(`hex = ${hex}; txfee = ${txfee}`);
  // const sendrawtx = {
  //   coin,
  //   signedtx: hex
  // };
  // const resultSendrawtx = await api.sendrawtransaction(sendrawtx);
  // console.log(`resultSendrawtx = ${resultSendrawtx}`);

  // https://github.com/chainmakers/chainmaker/blob/master/lp/split
  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#withdraw
}, 500);
```
