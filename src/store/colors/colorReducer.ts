import { COLORS_OPERATION } from './actionTypes'
import { ColorInfoType} from '../../type'

export interface ColorOperationAction{
  type: COLORS_OPERATION,
  info: ColorInfoType
}

const defaultState: ColorInfoType = {
  CMYK: [4, 5, 18, 0],
  RGB: [249, 244, 220],
  hex: '#f9f4dc',
  name: '乳白',
  pinyin: 'rubai',
  gray: 242.86
}

const colorStore = (state: ColorInfoType = defaultState, action: ColorOperationAction): ColorInfoType => {
  switch (action.type) {
    case COLORS_OPERATION.SET_COLOR :
      // eslint-disable-next-line no-case-declarations
      const {...arg} = action.info
      // eslint-disable-next-line no-param-reassign
      state = arg
      // Object.keys(state).forEach((key) => {
      //   state[key] = action.info[key]
      // })
      break
    default :
      return state
  }
  return state
}

export default colorStore
