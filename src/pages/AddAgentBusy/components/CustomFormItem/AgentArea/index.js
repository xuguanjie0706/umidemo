import React, { useState, useEffect } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Button, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import SelectArea from '../SelectArea';
import './index.less';
import api from '@/api';
import { LEVEL_LIST } from '@/utils/enum';

const { Option } = Select;
const defaultFieldNames = { label: 'agentAreaId', value: 'agentLevel' };

const AgentArea = props => {
  const { value, onChange, fieldNames = defaultFieldNames, id } = props;
  const defaultData = { [fieldNames.label]: null, [fieldNames.value]: '' };
  const [list, setList] = useState([value || { ...defaultData }]);
  const pr = document.documentElement.clientWidth / 375;
  const deleteItem = index => {
    const source = [...list];
    source.splice(index, 1);
    setList(source);
  };

  const add = () => {
    const source = [...list];
    source.push({ ...defaultData });
    setList(source);
  };

  const setItem = (index, it, label) => {
    const source = [...list];
    if (['label', 'value'].includes(label)) {
      source[index][fieldNames[label]] = label === 'label' ? it.join('-') : it;
    } else {
      source[index][label] = it;
    }
    setList(source);
  };

  useEffect(() => {
    onChange(list);
  }, [list]);

  useEffect(() => {
    if (value) {
      setList(value);
    }
  }, [value]);

  return (
    <div className="agent-area">
      <div className="agent-list ">
        {list.map((item, index) => (
          <div
            key={(item + index).toString()}
            className="agent-item hl-margin-b10"
          >
            <div className="left">
              <SelectArea
                list={list}
                style={{ width: 240 * pr }}
                value={
                  item[fieldNames.label] &&
                  item[fieldNames.label].split('-').map(it => Number(it))
                }
                setItem={(it, label) => setItem(index, it, label)}
              />
            </div>
            <div className="right">
              <SelectLevel
                id={id}
                style={{ width: 140 * pr }}
                value={item[fieldNames.value]}
                fieldNames={fieldNames}
                request={api.agentApply.listApplicableAgentLevel}
                index={index}
                list={list}
                setItem={it => setItem(index, it, 'value')}
              />
            </div>
            <DeleteOutlined
              onClick={() => deleteItem(index)}
              className="color-gray pointer"
            />
          </div>
        ))}
      </div>

      <Button
        style={{ width: '100%', marginTop: 10 }}
        type="dashed"
        onClick={() => {
          add();
        }}
      >
        <PlusOutlined /> 添加代理区域
      </Button>
    </div>
  );
};

/* 选择登记 */

const SelectLevel = props => {
  const { index, list, setItem, request, fieldNames, value, style, id } = props;
  const levelList = Object.entries(LEVEL_LIST).map(item => Number(item[0]));
  const [options, setOptions] = useState(levelList);
  // const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);
  const getLevel = async () => {
    try {
      const agentAreaId = list[index][fieldNames.label];
      if (agentAreaId) {
        setLoading(true);
        // setArea(agentAreaId);
        const o = await request({ agentAreaId, id });
        if (o) {
          setOptions(o);
          setLoading(false);
        }
      } else {
        setOptions([]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const selectOption = item => {
    setItem(item);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <Select
        style={style}
        value={value}
        loading={loading}
        placeholder="代理类型"
        onFocus={getLevel}
        onSelect={selectOption}
      >
        {options.map(item => (
          <Option key={item} value={item}>
            {LEVEL_LIST[item]}
          </Option>
        ))}
      </Select>
    </ConfigProvider>
  );
};

export default AgentArea;
