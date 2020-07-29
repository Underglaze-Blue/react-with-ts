// 防抖(ts)
export default class Debounced {
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  public use = (func: Function, delay: number, immediate = false): Function => {
    let timer: number | undefined
    return ( ...args: any) => {
      if (immediate) {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        func.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
        // eslint-disable-next-line no-param-reassign
        immediate = false
        return
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        func.apply(this, args)
      }, delay)
    }
  }
}
