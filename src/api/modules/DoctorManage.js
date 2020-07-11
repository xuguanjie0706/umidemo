import request from '@/utils/request';

/**
 * @memberof module:apis
 * @description: 删除医生
 * @function delDoctor
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const delDoctor = (data = {}) => {
  return request.post({
    url: 'doctor_manage/del_doctor',
    data,
  });
};

/**
 * @memberof module:apis
 * @description: 根据id查询医生信息
 * @function findDoctorByRoomId
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const findDoctorByRoomId = (data = {}) => {
  return request.post({
    url: 'doctor_manage/find_doctor_by_room_id',
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
