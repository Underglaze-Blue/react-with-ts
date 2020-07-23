import {Colors} from '../../type'

const randomColorsIndex = (str: string, length: number): number => {
  const charCode = str.charCodeAt(0)
  const random = parseInt(String(Math.random() * (length / charCode)))
  const result = charCode % length + random * charCode
  return result > length ? Math.abs(length - result) : result
}

export const randomBackgroundColor = (name:string, colors: Array<Colors>): Array<Colors> => {
  const GradientStart = colors[randomColorsIndex(name.charAt(0), colors.length)]
  const GradientEnd = colors[randomColorsIndex(name.charAt(name.length - 1), colors.length)]
  return [GradientStart,GradientEnd]
}
