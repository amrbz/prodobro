/*
 *
 * Index actions
 *
 */

import { UPDATE_URL,UPDATE_KIDS_LIST } from './constants';

export function updateUrl(url) {
  return {
    type: UPDATE_URL,
    url,
  };
}

export function updateKidsUrl() {
  return {
    type: UPDATE_KIDS_LIST,
  };
}
