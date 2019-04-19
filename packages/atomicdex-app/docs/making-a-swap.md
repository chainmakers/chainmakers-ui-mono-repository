# Making a swap

Send a request to making a swap

### Request:

```
POST / HTTP/1.1
Host: http://127.0.0.1:7783/
Referrer Policy: no-referrer-when-downgrade
Content-Type: application/json
Content-Length: 52

{
	"queueid": 0,
	"userpass": "<userpass>",
	"needjson": 1,
	"method": "buy",
	"base": "BEER",
	"rel": "COQUI",
	"relvolume": 0.1,
	"price": 0.2415
}
```

### Response:

```js
{
	"result": "success",
	"swaps": [
		[2456312980, 1297291485],
		[811707969, 3352629971],
		[563196220, 628996224]
	],
	"netamounts": [],
	"pending": {
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e",
		"expiration": 1555608469,
		"timeleft": 30,
		"tradeid": 3050233033,
		"requestid": 0,
		"quoteid": 0,
		"bob": "BEER",
		"base": "BEER",
		"basevalue": 0.41407867,
		"alice": "COQUI",
		"rel": "COQUI",
		"relvalue": 0.10000000,
		"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
		"aliceid": 1932108935
	},
	"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
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
					"maker": "5491037c6539149fddbdc43eddfe14881b6b20a0504030257c9ad0c5c7de1a77",
					"maker_amount": 43478260,
					"maker_coin": "BEER",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555611042,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555608442,
					"taker_amount": 10000000,
					"taker_coin": "COQUI",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555616242,
					"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
				},
				"type": "Started"
			},
			"timestamp": 1555608442652
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
	}
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
					"maker": "5491037c6539149fddbdc43eddfe14881b6b20a0504030257c9ad0c5c7de1a77",
					"maker_amount": 43478260,
					"maker_coin": "BEER",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555611042,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555608442,
					"taker_amount": 10000000,
					"taker_coin": "COQUI",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555616242,
					"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
				},
				"type": "Started"
			},
			"timestamp": 1555608442652
		}, {
			"event": {
				"data": [1555624041, "02c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403d", "8bb3e85610a8e50a9a192a6c3240bdc2ea5a027b"],
				"type": "Negotiated"
			},
			"timestamp": 1555608503953
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
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
					"maker": "5491037c6539149fddbdc43eddfe14881b6b20a0504030257c9ad0c5c7de1a77",
					"maker_amount": 43478260,
					"maker_coin": "BEER",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555611042,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555608442,
					"taker_amount": 10000000,
					"taker_coin": "COQUI",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555616242,
					"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
				},
				"type": "Started"
			},
			"timestamp": 1555608442652
		}, {
			"event": {
				"data": [1555624041, "02c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403d", "8bb3e85610a8e50a9a192a6c3240bdc2ea5a027b"],
				"type": "Negotiated"
			},
			"timestamp": 1555608503953
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "674c4f8672c20bb3e3b104d36a1f7ab6c41b023c3ad9705c0eebbd9d61a922b0",
					"tx_hex": "0400008085202f8901c0169e69527ffc766ee9380d9422ff8cf97439480e8b8b72ea1a613e05b7b287010000006b483045022100e4ccedfd22d0e8a8d9639bdbe1b987142ccd21a189e67422cdd9895da433b243022055ce81b728a556334df70b33fffa7081f2b5672e8b7d638fba1ca859965d9a07012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88aca026d200000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555608506779
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
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
					"maker": "5491037c6539149fddbdc43eddfe14881b6b20a0504030257c9ad0c5c7de1a77",
					"maker_amount": 43478260,
					"maker_coin": "BEER",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555611042,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555608442,
					"taker_amount": 10000000,
					"taker_coin": "COQUI",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555616242,
					"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
				},
				"type": "Started"
			},
			"timestamp": 1555608442652
		}, {
			"event": {
				"data": [1555624041, "02c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403d", "8bb3e85610a8e50a9a192a6c3240bdc2ea5a027b"],
				"type": "Negotiated"
			},
			"timestamp": 1555608503953
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "674c4f8672c20bb3e3b104d36a1f7ab6c41b023c3ad9705c0eebbd9d61a922b0",
					"tx_hex": "0400008085202f8901c0169e69527ffc766ee9380d9422ff8cf97439480e8b8b72ea1a613e05b7b287010000006b483045022100e4ccedfd22d0e8a8d9639bdbe1b987142ccd21a189e67422cdd9895da433b243022055ce81b728a556334df70b33fffa7081f2b5672e8b7d638fba1ca859965d9a07012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88aca026d200000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555608506779
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "77a9a61a371bb06ee76933e0335d2586f6f409a7acb2600b4c8e67d9e84dfc18",
					"tx_hex": "0400008085202f8901570cb012f4a7a1f3b2d164d08593d57b07595269b212f7c00a62ecc9d0a791da010000006b48304502210091394941fc71c82e1a4c2c439d4ced602d023251effc86027ab2843fa30bbc900220532df3c692fbb0d2817157bad3769f3866200be78be26de788b00e7160e5bec6012102c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403dffffffff02f46c97020000000017a9148468b046de14048051df5f13572fb433322c9276873f619702000000001976a914ea229e8f7f6adb989e1f44a6ded8ce488c7e360688ac00000000000000000000000000000000000000"
				},
				"type": "MakerPaymentReceived"
			},
			"timestamp": 1555608550684
		}, {
			"event": {
				"type": "MakerPaymentWaitConfirmStarted"
			},
			"timestamp": 1555608550686
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
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
					"maker": "5491037c6539149fddbdc43eddfe14881b6b20a0504030257c9ad0c5c7de1a77",
					"maker_amount": 43478260,
					"maker_coin": "BEER",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555611042,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555608442,
					"taker_amount": 10000000,
					"taker_coin": "COQUI",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555616242,
					"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
				},
				"type": "Started"
			},
			"timestamp": 1555608442652
		}, {
			"event": {
				"data": [1555624041, "02c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403d", "8bb3e85610a8e50a9a192a6c3240bdc2ea5a027b"],
				"type": "Negotiated"
			},
			"timestamp": 1555608503953
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "674c4f8672c20bb3e3b104d36a1f7ab6c41b023c3ad9705c0eebbd9d61a922b0",
					"tx_hex": "0400008085202f8901c0169e69527ffc766ee9380d9422ff8cf97439480e8b8b72ea1a613e05b7b287010000006b483045022100e4ccedfd22d0e8a8d9639bdbe1b987142ccd21a189e67422cdd9895da433b243022055ce81b728a556334df70b33fffa7081f2b5672e8b7d638fba1ca859965d9a07012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88aca026d200000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555608506779
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "77a9a61a371bb06ee76933e0335d2586f6f409a7acb2600b4c8e67d9e84dfc18",
					"tx_hex": "0400008085202f8901570cb012f4a7a1f3b2d164d08593d57b07595269b212f7c00a62ecc9d0a791da010000006b48304502210091394941fc71c82e1a4c2c439d4ced602d023251effc86027ab2843fa30bbc900220532df3c692fbb0d2817157bad3769f3866200be78be26de788b00e7160e5bec6012102c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403dffffffff02f46c97020000000017a9148468b046de14048051df5f13572fb433322c9276873f619702000000001976a914ea229e8f7f6adb989e1f44a6ded8ce488c7e360688ac00000000000000000000000000000000000000"
				},
				"type": "MakerPaymentReceived"
			},
			"timestamp": 1555608550684
		}, {
			"event": {
				"type": "MakerPaymentWaitConfirmStarted"
			},
			"timestamp": 1555608550686
		}, {
			"event": {
				"type": "MakerPaymentValidatedAndConfirmed"
			},
			"timestamp": 1555608571587
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "904814b7125d0750d52360bd18a0fe5f189d90d02119062926716fc690e0c698",
					"tx_hex": "0400008085202f8901b022a9619dbdeb0e5c70d93a3c021bc4b67a1f6ad304b1e3b30bc272864f4c67010000006b483045022100b4b55a04d5a9f44719007ea91ed544ffd7accf8efaef52248b807ed3fadd6c2702206efeb0736d01b9b75c4c6b745afb185feed67c0ce6cbefd113c9c41bd89ae861012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02809698000000000017a914de9e9e7370272204f454882a8d93d0a2b068a67f87388c3900000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerPaymentSent"
			},
			"timestamp": 1555608576808
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
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
					"maker": "5491037c6539149fddbdc43eddfe14881b6b20a0504030257c9ad0c5c7de1a77",
					"maker_amount": 43478260,
					"maker_coin": "BEER",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555611042,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555608442,
					"taker_amount": 10000000,
					"taker_coin": "COQUI",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555616242,
					"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
				},
				"type": "Started"
			},
			"timestamp": 1555608442652
		}, {
			"event": {
				"data": [1555624041, "02c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403d", "8bb3e85610a8e50a9a192a6c3240bdc2ea5a027b"],
				"type": "Negotiated"
			},
			"timestamp": 1555608503953
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "674c4f8672c20bb3e3b104d36a1f7ab6c41b023c3ad9705c0eebbd9d61a922b0",
					"tx_hex": "0400008085202f8901c0169e69527ffc766ee9380d9422ff8cf97439480e8b8b72ea1a613e05b7b287010000006b483045022100e4ccedfd22d0e8a8d9639bdbe1b987142ccd21a189e67422cdd9895da433b243022055ce81b728a556334df70b33fffa7081f2b5672e8b7d638fba1ca859965d9a07012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88aca026d200000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerFeeSent"
			},
			"timestamp": 1555608506779
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "77a9a61a371bb06ee76933e0335d2586f6f409a7acb2600b4c8e67d9e84dfc18",
					"tx_hex": "0400008085202f8901570cb012f4a7a1f3b2d164d08593d57b07595269b212f7c00a62ecc9d0a791da010000006b48304502210091394941fc71c82e1a4c2c439d4ced602d023251effc86027ab2843fa30bbc900220532df3c692fbb0d2817157bad3769f3866200be78be26de788b00e7160e5bec6012102c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403dffffffff02f46c97020000000017a9148468b046de14048051df5f13572fb433322c9276873f619702000000001976a914ea229e8f7f6adb989e1f44a6ded8ce488c7e360688ac00000000000000000000000000000000000000"
				},
				"type": "MakerPaymentReceived"
			},
			"timestamp": 1555608550684
		}, {
			"event": {
				"type": "MakerPaymentWaitConfirmStarted"
			},
			"timestamp": 1555608550686
		}, {
			"event": {
				"type": "MakerPaymentValidatedAndConfirmed"
			},
			"timestamp": 1555608571587
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "904814b7125d0750d52360bd18a0fe5f189d90d02119062926716fc690e0c698",
					"tx_hex": "0400008085202f8901b022a9619dbdeb0e5c70d93a3c021bc4b67a1f6ad304b1e3b30bc272864f4c67010000006b483045022100b4b55a04d5a9f44719007ea91ed544ffd7accf8efaef52248b807ed3fadd6c2702206efeb0736d01b9b75c4c6b745afb185feed67c0ce6cbefd113c9c41bd89ae861012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02809698000000000017a914de9e9e7370272204f454882a8d93d0a2b068a67f87388c3900000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000000000000000000000000000000000"
				},
				"type": "TakerPaymentSent"
			},
			"timestamp": 1555608576808
		}, {
			"event": {
				"data": [{
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "a1c14b6d8733ac609de4ab8e2e136d65cae764ca95e74d22f71518d93b9ffdbb",
					"tx_hex": "0400008085202f890198c6e090c66f712629061921d0909d185ffea018bd6023d550075d12b714489000000000d8483045022100d6aad273cee00dc9de3a4d5fddc9d4ff1a27c3206e5c2d6aa2f8036860016aa3022069f706774d6bbdc581d7c4af2889e3306bd99d5d6755678b8e4c120f53f5f21501203168f70bbfe927e7479554cc5baf2fac5166589c526a2d639a98506200f119f3004c6b6304f2d1b85cb1752102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ac6782012088a9148bb3e85610a8e50a9a192a6c3240bdc2ea5a027b882102c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403dac68ffffffff0198929800000000001976a914ea229e8f7f6adb989e1f44a6ded8ce488c7e360688ac19b4b85c000000000000000000000000000000"
				}, "3168f70bbfe927e7479554cc5baf2fac5166589c526a2d639a98506200f119f3"],
				"type": "TakerPaymentSpent"
			},
			"timestamp": 1555608607891
		}, {
			"event": {
				"data": {
					"amount": 0.0,
					"fee_details": null,
					"from": "",
					"to": "",
					"tx_hash": "844221b569970cbf82c02ecb1f046f39187ea4cd9097c2be6548521bd4940170",
					"tx_hex": "0400008085202f890118fc4de8d9678e4c0b60b2aca709f4f686255d33e03369e76eb01b371aa6a97700000000d8483045022100fb1a9e910b791de65b1a69d934af9cd98e8e0ad77d7cc39b7164d737a70c54ae0220422f3a991862042275ef75df0644c45c0fd6a84884839d873a92cd17c79569c201203168f70bbfe927e7479554cc5baf2fac5166589c526a2d639a98506200f119f3004c6b630469f0b85cb1752102c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403dac6782012088a9148bb3e85610a8e50a9a192a6c3240bdc2ea5a027b882102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ac68ffffffff010c699702000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac1fb4b85c000000000000000000000000000000"
				},
				"type": "MakerPaymentSpent"
			},
			"timestamp": 1555608609303
		}, {
			"event": {
				"type": "Finished"
			},
			"timestamp": 1555608609305
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "6c854637862bd438ec4ea358b0f4772a9946d03d97534bf84d778da256ca538e"
	}
}
```

# NOTE

Quick command

```js
api.privateCall({
  "queueid": 0,
  "needjson": 1,
  "method": "buy",
  "base": "BEER",
  "rel": "COQUI",
  "relvolume": 0.1,
  "price": 0.2415
})

api.myswapstatus({params: {uuid: "<uuid>"}})
```
