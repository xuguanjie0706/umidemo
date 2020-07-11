import request from '@/utils/request';

/**
 * @memberof module:apis
 * @description: 预约
 * @function booking
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const booking = (data = {}) => {
  return request.post({
    url: 'booked_serv/booking',
    data,
  });
};

/**
 * @memberof module:apis
 * @description: 取消预约
 * @function cancelBookedOrder
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const cancelBookedOrder = (data = {}) => {
  return request.post({
    url: 'booked_serv/cancel_booked_order',
    data,
  });
};

/**
 * @memberof module:apis
 * @description: 预约单列表
 * @function listBookedOrder
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const listBookedOrder = (data = {}) => {
  return request.post({
    url: 'booked_serv/list_booked_order',
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
    url: 'booked_serv/gen_room_id',
    data,
  });
};

/**
 * @memberof module:apis
 * @description: 根据id查询预约单信息
 * @function findOrderByRoomId
 * @param {type}  传入参数
 * @author 周洋(后端对接人名称)
 * @see {@link http://oms2.swagger.beta.halove.org/v1/jzky/swagger-ui.html#/}
 * @return {object} 接口对象
 */
export const findOrderByRoomId = (data = {}) => {
  return request.post({
    url: 'booked_serv/find_order_by_room_id',
    data,
  });
};

