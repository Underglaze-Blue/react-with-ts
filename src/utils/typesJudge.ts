export function isDate(t: any) {
  if (typeof t === 'object' && t instanceof Date) return true
  return false
}

export function isNumber(t: any) {
  // return t === +t
  return typeof t === 'number' && !isNaN(t)
}
