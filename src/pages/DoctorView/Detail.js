import React, { useState, useEffect } from 'react';

import { Form, Card, Input, Button } from 'antd';
import Modal from './Form';
import api from '@/api';

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
  console.log(props);
  const [modelChild, setModelChild] = useState(null); // 弹窗
  // const [roomId, setRoomId] = useState(0)
  const [defaultData, setDefaultData] = useState({});
  const modelRef = ref => {
    setModelChild(ref);
  };

  const [form] = Form.useForm();

  /* 加载数据 */
  const initData = async () => {
    const r = await api.DoctorManage.genRoomId();
  };
  /* 页面初始化 */
  useEffect(() => {
    // initData()
  }, []);

  /* 表单提交 */
  const handleSubmit = values => {
    api.DoctorManage.saveRoom(values);
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
        <Form form={form} onFinish={handleSubmit} {...formItemLayout}>
          <Form.Item label="房间号" name="roomId">
            <Input readOnly></Input>
          </Form.Item>
          <Form.Item label="昵称" name="nickName">
            <Input placeholder="请输入昵称，16个字符内"></Input>
          </Form.Item>
          <Form.Item label="手机号" name="mobile">
            <Input placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item label="密码" name="pwd">
            <Input placeholder="请设置6位数字密码"></Input>
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 100, marginRight: 10 }}
            >
              保存
            </Button>

            <Button
              type="ghost"
              style={{ width: 100 }}
              onClick={() => {
                modelChild.handleShow();
              }}
            >
              删除
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="删除医生"
        onRef={modelRef}
        request={api.DoctorManage.delRoom}
        defaultData={defaultData}
      >
        <div className="hl-modal">
          删除后该医生不能再进入此房间，确认删除吗？
        </div>
      </Modal>
    </div>
  );
};

export default Detail;
