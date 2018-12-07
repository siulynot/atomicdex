// Before auto split
// export const listunspentstep1 = [
//   {
//     tx_hash: 'db3394c1e25e5b022d2568a089ae063fd23729813588280a080749fbb694b0e2',
//     tx_pos: 0,
//     height: 44637,
//     value: 9899000000
//   }
// ];
export const listunspentstep1 = [
  {
    height: 47159,
    tx_hash: 'eccf41ee848b312f8089cfab99d3641413cc26bb6537f22ed89fd515be1a4ff2',
    tx_pos: 0,
    value: 10000000000
  }
];

// After auto split
// 9899000000 = 9403954050 + 197977980 + 197977980 + 99088990 + 1000 <txfee>
// export const listunspentstep2 = [
//   {
//     tx_hash: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
//     tx_pos: 0,
//     height: 0,
//     value: 9403954050
//   },
//   {
//     tx_hash: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
//     tx_pos: 1,
//     height: 0,
//     value: 197977980
//   },
//   {
//     tx_hash: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
//     tx_pos: 2,
//     height: 0,
//     value: 197977980
//   },
//   {
//     tx_hash: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
//     tx_pos: 3,
//     height: 0,
//     value: 99088990
//   }
// ];

// 10000000000 = 7770000000 + 10000000 + 2219999000 + 1000 <txfee>
export const listunspentstep2 = [
  {
    tx_hash: '8969d0d1b072c3623d6f7574af34231e47b13af91a0e653954c8c934626f0ad7',
    tx_pos: 0,
    height: 47160,
    value: 7770000000
  },
  {
    tx_hash: '8969d0d1b072c3623d6f7574af34231e47b13af91a0e653954c8c934626f0ad7',
    tx_pos: 1,
    height: 47160,
    value: 10000000
  },
  {
    tx_hash: '8969d0d1b072c3623d6f7574af34231e47b13af91a0e653954c8c934626f0ad7',
    tx_pos: 2,
    height: 47160,
    value: 2219999000
  },
  {
    tx_hash: '8969d0d1b072c3623d6f7574af34231e47b13af91a0e653954c8c934626f0ad7',
    tx_pos: 3,
    height: 47160,
    value: 1000
  }
];

// export const buy1 = {
//   rawtx:
//     '0100000001e2b094b6fb4907080a288835812937d23f06ae89a068252d025b5ee2c19433db0000000000ffffffff0482f38430020000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac5efae705000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac00000000',
//   hex:
//     '0100000001e2b094b6fb4907080a288835812937d23f06ae89a068252d025b5ee2c19433db000000006a473044022044bb1d5cc516456b75f6b4671cb4bb4c179cc6cd7875c16b3db5cc3bd12dc61b0220687111eb8f65824769f550205295cc858718fedc69aa1339848e7c3dc0a145cc01210342b862088e34b340c0c2286a3f8f6dc0437dcac9a66eb131d2f71ff1d78615abffffffff0482f38430020000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac7ce7cc0b000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac5efae705000000001976a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac00000000',
//   tx: {
//     version: 1,
//     locktime: 0,
//     vin: [
//       {
//         txid:
//           'db3394c1e25e5b022d2568a089ae063fd23729813588280a080749fbb694b0e2',
//         vout: 0,
//         scriptPubKey: {
//           hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
//         }
//       }
//     ],
//     vout: [
//       {
//         satoshis: '9403954050',
//         scriptPubKey: {
//           hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
//         }
//       },
//       {
//         satoshis: '197977980',
//         scriptPubKey: {
//           hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
//         }
//       },
//       {
//         satoshis: '197977980',
//         scriptPubKey: {
//           hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
//         }
//       },
//       {
//         satoshis: '99088990',
//         scriptPubKey: {
//           hex: '76a9141edcfe6f235e20a9db5abb0f7275a978486bf14088ac'
//         }
//       }
//     ]
//   },
//   txid: '43128980de820c918f5be08cd0e307f45f4f5f77ac46e51a38aa907a50dfc239',
//   txfee: 1000,
//   complete: true
// };

export const buy1 = {
  rawtx:
    '0100000001f24f1abe15d59fd82ef23765bb26cc131464d399abcf89802f318b84ee41cfec0000000000ffffffff0380ca20cf010000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac80969800000000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac187f5284000000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac00000000',
  hex:
    '0100000001f24f1abe15d59fd82ef23765bb26cc131464d399abcf89802f318b84ee41cfec000000006b483045022100b3bd9701c4aea8f55e65772959db2c60e0f850a74073df6907c3344b0b66bb6c022030aa513bd83dca308331fb67deff9c69cf562430ffa88b56fbc2516deb4293980121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffff0380ca20cf010000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac80969800000000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac187f5284000000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac00000000',
  tx: {
    version: 1,
    locktime: 0,
    vin: [
      {
        txid:
          'eccf41ee848b312f8089cfab99d3641413cc26bb6537f22ed89fd515be1a4ff2',
        vout: 0,
        scriptPubKey: {
          hex: '76a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac'
        }
      }
    ],
    vout: [
      {
        satoshis: '7770000000',
        scriptPubKey: {
          hex: '76a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac'
        }
      },
      {
        satoshis: '10000000',
        scriptPubKey: {
          hex: '76a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac'
        }
      },
      {
        satoshis: '2219999000',
        scriptPubKey: {
          hex: '76a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac'
        }
      }
    ]
  },
  txid: '8969d0d1b072c3623d6f7574af34231e47b13af91a0e653954c8c934626f0ad7',
  txfee: 1000,
  complete: true
};

// export const buy2 = {
//   result: 'success',
//   swaps: [[449262273, 178595249]],
//   netamounts: [],
//   pending: {
//     uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
//     expiration: 1536603425,
//     timeleft: 59,
//     tradeid: 3624682363,
//     requestid: 0,
//     quoteid: 0,
//     bob: 'COQUI',
//     base: 'COQUI',
//     basevalue: 85.74334186,
//     alice: 'BEER',
//     rel: 'BEER',
//     relvalue: 0.92602593,
//     desthash:
//       'c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833',
//     aliceid: '7904046646222061569',
//     alicesmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
//     bobsmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
//     requested: {
//       aliceAmount: 21.4920001,
//       bobAmount: 10
//     }
//   },
//   uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811'
// };

export const buy2 = {
  result: 'success',
  swaps: [],
  netamounts: [],
  pending: {
    uuid: '7b09fa9ad15be25c161571cb04c63c8cce94a91cefb1e45af151a6119589805a',
    expiration: 1544033539,
    timeleft: 59,
    tradeid: 1975408495,
    requestid: 0,
    quoteid: 0,
    bob: 'COQUI',
    base: 'COQUI',
    basevalue: 38.26456985,
    alice: 'BEER',
    rel: 'BEER',
    relvalue: 76.146096,
    desthash:
      '978495f9fd090e90ff9a54e56f7a05aece2809490e85967438c2ccd158558b7e',
    aliceid: '7604840138845782017',
    alicesmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    bobsmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    requested: {
      aliceAmount: 77.7,
      bobAmount: 77.7 / 1.99000001
    }
  },
  uuid: '7b09fa9ad15be25c161571cb04c63c8cce94a91cefb1e45af151a6119589805a'
};

// base: "COQUI", method: "buy", price: "1.99000001", queueid: 0, rel: "BEER", relvolume: "77.70000000"

export const buyAppropriateError = {
  error:
    'cant find a deposit that is close enough in size. make another deposit that is just a bit larger than what you want to trade'
};

it('containers/DexPage/saga/fake-data', () => {
  expect(1).toEqual(1);
});
