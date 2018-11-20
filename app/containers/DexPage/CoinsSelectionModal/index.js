// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CoinSelectable from '../components/CoinSelectable';
import { getCoin } from '../../../components/CryptoIcons';
import { covertSymbolToName } from '../../../utils/coin';
import { makeSelectCoinModal } from '../selectors';
import { closeSelectCoinModal, clickSelectCoinModal } from '../actions';
import type { SelectCoinPayload } from '../schema';
import search from './search-api';

const debug = require('debug')(
  'dicoapp:containers:DexPage:CoinsSelectionModal'
);

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  selectCoinModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchClickSelectCoinModal: Function
};

type State = {
  input: string
};

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
  },
  appBar__button: {
    width: '100%',
    height: '100%',
    minHeight: 152
  },
  appBar__content: {
    padding: '24px 42px'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CoinsSelectionModal extends React.Component<Props, State> {
  state = {
    input: ''
  };

  handleSelectCoin = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    const { dispatchClickSelectCoinModal } = this.props;
    dispatchClickSelectCoinModal({
      name: value.name,
      symbol: value.symbol
    });
  };

  handleClose = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchCloseSelectCoinModal } = this.props;
    dispatchCloseSelectCoinModal();
  };

  onChange = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    this.setState({
      input: value
    });
  };

  renderListItem = e => {
    const { classes } = this.props;
    const CIcon = getCoin(e.symbol);
    return (
      <Grid item xs={3}>
        <CoinSelectable
          className={classes.appBar__button}
          key={`coinsSelectionModal${e.symbol}`}
          icon={<CIcon width={56} height={56} viewBox="0 0 32 32" />}
          subTitle={covertSymbolToName(e.symbol)}
          onClick={this.handleSelectCoin}
          data={e}
        />
      </Grid>
    );
  };

  render() {
    debug(`render`);
    const { classes, selectCoinModal } = this.props;
    const { input } = this.state;
    const data = search(input);

    return (
      <React.Fragment>
        <Dialog
          fullScreen
          open={selectCoinModal.get('open')}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          scroll="paper"
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
                  value={input}
                  placeholder="Search by asset name or symbol"
                  classes={{
                    root: classes.appBar__inputRoot,
                    input: classes.appBar__inputInput
                  }}
                  onChange={this.onChange}
                />
              </div>
            </Toolbar>
            <Divider className={classes.appBar__divider} />
          </AppBar>
          <DialogContent className={classes.appBar__content}>
            <Grid container spacing={24}>
              {data.map(this.renderListItem)}
            </Grid>
          </DialogContent>
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
    },
    dispatchClickSelectCoinModal: (coin: SelectCoinPayload) => {
      dispatch(clickSelectCoinModal(coin));
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
