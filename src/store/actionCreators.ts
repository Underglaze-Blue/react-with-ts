import {CHANGE_COUNT} from './actionTypes';

export const changeCount = (list: Array<string>) => {
  return {
    type: CHANGE_COUNT,
    list
  }
}
