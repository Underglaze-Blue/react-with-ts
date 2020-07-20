import Instance from '../http/http'
export const fetchRandomImage = async (): Promise<object> => {
  const typeArr: Array<string> = ['acg', 'nature']
  const index: number = Math.round(Math.random())
  return Instance.get(`/random_img.php?type=bg&ctype=${typeArr[index]}&return=json`)
}
