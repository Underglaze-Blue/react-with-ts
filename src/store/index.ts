import { createStore, combineReducers } from 'redux';

import imageStore from "./gallery/imageReducer";
import colorStore from "./colors/colorReducer";

const reducer = combineReducers({
  imageStore,
  colorStore
})

const store = createStore(reducer);

export default store
