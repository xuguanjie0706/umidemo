import axios from 'axios';
import { Toast } from 'antd-mobile';
import { handlePost } from '@/utils/secret.js';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    Toast.fail(errorText);
  } else if (!response) {
    Toast.fail('您的网络发生异常，无法连接服务器');
  }

  return response;
};

const instance = axios.create({
  baseURL: '/v1/starry/saas/',
  timeout: 5000,
});

class $request {
  static async init({
    url,
    params,
    headers: defaultHeader,
    data,
    method = 'get',
    onUploadProgress,
    isNotice = true,
    isEncrypt = false,
  }) {
    let headers = defaultHeader;
    if (isEncrypt) {
      const encryptDatas = handlePost(data);
      const defaultHeaders = {
        randomKey: encryptDatas.randomKey,
        sign: encryptDatas.sign,
        timestamp: encryptDatas.timestamp,
      };
      headers = {
        ...defaultHeaders,
        ...defaultHeader,
      };
    }
    try {
      const r = await instance.request({
        url,
        params,
        headers,
        data,
        method,
        onUploadProgress,
      });
      const { data: resultData } = r;
      const { code, success, data: result, msg } = resultData;

      // console.log(resultData);

      if (isNotice) {
        if (code === 200 && success) {
          return result || true;
        }
        Toast.fail(msg);
      } else {
        return resultData;
      }
      return false;
    } catch (error) {
      console.log(error);

      errorHandler(error);
      return false;
    }
  }

  static post({ ...option }) {
    return this.init({
      ...option,
      method: 'POST',
    });
  }

  static get({ ...option }) {
    return this.init({
      ...option,
      method: 'get',
    });
  }
}

export default $request;