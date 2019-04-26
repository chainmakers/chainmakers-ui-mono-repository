const Agui = 'AtomicDex';
const gui = Agui;

export const WEBSOCKET_STATE_ZERO = {
  id: 474902717,
  requestid: 3072406848,
  quoteid: 2410786566,
  expiration: 1539800622,
  bob: 'COQUI',
  uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
  timeleft: 59,
  tradeid: 474902717,
  base: 'COQUI',
  bobamount: 8.61671724,
  alice: 'BEER',
  rel: 'BEER',
  aliceamount: 18.51861853,
  desthash: 'c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833',
  aliceid: '230350004109246465',
  sentflags: [],
  status: 'pending',
  bobsmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
  alicesmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
  requested: {
    aliceAmount: 21.4920001,
    bobAmount: 10
  }
};

export const WEBSOCKET_STATE_ONE = {
  queueid: 0,
  result: {
    name: 'myfee',
    coin: 'BEER',
    tx:
      '0100000001e4cc1b122bce3a92ea248f6864aaa4ec115490c0243eedec7d3d3b105e1bb8f1010000006a4730440220770ee3baeceb4ab48b4b7e47e2028aa0a3cdb7ee9529856bbdf2bb7be5b2ac5002207888e0247369e0eead4d16aefe15b49451bf4e8354d621639d2236517302434d012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02f35d2400000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88acca3b6d00000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88acf37dc75b',
    txid: 'f4e7a127edb5881bcf936dd0d443d2b2bcf8deaf677e2b6517bb4e26d058e370',
    expiration: 1539816162,
    uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
    iambob: 0,
    bobcoin: 'COQUI',
    aliceRealSat: '0',
    bobRealSat: '0',
    alicecoin: 'BEER',
    lock: 0,
    amount: 0.02383347,
    Apayment: 'bSyfSZPch97bEmTti5Uxiob3Ca9UTVVeot',
    method: 'update',
    update: 'myfee',
    requestid: 3072406848,
    quoteid: 2410786566
  }
};

export const WEBSOCKET_STATE_TWO = {
  queueid: 0,
  result: {
    name: 'myfee',
    coin: 'BEER',
    tx:
      '0100000001e4cc1b122bce3a92ea248f6864aaa4ec115490c0243eedec7d3d3b105e1bb8f1010000006a4730440220770ee3baeceb4ab48b4b7e47e2028aa0a3cdb7ee9529856bbdf2bb7be5b2ac5002207888e0247369e0eead4d16aefe15b49451bf4e8354d621639d2236517302434d012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02f35d2400000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88acca3b6d00000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88acf37dc75b',
    txid: 'f4e7a127edb5881bcf936dd0d443d2b2bcf8deaf677e2b6517bb4e26d058e370',
    expiration: 1539816162,
    uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
    iambob: 0,
    bobcoin: 'COQUI',
    aliceRealSat: '0',
    bobRealSat: '0',
    alicecoin: 'BEER',
    lock: 0,
    amount: 0.02383347,
    Apayment: 'bSyfSZPch97bEmTti5Uxiob3Ca9UTVVeot',
    method: 'update',
    update: 'myfee',
    requestid: 3072406848,
    quoteid: 2410786566
  }
};
export const WEBSOCKET_STATE_THREE = {
  queueid: 0,
  result: {
    name: 'bobdeposit',
    coin: 'COQUI',
    tx:
      '01000000010415a0fc4189207c566939d0e5f0393cb5c706652d637f5eddb80381f6561934000000006a473044022031d3d25fc562040fd4df15631a11af0b9309c78c3492c22b1afd3607b711eacf02206cebf51de49a3f1ba2640198f2e760f20d9c06f8a334ef036d09856bb9a16e37012103a2a55d25a02041c2c92e1b0b411a7ee24d312d92309d3632ccc5d97e3a77dd0bffffffff02b97e2d3d0000000017a91494ad5853d4cdde13533467c851b6832217bcc335878789d204000000001976a914c5eac3abba59945c47cae06cc30be44e3432dd8188ace2bac75b',
    txid: '284886246038cef5f44dbe56c6d04c64ad8d4cfe118832dd7760a8bf13187e0d',
    Bdeposit: 'bSHQMqzGNRne3VE2LfSwy8EbAvcaFfPutc',
    expiration: 1539816162,
    uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
    iambob: 0,
    bobcoin: 'COQUI',
    bobDepositEthTx:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    aliceRealSat: '0',
    bobRealSat: '0',
    alicecoin: 'BEER',
    lock: 0,
    amount: 10.26391737,
    Apayment: 'bSyfSZPch97bEmTti5Uxiob3Ca9UTVVeot',
    redeem:
      '6304e2bac75bb17582012088a914176df4d799ebe35e299691231939f8bf8188b108882102a58388667e61c85a8c97288ea99b0ac8a2780232ecf1578222aa0b58de10cf4fac6782012088a9146379cde8ec2ca1f184e704458a894b02201dd72788210318e7c5783877c46b2ee2e63058f403adc6e8a2afe1a5e53cc94e6b245f390b58ac68',
    method: 'update',
    update: 'bobdeposit',
    requestid: 3072406848,
    quoteid: 2410786566
  }
};

