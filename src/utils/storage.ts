import {isDate, isNumber} from './typesJudge'
import {LocalStorageType} from "../type";

// localstorage
/*
* save fn
* get fn
* clear fn
* remove fn
* name: 储存名
* data: 数据
* period： 过期时间，不设置默认永久
* */
class LocalData implements LocalStorageType{
  handlePeriod: (period: number | Date, now: Date) => number | null
  isNotExist: (data: any) => boolean
  isOutPeriod: (data: any) => boolean
   constructor() {
    this.handlePeriod =  (period: number | Date, now: Date) => {
      if (isDate(period) && +period > +now) {
        return (+period) - (+now)
      } else if (isNumber(period) && period > 0) {
        return period as number
      } else {
        return null
      }
    }
    this.isNotExist = (data: any) => {
      return data === null || typeof data === 'undefined'
    }
    this.isOutPeriod = (data: any) => {
      if (+new Date() - data['__writeTime__'] > data['__period__']) return true
      return false
    }
   }


  save (name: string, data: any, period?: number | Date) {
    const now = new Date()
    const saveData = {
      data,
      ['__writeTime__']: +now,
      ['__period__']: period ? this.handlePeriod(period, now) : null
    }
    localStorage.setItem(`${name}__with__timeliness__`, JSON.stringify(saveData))
  }
  get (name: string) {
    if (!this.isNotExist(localStorage.getItem(name))) return localStorage.getItem(name);
    let dataJSON = localStorage.getItem(`${name}__with__timeliness__`)
    if(this.isNotExist(dataJSON)) {
      return null
    }
    let storageData = JSON.parse(dataJSON as string)
    if(this.isNotExist(storageData['__period__'])) {
      return storageData.data
    }
    if(this.isOutPeriod(storageData)) {
      this.remove(`${name}__with__timeliness__`)
      storageData.data = null
    }
    return storageData.data
  }
  clear () {
    localStorage.clear()
  }
  remove (name: string) {
    localStorage.removeItem(`${name}__with__timeliness__`)
    localStorage.removeItem(name)
  }
}

export default LocalData

