import React, { useState, useEffect } from 'react';
import { Form, Card, Input, Button, Spin, message } from 'antd';
import Modal from './Form';
import api from '@/api';
import { nicknameValidator, phoneValidator, numberPasswordValidator } from "@/utils/validator"

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const formTailLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
    offset: 8,
  },
};
const Detail = props => {
  // console.log(props);

  const { match: { params: { id } } } = props;
  const [modelChild, setModelChild] = useState(null); // 弹窗
  const [defaultData, setDefaultData] = useState({});
  const [isFinish, setIsFinish] = useState(false)
  const [loading, setLoading] = useState(false)
  const modelRef = ref => {
    setModelChild(ref);
  };

  const [form] = Form.useForm();

  /* 加载数据 */
  const initData = async () => {
    if (!Number(id)) {
      const r = await api.DoctorManage.genRoomId();
      if (r) {
        await setDefaultData({
          roomId: r,
        })
        setIsFinish(true)
      }
    } else {
      const r = await api.DoctorManage.findDoctorByRoomId({ id });
      if (r) {
        setDefaultData(r)
        setIsFinish(true)
      }
    }
  };

  /* 页面初始化 */
  useEffect(() => {
    initData()
  }, []);

  /* 表单提交 */
  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const r = await api.DoctorManage.saveRoom(values)
      if (r) {
        await setLoading(false)
        history.go(-1)
      } else {
        setTimeout(() => {
          setLoading(false)
        }, 500);
      }
    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <div>
      <div className="hl-back" onClick={() => history.go(-1)}>
        返回
      </div>
      <Card
        className="hl-form-card"
        title={<span className="hl-title-blue">添加医生</span>}
      >
        {isFinish ?
          <Form hideRequiredMark form={form} onFinish={handleSubmit} {...formItemLayout} initialValues={defaultData}>
            <Form.Item hidden name="id" >
              <Input />
            </Form.Item>
            <Form.Item label="房间号" name="roomId">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="昵称" validateTrigger={"onBlur"} name="nickName" rules={[
              { validator: nicknameValidator }
            ]}>
              <Input allowClear maxLength={8} placeholder="请输入昵称，最多8个字" />
            </Form.Item>
            <Form.Item label="手机号" validateTrigger={"onBlur"} name="mobile" rules={[
              { validator: phoneValidator }
            ]}>
              <Input allowClear maxLength={11} placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item validateTrigger={"onBlur"} label="密码" name="pwd"
              rules={[
                { validator: numberPasswordValidator }
              ]}>
              <Input.Password allowClear autoComplete="new-password" maxLength={6} placeholder="请设置6位数字密码" />
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                style={{ width: 100, marginRight: 10 }}
              >
                保存
            </Button>
              {
                Number(id) !== 0 && <Button
                  type="ghost"
                  style={{ width: 100 }}
                  onClick={() => {
                    modelChild.handleShow();
                  }}
                >
                  删除
               </Button>
              }
            </Form.Item>
          </Form> : <Spin ><div style={{ height: 400 }} className="hl-flex-1"></div></Spin >}
      </Card>
      <Modal
        title="删除医生"
        onRef={modelRef}
        request={api.DoctorManage.delDoctor}
        defaultData={defaultData}
        callback={() => { message.success("删除成功"); history.go(-1) }}
      >
        <div className="hl-modal">
          删除后该医生不能再进入此房间，确认删除吗？
        </div>
      </Modal>
    </div >
  );
};

export default Detail;
