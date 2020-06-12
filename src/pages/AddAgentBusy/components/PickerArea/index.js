import { List, InputItem, Picker, Toast, Modal, Icon } from 'antd-mobile';
import { Button, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import area from './area';
import './index.less';
// import SelectArea from '../CustomFormItem/SelectArea';
import api from '@/api';
import { LEVEL_LIST } from '@/utils/enum';
import pickerImg from './assets/btn_picker.png';
const defaultFieldNames = { label: 'agentAreaId', value: 'agentLevel' };

const PickerArea = props => {
  const { value, id, onChange, fieldNames = defaultFieldNames } = props;
  const defaultData = { [fieldNames.label]: null, [fieldNames.value]: '' };
  console.log(value);

  const [list, setList] = useState([value || { ...defaultData }]);

  const deleteItem = index => {
    console.log(index);

    const source = [...list];
    source.splice(index, 1);
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

  const add = () => {
    const source = [...list];
    source.push({ ...defaultData });
    setList(source);
  };

  useEffect(() => {
    console.log(list);

    onChange(list);
  }, [list]);

  useEffect(() => {
    if (value) {
      setList(value);
    }
  }, [value]);

  return (
    <div>
      {list.map((item, index) => (
        <div className="cell" key={(item + index).toString()}>
          <SelectArea
            list={list}
            value={
              item[fieldNames.label] &&
              item[fieldNames.label].split('-').map(it => Number(it))
            }
            title={item.agentArea}
            setItem={(it, label) => setItem(index, it, label)}
          />
          <SelectLevel
            id={id}
            // style={{ width: 140 * pr }}
            value={item[fieldNames.value]}
            fieldNames={fieldNames}
            request={api.agentApply.listApplicableAgentLevel}
            index={index}
            list={list}
            setItem={it => setItem(index, it, 'value')}
          />
          <Icon
            type="cross"
            onClick={() => deleteItem(index)}
            className="color-gray pointer delete"
          />
        </div>
      ))}

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

const SelectArea = props => {
  const { value, setItem, list, title } = props;
  const [visible, setVisible] = useState(false);
  // const [title, setTitle] = useState("")
  const onChange = v => {
    const a = findArea(area, v);
    const selectTitle = a.join('-');
    const obj = list.find(item => item.agentAreaId === v.join('-'));
    if (obj) {
      Toast.fail('您已选择该区域，每个区域仅支持选择一种代理类型');
    } else {
      setItem(v, 'label');
      setItem(selectTitle, 'agentArea');
      // setTitle(selectTitle)
    }
    setVisible(false);
  };

  const findArea = (area, arr) => {
    try {
      const province = area.find(item => item.value === arr[0]);
      const city = province.children.find(item => item.value == arr[1]);
      const districtr = city.children.find(item => item.value == arr[2]);
      return [province.label, city.label, districtr.label];
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Picker
      visible={visible}
      data={area}
      value={value}
      // onChange={v => this.setState({ pickerValue: v })}
      onOk={onChange}
      style={{ width: '100%' }}
      onDismiss={() => setVisible(false)}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <Input
          onFocus={e => e.target.blur()}
          disabled={title}
          value={title}
          style={{ width: '100%' }}
          placeholder="代理区域"
          readOnly
          onClick={() => setVisible(true)}
        ></Input>
        <img
          style={{ width: 6, position: 'absolute', right: 10, top: 10 }}
          src={pickerImg}
          alt=""
        />
      </div>
    </Picker>
  );
};

const SelectLevel = props => {
  const { index, list, setItem, request, fieldNames, value, style, id } = props;
  const levelListSource = Object.entries(LEVEL_LIST);
  const levelList = levelListSource.map(item => {
    return {
      label: item[1],
      value: Number(item[0]),
    };
  });

  const [options, setOptions] = useState(levelList);
  // const [level, setLevel] = useState("")
  // const [area, setArea] = useState('');
  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const getLevel = async () => {
    try {
      const agentAreaId = list[index][fieldNames.label];
      if (agentAreaId) {
        const o = await request({ agentAreaId, id });

        if (o) {
          const oList = o.map(item => {
            return {
              label: LEVEL_LIST[item],
              value: item,
            };
          });
          setOptions(oList);
          setVisible(true);
        }
      } else {
        Toast.info('请选择代理区域');
        setOptions([]);
      }
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  const pickderChange = item => {
    // setLevel(LEVEL_LIST[item[0]])
    setItem(item[0]);
    setVisible(false);
  };

  // useEffect(() => {
  // effect
  // return () => {
  //   cleanup
  // }
  // }, [input])

  return (
    <Picker
      visible={visible}
      data={options}
      value={value}
      cols={1}
      onOk={pickderChange}
      onDismiss={() => setVisible(false)}
    >
      <div style={{ position: 'relative' }}>
        <Input
          onFocus={e => e.target.blur()}
          value={LEVEL_LIST[value]}
          style={{ width: '100%' }}
          placeholder="代理类型"
          readOnly
          onClick={getLevel}
        ></Input>
        <img
          style={{ width: 6, position: 'absolute', right: 10, top: 10 }}
          src={pickerImg}
          alt=""
        />
      </div>
    </Picker>
  );
};

export default PickerArea;
