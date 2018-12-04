// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import type { Dispatch } from 'redux';
// import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const debug = require('debug')('atomicapp:containers:WalletPage:UtxosModal');

const styles = () => ({
  depositModal__dialogTitle: {
    padding: '24px 24px 5px'
  },

  depositModal__emptystate: {
    textAlign: 'center',
    fontSize: 25
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

export class UtxosModal extends React.PureComponent<Props> {
  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          id="deposit-modal-title"
          className={classes.depositModal__dialogTitle}
        >
          Deposit
        </DialogTitle>
        <DialogContent className={classes.depositModal__emptystate}>
          <Typography variant="title" gutterBottom>
            <CloudOff />
          </Typography>
          <Typography variant="subheading" gutterBottom>
            No data found. Please select an asset.
          </Typography>
        </DialogContent>
      </React.Fragment>
    );
  };

  render() {
    debug('render');
    // const {  } = this.props;
    return (
      <SwipeableDrawer anchor="right" open>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography component="span" color="textPrimary">
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </SwipeableDrawer>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
// export function mapDispatchToProps(dispatch: Dispatch<Object>) {
//   return {};
// }

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps
  // mapDispatchToProps
);

const UtxosModalWapper = compose(
  withConnect,
  withStyles(styles)
)(UtxosModal);

export default UtxosModalWapper;