export const WEBSOCKET_STATE_FOUR = {
  queueid: 0,
  result: {
    name: 'alicepayment',
    coin: 'BEER',
    tx:
      '0100000001cad4965a2a7a7596f15d6d6f6e719d1eec36c685e6a618237591d2eeb7320332010000006b483045022100a152cae6adb02259792e774bbc744a2277bcec4d7408d8c9ccb74e772b4139fc022041d842cf2a82cbfb6b35013a857f65ff367f5e60dfaf403145513d9e0894f5b0012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02452f616e0000000017a9149c4a929d5a1e0f7deaf65eebdda860a5b50eef29872f8bfd300c0000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000',
    txid: 'f4eaba62414abdc26f44952ba24492162a83a3facda3e614e32ae920fcb56755',
    Bdeposit: 'bSHQMqzGNRne3VE2LfSwy8EbAvcaFfPutc',
    expiration: 1539816162,
    uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
    iambob: 0,
    bobcoin: 'COQUI',
    bobDepositEthTx:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    aliceRealSat: '0',
    bobRealSat: '0',
    alicecoin: 'BEER',
    lock: 0,
    amount: 18.51862853,
    trigger: '284886246038cef5f44dbe56c6d04c64ad8d4cfe118832dd7760a8bf13187e0d',
    Apayment: 'bSyfSZPch97bEmTti5Uxiob3Ca9UTVVeot',
    redeem:
      '522102cf40bdabb66df9e2c9aa969d6866657a221601467bcb2d7ea6ce29c1dd98387a2103bda77f12f161553eba9117d02b5294094e8f3dcaad384edc0278bbe3e8462cf352ae',
    method: 'update',
    update: 'alicepayment',
    requestid: 3072406848,
    quoteid: 2410786566
  }
};

export const WEBSOCKET_STATE_FIVE = {
  queueid: 0,
  result: {
    name: 'alicepayment',
    coin: 'BEER',
    tx:
      '0100000001cad4965a2a7a7596f15d6d6f6e719d1eec36c685e6a618237591d2eeb7320332010000006b483045022100a152cae6adb02259792e774bbc744a2277bcec4d7408d8c9ccb74e772b4139fc022041d842cf2a82cbfb6b35013a857f65ff367f5e60dfaf403145513d9e0894f5b0012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02452f616e0000000017a9149c4a929d5a1e0f7deaf65eebdda860a5b50eef29872f8bfd300c0000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000',
    txid: 'f4eaba62414abdc26f44952ba24492162a83a3facda3e614e32ae920fcb56755',
    Bdeposit: 'bSHQMqzGNRne3VE2LfSwy8EbAvcaFfPutc',
    expiration: 1539816162,
    uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
    iambob: 0,
    bobcoin: 'COQUI',
    bobDepositEthTx:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    aliceRealSat: '0',
    bobRealSat: '0',
    alicecoin: 'BEER',
    lock: 0,
    amount: 18.51862853,
    trigger: '284886246038cef5f44dbe56c6d04c64ad8d4cfe118832dd7760a8bf13187e0d',
    Apayment: 'bSyfSZPch97bEmTti5Uxiob3Ca9UTVVeot',
    redeem:
      '522102cf40bdabb66df9e2c9aa969d6866657a221601467bcb2d7ea6ce29c1dd98387a2103bda77f12f161553eba9117d02b5294094e8f3dcaad384edc0278bbe3e8462cf352ae',
    method: 'update',
    update: 'alicepayment',
    requestid: 3072406848,
    quoteid: 2410786566
  }
};

export const WEBSOCKET_STATE_SIX = {
  queueid: 0,
  result: {
    name: 'bobpayment',
    coin: 'COQUI',
    tx:
      '0100000001f3a6be573af4890bf5993564f3f01f5857bdd06e94fa74300d63f30715538107000000006a473044022051a826ec21a2b94d42888f25be8f25b6bd8e3985d3a36beb8d17ca2e23a2453302207069f43104c761888999c1de11d6e3ffa13307569c06e2b4e448d81f6aaaea43012103a2a55d25a02041c2c92e1b0b411a7ee24d312d92309d3632ccc5d97e3a77dd0bffffffff02115561360000000017a914bc6a29ff4c42b0c34df5f191b18e60a7b496dc7287cfbc9805000000001976a914c5eac3abba59945c47cae06cc30be44e3432dd8188ac6a9cc75b',
    txid: 'd5ec1f0090fa6d2c5c84dcac9a2b0ce8b4a80f35fd09ba0534555ab1efa1e6b4',
    Bdeposit: 'bSHQMqzGNRne3VE2LfSwy8EbAvcaFfPutc',
    Bpayment: 'bVuWuhhUFDFZAa4PfL7tQhu2PgVNCsT2rS',
    expiration: 1539816162,
    uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
    iambob: 0,
    bobcoin: 'COQUI',
    bobDepositEthTx:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    bobPaymentEthTx:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    aliceRealSat: '0',
    bobRealSat: '0',
    alicecoin: 'BEER',
    lock: 0,
    amount: 9.12348433,
    Apayment: 'bSyfSZPch97bEmTti5Uxiob3Ca9UTVVeot',
    redeem:
      '63046a9cc75bb1752103475adb0a56f5ae76899aece53219cdf43b9aff003eda0517d7c72b7938e98a1fac6782012088a914176df4d799ebe35e299691231939f8bf8188b108882102a58388667e61c85a8c97288ea99b0ac8a2780232ecf1578222aa0b58de10cf4fac68',
    method: 'update',
    update: 'bobpayment',
    requestid: 3072406848,
    quoteid: 2410786566
  }
};

