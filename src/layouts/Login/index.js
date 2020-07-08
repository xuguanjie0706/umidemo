import React, { useEffect } from 'react';
import './index.less';
import { Form, Input, Button, Checkbox } from 'antd';
import img from './assets/img.png';
import loginIcon from './assets/icon_logo.png';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginView = props => {
  const { history } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    const password = localStorage.getItem('hl-password');
    if (password) {
      const username = localStorage.getItem('hl-username');
      form.setFieldsValue({
        password: atob(password),
        username: username,
      });
    }
  }, []);
  const onFinish = values => {
    console.log('Success:', values);
    if (values.remember) {
      localStorage.setItem('hl-username', values.username);
      localStorage.setItem('hl-password', btoa(values.password));
    } else {
      localStorage.clear();
    }
    history.push('/');
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div>
          <img className="loginImg" src={img} alt="" />
        </div>
        <div className="loginRoom">
          <img className="loginIcon" src={loginIcon} alt="" />
          <Form
            // {...layout}
            form={form}
            style={{ width: 320 }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* <h2 className="hl-text-center">用户登录</h2> */}

            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入你的账号!' }]}
            >
              <Input
                size="large"
                style={{ width: '100%' }}
                prefix={<UserOutlined style={{ color: '#ccc' }} />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入你的密码!' }]}
            >
              <Input.Password
                visibilityToggle={false}
                style={{ width: '100%' }}
                size="large"
                prefix={<LockOutlined style={{ color: '#ccc' }} />}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button size="large" block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
