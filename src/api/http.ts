// 获取一个 Ajax 实例
import request from "./axios.config";
import {InstanceType} from "./axios.type";

// Ajax 实体
const instance: InstanceType = {
  get: function (url, params = {}) {
    return request({
      url,
      method: 'get',
      params
    });
  },
  post: function (url, data = {}) {
    return request({
      url,
      method: 'post',
      data
    });
  },
};

export default instance;
