import React, { useEffect, useState } from 'react';
import { Input, Form, Row, Col, Select, DatePicker } from 'antd';
// import DateFilter from '@/components/CustomFormItem/DateFilter';
// import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
// import moment from 'moment';
import api from '@/api';
import { hidden } from 'chalk';

const { Option } = Select;
const { RangePicker } = DatePicker;
const Search = props => {
  const { form, defaultSearchData, SUBSCRIBE_STATUS_LIST } = props;

  useEffect(() => {
    // initLoad();
  }, []);

  return (
    <Row>
      <Col xs={24} sm={12} md={16} lg={12} xl={12} xxl={12}>
        <Form.Item
          name="fa"
          label="查询时间"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          getValueFromEvent={(m, value) => {
            form.setFieldsValue({
              stime: value[0],
              etime: value[1],
            });
          }}
        >
          <RangePicker
            showTime
            style={{ width: '100%' }}
            separator="至"
            format="YYYY-MM-DD HH:mm"
          ></RangePicker>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="pname"
          label="问诊人姓名"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入问诊人姓名" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
        <Form.Item
          name="dname"
          label="医生姓名"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入医生姓名" />
        </Form.Item>
      </Col>
      <Form.Item hidden name="stime">
        <Input />
      </Form.Item>
      <Form.Item hidden name="etime">
        <Input />
      </Form.Item>
    </Row>
  );
};

export default Search;
