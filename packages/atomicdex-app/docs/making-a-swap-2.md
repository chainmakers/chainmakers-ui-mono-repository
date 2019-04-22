{
	"queueid": 0,
	"userpass": "7b9896847c4efc05d369d23bf69e79245b85b5b237065eb802c28b7603fabe36",
	"base": "BEER",
	"rel": "COQUI",
	"relvolume": 0.0046,
	"price": 0.2415,
	"method": "buy"
}

{
	"result": "success",
	"swaps": [
		[2450665781, 403462274],
		[2303596788, 3978260270],
		[2456312980, 1297291485]
	],
	"netamounts": [],
	"pending": {
		"uuid": "8b506be5f71d2bacb3215e123109124422272254d674d5f135dceb9eb4279f91",
		"expiration": 1555664427,
		"timeleft": 30,
		"tradeid": 869453753,
		"requestid": 0,
		"quoteid": 0,
		"bob": "BEER",
		"base": "BEER",
		"basevalue": 0.01904761,
		"alice": "COQUI",
		"rel": "COQUI",
		"relvalue": 0.00460000,
		"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
		"aliceid": 1786792373
	},
	"uuid": "8b506be5f71d2bacb3215e123109124422272254d674d5f135dceb9eb4279f91"
}

---

{
	"queueid": 0,
	"userpass": "7b9896847c4efc05d369d23bf69e79245b85b5b237065eb802c28b7603fabe36",
	"params": {
		"uuid": "8b506be5f71d2bacb3215e123109124422272254d674d5f135dceb9eb4279f91"
	},
	"method": "my_swap_status"
}

{
	"result": {
		"error_events": ["StartFailed", "NegotiateFailed", "TakerFeeSendFailed", "MakerPaymentValidateFailed", "TakerPaymentTransactionFailed", "TakerPaymentDataSendFailed", "TakerPaymentWaitForSpendFailed", "MakerPaymentSpendFailed", "TakerPaymentRefunded", "TakerPaymentRefundFailed"],
		"events": [{
			"event": {
				"data": {
					"lock_duration": 7800,
					"maker": "5491037c6539149fddbdc43eddfe14881b6b20a0504030257c9ad0c5c7de1a77",
					"maker_amount": 2000000,
					"maker_coin": "BEER",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555667001,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555664401,
					"taker_amount": 460000,
					"taker_coin": "COQUI",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555672201,
					"uuid": "8b506be5f71d2bacb3215e123109124422272254d674d5f135dceb9eb4279f91"
				},
				"type": "Started"
			},
			"timestamp": 1555664401077
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "8b506be5f71d2bacb3215e123109124422272254d674d5f135dceb9eb4279f91"
	}
}

----

{
	"queueid": 0,
	"userpass": "7b9896847c4efc05d369d23bf69e79245b85b5b237065eb802c28b7603fabe36",
	"params": {
		"uuid": "8b506be5f71d2bacb3215e123109124422272254d674d5f135dceb9eb4279f91"
	},
	"method": "my_swap_status"
}

{
	"result": {
		"error_events": ["StartFailed", "NegotiateFailed", "TakerFeeSendFailed", "MakerPaymentValidateFailed", "TakerPaymentTransactionFailed", "TakerPaymentDataSendFailed", "TakerPaymentWaitForSpendFailed", "MakerPaymentSpendFailed", "TakerPaymentRefunded", "TakerPaymentRefundFailed"],
		"events": [{
			"event": {
				"data": {
					"lock_duration": 7800,
					"maker": "5491037c6539149fddbdc43eddfe14881b6b20a0504030257c9ad0c5c7de1a77",
					"maker_amount": 2000000,
					"maker_coin": "BEER",
					"maker_payment_confirmations": 1,
					"maker_payment_wait": 1555667001,
					"my_persistent_pub": "02471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002",
					"started_at": 1555664401,
					"taker_amount": 460000,
					"taker_coin": "COQUI",
					"taker_payment_confirmations": 1,
					"taker_payment_lock": 1555672201,
					"uuid": "8b506be5f71d2bacb3215e123109124422272254d674d5f135dceb9eb4279f91"
				},
				"type": "Started"
			},
			"timestamp": 1555664401077
		}, {
			"event": {
				"data": [1555680000, "02c47176ec122114261ef66dafefae1350d9babf31ca6a04f1322aebffb6b1403d", "fba22b2fa6badaebf1cced4e4358a771b6a0b34c"],
				"type": "Negotiated"
			},
			"timestamp": 1555664462358
		}, {
			"event": {
				"data": "lp_swap:1153] utxo:478] Output value 592 is less than tx_fee 1000",
				"type": "TakerFeeSendFailed"
			},
			"timestamp": 1555664462565
		}, {
			"event": {
				"type": "Finished"
			},
			"timestamp": 1555664462565
		}],
		"success_events": ["Started", "Negotiated", "TakerFeeSent", "MakerPaymentReceived", "MakerPaymentWaitConfirmStarted", "MakerPaymentValidatedAndConfirmed", "TakerPaymentSent", "TakerPaymentSpent", "MakerPaymentSpent", "Finished"],
		"type": "Taker",
		"uuid": "8b506be5f71d2bacb3215e123109124422272254d674d5f135dceb9eb4279f91"
	}
}
