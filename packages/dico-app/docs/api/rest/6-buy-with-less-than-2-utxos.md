- **URL**

  /listunspent

- **Success Response:**

```js
[
  {
    tx_hash: 'db3394c1e25e5b022d2568a089ae063fd23729813588280a080749fbb694b0e2',
    tx_pos: 0,
    height: 44637,
    value: 9899000000
  }
];
```

- **URL**

  /buy

- **Success Response:**

```js
{
	"rawtx": "0100000001e2b094b6fb4907080a288835812937d23f06ae89a068252d025b5ee2c19433db0000000000ffffffff0482f38430020000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac5efae705000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac00000000",
	"hex": "0100000001e2b094b6fb4907080a288835812937d23f06ae89a068252d025b5ee2c19433db000000006a473044022044bb1d5cc516456b75f6b4671cb4bb4c179cc6cd7875c16b3db5cc3bd12dc61b0220687111eb8f65824769f550205295cc858718fedc69aa1339848e7c3dc0a145cc01210342b862088e34b340c0c2286a3f8f6dc0437dcac9a66eb131d2f71ff1d78615abffffffff0482f38430020000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac5efae705000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac00000000",
	"tx": {
		"version": 1,
		"locktime": 0,
		"vin": [{
			"txid": "db3394c1e25e5b022d2568a089ae063fd23729813588280a080749fbb694b0e2",
			"vout": 0,
			"scriptPubKey": {
				"hex": "76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac"
			}
		}],
		"vout": [{
			"satoshis": "9403954050",
			"scriptPubKey": {
				"hex": "76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac"
			}
		}, {
			"satoshis": "197977980",
			"scriptPubKey": {
				"hex": "76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac"
			}
		}, {
			"satoshis": "197977980",
			"scriptPubKey": {
				"hex": "76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac"
			}
		}, {
			"satoshis": "99088990",
			"scriptPubKey": {
				"hex": "76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac"
			}
		}]
	},
	"txid": "43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239",
	"txfee": 1000,
	"complete": true
}
```

- **URL**

  /listunspent

- **Success Response:**

```js
[
  {
    tx_hash: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
    tx_pos: 0,
    height: 0,
    value: 9403954050
  },
  {
    tx_hash: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
    tx_pos: 1,
    height: 0,
    value: 197977980
  },
  {
    tx_hash: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
    tx_pos: 2,
    height: 0,
    value: 197977980
  },
  {
    tx_hash: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
    tx_pos: 3,
    height: 0,
    value: 99088990
  }
];
```
