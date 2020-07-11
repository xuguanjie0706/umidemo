import React, { useState, useEffect } from 'react';

import { Form, Card, Input, Button, DatePicker, Spin, message } from 'antd';
import Modal from './Form';
import api from '@/api';
import { nicknameValidator, phoneValidator, numberPasswordValidator } from "@/utils/validator"
import moment from "moment"

const { RangePicker } = DatePicker;
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
  const { match: { params: { id } } } = props;
  const [modelChild, setModelChild] = useState(null); // 弹窗
  const [defaultData, setDefaultData] = useState({});
  const [isFinish, setIsFinish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dates, setDates] = useState([]);

  const [form] = Form.useForm();



  const modelRef = ref => {
    setModelChild(ref);
  };


  /* 表单提交 */
  const handleSubmit = async (values) => {
    delete values.time
    setLoading(true)
    try {
      const r = await api.BookedServ.booking(values)
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




  /* 加载数据 */
  const initData = async () => {
    if (!Number(id)) {
      const r = await api.BookedServ.genRoomId();
      if (r) {
        await setDefaultData({
          roomId: r,
          patientName: "患者许关啊",
          patientMobile: "18079442431",
          doctorName: "医生二",
          doctorMobile: "18079442435",
          pwd: "123456",
          time: [moment("2020-08-10 19:51"), moment("2020-08-10 20:00")],
          stime: "2020-08-10 20:00",
          etime: "2020-08-10 20:10",
        })
        setIsFinish(true)
      }
    } else {
      const r = await api.BookedServ.findOrderByRoomId({ id });
      if (r) {
        r.time = [moment(r.stime), moment(r.etime)]
        setDefaultData(r)
        setIsFinish(true)
      }
    }
  };

  /* 页面初始化 */
  useEffect(() => {
    initData()
  }, []);

  // const disabledDate = (current) => {
  //   if (!dates || dates.length === 0) {
  //     return false;
  //   }
  //   // console.log(current);
  //   const tooLate = dates[0] && current.diff(dates[0], 'hour') > 2;
  //   const tooEarly = dates[1] && dates[1].diff(current, 'hour') > 2;
  //   return tooEarly || tooLate;
  // }




  return (
    <div>
      <div className="hl-back" onClick={() => history.go(-1)}>
        返回
      </div>
      <Card
        className="hl-form-card"
        title={<span className="hl-title-blue">添加预约</span>}
      >
        {isFinish ?
          <Form hideRequiredMark form={form} onFinish={handleSubmit} {...formItemLayout} initialValues={defaultData}>
            <Form.Item hidden name="id" >
              <Input />
            </Form.Item>
            <Form.Item label="房间号" name="roomId">
              <Input readOnly></Input>
            </Form.Item>
            <Form.Item
              label="预约时间"
              name="time"
              rules={[
                {
                  type: 'array',
                  required: true,
                  message: '请选择时间且时间区间不能超过2小时!',
                },
              ]}
              getValueFromEvent={(m, value) => {
                const diff = m[1].valueOf() - m[0].valueOf()
                if (diff > 1000 * 60 * 60 * 2) {
                  return
                }
                form.setFieldsValue({
                  sTime: value[0],
                  eTime: value[1],
                });
                return m
              }}
            >
              <RangePicker
                // disabledDate={disabledDate}
                // onCalendarChange={(value) => setDates(value)}
                showTime
                separator="至"
                style={{ width: '100%' }}
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
            <Form.Item validateTrigger={"onBlur"} label="问诊人姓名" name="patientName" rules={[{ validator: nicknameValidator }]}>
              <Input maxLength={8} placeholder="请输入问诊人姓名，最多8个字"></Input>
            </Form.Item>
            <Form.Item validateTrigger={"onBlur"} label="问诊人手机号" name="patientMobile" rules={[
              { validator: phoneValidator }
            ]}>
              <Input maxLength={11} placeholder="请输入问诊人手机号"></Input>
            </Form.Item>
            <Form.Item validateTrigger={"onBlur"} label="医生姓名" name="doctorName" rules={[{ validator: nicknameValidator }]}>
              <Input maxLength={8} placeholder="请输入医生姓名，最多8个字"></Input>
            </Form.Item>
            <Form.Item validateTrigger={"onBlur"} label="医生手机号" name="doctorMobile" rules={[
              { validator: phoneValidator }
            ]}>
              <Input maxLength={11} placeholder="请输入问诊人手机号"></Input>
            </Form.Item>
            <Form.Item validateTrigger={"onBlur"} label="医生登录密码" name="pwd"
              rules={[
                { validator: numberPasswordValidator }
              ]}>
              <Input.Password autoComplete="new-password" maxLength={6} placeholder="请设置6位数字密码" />
            </Form.Item>
            <Form.Item name="stime" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="etime" hidden>
              <Input />
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
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
                  取消预约
                </Button>
              }
            </Form.Item>
          </Form> : <Spin ><div style={{ height: 400 }} className="hl-flex-1"></div></Spin >}
      </Card>
      <Modal
        title="取消预约"
        onRef={modelRef}
        request={api.BookedServ.cancelBookedOrde}
        defaultData={defaultData}
        callback={() => { message.success("取消成功"); history.go(-1) }}
      >
        <div className="hl-modal">确认取消该预约服务吗？</div>
      </Modal>
    </div>
  );
};

export default Detail;
