import {CHANGE_COUNT} from './actionTypes';

interface ITodoState {
  list: Array<string>
}

const defaultState: ITodoState = {
  list: []
}

export default (state: ITodoState = defaultState, action: any) => {
  if (action.type === CHANGE_COUNT) {
    state.list = action.list;
    return state;
  }
  return state;
}
