- **URL**

  /buy

- **Data Params**

```js
{
"userpass": "xxx",
"base": "CHIPS",
"rel": "KMD",
"relvolume": 0.01,
"price": "0.06647729"
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
"uuid": "d4c15c04cdbec32ec21021b4c00fb7e64b6b95b6bd090847712a70130fbe091a",
"expiration": 1536590290,
"timeleft": 59,
"tradeid": 2026211067,
"requestid": 0,
"quoteid": 0,
"bob": "CHIPS",
"base": "CHIPS",
"basevalue": 0.15213177,
"alice": "KMD",
"rel": "KMD",
"relvalue": 0.0101,
"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
"aliceid": "1834858063202287617"
},
"uuid": "d4c15c04cdbec32ec21021b4c00fb7e64b6b95b6bd090847712a70130fbe091a"
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
"expiration": 1536590290,
"timeleft": 59,
"tradeid": 2026211067,
"requestid": 0,
"quoteid": 0,
"bob": "CHIPS",
"base": "CHIPS",
"basevalue": 0.15213177,
"alice": "KMD",
"rel": "KMD",
"relvalue": 0.0101,
"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
"aliceid": "1834858063202287617"
}
}
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
{
"uuid": "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e",
"expiration": 1536604836,
"tradeid": 3480712030,
"requestid": 449262273,
"quoteid": 178595249,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "CHIPS",
"srcamount": 0.15426411,
"bobtxfee": 0.0001,
"alice": "KMD",
"destamount": 0.01009,
"alicetxfee": 0.00001,
"aliceid": "1834861514773102593",
"sentflags": ["bobdeposit", "myfee"],
"values": [0, 0, 0, 0, 0.17374712, 0, 0.00001298, 0, 0, 0, 0],
"result": "success",
"status": "pending",
"bobdeposit": "f31a580bd446538986e13477723116a762a2d0aea1eb6287f9cc90e58b45311a",
"alicepayment": "0000000000000000000000000000000000000000000000000000000000000000",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "5f4cd2b1aef137dbd409e431f401ec7fc7c25020f76f38d87d83db53a1b3b1bf"
}
```
