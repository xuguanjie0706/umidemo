import request from '@/utils/request';

/**
 * @memberof module:apis
 * @description: 编辑服务时间提示
 * @function saveTimeDesc
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const saveTimeDesc = (data = {}) => {
  return request.post({
    url: 'serv_time/save_time_desc',
    data,
  });
};
/**
 * @memberof module:apis
 * @description: 查询服务时间提示
 * @function findTimeDesc
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const findTimeDesc = (data = {}) => {
  return request.post({
    url: 'serv_time/find_time_desc',
    data,
  });
};
