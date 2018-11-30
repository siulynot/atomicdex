// eslint-disable-next-line import/prefer-default-export
export const APP_STATE_NAME = 'dex';
export const LOAD_PRICES = 'dicoapp/DexPage/LOAD_PRICES';
export const LOAD_PRICES_SUCCESS = 'dicoapp/DexPage/LOAD_PRICES_SUCCESS';
export const LOAD_PRICES_ERROR = 'dicoapp/DexPage/LOAD_PRICES_ERROR';
export const LOAD_PRICE = 'dicoapp/DexPage/LOAD_PRICE';
export const LOAD_BEST_PRICE = 'dicoapp/DexPage/LOAD_BEST_PRICE';
export const LOAD_BUY_COIN = 'dicoapp/DexPage/LOAD_BUY_COIN';
export const LOAD_BUY_COIN_SUCCESS = 'dicoapp/DexPage/LOAD_BUY_COIN_SUCCESS';
export const LOAD_BUY_COIN_ERROR = 'dicoapp/DexPage/LOAD_BUY_COIN_ERROR';
export const CLEAR_BUY_COIN_ERROR = 'dicoapp/DexPage/CLEAR_BUY_COIN_ERROR';
export const LOAD_RECENT_SWAPS = 'dicoapp/DexPage/LOAD_RECENT_SWAPS';
export const LOAD_RECENT_SWAPS_COIN = 'dicoapp/DexPage/LOAD_RECENT_SWAPS_COIN';
export const LOAD_RECENT_SWAPS_SUCCESS =
  'dicoapp/DexPage/LOAD_RECENT_SWAPS_SUCCESS';
export const LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET =
  'dicoapp/DexPage/LOAD_SWAP_DATA_FROM_WEBSOCKET';
export const LOAD_RECENT_SWAPS_ERROR =
  'dicoapp/DexPage/LOAD_RECENT_SWAPS_ERROR';
export const CHECK_TIMEOUT_EVENT = 'dicoapp/DexPage/CHECK_TIMEOUT_EVENT';
export const CHECK_UPDATE_SWAP_EVENT =
  'dicoapp/DexPage/CHECK_UPDATE_SWAP_EVENT';
export const AUTO_HIDE_SNACKBAR_TIME = 6000;
export const TIME_LOOP = 20 * 1000;
export const STATE_SWAPS = [
  'Confirming',
  'My Fee',
  'Bob Deposit',
  'Alice Payment',
  'Bob Payment',
  'Swap Finished' // 'Alice Spend'
];

// https://github.com/KomodoPlatform/Documentation/blob/master/docs/source/barterDEX/MarketmakerErrors.rst#marketmaker-error-codes
export const APPROPRIATE_ERROR_UTXOS =
  'cant find a deposit that is close enough in size. make another deposit that is just a bit larger than what you want to trade';
export const SWAP_TX_DEFAULT =
  '0000000000000000000000000000000000000000000000000000000000000000';

export const SWAP_TIMEOUT = 'dicoapp/DexPage/SWAP_TIMEOUT';
export const SWAP_MAKE_A_NEW = 'dicoapp/DexPage/SWAP_MAKE_A_NEW';
export const SWAP_DETAIL_MODAL_OPEN = 'dicoapp/DexPage/SWAP_DETAIL_MODAL_OPEN';
export const SWAP_DETAIL_MODAL_CLOSE =
  'dicoapp/DexPage/SWAP_DETAIL_MODAL_CLOSE';

export const SELECT_COIN_MODAL_OPEN = 'dicoapp/DexPage/SELECT_COIN_MODAL_OPEN';
export const SELECT_COIN_MODAL_CLOSE =
  'dicoapp/DexPage/SELECT_COIN_MODAL_CLOSE';
export const SELECT_COIN_MODAL_CLICK =
  'dicoapp/DexPage/SELECT_COIN_MODAL_CLICK';

export const COIN_PAYMENT_SELECT = 'dicoapp/DexPage/COIN_PAYMENT_SELECT';

export const SWAP_WARNING_MESSAGE =
  "The swap is running, don't exit the application";
