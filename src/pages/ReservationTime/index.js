import React, { useState } from 'react';

import { Form, Card, Input, Button, DatePicker } from 'antd';
import api from '@/api';

const Detail = props => {
  console.log(props);
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
  const [form] = Form.useForm();
  const handleSubmit = values => {
    api.ServTime.saveTimeDesc(values).then(r => {});
  };
  return (
    <div>
      <Card className="hl-form-card" style={{ paddingTop: 100 }}>
        <Form form={form} onFinish={handleSubmit} {...formItemLayout}>
          <Form.Item label="设置服务时间提示">
            <Input></Input>
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 100, marginRight: 10 }}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Detail;
