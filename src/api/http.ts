// 获取一个 Ajax 实例
import request from "./axios.config";
import {Axios, BaseResponse} from "./axios.type";
import {AxiosPromise} from "axios";


// Ajax 实体
const instance: Axios = {
  get: function <T>(url: string, data: any): Promise<BaseResponse<T>> {
    return request<T>({
      url,
      method: 'get',
      data
    });
  },
  post: function <T>(url: string, data: object = {}, config: object = {}): Promise<BaseResponse<T>> {
    return request<T>(
      Object.assign({}, config, {
        method: 'POST',
        url: url,
        data: data
      })
    );
  },
};

export default instance;
