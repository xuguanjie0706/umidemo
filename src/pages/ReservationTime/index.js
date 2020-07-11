import React, { useState, useEffect } from 'react';

import { Form, Card, Input, Button, Spin, message } from 'antd';
import api from '@/api';
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
const Detail = props => {
  // console.log(props);
  const [isFinish, setIsFinish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();

  /* 加载数据 */
  const initData = async () => {

    try {
      const r = await api.ServTime.findTimeDesc()
      if (r) {
        form.setFieldsValue({ timeDesc: r === true ? "" : r })
      }
      setIsFinish(true)
    } catch (error) {
      setIsFinish(true)
    }

  }
  useEffect(() => {
    initData()
  }, [])


  const handleSubmit = async (values) => {
    // console.log(values);
    setLoading(true)
    try {
      const r = await api.ServTime.saveTimeDesc(values)
      if (r) {
        message.success("保存成功")
      } else {
        message.error("保存失败")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error("保存失败")
    }
  };
  return (
    <div>
      <Card className="hl-form-card" style={{ paddingTop: 100 }}>
        {isFinish ?
          <Form form={form} onFinish={handleSubmit} {...formItemLayout}>
            <Form.Item label="设置服务时间提示" name="timeDesc" >
              <Input.TextArea rows={3} maxLength={60} placeholder="例：服务时间:周一至周五 9:00-12:00" />
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
            </Form.Item>
          </Form>
          : <Spin ><div style={{ height: 400 }} className="hl-flex-1"></div></Spin >}
      </Card>
    </div>
  );
};
export default Detail;
