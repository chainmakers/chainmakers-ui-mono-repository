export default {
  route: {
    location: {
      pathname: '/buy',
      search: '',
      hash: ''
    }
  },
  global: {
    loading: false,
    error: false,
    currentUser: {
      result: 'success',
      userpass: 'no_hehe_userpass',
      mypubkey: 'no_hehe_mypubkey',
      pubsecp: 'no_hehe_pubsecp',
      KMD: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
      BTC: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
      NXT: 'NXT-5ZEZ-RC2J-RW2V-E49ZA',
      coins: [
        {
          txfee: 20000,
          rpc: '127.0.0.1:8332',
          height: -1,
          smartaddress: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
          wiftype: 128,
          coin: 'BTC',
          p2shtype: 5,
          status: 'inactive',
          pubtype: 0,
          installed: false,
          balance: 0
        },
        {
          zcredits: 0,
          zdebits: {
            swaps: [],
            pendingswaps: 0
          },
          txfee: 1000,
          rpc: '127.0.0.1:7771',
          height: 0,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          KMDvalue: 0,
          coin: 'KMD',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: true,
          balance: 0
        },
        {
          txfee: 1000,
          rpc: '127.0.0.1:10306',
          height: -1,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          coin: 'EQL',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: false,
          balance: 0
        },
        {
          txfee: 100000,
          rpc: '127.0.0.1:9332',
          height: -1,
          smartaddress: 'LbS4NWacqe5wyqvbryiZH9e4xoRHk9WNUJ',
          wiftype: 176,
          coin: 'LTC',
          p2shtype: 5,
          status: 'inactive',
          pubtype: 48,
          installed: false,
          balance: 0
        },
        {
          txfee: 1000,
          rpc: '127.0.0.1:11116',
          height: -1,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          coin: 'PIZZA',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: false,
          balance: 0
        },
        {
          txfee: 1000,
          rpc: '127.0.0.1:8923',
          height: -1,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          coin: 'BEER',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: false,
          balance: 0
        },
        {
          txfee: 1000,
          rpc: '127.0.0.1:14276',
          height: -1,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          coin: 'COQUI',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: false,
          balance: 0
        }
      ]
    },
    balance: {
      init: true,
      loading: false,
      error: false,
      coins: ['BTC', 'KMD', 'EQL', 'LTC', 'PIZZA', 'COQUI', 'BEER'],
      entities: {
        BTC: {
          coin: 'BTC',
          address: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
          balance: 0,
          loading: false,
          error: false
        },
        KMD: {
          coin: 'KMD',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 3.5524436,
          loading: false,
          error: false
        },
        EQL: {
          coin: 'EQL',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 2.11114249,
          loading: false,
          error: false
        },
        LTC: {
          coin: 'LTC',
          address: 'LbS4NWacqe5wyqvbryiZH9e4xoRHk9WNUJ',
          balance: 0,
          loading: false,
          error: false
        },
        PIZZA: {
          coin: 'PIZZA',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 0.67699,
          loading: false,
          error: false
        },
        COQUI: {
          coin: 'COQUI',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 293.71689487,
          loading: false,
          error: false
        },
        BEER: {
          coin: 'BEER',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 7546.5974814,
          loading: false,
          error: false
        }
      }
    }
  },
  logoutDialog: {
    show: false
  },
  websocket: {
    isStartWebsocket: true
  },
  login: {},
  buy: {
    prices: {
      loading: false,
      error: false,
      entities: {
        BTC: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'BTC',
          maxvolume: 0,
          age: 0
        },
        EQL: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'EQL',
          maxvolume: 0,
          age: 0
        },
        LTC: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'LTC',
          maxvolume: 0,
          age: 0
        },
        PIZZA: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'PIZZA',
          maxvolume: 0,
          age: 0
        },
        KMD: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'KMD',
          maxvolume: 0,
          age: 0
        },
        BEER: {
          zcredits: 0,
          pubkey:
            'f5e71f32fbb1b16599f12c264b75f45c7bea63de6ed93899c499d35cc6ef466a',
          depth: 248.65050119,
          bestPrice: 2.14920001,
          price: 1.99000001,
          avevolume: 0.9751,
          base: 'COQUI',
          address: 'REbwjC5mfQBRevH78CuRjcvQudxa3ii5Ma',
          numutxos: 255,
          rel: 'BEER',
          maxvolume: 19900.00009536,
          age: 28
        }
      }
    },
    buying: {
      loading: false,
      error: false
    },
    swaps: {
      loading: true,
      error: false,
      list: [],
      processingList: [],
      finishedList: [],
      entities: {
        '153a5b01fe56576c3cc4c69256b65a68decd2c407e85d84deb119085c020e2de': {
          alice: 'BEER',
          requestid: 1608293148,
          bobamount: 18.71282889,
          sentflags: [
            'myfee',
            'bobdeposit',
            'alicepayment',
            'bobpayment',
            'alicespend'
          ],
          expiration: 1537798364,
          status: 'finished',
          bob: 'COQUI',
          quoteid: 483165878,
          aliceamount: 39.8000902,
          id: 78984078,
          uuid:
            '153a5b01fe56576c3cc4c69256b65a68decd2c407e85d84deb119085c020e2de'
        },
        '1bff08402dac74aaa9a1b1fc1d43ac79dc2e3ff3abeae622ebd9f4e63a50c15e': {
          alice: 'BEER',
          requestid: 506139685,
          bobamount: 9.12346433,
          sentflags: [
            'myfee',
            'bobdeposit',
            'alicepayment',
            'bobrefund',
            'alicereclaim'
          ],
          expiration: 1537793618,
          status: 'finished',
          bob: 'COQUI',
          quoteid: 1776465996,
          aliceamount: 18.51860853,
          id: 58783593,
          uuid:
            '1bff08402dac74aaa9a1b1fc1d43ac79dc2e3ff3abeae622ebd9f4e63a50c15e'
        },
        '4851b94829c0c009fee4c2e646e5ba39bfd7587a0a28e37311555f35f2d44589': {
          alice: 'BEER',
          requestid: 2199683683,
          bobamount: 4.36342802,
          sentflags: [
            'myfee',
            'bobdeposit',
            'alicepayment',
            'bobpayment',
            'alicespend'
          ],
          expiration: 1537801147,
          status: 'finished',
          bob: 'COQUI',
          quoteid: 3273829115,
          aliceamount: 9.25934926,
          id: 2027363021,
          uuid:
            '4851b94829c0c009fee4c2e646e5ba39bfd7587a0a28e37311555f35f2d44589'
        }
      }
    }
  }
};

