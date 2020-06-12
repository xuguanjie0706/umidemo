import React, { useEffect, useState } from 'react';
import FormItem from './components/FormItem/index';
import { List, InputItem, Picker, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import './index.less';
import CardRoom from './components/CardRoom';
import PeopleCardUpload from './components/PeopleCardUpload';
import AgentArea from './components/CustomFormItem/AgentArea';
import api from '@/api';
import { LEVEL_LIST } from '@/utils/enum';
import PickerArea from './components/PickerArea';

/* 测试数据 */
const defaultDataSource = {
  id: 574,
  channelCode: 'HALOVE_AGENT',
  channelName: null,
  agentType: 1,
  name: '132132',
  contact: '18906764745',
  contactAddr: '32132',
  idCard: '331081199407068514',
  unifiedCreditCode: null,
  idCardFrontUrl:
    'https://image02.halove.com/uploadfiles/2020/5/29/ead28bdb-3aff-41d2-adbd-3b9c2dd7d832.png#图片名字 (1).png#fileimages/pic.gif',
  idCardBackUrl:
    'https://image02.halove.com/uploadfiles/2020/5/29/fcaf0a47-e964-4ec5-8307-a4ba91dd107b.png#图片名字.png#fileimages/pic.gif',
  enterpriseBusinessLicense: null,
  bankName: '中国建设银行',
  bankBranch: '321321',
  bankCardNo: '6228481269040908170',
  bankAccountType: null,
  inviteUid: 158,
  inviteRole: 6,
  status: null,
  statusDesc: null,
  createAt: 1590478014000,
  updateAt: 1590717233000,
  passAgentAreaList: null,
  lastAgentApplyAreaList: [
    {
      agentAreaId: '140000-140400-140423',
      agentArea: '山西省-长治市-襄垣县',
      agentLevel: 1,
    },
  ],
  agentApplyAreaList: [
    {
      agentAreaId: '140000-140400-140423',
      agentArea: '山西省-长治市-襄垣县',
      agentLevel: 1,
    },
  ],
};

const BaseForm = props => {
  const {
    form,
    history,
    agentType,
    defaultData = { ...defaultDataSource },
  } = props;

  const isSarafi =
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  const {
    getFieldProps,
    getFieldError,
    getFieldDecorator,
    setFieldsValue,
  } = form;
  const [bankData, setbankdata] = useState({});
  const [loading, setLoading] = useState(false);
  const pr = document.documentElement.clientWidth / 375;
  const [bankList, setBankList] = useState([[]]);

  /* 加载数据 */
  const initLoad = async () => {
    const banks = await api.bank.list();
    const c = banks.map(item => {
      item.value = item.name;
      item.label = item.name;
      return item;
    });
    await setBankList([c]);
  };

  /* 初始化页面 */
  useEffect(() => {
    initLoad();
    defaultData.agentApplyAreaList = defaultData.lastAgentApplyAreaList;
    // console.log(defaultData);
    // console.log(defaultDataSource);
    // defaultData.id = defaultDataSource.id
    setbankdata({ name: defaultData.bankName });
    setFieldsValue(defaultData);
    // setFieldsValue(defaultDataSource);
  }, []);

  /* 提交 */
  const hangleClick = () => {
    setLoading(true);
    form.validateFields(async (error, value) => {
      console.log(value, error);
      if (!error) {
        try {
          const r = await api.agentApply.apply(value);
          if (r) {
            // Toast.success('提交成功');
            history.push('../success');
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
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

  /* 选择picker数据 */
  const PickerChange = value => {
    const d = bankList[0].find(item => item.name === value[0]);
    form.setFieldsValue({ bankName: value.toString() });
    setbankdata(d);
  };

  /*   设置表单数据 */
  const changeFormValue = (value, key) => {
    form.setFieldsValue({ [key]: value });
  };

  return (
    <div className="second">
      <CardRoom title={agentType === '1' ? '个人信息' : '企业信息'}>
        <div {...getFieldProps('id')}></div>
        {agentType === '1' ? (
          <>
            <FormItem label="姓名">
              <InputItem
                maxLength={20}
                disabled={Boolean(defaultData.name)}
                style={{ height: 100 }}
                placeholder="请输入姓名"
                {...getFieldProps('name', {
                  rules: [
                    {
                      asyncValidator: (rule, value) => {
                        return new Promise((resolve, reject) => {
                          if (
                            !/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_]){1,20}$/.test(
                              value,
                            )
                          ) {
                            // eslint-disable-next-line prefer-promise-reject-errors
                            reject('请输入正确的姓名或名称');
                          }
                          resolve();
                        });
                      },
                    },
                  ],
                })}
              />
            </FormItem>
            <FormItem label="身份证号">
              <InputItem
                disabled={Boolean(defaultData.idCard)}
                placeholder="请输入身份证号"
                style={{ height: 100 }}
                maxLength={18}
                {...getFieldProps('idCard', {
                  rules: [
                    {
                      asyncValidator: (rule, value) => {
                        return new Promise((resolve, reject) => {
                          if (
                            !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
                              value,
                            )
                          ) {
                            reject('请输入正确的身份证');
                          }
                          resolve();
                        });
                      },
                    },
                  ],
                })}
              />
            </FormItem>
            <div className="upload-form">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p className="upload-form-label">身份证照片</p>{' '}
                <span className="pic-desc"> 上传图片大小不超过2M</span>
              </div>

              <div
                {...getFieldProps('idCardFrontUrl', {
                  rules: [
                    {
                      required: true,
                      message: '请上传身份证正面',
                    },
                  ],
                })}
              ></div>
              <div
                {...getFieldProps('idCardBackUrl', {
                  rules: [
                    {
                      required: true,
                      message: '请上传身份证反面',
                    },
                  ],
                })}
              ></div>
              <div className="upload-form-body">
                {defaultData.idCardFrontUrl ? (
                  <>
                    <img
                      style={{ width: 163 * pr, height: 103 * pr }}
                      src={defaultData.idCardFrontUrl}
                      alt=""
                    />
                    <img
                      style={{ width: 163 * pr, height: 103 * pr }}
                      src={defaultData.idCardBackUrl}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <PeopleCardUpload
                      value={defaultData.idCardFrontUrl}
                      desc="身份证正面"
                      style={{ width: 163 * pr, height: 103 * pr }}
                      onChange={value =>
                        changeFormValue(value, 'idCardFrontUrl')
                      }
                    ></PeopleCardUpload>
                    <PeopleCardUpload
                      value={defaultData.idCardBackUrl}
                      desc="身份证反面"
                      style={{ width: 163 * pr, height: 103 * pr }}
                      onChange={value =>
                        changeFormValue(value, 'idCardBackUrl')
                      }
                    ></PeopleCardUpload>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <FormItem label="公司名称">
              <InputItem
                disabled={Boolean(defaultData.name)}
                style={{ height: 100 }}
                placeholder="请输入公司名称"
                {...getFieldProps('name', {
                  rules: [
                    {
                      required: true,
                      message: '公司名称不能为空',
                    },
                  ],
                })}
              />
            </FormItem>
            <FormItem label="社会统一信用代码/营业执照号">
              <InputItem
                disabled={Boolean(defaultData.unifiedCreditCode)}
                placeholder="请输入社会统一信用代码/营业执照号"
                {...getFieldProps('unifiedCreditCode', {
                  rules: [
                    {
                      required: true,
                      message: '社会统一信用代码/营业执照号不能为空',
                    },
                  ],
                })}
              />
            </FormItem>
            <div className="upload-form">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p className="upload-form-label">营业执照</p>{' '}
                <span className="pic-desc"> 上传图片大小不超过2M</span>
              </div>

              <div
                {...getFieldProps('enterpriseBusinessLicense', {
                  rules: [
                    {
                      required: true,
                      message: '请上传营业执照',
                    },
                  ],
                })}
              ></div>
              <div className="upload-form-body">
                {defaultData.enterpriseBusinessLicense ? (
                  <img
                    style={{ width: 98 * pr, height: 98 * pr }}
                    src={defaultData.enterpriseBusinessLicense}
                    alt=""
                  />
                ) : (
                  <PeopleCardUpload
                    value={defaultData.enterpriseBusinessLicense}
                    desc="营业执照"
                    style={{ width: 98 * pr, height: 98 * pr }}
                    onChange={value =>
                      changeFormValue(value, 'enterpriseBusinessLicense')
                    }
                  ></PeopleCardUpload>
                )}
              </div>
            </div>
          </>
        )}

        <FormItem label="联系地址">
          <InputItem
            style={{ height: 100 }}
            placeholder="请输入联系地址"
            {...getFieldProps('contactAddr', {
              rules: [
                {
                  required: true,
                  message: '联系地址不能为空',
                },
              ],
            })}
          />
        </FormItem>
      </CardRoom>
      <CardRoom title="银行卡信息">
        <FormItem label={agentType === '1' ? '银行卡号' : '对公账户'}>
          <InputItem
            type="number"
            maxLength={21}
            placeholder="银行卡仅用于代理分佣"
            {...getFieldProps('bankCardNo', {
              rules: [
                {
                  asyncValidator: (rule, value) => {
                    return new Promise((resolve, reject) => {
                      if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(value)) {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject('请输入正确的银行卡号');
                      }
                      resolve();
                    });
                  },
                },
              ],
            })}
          />
        </FormItem>

        <FormItem
          style={{ height: 100 }}
          label={agentType === '1' ? '开户银行' : '对公账户银行'}
          error={getFieldError('name1')}
          {...getFieldDecorator('bankName', {
            rules: [
              {
                required: true,
                message: '银行不能为空',
              },
            ],
          })}
        >
          <Picker
            data={bankList}
            cascade={false}
            extra=" "
            onChange={PickerChange}
          >
            <List.Item arrow="horizontal">
              {bankData.name ? (
                <span style={{ fontSize: 15 }}>{bankData.name}</span>
              ) : (
                <span className="placeholder">请选择银行</span>
              )}{' '}
            </List.Item>
          </Picker>
        </FormItem>

        <FormItem label="支行名称">
          <InputItem
            style={{ height: 100 }}
            placeholder="请输入支行名称"
            {...getFieldProps('bankBranch', {
              rules: [
                {
                  required: true,
                  message: '支行名称不能为空',
                },
              ],
            })}
          />
        </FormItem>
      </CardRoom>
      <CardRoom title="代理信息">
        {defaultData.passAgentAreaList && (
          <FormItem label="已代理区域">
            <div style={{ margin: '10px 0' }}>
              {defaultData.passAgentAreaList.map(item => (
                <p key={item.agentArea}>
                  {item.agentArea.replace(/-/g, '/')}{' '}
                  {LEVEL_LIST[item.agentLevel]}
                </p>
              ))}
            </div>
          </FormItem>
        )}
        <FormItem
          noborder={true}
          label="代理区域"
          {...getFieldDecorator('agentApplyAreaList')}
        >
          <div style={{ marginTop: 10 }}>
            {/* <AgentArea
              id={defaultData.id}
              value={defaultData.lastAgentApplyAreaList}
              onChange={value => changeFormValue(value, 'agentApplyAreaList')}
              fieldNames={{ label: 'agentAreaId', value: 'agentLevel' }}
            /> */}
            <PickerArea
              id={defaultData.id}
              value={defaultData.lastAgentApplyAreaList}
              onChange={value => changeFormValue(value, 'agentApplyAreaList')}
              fieldNames={{ label: 'agentAreaId', value: 'agentLevel' }}
            />
          </div>
        </FormItem>
      </CardRoom>

      <Button
        onClick={hangleClick}
        type="primary"
        style={{ marginTop: 30, marginBottom: isSarafi ? 100 : 0 }}
      >
        确认提交
      </Button>
    </div>
  );
};
export default createForm()(BaseForm);
