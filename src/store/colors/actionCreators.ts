import {COLORS_OPERATION} from './actionTypes';
import {ColorInfoType} from "../../type";

export const setColorInfo = (info: ColorInfoType) => {
  return {
    type: COLORS_OPERATION.SET_COLOR,
    info
  }
}

export default {
  setColorInfo
}

