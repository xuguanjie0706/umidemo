import React, { useState } from 'react';

import { Form, Card, Input, Button } from 'antd';
import Modal from './Form';

const Detail = props => {
  console.log(props);

  const [modelChild, setModelChild] = useState(null); // 弹窗

  const modelRef = ref => {
    setModelChild(ref);
  };

  const [form] = Form.useForm();
  const handleSubmit = values => {};
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

  return (
    <div>
      <div className="hl-back" onClick={() => history.go(-1)}>
        返回
      </div>
      <Card
        style={{ borderRadius: 8, height: 540 }}
        title={<span className="hl-title-blue">添加医生</span>}
      >
        <Form form={form} onFinish={handleSubmit} {...formItemLayout}>
          <Form.Item label="房间号">
            <Input readOnly></Input>
          </Form.Item>
          <Form.Item label="昵称">
            <Input placeholder="请输入昵称，16个字符内"></Input>
          </Form.Item>
          <Form.Item label="手机号">
            <Input placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item label="密码">
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
      <Modal title="删除医生" onRef={modelRef}>
        <div className="hl-modal">
          删除后该医生不能再进入此房间，确认删除吗？
        </div>
      </Modal>
    </div>
  );
};

export default Detail;