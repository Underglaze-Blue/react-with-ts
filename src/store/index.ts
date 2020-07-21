import { createStore, combineReducers } from 'redux';

import imageStore from "./image-reducer";

const reducer = combineReducers({
  imageStore
})

const store = createStore(reducer);

export default store
