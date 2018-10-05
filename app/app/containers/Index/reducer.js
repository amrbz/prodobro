/*
 *
 * Index reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_STATUS,
  UPDATE_COUNTDOWN_VALUE,
  UPDATE_TIME_LEFT_VALUE,
  UPDATE_STREAMING_TIME,
  UPDATE_TEXT_FIELD,
  SEND_CHAT_MESSAGE,
  TOGGLE_DRAWER,
  TOGGLE_CALLBACK_DIALOG,
  TOGGLE_CALLBACK,
  TOGGLE_HELP_OTHERS_DIALOG,
  ON_FILE_DROP,
  TOGGLE_FILE_DIALOG,
} from './constants';

export const initialState = fromJS({
  showDrawer: false,
  status: 'countdown',
  countdown: 100,
  timeLeft: 10,
  streamingTime: 0,
  chatInput: '',
  chat: {
    list: [
      ['Привет, я Марина', null],
      ['Что у тебя происходит?', null],
    ],
  },
  records: {
    list: [1, 2, 3],
  },
  explore: {
    list: [
      {
        title: '18 октября 2018',
        duration: '6:17',
        tags: ['Буллинг', 'Агрессия в школе'],
      },
      {
        title: '12 октября 2018',
        duration: '4:41',
        tags: ['Хейнтинг', 'Флейминг', 'Агрессия в сети'],
      },
      {
        title: '29 сетнября 2018',
        duration: '9:42',
        tags: ['Кибер буллинг', 'Агрессия в сети'],
      },
      {
        title: '14 сентября 2018',
        duration: '12:15',
        tags: ['Домашнее насилие'],
      },
    ],
  },
  callBack: false,
  showCallbackDialog: false,
  showHelpOthersDialog: false,
  searchInput: '',
  // avatarUrl: 'https://i.pinimg.com/474x/90/43/b9/9043b924beb61ed6630e63e43c066dbd.jpg',
  avatarUrl: null,
  defaultAvatarUrl: 'https://i.imgur.com/jNNT4LE.jpg',
  resAvatarUrl: 'https://i.pinimg.com/474x/90/43/b9/9043b924beb61ed6630e63e43c066dbd.jpg',
  fileTitle: null,
  files: {
    list: [],
  },
  showFilesDialg: false,
  // wavesAddress: '3PDCuncKyoMpVySA9QdAa5MFHxELD6HTD4n',
  // pageId: 'CNF-667e63eb-e58b-4636-a770-42bef07556e3',
  wavesAddress: '3PNGmsGxJzzKe6Nkw2Zau8DQ3793Kdsa2Qs',
  pageId: 'CNF-0c549f4e-0088-4604-943b-e43e59366e9d',
});

function indexReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATUS:
      return state.set('status', action.status);
    case UPDATE_COUNTDOWN_VALUE:
      return state.set('countdown', action.value);
    case UPDATE_TIME_LEFT_VALUE:
      return state.set('timeLeft', action.value);
    case UPDATE_STREAMING_TIME:
      return state.set('streamingTime', action.value);
    case UPDATE_TEXT_FIELD:
      return state.set(action.fieldName, action.fieldValue);
    case SEND_CHAT_MESSAGE: {
      const arr = state
        .getIn(['chat', 'list'])
        .push([null, state.get('chatInput')]);
      return state.setIn(['chat', 'list'], arr).set('chatInput', '');
    }
    case TOGGLE_DRAWER:
      return state.set('showDrawer', !state.get('showDrawer'));
    case TOGGLE_CALLBACK_DIALOG:
      return state.set('showCallbackDialog', !state.get('showCallbackDialog'));
    case TOGGLE_CALLBACK:
      return state.set('callBack', !state.get('callBack'));
    case TOGGLE_HELP_OTHERS_DIALOG:
      return state.set(
        'showHelpOthersDialog',
        !state.get('showHelpOthersDialog'),
      );
    case ON_FILE_DROP:
      return state
        .set('fileTitle', action.title)
        .set('showFilesDialg', true)
        .setIn(['files', 'list'], action.files);
    case TOGGLE_FILE_DIALOG:
      return state.set('showFilesDialg', !state.get('showFilesDialg'));
    default:
      return state;
  }
}

export default indexReducer;
