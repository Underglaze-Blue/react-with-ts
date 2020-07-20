import axios from 'axios'
import { ImageUrl } from '../models'

export const fetchRandomImage = async (): Promise<ImageUrl> => {
  return axios.get('https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302')
}