// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import AddIcon from '@material-ui/icons/Add';
// import { getCoinIcon } from '../../../components/CryptoIcons';
// import { Line } from '../../../components/placeholder';
// import { floor } from '../utils';
import getConfig from '../../../utils/config';
import { openSelectCoinModal } from '../actions';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('dicoapp:containers:DexPage:CurrencySection');

const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');
const symbol = COIN_BASE.coin;
// const line = (
//   <Line
//     width={60}
//     style={{
//       margin: 0
//     }}
//   />
// );

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSelectCoinModal: Function
};

class CurrencySection extends React.PureComponent<Props> {
  static defaultProps = {};

  onClick = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenSelectCoinModal } = this.props;
    setTimeout(dispatchOpenSelectCoinModal, 5);
  };

  render() {
    debug(`render`);
    const { dispatchOpenSelectCoinModal, ...rest } = this.props;
    return (
      <CoinSelectable
        key={`baseCoin${symbol}`}
        icon={<AddIcon color="primary" />}
        onClick={this.onClick}
        {...rest}
      />
    );
  }
}

CurrencySection.displayName = 'CurrencySection';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchOpenSelectCoinModal: () => {
      dispatch(openSelectCoinModal());
    }
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

const CurrencySectionWapper = withConnect(CurrencySection);

export default CurrencySectionWapper;
