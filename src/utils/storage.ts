import {isDate, isNumber} from './typesJudge'
import {LocalStorageType} from "../type";

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
    localStorage.setItem(name, JSON.stringify(saveData))
  }
  get (name: string) {
    let dataJSON = localStorage.getItem(name)
    if(this.isNotExist(dataJSON)) {
      return null
    }
    let storageData = JSON.parse(dataJSON as string)
    if(this.isNotExist(storageData['__period__'])) {
      return storageData.data
    }
    if(this.isOutPeriod(storageData)) {
      this.remove(name)
      storageData.data = null
    }
    return storageData.data
  }
  clear () {
    localStorage.clear()
  }
  remove (name: string) {
    localStorage.removeItem(name)
  }
}

export default LocalData

