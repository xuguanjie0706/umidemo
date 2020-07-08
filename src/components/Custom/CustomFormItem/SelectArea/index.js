import React from 'react';
import { Cascader, Modal } from 'antd';
import areaOption from './area';

const SelectArea = props => {
  const { value, setItem, list } = props;
  const onChange = (v, a) => {
    const selectTitle = a.map(item => item.label).join('-');
    const obj = list.find(item => item.agentAreaId === v.join('-'));
    if (obj) {
      Modal.error({
        icon: '',
        content: '您已选择该区域，每个区域仅支持选择一种代理类型',
        title: '提示',
      });
    } else {
      setItem(v, 'label');
      setItem(selectTitle, 'agentArea');
    }
  };
  return (
    <Cascader
      disabled={value}
      value={value}
      fieldNames={{ label: 'label', value: 'value' }}
      options={areaOption}
      onChange={onChange}
      placeholder="请选择代理区域"
    />
  );
};

export default SelectArea;
