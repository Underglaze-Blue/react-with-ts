import { COLORS_OPERATION } from './actionTypes'
import {Colors} from "../../type";

interface ColorInfoType extends Colors{
  gray: number
}

export interface ColorOperationAction extends ColorInfoType{
  type: COLORS_OPERATION
}

const defaultState: ColorInfoType = {
  CMYK: [4,5,18,0],
  RGB: [249,244,220],
  hex: "#f9f4dc",
  name: "乳白",
  pinyin: "rubai",
  gray: 242.86
}

const colorStore = (state: ColorInfoType = defaultState, action: ColorOperationAction): ColorInfoType => {
  switch (action.type) {
    case COLORS_OPERATION.SET_COLOR :
      Object.keys(state).forEach((key) => {
        // state[key as ColorInfoType] = action[key]
      })
      break
    default :
      return state
  }
  return state
}

export default colorStore
