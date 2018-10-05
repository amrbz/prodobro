import { fromJS } from 'immutable';
import indexReducer from '../reducer';

describe('indexReducer', () => {
  it('returns the initial state', () => {
    expect(indexReducer(undefined, {})).toEqual(fromJS({}));
  });
});
