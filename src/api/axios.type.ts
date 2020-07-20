import {AxiosRequestConfig, AxiosPromise} from 'axios'

// 基本返回数据格式
export interface BaseResponse<T> {
  data: T;
  message?: string;
}

export interface InstanceType {
  request?<T = any>(config: AxiosRequestConfig): Promise<BaseResponse<T>>

  get?<T = any>(url: string, data?: any): Promise<BaseResponse<T>>

  delete?<T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>>

  head?<T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>>

  options?<T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>>

  post?<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>>

  put?<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>>

  patch?<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>>
}