export const WEBSOCKET_STATE_SEVEN = {
  queueid: 0,
  result: {
    uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
    expiration: 1539816162,
    tradeid: 474902717,
    requestid: 3072406848,
    quoteid: 2410786566,
    iambob: 0,
    Bgui: '',
    Agui,
    gui,
    bob: 'COQUI',
    srcamount: 9.12346433,
    bobtxfee: 0.00001,
    alice: 'BEER',
    destamount: 18.51860853,
    alicetxfee: 0.00001,
    aliceid: '230350004109246465',
    txChain: [
      {
        stage: 'myfee',
        coin: 'BEER',
        txid:
          'f4e7a127edb5881bcf936dd0d443d2b2bcf8deaf677e2b6517bb4e26d058e370',
        amount: 0.02383347
      },
      {
        stage: 'bobdeposit',
        coin: 'COQUI',
        txid:
          '284886246038cef5f44dbe56c6d04c64ad8d4cfe118832dd7760a8bf13187e0d',
        amount: 10.26391737
      },
      {
        stage: 'alicepayment',
        coin: 'BEER',
        txid:
          'f4eaba62414abdc26f44952ba24492162a83a3facda3e614e32ae920fcb56755',
        amount: 18.51862853
      },
      {
        stage: 'bobpayment',
        coin: 'COQUI',
        txid:
          'd5ec1f0090fa6d2c5c84dcac9a2b0ce8b4a80f35fd09ba0534555ab1efa1e6b4',
        amount: 9.12348433
      },
      {
        stage: 'alicespend',
        coin: 'COQUI',
        txid:
          '0994bf0bdf55a7750a77f78043f4369e94be49979dbc025365751554eb06f6d1',
        amount: 9.12347433
      }
    ],
    sentflags: [
      'myfee',
      'bobdeposit',
      'alicepayment',
      'bobpayment',
      'alicespend'
    ],
    values: [
      0.02383347,
      0,
      10.26391737,
      18.51862853,
      9.12348433,
      9.12347433,
      0,
      0,
      0,
      0,
      0
    ],
    result: 'success',
    status: 'finished',
    finishtime: 1539800674,
    bobdeposit:
      '284886246038cef5f44dbe56c6d04c64ad8d4cfe118832dd7760a8bf13187e0d',
    alicepayment:
      'f4eaba62414abdc26f44952ba24492162a83a3facda3e614e32ae920fcb56755',
    bobpayment:
      'd5ec1f0090fa6d2c5c84dcac9a2b0ce8b4a80f35fd09ba0534555ab1efa1e6b4',
    paymentspent:
      '0994bf0bdf55a7750a77f78043f4369e94be49979dbc025365751554eb06f6d1',
    Apaymentspent:
      '0000000000000000000000000000000000000000000000000000000000000000',
    depositspent:
      '0000000000000000000000000000000000000000000000000000000000000000',
    alicedexfee:
      'f4e7a127edb5881bcf936dd0d443d2b2bcf8deaf677e2b6517bb4e26d058e370',
    method: 'tradestatus'
  }
};

export const SWAP_STATE_ZERO = {
  id: 474902717,
  requestid: 3072406848,
  quoteid: 2410786566,
  expiration: 1539800622,
  bob: 'COQUI',
  uuid: '7abe9469c972806f5640ed5b174f0ae889ac6e579d8a38a60353af0c126562be',
  timeleft: 59,
  tradeid: 474902717,
  base: 'COQUI',
  basevalue: 8.61671724,
  alice: 'BEER',
  rel: 'BEER',
  relvalue: 18.51861853,
  desthash: 'c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833',
  aliceid: '230350004109246465',
  sentflags: [],
  status: 'pending',
  bobsmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
  alicesmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
  requested: {
    aliceAmount: 21.4920001,
    bobAmount: 10
  }
};

export const LOAD_SWAP_SUCCESS = [
  {
    coin: 'BEER',
    value: -18.51860853
  },
  {
    coin: 'COQUI',
    value: 9.12346433
  }
];
