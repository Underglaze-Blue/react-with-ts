import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import {BaseResponse} from "./axios.type";
// 接口前缀
const BASE_URL = '';

// axios 配置实例
const instance: AxiosInstance = Axios.create({
  baseURL: `${BASE_URL}`
});
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return {
      ...config,
      params: {
      // 此处注意，你的`params`应该是个对象，不能是其他数据类型
        ...(config.params || {}),
        _: +new Date()
      }
    }
  },
  error => {
    return Promise.resolve(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return Promise.resolve(response);
    } else {
      return Promise.reject('response 不存在');
    }
  },
  (error) => {
    console.log(error);
    return Promise.resolve({
      data: {
        success: false,
        msg: typeof error === 'string' ? error : error.message,
        ...error
      }
    });
  }
);

const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    instance.request<BaseResponse<T>>(config).then((response) => {
      const data = response.data;
      if (response.status === 200) {
        resolve(data);
      } else {
        console.log(data.message);
        reject(data);
      }
    });
  });
};

export default request
