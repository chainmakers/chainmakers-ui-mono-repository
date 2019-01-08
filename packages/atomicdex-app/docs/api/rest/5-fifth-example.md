- **URL**

  /recentswapsResult

- **Success Response:**

```js
{
"result": "success",
"swaps": [
[1914742321, 2455665257, {
"COQUI": 91.64950708,
"BEER": -0.92601593,
"price": 0.01010388
}],
[449262273, 178595249]
],
"netamounts": [{
"BEER": -0.92601593
}, {
"COQUI": 91.64950708
}]
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

  /recentswapsResult

- **Success Response:**

```js
{
"result": "success",
"swaps": [
[2847117885, 2128319512],
[1914742321, 2455665257, {
"COQUI": 91.64950708,
"BEER": -0.92601593,
"price": 0.01010388
}],
[449262273, 178595249]
],
"netamounts": [{
"BEER": -0.92601593
}, {
"COQUI": 91.64950708
}]
}
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
{
"uuid": "3e48218196ee01c07c407d9c979808fdbae8cf245d053dcb9eeda50f5a9939c8",
"expiration": 1536708931,
"tradeid": 1571867997,
"requestid": 2847117885,
"quoteid": 2128319512,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 18.29442590,
"bobtxfee": 0.00001000,
"alice": "BEER",
"destamount": 0.18527519,
"alicetxfee": 0.00001000,
"aliceid": "8608499931475148801",
"sentflags": ["bobdeposit", "myfee", "bobrefund"],
"values": [0, 0, 0, 0, 20.58124913, 0, 0.00023844, 0, 0, 0, 0],
"result": "success",
"status": "finished",
"finishtime": 1536697964,
"bobdeposit": "117367fc8eda1c903113466121d5fb6ea197be7d527ef7119b0f221126d7418e",
"alicepayment": "0000000000000000000000000000000000000000000000000000000000000000",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "c60772ed5792d1a0e8cf133f5b2fa1911a897a19e831d1f9a59a71cde15bcb95",
"alicedexfee": "4743b40774378fb330eb725e853760df26e481d66f05bceefa5f1b634f5a2466",
"method": "tradestatus",
"finishtime": 1536697964
}
```

```js
{
  "result": "success",
  "swaps": [
    [566816994, 3815157111, {
      "COQUI": 44.01756192,
      "BEER": -0.46305296,
      "price": 0.01051973
    }],
    [2225725568, 1628917564, {
      "COQUI": 89.80092915,
      "BEER": -0.92601593,
      "price": 0.01031187
    }],
    [2847117885, 2128319512, {
      "COQUI": 18.29442590,
      "BEER": -0.18527519,
      "price": 0.01012741
    }]
  ],
  "netamounts": [{
    "BEER": -1.57434408
  }, {
    "COQUI": 152.11291697
  }],
  "pending": {
    "expiration": 1536702323,
    "timeleft": 49,
    "tradeid": 102673076,
    "requestid": 0,
    "quoteid": 0,
    "bob": "COQUI",
    "base": "COQUI",
    "basevalue": 42.87640019,
    "alice": "BEER",
    "rel": "BEER",
    "relvalue": 0.46306296,
    "desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
    "aliceid": "8608486006738124801"
  }
}
```

```js
{
  "result": "success",
  "swaps": [
    [566816994, 3815157111, {
      "COQUI": 44.01756192,
      "BEER": -0.46305296,
      "price": 0.01051973
    }],
    [2225725568, 1628917564, {
      "COQUI": 89.80092915,
      "BEER": -0.92601593,
      "price": 0.01031187
    }],
    [2847117885, 2128319512, {
      "COQUI": 18.29442590,
      "BEER": -0.18527519,
      "price": 0.01012741
    }]
  ],
  "netamounts": [{
    "BEER": -1.57434408
  }, {
    "COQUI": 152.11291697
  }],
  "pending": {
    "expiration": 1536702323,
    "timeleft": 39,
    "tradeid": 102673076,
    "requestid": 0,
    "quoteid": 0,
    "bob": "COQUI",
    "base": "COQUI",
    "basevalue": 42.87640019,
    "alice": "BEER",
    "rel": "BEER",
    "relvalue": 0.46306296,
    "desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
    "aliceid": "8608486006738124801"
  }
}
```

```js
{
  "result": "success",
  "swaps": [
    [566816994, 3815157111, {
      "COQUI": 44.01756192,
      "BEER": -0.46305296,
      "price": 0.01051973
    }],
    [2225725568, 1628917564, {
      "COQUI": 89.80092915,
      "BEER": -0.92601593,
      "price": 0.01031187
    }],
    [2847117885, 2128319512, {
      "COQUI": 18.29442590,
      "BEER": -0.18527519,
      "price": 0.01012741
    }]
  ],
  "netamounts": [{
    "BEER": -1.57434408
  }, {
    "COQUI": 152.11291697
  }]
}
```
