import Instance from '../http/http'
export const fetchRandomImage = async (): Promise<object> => {
  const typeArr: Array<string> = ['acg', 'nature']
  const index: number = Math.round(Math.random())
  return Instance.get(`/api/random_img.php?type=bg&ctype=${typeArr[index]}&return=json`)
}

export const fetchPoetry = async (): Promise<object> => {
  return Instance.get('https://v1.jinrishici.com/all.json')
}

export const fetchColors = async (): Promise<object> => {
  return Instance.get('./data/colors.json')
}
