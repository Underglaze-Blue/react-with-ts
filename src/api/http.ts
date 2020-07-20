// 获取一个 Ajax 实例
import request from "./axios.config";
import {InstanceType} from "./axios.type";

// Ajax 实体
const axios: Pick<InstanceType, "get" | "post"> = {
  get: function (url, data) {
    return request({
      url,
      method: 'get',
      data
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

export default axios;
