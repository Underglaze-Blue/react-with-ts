import { createStore } from 'redux';
import { IMAGE_OPERATION } from './actionTypes'
import { ImageUrl } from '../models'

export interface ImageOperationAction {
  type: IMAGE_OPERATION
  data?: ImageUrl
}

const defaultState: ImageUrl[] = ['https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302']

export const imageStore = createStore((state: ImageUrl[] = defaultState, action: ImageOperationAction): ImageUrl[] => {
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
})

export const GetImageList = imageStore.getState()

imageStore.subscribe(() => {
  console.log(imageStore.getState())
})

export const AddImage = (url: ImageUrl) => {
  imageStore.dispatch({
    type: IMAGE_OPERATION.ADD,
    data: url
  })
  return imageStore.getState()
}

export const RemoveImage = () => {
  imageStore.dispatch({
    type: IMAGE_OPERATION.REMOVE
  })
  return imageStore.getState()
}