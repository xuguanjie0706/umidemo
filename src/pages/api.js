import http from '@/utils/http';

/**
 * @name addSubAgent
 * @description 添加代理人
 * @param {*} params
 */
export async function addSubAgent({ body, query }) {
  return http.postRequestBody('/chner_issuer/create', body, query);
}

/**
 * @name editSubAgent
 * @description 修改代理人
 * @param {*} params
 */
export async function editSubAgent({ body, query }) {
  return http.postRequestBody('/chner_issuer/update', body, query);
}

/**
 * @name distributionStatistics
 * @description 代理人分发情况统计
 * @param {*} params
 */
export async function distributionStatistics({ body, query }) {
  return http.postRequestBody('/issuer/distribution_statistics', body, query);
}

/**
 * @name rightsStatistics
 * @description 代理人权益套餐统计
 * @param {*} params
 */
export async function rightsStatistics({ body, query }) {
  return http.postRequestBody('/issuer/rights_statistics', body, query);
}

/**
 * @name cardIssueRecord
 * @description 发卡记录查询
 * @param {} params
 */
export async function cardIssueRecord({ body, query }) {
  return http.postRequestBody('/issuer/card_issue_record', body, query);
}

/**
 * @name allocateToUser
 * @description 续期/分发给用户-（渠道方/发卡人）
 * @param {*} params
 */
export async function allocateToUser({ body, query }) {
  return http.postRequestBody('/cdkey/allocate_2_user', body, query);
}

/**
 * @name chnerIssuerList
 * @description 发卡人列表
 * @param {*} param0
 */
export async function chnerIssuerList({ body, query }) {
  return http.postRequestBody('/chner_issuer/list', body, query);
}

/**
 * @name cdkeyPkgList
 * @description 套餐列表-渠道方/发卡人
 * @param {*} param0
 */
export async function cdkeyPkgList({ body, query }) {
  return http.postRequestBody('/cdkey/pkg_list', body, query);
}

/**
 * @name issuerUserList
 * @description 根据手机号或昵称搜索用户信息
 * @param {*} param0
 */
export async function issuerUserList({ body, query }) {
  return http.postRequestBody('/issuer/user_list', body, query);
}

/**
 * @name logout
 * @description 退出登录
 * @param {*} param0
 */
export async function logout({ body, query }) {
  return http.postRequestBody('/logout', body, query);
}

/**
 * @name loginByQrcode
 * @description 登录 扫码 一次有效
 * @param {*} param0
 */
export async function loginByQrcode({ body, query }) {
  return http.postRequestBody('/login_by_qrcode', body, query);
}

/**
 * @name issuerUserInfoList
 * @description 渠道用户列表
 */
export async function issuerUserInfoList({ body, query }) {
  return http.postRequestBody('/issuer_user_info/list', body, query);
}

/**
 * @name issuerUserInfoUpdate
 * @description 渠道用户修改
 */
export async function issuerUserInfoUpdate({ body, query }) {
  return http.postRequestBody('/issuer_user_info/update', body, query);
}

/**
 * @name groupList
 * @description 分组列表
 */
export async function groupList({ body, query }) {
  return http.postRequestBody('/group/list', body, query);
}

/**
 * @name groupList
 * @description 分组保存
 */
export async function groupSave({ body, query }) {
  return http.postRequestBody('/group/save', body, query);
}

/**
 * @name groupList
 * @description 标签列表
 */
export async function tagList({ body, query }) {
  return http.postRequestBody('/tag/list', body, query);
}

/**
 * @name groupList
 * @description 标签保存
 */
export async function tagSave({ body, query }) {
  return http.postRequestBody('/tag/save', body, query);
}
