
function generateArray(length: number, suffix: string, prefix = '') {
  return Array.from({length}, (v, k) => `${prefix} ${k + 1} ${suffix}`)
}

export const _360DEGREE = 360

const MONTHS = generateArray(12, '月')

const WEEKS = generateArray(7, '', '周')

const DAYS = generateArray(31, '号')

const HOURS = generateArray(24, '时')

const MINS = generateArray(60, '分')

const SECS = generateArray(60, '秒')

export {
  SECS,
  MINS,
  HOURS,
  DAYS,
  WEEKS,
  MONTHS
}
