/*
 *
 * Index actions
 *
 */

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

export function updateStatus(status) {
  return {
    type: UPDATE_STATUS,
    status,
  };
}

export function updateCountdownValue(value) {
  return {
    type: UPDATE_COUNTDOWN_VALUE,
    value,
  };
}

export function updateTimeLeftValue(value) {
  return {
    type: UPDATE_TIME_LEFT_VALUE,
    value,
  };
}

export function updateStreamingTime(value) {
  return {
    type: UPDATE_STREAMING_TIME,
    value,
  };
}

export function updateTextField(fieldName, fieldValue) {
  return {
    type: UPDATE_TEXT_FIELD,
    fieldName,
    fieldValue,
  };
}

export function sendMessage() {
  return {
    type: SEND_CHAT_MESSAGE,
  };
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export function toggleCallBackDialog() {
  return {
    type: TOGGLE_CALLBACK_DIALOG,
  };
}

export function toggleCallback() {
  return {
    type: TOGGLE_CALLBACK,
  };
}

export function toggleHelpOthersDialog() {
  return {
    type: TOGGLE_HELP_OTHERS_DIALOG,
  };
}

export function onFileDrop(title, files) {
  return {
    type: ON_FILE_DROP,
    title,
    files,
  };
}

export function toggleFileDialog() {
  return {
    type: TOGGLE_FILE_DIALOG,
  };
}
