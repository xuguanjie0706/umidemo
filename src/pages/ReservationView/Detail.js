import React, { useState } from 'react';

import { Form, Card, Input, Button, DatePicker } from 'antd';
import Modal from './Form';
import api from '@/api';

const { RangePicker } = DatePicker;
const Detail = props => {
  console.log(props);

  const [modelChild, setModelChild] = useState(null); // 弹窗

  const modelRef = ref => {
    setModelChild(ref);
  };

  const [form] = Form.useForm();
  const handleSubmit = values => {
    api.BookedServ.booking(values);
  };
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const formTailLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
      offset: 8,
    },
  };

  return (
    <div>
      <div className="hl-back" onClick={() => history.go(-1)}>
        返回
      </div>
      <Card
        style={{ borderRadius: 8 }}
        title={<span className="hl-title-blue">添加医生</span>}
      >
        <Form form={form} onFinish={handleSubmit} {...formItemLayout}>
          <Form.Item label="房间号" name="roomId">
            <Input readOnly></Input>
          </Form.Item>
          <Form.Item label="预约时间" name="patientName">
            <RangePicker
              separator="至"
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
          <Form.Item label="问诊人姓名" name="">
            <Input placeholder="请输入问诊人姓名，16个字符内"></Input>
          </Form.Item>
          <Form.Item label="问诊人手机号" name="patientMobile">
            <Input placeholder="请输入问诊人手机号"></Input>
          </Form.Item>
          <Form.Item label="医生姓名" name="doctorName">
            <Input placeholder="请输入医生姓名，16个字符内"></Input>
          </Form.Item>
          <Form.Item label="医生手机号" name="doctorMobile">
            <Input placeholder="请输入问诊人手机号"></Input>
          </Form.Item>
          <Form.Item label="医生登录密码" name="pws">
            <Input placeholder="请设置6位数字密码"></Input>
          </Form.Item>
          <Form.Item name="stime" noStyle></Form.Item>
          <Form.Item name="etime" noStyle></Form.Item>
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
              取消预约
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="取消预约"
        onRef={modelRef}
        request={api.BookedServ.cancelBookedOrder}
      >
        <div className="hl-modal">确认取消该预约服务吗？</div>
      </Modal>
    </div>
  );
};

export default Detail;
