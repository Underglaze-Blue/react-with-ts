import {COLORS_OPERATION} from './actionTypes';
import {Colors} from "../../type";

interface ColorInfoType extends Colors{
  gray: number
}

export const setColorInfo = (info: ColorInfoType) => {
  return {
    type: COLORS_OPERATION.SET_COLOR,
    info
  }
}

export default {
  setColorInfo
}

