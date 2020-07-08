import React, { useEffect, useState } from 'react';
import { Input, Form, Row, Col, Select, DatePicker } from 'antd';
// import DateFilter from '@/components/CustomFormItem/DateFilter';
// import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
// import moment from 'moment';
import api from '@/api';
const { RangePicker } = DatePicker;
const { Option } = Select;
const Search = props => {
  const { form, defaultSearchData, SUBSCRIBE_STATUS_LIST } = props;

  useEffect(() => {
    // initLoad();
  }, []);

  return (
    <Row>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="mobile"
          label="手机号"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入手机号" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="mobile"
          label="主账号"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入手机号" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="mobile"
          label="血压"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入手机号" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="mobile"
          label="血糖"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入手机号" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={16} lg={12} xl={12} xxl={12}>
        <Form.Item
          name="fa"
          label="更新时间"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <RangePicker
            showTime
            style={{ width: '100%' }}
            separator="至"
            format="YYYY-MM-DD HH:mm:ss"
          ></RangePicker>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Search;
