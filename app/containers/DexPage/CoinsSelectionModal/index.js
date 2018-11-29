// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Circle, Line } from '../../../components/placeholder';
import CoinSelectable from '../components/CoinSelectable';
import { makeSelectCoinModal, makeSelectPricesLoading } from '../selectors';
import { closeSelectCoinModal, clickSelectCoinModal } from '../actions';
import type { SelectCoinPayload } from '../schema';
import { makeSelectBalanceLoading } from '../../App/selectors';
import ModalContent from './ModalContent';
import InputSearch from './InputSearch';
import search from './search-api';

const debug = require('debug')(
  'dicoapp:containers:DexPage:CoinsSelectionModal'
);

const circle = <Circle />;
const line = (
  <Line
    width={60}
    style={{
      margin: '10px auto'
    }}
  />
);

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  selectCoinModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchClickSelectCoinModal: Function,
  balanceLoading: boolean,
  priceLoading: boolean
};

type State = {
  // eslint-disable-next-line flowtype/no-weak-types
  input: Object,
  show: boolean
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
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: 68,
      width: 'auto'
    }
  },
  appBar__inputRoot: {
    color: 'inherit',
    width: '100%',
    height: 48,
    margin: '12px 0'
    // borderRadius: 8,
    // background: '#f1f3f4'
  },
  appBar__inputInput: {
    padding: `${theme.spacing.unit}px 0px`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
    '&:before': {
      borderBottom: 'none !important'
    },
    '&:after': {
      bottom: -12
    }
  },
  appBar__button: {
    width: '100%',
    height: '100%',
    minHeight: 152,
    '&:hover': {
      borderColor: '#80BB41'
    }
    // background: '#f1f3f4',
    // border: 'none'
  },
  appBar__content: {
    padding: '24px 94px'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CoinsSelectionModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      input: search(''),
      show: false
    };

    this.input = React.createRef();
  }

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

  handleSearchRequest = input => {
    const data = search(input);
    this.setState({
      input: data
    });
  };

  showContent = () => {
    const searchInput = this.input.current;

    this.setState({
      show: true,
      input: search(searchInput.state.input)
    });
  };

  hideContent = () => {
    this.setState({
      show: false
    });
  };

  render() {
    debug(`render`);
    const {
      classes,
      selectCoinModal,
      priceLoading,
      balanceLoading
    } = this.props;
    const { input, show } = this.state;

    return (
      <React.Fragment>
        <Dialog
          fullScreen
          open={selectCoinModal.get('open')}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          scroll="paper"
          onEntered={this.showContent}
          onExited={this.hideContent}
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
                <InputSearch
                  ref={this.input}
                  handleSearchRequest={this.handleSearchRequest}
                  inputRoot={classes.appBar__inputRoot}
                  inputInput={classes.appBar__inputInput}
                />
              </div>
            </Toolbar>
            <Divider className={classes.appBar__divider} />
          </AppBar>
          <DialogContent className={classes.appBar__content}>
            <Grid container spacing={24}>
              {!show && (
                <React.Fragment>
                  <Grid item xs={3}>
                    <CoinSelectable
                      className={classes.appBar__button}
                      icon={circle}
                      subTitle={line}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CoinSelectable
                      className={classes.appBar__button}
                      icon={circle}
                      subTitle={line}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CoinSelectable
                      className={classes.appBar__button}
                      icon={circle}
                      subTitle={line}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CoinSelectable
                      className={classes.appBar__button}
                      icon={circle}
                      subTitle={line}
                    />
                  </Grid>
                </React.Fragment>
              )}
              {show && (
                <ModalContent
                  data={input}
                  disabled={priceLoading || balanceLoading}
                  className={classes.appBar__button}
                  handleSelectCoin={this.handleSelectCoin}
                />
              )}
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
  selectCoinModal: makeSelectCoinModal(),
  priceLoading: makeSelectPricesLoading(),
  balanceLoading: makeSelectBalanceLoading()
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
