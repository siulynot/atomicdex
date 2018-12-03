import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectGlobal,
  makeSelectLocation,
  makeSelectBalanceAvailable
} from '../selectors';
import data from '../../__tests__/app-state.json';

describe('containers/DexPage/selectors/selectGlobal', () => {
  it('should select the buy state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectGlobal(mockedState)).toEqual(initialState);
  });
});

describe('containers/DexPage/selectors/makeSelectLocation', () => {
  it('should select the buy state', () => {
    const mockedState = fromJS(data);
    const selectLocation = makeSelectLocation();
    expect(selectLocation(mockedState)).toEqual({
      hash: '',
      pathname: '/buy',
      search: ''
    });
  });
});

describe('containers/DexPage/selectors/makeSelectBalanceAvailable', () => {
  it('should select the buy state', () => {
    const mockedState = fromJS(data);
    const selectBalanceAvailable = makeSelectBalanceAvailable();
    expect(selectBalanceAvailable(mockedState)).toEqual(
      fromJS(
        data.global.balance.coins
          .map(e => data.global.balance.entities[e])
          .filter(e => e.balance)
      )
    );
  });
});
