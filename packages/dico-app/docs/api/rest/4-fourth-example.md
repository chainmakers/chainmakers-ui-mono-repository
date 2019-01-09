- **URL**

  /buy

- **Data Params**

```js
{
"userpass": "xxx",
"base": "COQUI",
"rel": "BEER",
"relvolume": "0.92592593",
"price": "0.01080000"
}
```

- **Success Response:**

```js
{
"result": "success",
"swaps": [
[449262273, 178595249]
],
"netamounts": [],
"pending": {
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536603425,
"timeleft": 59,
"tradeid": 3624682363,
"requestid": 0,
"quoteid": 0,
"bob": "COQUI",
"base": "COQUI",
"basevalue": 85.74334186,
"alice": "BEER",
"rel": "BEER",
"relvalue": 0.92602593,
"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
"aliceid": "7904046646222061569"
},
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811"
}
```

---

- **URL**

  /recentswapsResult

- **Success Response:**

```js
{
"result": "success",
"swaps": [
[449262273, 178595249]
],
"netamounts": [],
"pending": {
"expiration": 1536603425,
"timeleft": 59,
"tradeid": 3624682363,
"requestid": 0,
"quoteid": 0,
"bob": "COQUI",
"base": "COQUI",
"basevalue": 85.74334186,
"alice": "BEER",
"rel": "BEER",
"relvalue": 0.92602593,
"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
"aliceid": "7904046646222061569"
}
}
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
{
"error": "swap never started",
"uuid": "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e",
"status": "finished",
"bob": "CHIPS",
"src": "CHIPS",
"alice": "KMD",
"dest": "KMD",
"requestid": 449262273,
"quoteid": 178595249
}
```

---

- **URL**

  /recentswapsResult

- **Success Response:**

```js
{
"result": "success",
"swaps": [
[1914742321, 2455665257],
[449262273, 178595249]
],
"netamounts": []
}
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
{
"error": "swap never started",
"uuid": "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e",
"status": "finished",
"bob": "CHIPS",
"src": "CHIPS",
"alice": "KMD",
"dest": "KMD",
"requestid": 449262273,
"quoteid": 178595249
}
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
{
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["myfee"],
"values": [0, 0, 0, 0, 0, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "pending",
"bobdeposit": "0000000000000000000000000000000000000000000000000000000000000000",
"alicepayment": "0000000000000000000000000000000000000000000000000000000000000000",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51"
}
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
{
"warning": "swaps in critical section, dont exit now",
"critical": 1536603405,
"endcritical": 0,
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["bobdeposit", "myfee"],
"values": [0, 0, 0, 0, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "pending",
"bobdeposit": "303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39",
"alicepayment": "0000000000000000000000000000000000000000000000000000000000000000",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51"
}
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
{
"warning": "swaps in critical section, dont exit now",
"critical": 1536603532,
"endcritical": 0,
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["alicepayment", "bobdeposit", "myfee"],
"values": [0, 0, 0, 0.92603593, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "pending",
"bobdeposit": "303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39",
"alicepayment": "8df013895076b592db4d0bc8d16f559af42f48a6c22fafb3d1f6e861ba2ce467",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51"
}
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
{
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["alicespend", "bobpayment", "alicepayment", "bobdeposit", "myfee"],
"values": [91.64951708, 0, 91.64952708, 0.92603593, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "finished",
"finishtime": 1536603559,
"bobdeposit": "303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39",
"alicepayment": "8df013895076b592db4d0bc8d16f559af42f48a6c22fafb3d1f6e861ba2ce467",
"bobpayment": "492b77c796073f8a3086d832eb438e74e0b2476455f185405366b54149e50cc9",
"paymentspent": "3fd50560f73696c0dad19da02690575dabe135d495e4b1922ed55c85919f784a",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51",
"method": "tradestatus"
}
```
