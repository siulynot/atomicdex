// import swal from 'sweetalert';
// import { put, call, select, cancel, cancelled } from 'redux-saga/effects';
import { put, call, select, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import api from '../../../lib/barter-dex-api';
import {
  makeSelectCurrentUser,
  makeSelectBalanceEntities
} from '../../App/selectors';
import { loadBuyCoinError, loadBuyCoinSuccess } from '../actions';
import { makeSelectPricesEntities } from '../selectors';
import { NUMCOIN, APPROPRIATE_ERROR_UTXOS } from '../constants';
import { floor } from '../utils';

const debug = require('debug')(
  'atomicapp:containers:DexPage:saga:load-buy-coin-process'
);

// const intervalTime = 45 * 1000; // 45s
const intervalTime = 15 * 1000; // 15s

export default function* loadBuyCoinProcess({ payload, time = intervalTime }) {
  try {
    // step one: load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const { basecoin, paymentcoin, amount } = payload;
    // const { paymentcoin, amount } = payload;

    const userpass = user.get('userpass');
    const coins = user.get('coins');
    const paymentsmartaddress = coins.find(c => c.get('coin') === paymentcoin);
    const basesmartaddress = coins.find(c => c.get('coin') === basecoin);

    // step two: load balance
    const balances = yield select(makeSelectBalanceEntities());
    const balance = balances.find(c => c.get('coin') === paymentcoin);
    const fee = floor(balance.get('fee'), 8);

    // step three: load best price
    const prices = yield select(makeSelectPricesEntities());
    const price = prices.find(c => c.get('rel') === paymentcoin);

    // step four: check balance
    const relvolume = floor(Number(amount * price.get('price')), 8);
    const dexfee = floor(relvolume / 777, 8);

    if (
      relvolume * NUMCOIN + 2 * dexfee * NUMCOIN + fee * NUMCOIN >=
      Number(balance.get('balance') * NUMCOIN).toFixed(0)
    ) {
      throw new Error('Not enough balance!');
    }

    // let isSplittingTheFund = false;
    // const startTime = Date.now();
    let foundRelvolume = false;
    let foundDexfee = false;

    while (true) {
      // const durationTime = Date.now() - startTime;
      // if (durationTime > 20 * 1000) {
      //   debug('cancel');
      //   yield cancel();
      // }

      // step five: get listunspent data
      let unspent = yield call([api, 'listunspent'], {
        userpass,
        coin: paymentcoin,
        address: paymentsmartaddress.get('smartaddress')
      });
      unspent = unspent.map(e => {
        e.value /= NUMCOIN;
        return e;
      });

      foundRelvolume = unspent.find(e => e.value === relvolume);
      foundDexfee = unspent.find(e => e.value === dexfee);
      debug(`unspent = `, unspent);

      if (!foundRelvolume || !foundDexfee) {
        const outputs = [];
        // <alicepayment>
        outputs.push({
          [paymentsmartaddress.get('smartaddress')]: relvolume
        });
        // <dexfee>
        outputs.push({
          [paymentsmartaddress.get('smartaddress')]: dexfee
        });
        // <dexfee>
        outputs.push({
          [paymentsmartaddress.get('smartaddress')]: dexfee
        });
        const sendparams = {
          coin: paymentcoin,
          outputs
        };

        const resultWithdraw = yield call([api, 'withdraw'], sendparams);
        const { hex, txfee } = resultWithdraw;
        debug(`hex = ${hex}; txfee = ${txfee}`);
        const sendrawtx = {
          coin: paymentcoin,
          signedtx: hex
        };
        const resultSendrawtx = yield call(
          [api, 'sendrawtransaction'],
          sendrawtx
        );
        debug(`resultSendrawtx = ${resultSendrawtx}`);
      } else {
        debug('ready to buy');
        const buyparams = {
          userpass,
          base: basecoin,
          rel: paymentcoin,
          relvolume: relvolume.toFixed(8),
          price: price.get('bestPrice').toFixed(8)
        };

        const result = yield call([api, 'buy'], buyparams);

        if (result.error) {
          if (result.error === APPROPRIATE_ERROR_UTXOS) {
            throw new Error('Please try a different amount to pay (1/2 or 2x)');
          }
          throw new Error(result.error);
        }
        if (result.pending) {
          result.pending.bobsmartaddress = paymentsmartaddress.get(
            'smartaddress'
          );
          result.pending.requested = {
            bobAmount: amount,
            aliceAmount: amount * price.get('bestPrice')
          };
          result.pending.alicesmartaddress = basesmartaddress.get(
            'smartaddress'
          );
          return yield put(loadBuyCoinSuccess(result.pending));
        }
      }

      /*
      if (unspent.length < 2) {
        // splitting utxos
        debug('splitting utxos');
        if (!isSplittingTheFund) {
          // FIXED ME: This is UI code. We should move it to somewhere else (react component).
          swal(
            'Splitting Procedure',
            'You will need at least 2 UTXOs to perform your swap. We are trying to split it for you. Dont turn off the application.'
          );
          const buyparams = {
            userpass,
            base: basecoin,
            rel: paymentcoin,
            relvolume: relvolume.toFixed(8),
            price: price.get('bestPrice').toFixed(8)
          };
          const result = yield call([api, 'buy'], buyparams);

          debug('UTXO autosplit TX INFO:', result);
          if (result.error) {
            throw new Error(result.error);
          }
          isSplittingTheFund = true;
        }
      } else {
        debug('ready to buy');
        const buyparams = {
          userpass,
          base: basecoin,
          rel: paymentcoin,
          relvolume: relvolume.toFixed(8),
          price: price.get('bestPrice').toFixed(8)
        };

        const result = yield call([api, 'buy'], buyparams);

        if (result.error) {
          if (result.error === APPROPRIATE_ERROR_UTXOS) {
            throw new Error('Please try a different amount to pay (1/2 or 2x)');
          }
          throw new Error(result.error);
        }
        if (result.pending) {
          result.pending.bobsmartaddress = paymentsmartaddress.get(
            'smartaddress'
          );
          result.pending.requested = {
            bobAmount: amount,
            aliceAmount: amount * price.get('bestPrice')
          };
          result.pending.alicesmartaddress = basesmartaddress.get(
            'smartaddress'
          );
          return yield put(loadBuyCoinSuccess(result.pending));
        }
      }
      */

      yield call(delay, time);
    }
  } catch (err) {
    return yield put(loadBuyCoinError(err.message));
  } finally {
    if (yield cancelled()) {
      debug('load buy coin process cancelled');
    }
  }
}
