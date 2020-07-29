// 获取一个 Ajax 实例
import request from './axios.config'
import {BaseResponse, InstanceType} from './axios.type'

// Ajax 实体
class Instance implements InstanceType{
  get <T>(url: string, params: object = {}): Promise<BaseResponse<T>> {
    return request({
      url,
      method: 'get',
      params
    })
  }
  post <T>(url: string, data:object = {}): Promise<BaseResponse<T>> {
    return request({
      url,
      method: 'post',
      data
    })
  }
}

export default new Instance()
