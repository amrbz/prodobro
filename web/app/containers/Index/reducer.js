/*
 *
 * Index reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_URL,UPDATE_KIDS_LIST } from './constants';

export const initialState = fromJS({
  url: null,
  kids: {
    list: [
      {
        url: 'https://i.pinimg.com/474x/90/43/b9/9043b924beb61ed6630e63e43c066dbd.jpg',
      },
      {
        url: 'https://kathleenhalme.com/images/robot-clipart-recycled.png',
      }
    ],
  },
  chat: {
    list: [
      [null, 'Привет, я Марина'],
      [null, 'Что у тебя происходит?'],
    ]
  },
  policeMsg: '',
  ambulanceMsg: '',
});

function indexReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_URL:
      return state.set('url', action.url);
    case UPDATE_KIDS_LIST: {
      const arr = state.getIn(['kids', 'list']).push({
        url: 'https://i.pinimg.com/originals/12/0d/e3/120de398eb07455a071dc87bd529782c.jpg'
      });
      return state.setIn(['kids', 'list'], arr);
    }
    default:
      return state;
  }
}

export default indexReducer;
