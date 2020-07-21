import {IMAGE_OPERATION} from './actionTypes';
import {ImageUrl} from '../models'
export const AddImage = (url: ImageUrl) => {
  return {
    type: IMAGE_OPERATION.ADD,
    data: url
  }
}

export const RemoveImage = () => {
  return {
    type: IMAGE_OPERATION.REMOVE
  }
}

export default {
  AddImage,
  RemoveImage
}

