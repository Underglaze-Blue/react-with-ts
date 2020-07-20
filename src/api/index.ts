import instance from './http'
import { ImageUrl } from '../models'

export const fetchRandomImage =  () => {
  return instance.get('/random_img.php?type=bg&ctype=nature&return=json')
}
