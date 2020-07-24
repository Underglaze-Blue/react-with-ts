import { IMAGE_OPERATION } from './actionTypes'
import { ImageUrl } from '../../models'

export interface ImageOperationAction {
  type: IMAGE_OPERATION
  data?: ImageUrl
}

const defaultState: ImageUrl[] = []

const imageStore = (state: ImageUrl[] = defaultState, action: ImageOperationAction): ImageUrl[] => {
  switch (action.type) {
    case IMAGE_OPERATION.ADD :
      state.push(action.data as string)
      break
    case IMAGE_OPERATION.REMOVE :
      state.pop()
      break
    default :
      return state
  }
  return state.concat([])
}

export default imageStore
