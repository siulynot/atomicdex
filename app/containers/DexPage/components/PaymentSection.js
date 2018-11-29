// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { List, Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { Line, Circle } from '../../../components/placeholder';
import { covertSymbolToName } from '../../../utils/coin';
import { floor } from '../utils';
import { selectCoinPayment, loadPrice } from '../actions';
import {
  makeSelectBalanceList,
  makeSelectPricesEntities,
  makeSelectCurrency,
  makeSelectPayment
} from '../selectors';
import type { SelectCoinPayload } from '../schema';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('dicoapp:containers:DexPage:PaymentSection');

const line = (
  <Line
    width={60}
    style={{
      marginTop: 8
    }}
  />
);

const lineTitle = (
  <Line
    width={90}
    style={{
      margin: '5px 0px'
    }}
  />
);

const lineContent = (
  <Line
    width={90}
    style={{
      margin: 0
    }}
  />
);

const circle = (
  <Circle
    style={{
      width: 32,
      height: 32
    }}
  />
);

type Props = {
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrice: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSelectCoinPayment: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  entities: Map<*, *>,
  list: List<*>,
  currency: Map<*, *>,
  payment: Map<*, *>
};

class PaymentSection extends React.PureComponent<Props> {
  static defaultProps = {};

  onClickPaymentCoin = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    const { payment, dispatchSelectCoinPayment } = this.props;
    if (value !== payment.get('symbol')) {
      dispatchSelectCoinPayment({
        name: covertSymbolToName(value),
        symbol: value
      });
    }
  };

  renderPaymentCoin = symbol => {
    const {
      payment,
      entities,
      balance,
      dispatchLoadPrice,
      currency
    } = this.props;
    const c = entities.get(symbol);
    const b = balance.get(symbol);
    const icon = getCoinIcon(symbol);
    const name = covertSymbolToName(symbol);
    if (!c) {
      // not found in entities
      return (
        <CoinSelectable
          dispatchLoadPrice={dispatchLoadPrice}
          disabled
          key={`paymentCoin${symbol}`}
          data={symbol}
          icon={icon}
          title={name}
          subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
          price={lineContent}
        />
      );
    }
    return (
      <CoinSelectable
        dispatchLoadPrice={dispatchLoadPrice}
        disabled={c.get('bestPrice') === 0 || b.get('balance') === 0}
        selected={payment.get('symbol') === symbol}
        key={`paymentCoin${symbol}`}
        data={symbol}
        icon={icon}
        title={name}
        subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
        price={`1 ${currency.get('symbol') || 'N/A'} = ${c.get(
          'bestPrice'
        )} ${symbol}`}
        onClick={this.onClickPaymentCoin}
      />
    );
  };

  renderLoading = () => (
    <CoinSelectable
      key="paymentCoinLoading"
      icon={circle}
      title={lineTitle}
      subTitle={line}
      price={lineContent}
    />
  );

  render() {
    debug(`render`);
    const { list, loading } = this.props;
    if (loading && list.size === 0) {
      return this.renderLoading();
    }
    return list.map(this.renderPaymentCoin);
  }
}

PaymentSection.displayName = 'PaymentSection';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadPrice: (coin: string) => dispatch(loadPrice(coin)),
    dispatchSelectCoinPayment: (payment: SelectCoinPayload) =>
      dispatch(selectCoinPayment(payment))
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectBalanceList(),
  entities: makeSelectPricesEntities(),
  currency: makeSelectCurrency(),
  payment: makeSelectPayment()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(PaymentSection);
