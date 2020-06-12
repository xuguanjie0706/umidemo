import React, { useState, useEffect } from 'react';
import style from './index.less';
import { createForm } from 'rc-form';
import { List, InputItem, Picker, Button, Toast } from 'antd-mobile';
import FormItem from './components/FormItem/index';
import { cdkeyPkgList } from '../api';
import api from '@/api';

const AddAgent = props => {
  const { form } = props;
  const { getFieldProps, getFieldError, getFieldDecorator } = form;
  const [pkgList, setPkgList] = useState([[]]);
  const [pkgData, setPkgdata] = useState({});

  useEffect(() => {
    initLoad();
  }, []);

  const initLoad = async () => {
    try {
      const { code, data } = await cdkeyPkgList({});
      if (code === 200) {
        const cd = data.map(item => {
          item.value = item.pkgId;
          item.label = item.pkgName;
          return item;
        });
        setPkgList([cd]);
      }
    } catch (error) {}
  };

  const handleClick = e => {
    form.validateFields((error, value) => {
      console.log(value, error);
      // id: props.editItem.id,
      //   groupId: props.editItem.groupId,
      //     issuerMobile: values.phone,
      //       issuerName: values.name,
      if (!error) {
        api.chnerIssuer.Create(value).then(r => {
          if (r) {
            Toast.success('提交成功');
            history.go(-1);
          }
        });
      } else {
        const ErrorList = Object.values(form.getFieldsError());
        for (let i = 0; i < ErrorList.length; i++) {
          if (ErrorList[i]) {
            Toast.fail(ErrorList[i], 1);
            break;
          }
        }
      }

      // if (!error)
      // setErrorData(errObj)
    });
  };

  const PickerChange = value => {
    const d = pkgList[0].find(item => item.pkgId === value[0]);
    form.setFieldsValue({ pkgId: value.toString() });
    setPkgdata(d);
  };

  return (
    <div className={style.addAgent}>
      <h3 className={style.title}>请填写以下信息</h3>
      <p className={style.desc}>正在将权益划转至你的代理，请谨慎处理。</p>
      <div className={style.form}>
        {/* <List> */}
        <FormItem
          // error={getFieldError("name1")}
          label="选择套餐"
          {...getFieldDecorator('pkgId', {
            rules: [
              {
                required: true,
                message: '请选择套餐',
              },
            ],
          })}
        >
          <Picker
            data={pkgList}
            title="选择套餐"
            cascade={false}
            extra=" "
            onChange={PickerChange}
          >
            <List.Item arrow="horizontal">
              {pkgData.pkgName || (
                <span className="placeholder">请选择套餐</span>
              )}{' '}
            </List.Item>
          </Picker>
        </FormItem>
        <FormItem
          label="姓名"
          // error={getFieldError("name2")}
        >
          <InputItem
            {...getFieldProps('issuerName', {
              rules: [
                {
                  required: true,
                  message: '姓名不能为空',
                },
              ],
            })}
            style={{ padding: 0 }}
            className={style.inputFrom}
            placeholder="请输入姓名"
            moneyKeyboardAlign="left"
          ></InputItem>
        </FormItem>
        <FormItem
          label="手机号"
          // error={getFieldError("name3")}
        >
          <InputItem
            {...getFieldProps('issuerMobile', {
              rules: [
                {
                  asyncValidator: (rule, value) => {
                    return new Promise((resolve, reject) => {
                      if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value)) {
                        reject('请输入正确的手机号');
                      }
                      resolve();
                    });
                  },
                },
              ],
            })}
            style={{ padding: 0 }}
            className={style.inputFrom}
            placeholder="请输入名称"
            moneyKeyboardAlign="left"
          ></InputItem>
        </FormItem>
        <FormItem
          label="数量"
          // error={getFieldError("money3")}
          extra={`剩余${pkgData.amount || 0}`}
        >
          <InputItem
            {...getFieldProps('amount', {
              rules: [
                {
                  asyncValidator: (rule, value) => {
                    return new Promise((resolve, reject) => {
                      if (!value) {
                        reject('不能为空');
                      }
                      if (Number(value) > Number(pkgData.amount || 0)) {
                        reject('不能超过剩余数量');
                      }
                      resolve();
                    });
                  },
                },
              ],
            })}
            style={{ padding: 0 }}
            className={style.inputFrom}
            placeholder="请输入数量"
            moneyKeyboardAlign="left"
          ></InputItem>
        </FormItem>
        <div className="flex-button">
          <Button
            onClick={() => {
              history.go(-1);
            }}
            type="ghost"
            inline
            style={{ marginRight: '4px' }}
            className="am-button-borderfix"
          >
            取消
          </Button>
          <Button
            onClick={handleClick}
            type="primary"
            inline
            style={{ marginRight: '4px' }}
          >
            确认
          </Button>
        </div>
      </div>
    </div>
  );
};

export default createForm()(AddAgent);
