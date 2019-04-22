# Making a swap

Send a request to making a swap

### Request:

TIME: 1555730815.882 -> Saturday, April 20, 2019 10:26:55.882 AM

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Content-Length: 52

{
	"queueid": 0,
	"userpass": "<userpass>",
	"base": "COQUI",
	"rel": "BEER",
	"relvolume": 1.25,
	"price": 2.625,
	"method": "buy"
}
```

### Response:

```js
{
	"result": "success",
	"swaps": [
		[1034564441, 1696442526],
		[2361070829, 3911946958],
		[2568721872, 2148311653]
	],
	"netamounts": [],
	"pending": {
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb",
		"expiration": 1555730849,
		"timeleft": 30,
		"tradeid": 3785668237,
		"requestid": 0,
		"quoteid": 0,
		"bob": "COQUI",
		"base": "COQUI",
		"basevalue": 0.47619047,
		"alice": "BEER",
		"rel": "BEER",
		"relvalue": 1.25000000,
		"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
		"aliceid": 2753100562
	},
	"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
}
```

# Get swap status

Send a request to update a swap

### Request 1:

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Status Code: 404 Not Found
Content-Length:

{
	"queueid": 0,
	"userpass": "<userpass>",
	"params": {
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
	},
	"method": "my_swap_status"
}
```

### Response:

```js
{
	"error": "swap data is not found"
}
```

### Request 2:

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Content-Length:

