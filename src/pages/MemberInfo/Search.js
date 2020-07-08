import React, { useEffect, useState } from 'react';
import { Input, Form, Row, Col, Select } from 'antd';
// import DateFilter from '@/components/CustomFormItem/DateFilter';
// import SearchSelect from '@/components/CustomApiFormItem/SearchSelect';
// import moment from 'moment';
import api from '@/api';
import { hidden } from 'chalk';

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
          label="姓名"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input allowClear placeholder="请输入手机号" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Search;