export const listunspentstep1 = [
  {
    tx_hash: 'db3394c1e25e5b022d2568a089ae063fd23729813588280a080749fbb694b0e2',
    tx_pos: 0,
    height: 44637,
    value: 9899000000
  }
];

export const listunspentstep2 = [
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

export const buy1 = {
  rawtx:
    '0100000001e2b094b6fb4907080a288835812937d23f06ae89a068252d025b5ee2c19433db0000000000ffffffff0482f38430020000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac5efae705000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac00000000',
  hex:
    '0100000001e2b094b6fb4907080a288835812937d23f06ae89a068252d025b5ee2c19433db000000006a473044022044bb1d5cc516456b75f6b4671cb4bb4c179cc6cd7875c16b3db5cc3bd12dc61b0220687111eb8f65824769f550205295cc858718fedc69aa1339848e7c3dc0a145cc01210342b862088e34b340c0c2286a3f8f6dc0437dcac9a66eb131d2f71ff1d78615abffffffff0482f38430020000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac5efae705000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac00000000',
  tx: {
    version: 1,
    locktime: 0,
    vin: [
      {
        txid:
          'db3394c1e25e5b022d2568a089ae063fd23729813588280a080749fbb694b0e2',
        vout: 0,
        scriptPubKey: {
          hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
        }
      }
    ],
    vout: [
      {
        satoshis: '9403954050',
        scriptPubKey: {
          hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
        }
      },
      {
        satoshis: '197977980',
        scriptPubKey: {
          hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
        }
      },
      {
        satoshis: '197977980',
        scriptPubKey: {
          hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
        }
      },
      {
        satoshis: '99088990',
        scriptPubKey: {
          hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
        }
      }
    ]
  },
  txid: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
  txfee: 1000,
  complete: true
};

export const buy2 = {
  result: 'success',
  swaps: [[449262273, 178595249]],
  netamounts: [],
  pending: {
    uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
    expiration: 1536603425,
    timeleft: 59,
    tradeid: 3624682363,
    requestid: 0,
    quoteid: 0,
    bob: 'COQUI',
    base: 'COQUI',
    basevalue: 85.74334186,
    alice: 'BEER',
    rel: 'BEER',
    relvalue: 0.92602593,
    desthash:
      'c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833',
    aliceid: '7904046646222061569',
    alicesmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    bobsmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    requested: {
      aliceAmount: 21.4920001,
      bobAmount: 10
    }
  },
  uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811'
};

export const buyAppropriateError = {
  error:
    'cant find a deposit that is close enough in size. make another deposit that is just a bit larger than what you want to trade'
};

it('containers/BuyPage/saga/fake-data', () => {
  expect(1).toEqual(1);
});