{
	"queueid": 0,
	"userpass": "<userpass>",
	"params": {
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
	},
	"method": "my_swap_status"
}
```

### Response:

```js
{
	"result": {
		"error_events": ["StartFailed", "NegotiateFailed", "TakerFeeSendFailed", "MakerPaymentValidateFailed", "TakerPaymentTransactionFailed", "TakerPaymentDataSendFailed", "TakerPaymentWaitForSpendFailed", "MakerPaymentSpendFailed", "TakerPaymentRefunded", "TakerPaymentRefundFailed"],
		"events": [{
			"event": {
				"data": {
					"lock_duration": 7800,
					"maker": "9f8491f430a938757c5ac9d23b29651a03de10f8612c9d8f87c0a625603f950d",
					"maker_amount": 50000000,
					"maker_coin": "COQUI",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555733422,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555730822,
					"taker_amount": 125000000,
					"taker_coin": "BEER",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555738622,
					"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
				},
				"type": "Started"
			},
			"timestamp": 1555730822443
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
	}
}
```

### Request 3:

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Content-Length:

{
	"queueid": 0,
	"userpass": "<userpass>",
	"params": {
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
	},
	"method": "my_swap_status"
}
```

### Response:

```js
{
	"result": {
		"error_events": ["StartFailed", "NegotiateFailed", "TakerFeeSendFailed", "MakerPaymentValidateFailed", "TakerPaymentTransactionFailed", "TakerPaymentDataSendFailed", "TakerPaymentWaitForSpendFailed", "MakerPaymentSpendFailed", "TakerPaymentRefunded", "TakerPaymentRefundFailed"],
		"events": [{
			"event": {
				"data": {
					"lock_duration": 7800,
					"maker": "9f8491f430a938757c5ac9d23b29651a03de10f8612c9d8f87c0a625603f950d",
					"maker_amount": 50000000,
					"maker_coin": "COQUI",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555733422,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555730822,
					"taker_amount": 125000000,
					"taker_coin": "BEER",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555738622,
					"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
				},
				"type": "Started"
			},
			"timestamp": 1555730822443
		}, {
			"event": {
				"data": [1555746421, "03171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbd", "351951cb1c7d1981018119889a67e7b927e6a8c9"],
				"type": "Negotiated"
			},
			"timestamp": 1555730883703
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "7845751058beac754e997d7af858275f0d314695e34226e6f0830eb4907cf47d",
					"tx_hex": "0400008085202f89018bd232c50386a9e9436c91acc76484e83770a706fc9b0f0db2685915dd319a30010000006a47304402202f3fdc5ddd1cb0442bc7a0a6b7330e9bcd91b10eb517acb7a5df3b968ea8427f022035ccada697ff7de21ed70bea6642535bf4e055baef31eecdbe86f1ff99022206012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff026b740200000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac75e3626b000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555730886490
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
	}
}
```

### Request 4:

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Content-Length:

{
	"queueid": 0,
	"userpass": "<userpass>",
	"params": {
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
	},
	"method": "my_swap_status"
}
```

### Response:

```js
{
	"result": {
		"error_events": ["StartFailed", "NegotiateFailed", "TakerFeeSendFailed", "MakerPaymentValidateFailed", "TakerPaymentTransactionFailed", "TakerPaymentDataSendFailed", "TakerPaymentWaitForSpendFailed", "MakerPaymentSpendFailed", "TakerPaymentRefunded", "TakerPaymentRefundFailed"],
		"events": [{
			"event": {
				"data": {
					"lock_duration": 7800,
					"maker": "9f8491f430a938757c5ac9d23b29651a03de10f8612c9d8f87c0a625603f950d",
					"maker_amount": 50000000,
					"maker_coin": "COQUI",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555733422,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555730822,
					"taker_amount": 125000000,
					"taker_coin": "BEER",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555738622,
					"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
				},
				"type": "Started"
			},
			"timestamp": 1555730822443
		}, {
			"event": {
				"data": [1555746421, "03171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbd", "351951cb1c7d1981018119889a67e7b927e6a8c9"],
				"type": "Negotiated"
			},
			"timestamp": 1555730883703
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "7845751058beac754e997d7af858275f0d314695e34226e6f0830eb4907cf47d",
					"tx_hex": "0400008085202f89018bd232c50386a9e9436c91acc76484e83770a706fc9b0f0db2685915dd319a30010000006a47304402202f3fdc5ddd1cb0442bc7a0a6b7330e9bcd91b10eb517acb7a5df3b968ea8427f022035ccada697ff7de21ed70bea6642535bf4e055baef31eecdbe86f1ff99022206012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff026b740200000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac75e3626b000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555730886490
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "b521df9f818d09199bd14fa7e8c949b224200709381e3ee312080b1d9251ea60",
					"tx_hex": "0400008085202f8901466b06ad6da886663d23147836032d6d53759e158b77c25772bb9a2c980e3549010000006a473044022058350b72d2d721899128adf02791facb7ed22719c14920b380ac3c50b4f5cbf002202909e12464592cbc635a64b23b6da600bc335ded917ac61394c965f1458f3f4f012103171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbdffffffff0280f0fa020000000017a914e92157af24752d63febff2717903cc037be433c287287a409e010000001976a914c366b54ea90b8d77e7b1d6cc304f04b5c24a512988ac00000000000000000000000000000000000000"
				},
				"type": "MakerPaymentReceived"
			},
			"timestamp": 1555730930272
		}, {
			"event": {
				"type": "MakerPaymentWaitConfirmStarted"
			},
			"timestamp": 1555730930273
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
	}
}
```

### Request 5:

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Content-Length:

{
	"queueid": 0,
	"userpass": "<userpass>",
	"params": {
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
	},
	"method": "my_swap_status"
}
```

### Response:

```js
{
	"result": {
		"error_events": ["StartFailed", "NegotiateFailed", "TakerFeeSendFailed", "MakerPaymentValidateFailed", "TakerPaymentTransactionFailed", "TakerPaymentDataSendFailed", "TakerPaymentWaitForSpendFailed", "MakerPaymentSpendFailed", "TakerPaymentRefunded", "TakerPaymentRefundFailed"],
		"events": [{
			"event": {
				"data": {
					"lock_duration": 7800,
					"maker": "9f8491f430a938757c5ac9d23b29651a03de10f8612c9d8f87c0a625603f950d",
					"maker_amount": 50000000,
					"maker_coin": "COQUI",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555733422,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555730822,
					"taker_amount": 125000000,
					"taker_coin": "BEER",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555738622,
					"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
				},
				"type": "Started"
			},
			"timestamp": 1555730822443
		}, {
			"event": {
				"data": [1555746421, "03171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbd", "351951cb1c7d1981018119889a67e7b927e6a8c9"],
				"type": "Negotiated"
			},
			"timestamp": 1555730883703
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "7845751058beac754e997d7af858275f0d314695e34226e6f0830eb4907cf47d",
					"tx_hex": "0400008085202f89018bd232c50386a9e9436c91acc76484e83770a706fc9b0f0db2685915dd319a30010000006a47304402202f3fdc5ddd1cb0442bc7a0a6b7330e9bcd91b10eb517acb7a5df3b968ea8427f022035ccada697ff7de21ed70bea6642535bf4e055baef31eecdbe86f1ff99022206012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff026b740200000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac75e3626b000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555730886490
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "b521df9f818d09199bd14fa7e8c949b224200709381e3ee312080b1d9251ea60",
					"tx_hex": "0400008085202f8901466b06ad6da886663d23147836032d6d53759e158b77c25772bb9a2c980e3549010000006a473044022058350b72d2d721899128adf02791facb7ed22719c14920b380ac3c50b4f5cbf002202909e12464592cbc635a64b23b6da600bc335ded917ac61394c965f1458f3f4f012103171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbdffffffff0280f0fa020000000017a914e92157af24752d63febff2717903cc037be433c287287a409e010000001976a914c366b54ea90b8d77e7b1d6cc304f04b5c24a512988ac00000000000000000000000000000000000000"
				},
				"type": "MakerPaymentReceived"
			},
			"timestamp": 1555730930272
		}, {
			"event": {
				"type": "MakerPaymentWaitConfirmStarted"
			},
			"timestamp": 1555730930273
		}, {
			"event": {
				"type": "MakerPaymentValidatedAndConfirmed"
			},
			"timestamp": 1555730940781
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
	}
}
```

### Request 6:

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Content-Length:

{
	"queueid": 0,
	"userpass": "<userpass>",
	"params": {
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
	},
	"method": "my_swap_status"
}
```

### Response:

```js
{
	"result": {
		"error_events": ["StartFailed", "NegotiateFailed", "TakerFeeSendFailed", "MakerPaymentValidateFailed", "TakerPaymentTransactionFailed", "TakerPaymentDataSendFailed", "TakerPaymentWaitForSpendFailed", "MakerPaymentSpendFailed", "TakerPaymentRefunded", "TakerPaymentRefundFailed"],
		"events": [{
			"event": {
				"data": {
					"lock_duration": 7800,
					"maker": "9f8491f430a938757c5ac9d23b29651a03de10f8612c9d8f87c0a625603f950d",
					"maker_amount": 50000000,
					"maker_coin": "COQUI",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555733422,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555730822,
					"taker_amount": 125000000,
					"taker_coin": "BEER",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555738622,
					"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
				},
				"type": "Started"
			},
			"timestamp": 1555730822443
		}, {
			"event": {
				"data": [1555746421, "03171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbd", "351951cb1c7d1981018119889a67e7b927e6a8c9"],
				"type": "Negotiated"
			},
			"timestamp": 1555730883703
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "7845751058beac754e997d7af858275f0d314695e34226e6f0830eb4907cf47d",
					"tx_hex": "0400008085202f89018bd232c50386a9e9436c91acc76484e83770a706fc9b0f0db2685915dd319a30010000006a47304402202f3fdc5ddd1cb0442bc7a0a6b7330e9bcd91b10eb517acb7a5df3b968ea8427f022035ccada697ff7de21ed70bea6642535bf4e055baef31eecdbe86f1ff99022206012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff026b740200000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac75e3626b000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555730886490
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "b521df9f818d09199bd14fa7e8c949b224200709381e3ee312080b1d9251ea60",
					"tx_hex": "0400008085202f8901466b06ad6da886663d23147836032d6d53759e158b77c25772bb9a2c980e3549010000006a473044022058350b72d2d721899128adf02791facb7ed22719c14920b380ac3c50b4f5cbf002202909e12464592cbc635a64b23b6da600bc335ded917ac61394c965f1458f3f4f012103171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbdffffffff0280f0fa020000000017a914e92157af24752d63febff2717903cc037be433c287287a409e010000001976a914c366b54ea90b8d77e7b1d6cc304f04b5c24a512988ac00000000000000000000000000000000000000"
				},
				"type": "MakerPaymentReceived"
			},
			"timestamp": 1555730930272
		}, {
			"event": {
				"type": "MakerPaymentWaitConfirmStarted"
			},
			"timestamp": 1555730930273
		}, {
			"event": {
				"type": "MakerPaymentValidatedAndConfirmed"
			},
			"timestamp": 1555730940781
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "2e078c13c424f5d23025f14851466b4c6a0468836f0636771d7aa2052b12c59f",
					"tx_hex": "0400008085202f89017df47c90b40e83f0e62642e39546310d5f2758f87a7d994e75acbe5810754578010000006b483045022100846f8845d57346d3d78070a605f46be93fddf2b22cf983e88f14307eaab8c4b7022042460cbba2e3ba0b8e42cdd0bd6cb1fd8400f97fe2300f84bdaa13fd118da5ac012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02405973070000000017a91459c3c6bdd8f718aece427e9555bcc6c22cc83a34874d86ef63000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerPaymentSent"
			},
			"timestamp": 1555730947409
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
	}
}
```

### Request 7:

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Content-Length:

{
	"queueid": 0,
	"userpass": "<userpass>",
	"params": {
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
	},
	"method": "my_swap_status"
}
```

### Response:

```js
{
	"result": {
		"error_events": ["StartFailed", "NegotiateFailed", "TakerFeeSendFailed", "MakerPaymentValidateFailed", "TakerPaymentTransactionFailed", "TakerPaymentDataSendFailed", "TakerPaymentWaitForSpendFailed", "MakerPaymentSpendFailed", "TakerPaymentRefunded", "TakerPaymentRefundFailed"],
		"events": [{
			"event": {
				"data": {
					"lock_duration": 7800,
					"maker": "9f8491f430a938757c5ac9d23b29651a03de10f8612c9d8f87c0a625603f950d",
					"maker_amount": 50000000,
					"maker_coin": "COQUI",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555733422,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555730822,
					"taker_amount": 125000000,
					"taker_coin": "BEER",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555738622,
					"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
				},
				"type": "Started"
			},
			"timestamp": 1555730822443
		}, {
			"event": {
				"data": [1555746421, "03171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbd", "351951cb1c7d1981018119889a67e7b927e6a8c9"],
				"type": "Negotiated"
			},
			"timestamp": 1555730883703
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "7845751058beac754e997d7af858275f0d314695e34226e6f0830eb4907cf47d",
					"tx_hex": "0400008085202f89018bd232c50386a9e9436c91acc76484e83770a706fc9b0f0db2685915dd319a30010000006a47304402202f3fdc5ddd1cb0442bc7a0a6b7330e9bcd91b10eb517acb7a5df3b968ea8427f022035ccada697ff7de21ed70bea6642535bf4e055baef31eecdbe86f1ff99022206012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff026b740200000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac75e3626b000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555730886490
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "b521df9f818d09199bd14fa7e8c949b224200709381e3ee312080b1d9251ea60",
					"tx_hex": "0400008085202f8901466b06ad6da886663d23147836032d6d53759e158b77c25772bb9a2c980e3549010000006a473044022058350b72d2d721899128adf02791facb7ed22719c14920b380ac3c50b4f5cbf002202909e12464592cbc635a64b23b6da600bc335ded917ac61394c965f1458f3f4f012103171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbdffffffff0280f0fa020000000017a914e92157af24752d63febff2717903cc037be433c287287a409e010000001976a914c366b54ea90b8d77e7b1d6cc304f04b5c24a512988ac00000000000000000000000000000000000000"
				},
				"type": "MakerPaymentReceived"
			},
			"timestamp": 1555730930272
		}, {
			"event": {
				"type": "MakerPaymentWaitConfirmStarted"
			},
			"timestamp": 1555730930273
		}, {
			"event": {
				"type": "MakerPaymentValidatedAndConfirmed"
			},
			"timestamp": 1555730940781
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "2e078c13c424f5d23025f14851466b4c6a0468836f0636771d7aa2052b12c59f",
					"tx_hex": "0400008085202f89017df47c90b40e83f0e62642e39546310d5f2758f87a7d994e75acbe5810754578010000006b483045022100846f8845d57346d3d78070a605f46be93fddf2b22cf983e88f14307eaab8c4b7022042460cbba2e3ba0b8e42cdd0bd6cb1fd8400f97fe2300f84bdaa13fd118da5ac012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02405973070000000017a91459c3c6bdd8f718aece427e9555bcc6c22cc83a34874d86ef63000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerPaymentSent"
			},
			"timestamp": 1555730947409
		}, {
			"event": {
				"data": [{
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "2ad78eff42c7a28cac549c6f05f229e8675a73fc9da61b12ec58eca45495ac0e",
					"tx_hex": "0400008085202f89019fc5122b05a27a1d7736066f8368046a4c6b465148f12530d2f524c4138c072e00000000d74730440220043ad7e7014041613dd7a24c81274d9c24a6b67369495d885528a3d47a02cbac02205feb7596345d89f28687d1e30aa34f4a76ed0f3611ebb1298fc346a52073abac0120cb7b47fa4b8ab06715823c4916b98ea63009c5235693d27b4c9dedba8869608f004c6b6304feafba5cb1752102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ac6782012088a914351951cb1c7d1981018119889a67e7b927e6a8c9882103171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbdac68ffffffff0158557307000000001976a914c366b54ea90b8d77e7b1d6cc304f04b5c24a512988ac1a92ba5c000000000000000000000000000000"
				}, "cb7b47fa4b8ab06715823c4916b98ea63009c5235693d27b4c9dedba8869608f"],
				"type": "TakerPaymentSpent"
			},
			"timestamp": 1555730978852
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "832f5eb270796afb10910bbb8f071ca69fe6d4cf62f7211691d051ede116ff19",
					"tx_hex": "0400008085202f890160ea51921d0b0812e33e1e3809072024b249c9e8a74fd19b19098d819fdf21b500000000d8483045022100cb115e093a023dded0d2db0b4215e0d82ee417fcbb3bc5d37298ba21cb48ec29022014d1911189aa34f536f2e9de816313aac85e51552dde4bfb89f780b28c5b69ed0120cb7b47fa4b8ab06715823c4916b98ea63009c5235693d27b4c9dedba8869608f004c6b630475ceba5cb1752103171bf8c5dddb31488f8e02419ed38370487c4a1dc4adeed4c7b757432d183dbdac6782012088a914351951cb1c7d1981018119889a67e7b927e6a8c9882102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ac68ffffffff0198ecfa02000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac2292ba5c000000000000000000000000000000"
				},
				"type": "MakerPaymentSpent"
			},
			"timestamp": 1555730980257
		}, {
			"event": {
				"type": "Finished"
			},
			"timestamp": 1555730980259
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "abf04cc57f805e6774785538653a7f8e1a859f66fb0b2d661565228838155fbb"
	}
}
```
