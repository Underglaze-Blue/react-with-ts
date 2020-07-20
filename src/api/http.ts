// 获取一个 Ajax 实例
import request from "./axios.config";
import {InstanceType} from "./axios.type";

// Ajax 实体
const instance: InstanceType = {
  get: function (url, data) {
    return request({
      url,
      method: 'get',
      data
    });
  },
  post: function (url, data = {}, config = {}) {
    return request(
      Object.assign({}, config, {
        method: 'POST',
        url: url,
        data: data
      })
    );
  },
};

export default instance;
