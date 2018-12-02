// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';
import { loadWithdraw } from '../../App/actions';
import { openSnackbars } from '../../Snackbars/actions';
import {
  makeSelectWithdrawModal,
  makeSelectCoinWithdrawModal
} from '../selectors';
import { closeWithdrawModal } from '../actions';
import WithdrawModalContent from './WithdrawModalContent';

const debug = require('debug')('atomicapp:containers:WalletPage:WithdrawModal');

function onOpenEmpty() {
  debug('onOpenEmpty');
}

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  withdrawModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWithdraw: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  coin: Map<*, *> | null,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSnackbars: Function
};

const styles = () => ({
  withdrawmodal__emptystate: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25
  },

  withdrawmodal__iconemptystate: {
    fontSize: 50
  },

  withdrawmodal__content: {
    width: 500,
    textAlign: 'center'
  }
});

export class WithdrawModal extends React.PureComponent<Props> {
  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <div className={classes.withdrawmodal__emptystate}>
        <Typography variant="title" gutterBottom>
          <CloudOff className={classes.withdrawmodal__iconemptystate} />
        </Typography>
        <Typography variant="subheading" gutterBottom>
          No data found. Please select an asset.
        </Typography>
      </div>
    );
  };

  renderCoin = () => {
    const { coin, dispatchLoadWithdraw, dispatchOpenSnackbars } = this.props;
    return (
      <WithdrawModalContent
        coin={coin}
        dispatchLoadWithdraw={dispatchLoadWithdraw}
        dispatchOpenSnackbars={dispatchOpenSnackbars}
      />
    );
  };

  render() {
    debug('render');
    const { classes, withdrawModal, coin, onClose } = this.props;
    return (
      <SwipeableDrawer
        anchor="right"
        open={withdrawModal.get('open')}
        onClose={onClose}
        onOpen={onOpenEmpty}
      >
        <div
          tabIndex={0}
          role="button"
          className={classes.withdrawmodal__content}
        >
          {!coin && this.renderEmptyState()}
          {coin && this.renderCoin()}
        </div>
      </SwipeableDrawer>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    onClose: () => dispatch(closeWithdrawModal()),
    dispatchLoadWithdraw: (payload: {
      amount: number,
      address: string,
      coin: string
    }) => dispatch(loadWithdraw(payload)),
    dispatchOpenSnackbars: (message: string) => dispatch(openSnackbars(message))
  };
}

const mapStateToProps = createStructuredSelector({
  withdrawModal: makeSelectWithdrawModal(),
  coin: makeSelectCoinWithdrawModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const WithdrawModalWapper = compose(
  withConnect,
  withStyles(styles)
)(WithdrawModal);

export default WithdrawModalWapper;
