import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the index state domain
 */

const selectIndexDomain = state => state.get('index', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Index
 */

const makeSelectIndex = () =>
  createSelector(selectIndexDomain, substate => substate.toJS());

export default makeSelectIndex;
export { selectIndexDomain };
