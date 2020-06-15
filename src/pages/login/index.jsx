import { Flex, InputItem, Button, Toast, List } from 'antd-mobile';
import { Layout, Nav, VerifyCode } from '@/components/mobile';
import http from '@/utils/http';
import { useHistory } from 'umi';
// import commStyles from '../common.less';
// import styles from './style.less';
import { createForm } from 'rc-form';
import { rcErrorsToString } from '@/components/mobile/common';
import { connect } from 'dva';
import { useState, useEffect } from 'react';
import { loginByQrcode } from '../api';

const Login = createForm()(props => {
  const history = useHistory();
  // useEffect(() => {
  //   if (document.cookie && /saasUserToken\=/.test(document.cookie)) {
  //     history.push('/m/agent');
  //   }
  // }, []);

  const [status, setStatus] = useState(0);
  useEffect(() => {
    // 扫码登录
    console.log(history.location);
    const query = history.location.query;
    if (query && query.code) {
      setStatus(2);
      loginByQrcode({
        query: { code: query.code },
      })
        .then(result => {
          props.dispatch({
            type: 'mobile/logout',
          });
          clearUserInfo();
          setUserInfo(result.data);
          history.replace('./agent');
        })
        .catch(err => {
          setStatus(1);
        });
    } else {
      setStatus(1);
    }
  }, []);

  const {
    getFieldProps,
    getFieldError,
    getFieldValue,
    validateFields,
    resetFields,
  } = props.form;

  function phoneFormat(value) {
    if (value && value.replace) {
      return value.replace(/\s/g, '');
    }
    return value;
  }

  function getPhone(callback) {
    validateFields(['phone'], (errors, values) => {
      const msg = rcErrorsToString(errors);
      callback({
        phone: phoneFormat(values.phone),
        error: msg,
      });
    });
  }

  function login() {
    validateFields((errors, values) => {
      if (errors) {
        Toast.info(rcErrorsToString(errors), 2, null, false);
        return;
      }
      // 登录
      http({
        url: '/login_by_code',
        method: 'post',
        params: {
          mobile: phoneFormat(values.phone),
          code: values.code,
        },
      }).then(result => {
        props.dispatch({
          type: 'mobile/logout',
        });
        clearUserInfo();
        setUserInfo(result.data);
        history.push('./agent');
      });
    });
  }

  function renderLogin() {
    return (
      <Layout nav={<Nav>登录</Nav>}>
        <div className={styles.container}>
          <Flex justify="center">
            <div className={commStyles.logo}></div>
          </Flex>
          <List className={styles.inputWrap}>
            <InputItem
              placeholder="手机号"
              type="phone"
              clear
              className={styles.input}
              {...getFieldProps('phone', {
                validateTrigger: 'onSubmit',
                onChange: val => {
                  if (val === '') {
                    resetFields(['phone']);
                  }
                },
                rules: [
                  { required: true, message: '手机号不能为空' },
                  {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '手机号格式不正确',
                    transform: phoneFormat,
                  },
                ],
              })}
              error={getFieldError('phone')}
              onErrorClick={() =>
                Toast.info(getFieldError('phone'), 2, null, false)
              }
            ></InputItem>
            <VerifyCode
              getPhone={getPhone}
              placeholder="验证码"
              type="number"
              clear
              {...getFieldProps('code', {
                validateTrigger: 'onSubmit',
                rules: [{ required: true, message: '验证码不能为空' }],
              })}
              error={getFieldError('code')}
              onErrorClick={() =>
                Toast.info(getFieldError('code'), 2, null, false)
              }
            ></VerifyCode>
          </List>
          <Button
            type="primary"
            onClick={login}
            className={
              commStyles.marginTop60 +
              ' ' +
              styles.primaryBg +
              ' ' +
              styles.loginBtn
            }
            disabled={!getFieldValue('phone') || !getFieldValue('code')}
          >
            登录
          </Button>
        </div>
      </Layout>
    );
  }

  if (status === 1) {
    return renderLogin();
  } else if (status === 2) {
    return <div>跳转中...</div>;
  } else {
    return <div></div>;
  }
});

export default connect(({ mobile }) => ({
  ...mobile,
}))(Login);

const keyArr = [
  'id',
  'userName',
  'realName',
  'mobile',
  'nickName',
  'role',
  'userTags',
  'channelCode',
  'channelName',
  'remark',
  'createAt',
];

export function setUserInfo(data) {
  keyArr.forEach(key => {
    localStorage.setItem(key, data[key]);
  });
}

export function getUserInfo() {
  const result = {};
  keyArr.forEach(key => {
    result[key] = localStorage.getItem(key);
  });
  return result;
}

export function clearUserInfo() {
  keyArr.forEach(key => {
    localStorage.removeItem(key);
  });
}
