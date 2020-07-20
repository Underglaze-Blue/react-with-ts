import axios from './http'

export const fetchRandomImage =  () => {
  return axios.get('/random_img.php?type=bg&ctype=nature&return=json')
}
