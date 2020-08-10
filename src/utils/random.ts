export const randomNum = (min: number, max: number): number => {
  return Math.random() * (max - min) + min >> 0
}
