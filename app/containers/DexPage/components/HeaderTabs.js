// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { makeSelectCurrentSwaps } from '../selectors';

const debug = require('debug')('atomicapp:containers:DexPage:HeaderTabs');

const styles = theme => ({
  buyTabs__tab: {
    minWidth: 100
  },

  buyTabs__labelContainer: {
    paddingLeft: 12,
    paddingRight: 12
  },

  buyTabs__badge: {
    top: -15,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  currentSwaps: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  handleChange: Function,
  value: number
};

class HeaderTabs extends React.PureComponent<Props> {
  render() {
    debug(`render`);
    const { value, classes, currentSwaps, handleChange } = this.props;
    const { size } = currentSwaps;
    return (
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab
          classes={{
            labelContainer: classes.buyTabs__labelContainer
          }}
          label={<span>Place Order</span>}
          className={classes.buyTabs__tab}
        />
        <Tab
          label={
            size > 0 ? (
              <Badge
                className={classes.padding}
                color="secondary"
                badgeContent={size}
                classes={{ badge: classes.buyTabs__badge }}
              >
                My Orders
              </Badge>
            ) : (
              'My Orders'
            )
          }
          className={classes.buyTabs__tab}
        />
      </Tabs>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentSwaps: makeSelectCurrentSwaps()
});

const withConnect = connect(
  mapStateToProps,
  null
);

const HeaderTabsWapper = compose(
  withConnect,
  withStyles(styles)
)(HeaderTabs);

export default HeaderTabsWapper;
