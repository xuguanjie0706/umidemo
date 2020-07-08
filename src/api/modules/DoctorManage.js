import request from '@/utils/request';

/**
 * @memberof module:apis
 * @description: 删除房间
 * @function delRoom
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const delRoom = (data = {}) => {
  return request.post({
    url: 'doctor_manage/del_room',
    data,
  });
};

/**
 * @memberof module:apis
 * @description: 生成房间id
 * @function genRoomId
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const genRoomId = (data = {}) => {
  return request.post({
    url: 'doctor_manage/gen_room_id',
    data,
  });
};

/**
 * @memberof module:apis
 * @description: 医生列表
 * @function listDoctor
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const listDoctor = (data = {}) => {
  return request.post({
    url: 'doctor_manage/list_doctor',
    data,
  });
};

/**
 * @memberof module:apis
 * @description: 添加/更新房间信息
 * @function saveRoom
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const saveRoom = (data = {}) => {
  return request.post({
    url: '/doctor_manage/save_room',
    data,
  });
};
