import React, { useState, useEffect } from 'react';
import FormItem from './components/FormItem/index';
import { List, InputItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import './index.less';
import CodeButton from './components/CodeButton';
import api from '@/api';
import { Radio } from 'antd';
// import PickerArea from "./components/PickerArea"

const defaultdata = {
  // contact: '18906764742',
  // code: '1111',
};

const BaseForm = props => {
  const { form, inviteUid, setStep, setAgentType, setDefaultData } = props; // 传入数据
  const {
    getFieldProps,
    getFieldError,
    getFieldDecorator,
    getFieldValue,
  } = form; // form方法
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  const options = [
    { label: '个人', value: '1' },
    { label: '企业', value: '2' },
  ];

  /* 页面加载 */
  useEffect(() => {
    /* 初始化账号密码测试用 */
    form.setFieldsValue(defaultdata);
  }, []);

  /* 提交 */
  const hangleClick = () => {
    form.validateFields(async (error, value) => {
      console.log(value, error);
      if (!error) {
        const r = await api.agentApply.applyFirst(value);
        console.log(r);
        const { code, msg, data } = r;
        if (code === 200) {
          await setDefaultData(data);
          await setAgentType(getFieldValue('agentType'));
          setStep(1);
        } else {
          await setMsg(msg);
          setVisible(true);
        }
      } else {
        const ErrorList = Object.values(form.getFieldsError());
        for (let i = 0; i < ErrorList.length; i++) {
          if (ErrorList[i]) {
            Toast.fail(ErrorList[i]);
            break;
          }
        }
      }
    });
  };
  return (
    <div className="base">
      <div
        {...getFieldProps('inviteUid', {
          initialValue: decodeURIComponent(inviteUid),
          rules: [
            {
              required: true,
              message: '不能为空',
            },
          ],
        })}
      />
      <FormItem label="代理商类型">
        <div className="radio-room">
          <Radio.Group
            {...getFieldProps('agentType', {
              initialValue: '1',
            })}
            options={options}
          />
        </div>
      </FormItem>
      <FormItem label="联系电话">
        <InputItem
          type="number"
          maxLength={11}
          placeholder="请输入手机号码"
          {...getFieldProps('contact', {
            rules: [
              {
                asyncValidator: (rule, value) => {
                  return new Promise((resolve, reject) => {
                    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                      reject('请输入正确的手机号');
                    }
                    resolve();
                  });
                },
              },
            ],
          })}
        />
      </FormItem>
      <FormItem label="验证码">
        <div style={{ position: 'relative' }}>
          <InputItem
            type="number"
            maxLength={4}
            placeholder="请输入验证码"
            {...getFieldProps('code', {
              rules: [
                {
                  required: true,
                  message: '验证码不能为空',
                },
              ],
            })}
          />
          <CodeButton
            request={api.agentApply.sendSmsCode}
            form={form}
            delay={60}
            style={{ position: 'absolute', right: 0, top: 10 }}
          />
        </div>
      </FormItem>

      {/* <PickerArea></PickerArea> */}

      <Button onClick={hangleClick} type="primary" style={{ marginTop: 30 }}>
        下一步
      </Button>

      <Modal
        visible={visible}
        transparent
        footer={[{ text: '我知道了', onPress: () => setVisible(false) }]}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            minHeight: 50,
            justifyContent: 'center',
          }}
        >
          <span style={{ whiteSpace: 'pre-line', color: '#333', fontSize: 15 }}>
            {msg}
          </span>
        </div>
      </Modal>
    </div>
  );
};
export default createForm()(BaseForm);
