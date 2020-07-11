import React from 'react';

import CustomModalContainer from '@/components/Custom/CustomModalContainer';
import './index.less';
import { Input, Form } from 'antd';

const CustomForm = props => {
  const { defaultData = {} } = props;
  return <>
    <Form.Item hidden name="id" initialValue={defaultData.id}>
      <Input />
    </Form.Item>
  </>;
};

export default CustomModalContainer(CustomForm);
