import Instance from '../http/http'
export const fetchRandomImage = async (): Promise<object> => {
  return Instance.get('/random_img.php?type=bg&ctype=nature&return=json')
}
