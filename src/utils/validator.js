/* 手机号验证 */
export const phoneValidator = (rule, value) => {
  if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('请输入正确的手机号');
  }
  return Promise.resolve();

};


/* 身份证验证 */
export const peopleCardValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (
      !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
        value
      )
    ) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('请输入正确的身份证');
    }
    resolve();
  });
};

/* 银行卡验证 */
export const bankCardValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (
      !/^([1-9]{1})(\d{15}|\d{18})$/.test(
        value
      )
    ) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('请输入正确的银行卡号');
    }
    resolve();
  });
};
/* 姓名验证 */
export const nameValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (
      !/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_]){1,20}$/.test(
        value
      )
    ) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('请输入正确的姓名或名称')
    }
    resolve();
  });
};

/* 昵称验证 */
export const nicknameValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (
      !/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){1,8}$/.test(
        value
      )
    ) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('只能输入汉字，且不能超过16个')
    }
    resolve();
  });
};


/* 昵称验证 */
export const numberPasswordValidator = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (
      !/^([0-9]){6}$/.test(
        value
      )
    ) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('密码只能6位，且只能是数字')
    }
    resolve();
  });
};
