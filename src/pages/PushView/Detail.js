import React, { useState } from 'react';

import { Form, Card, Input, Button } from 'antd';
import Modal from './Form';
import UploadCard from '@/components/Custom/CustomApiFormItem/PeopleCardUpload';

import './index.less';
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
          {/* <Form.Item label="请上传消息封面图片" name="upload"> */}
          <Form.Item
            label={
              <div className="hl-form-label">
                请上传消息封面图1片<p>宽*高：1160px*320px</p>
              </div>
            }
            name="upload"
          >
            <UploadCard desc="上传图片" styles={{ width: 160, height: 160 }} />
          </Form.Item>
          <Form.Item label="标题">
            <Input placeholder="请输入标题，22个字符内"></Input>
          </Form.Item>
          <Form.Item label="内容">
            <Input placeholder="请输入内容，64个字符内"></Input>
          </Form.Item>
          <Form.Item label="跳转说明">
            <Input placeholder="例：详情/立即加入/快速查看"></Input>
          </Form.Item>
          <Form.Item label="链接">
            <Input placeholder="请输入链接"></Input>
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
