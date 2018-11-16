// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as JsSearch from 'js-search';
import { getCoinIcon } from '../../components/CryptoIcons';
import { covertSymbolToName } from '../../utils/coin';
import { makeSelectCoinModal } from './selectors';
import { closeSelectCoinModal } from './actions';

const FAKE_DATA = ['BTC', 'KMD', 'EQL', 'LTC', 'PIZZA', 'BEER', 'COQUI'];

const BTC = {
  isbn: 1,
  name: 'Bitcoin',
  symbol: 'BTC',
  market_cap: 97822306639.0
};

const BCH = {
  isbn: 2,
  name: 'Bitcoin Cash',
  symbol: 'BCH',
  market_cap: 7358710909.0
};

const LTC = {
  isbn: 3,
  name: 'Litecoin',
  symbol: 'LTC',
  market_cap: 2578993869.0
};

const KMD = {
  isbn: 4,
  name: 'Komodo',
  symbol: 'KMD',
  market_cap: 107340275.0
};

const search = new JsSearch.Search('isbn');
// this index strategy is built for all substrings matches.
search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
search.addIndex('name');
search.addIndex('symbol');
search.addDocuments([BTC, BCH, LTC, KMD]);
console.log(search.search('Bitcoin'));
console.log(search.search('te'));
console.log(search.search('o'));
console.log(search.search('k'));

const debug = require('debug')(
  'dicoapp:containers:DexPage:CoinsSelectionModal'
);

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  selectCoinModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseSelectCoinModal: Function
};

type State = {};

const styles = theme => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: theme.appbar.background,
    position: 'relative'
  },
  appBar__divider: {
    bottom: -5,
    boxShadow: 'inset 0px 4px 8px -3px rgba(17, 17, 17, .06)',
    height: 5,
    left: 0,
    opacity: 1,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    backgroundColor: 'transparent'
  },
  appBar__search: {
    flex: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  appBar__inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  appBar__inputInput: {
    padding: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CoinsSelectionModal extends React.Component<Props, State> {
  handleClose = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchCloseSelectCoinModal } = this.props;
    dispatchCloseSelectCoinModal();
  };

  renderListItem = coin => {
    const { classes } = this.props;
    const CIcon = getCoinIcon(coin);
    return (
      <ListItem
        key={`coins_select_key_${coin}`}
        button
        classes={{
          secondaryAction: classes.withdraw__listItem
        }}
      >
        <ListItemText primary={covertSymbolToName(coin)} secondary={coin} />
        <ListItemSecondaryAction
          className={classes.withdraw__listItemSecondaryLogo}
        >
          <IconButton aria-label="coin-icon">{CIcon}</IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  render() {
    debug(`render`);
    const { classes, selectCoinModal } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullScreen
          open={selectCoinModal.get('open')}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar color="default" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <ArrowBackIcon />
              </IconButton>
              <div className={classes.appBar__search}>
                <InputBase
                  placeholder="Search by asset name or symbol"
                  classes={{
                    root: classes.appBar__inputRoot,
                    input: classes.appBar__inputInput
                  }}
                />
              </div>
            </Toolbar>
            <Divider className={classes.appBar__divider} />
          </AppBar>
          <List>{FAKE_DATA.map(this.renderListItem)}</List>
        </Dialog>
      </React.Fragment>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchCloseSelectCoinModal: () => {
      dispatch(closeSelectCoinModal());
    }
  };
}

const mapStateToProps = createStructuredSelector({
  selectCoinModal: makeSelectCoinModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const CoinsSelectionModalWapper = compose(
  withConnect,
  withStyles(styles)
)(CoinsSelectionModal);

export default CoinsSelectionModalWapper;
