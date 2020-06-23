import React, { useState, useEffect } from 'react';
import './index.less';

const specCombinationListDefault = [
  { id: '1', color: '紫色', pkg: '套餐一', mode: '64G', year: '2017' },
  { id: '2', color: '紫色', pkg: '套餐一', mode: '128G', year: '2017' },
  { id: '3', color: '紫色', pkg: '套餐二', mode: '128G', year: '2017' },
  { id: '4', color: '红色', pkg: '套餐二', mode: '256G', year: '2017' },
  { id: '5', color: '红色', pkg: '套餐二', mode: '256G', year: '2017' },
  { id: '6', color: '红色', pkg: '套餐二', mode: '256G', year: '2018' },
];
const specListDefault = [
  { title: '颜色', list: ['红色', '紫色'], type: 'color' },
  { title: '套餐', list: ['套餐一', '套餐二'], type: 'pkg' },
  { title: '内存', list: ['64G', '128G', '256G'], type: 'mode' },
  { title: '年份', list: ['2017', '2018', '2019'], type: 'year' },
];
const datasetView = props => {
  const {
    specList = specListDefault,
    specCombinationList = specCombinationListDefault,
  } = props;

  const [selectDataSource, setSelectDataSource] = useState(specCombinationList);
  const [selectRole, setSelectRole] = useState({});

  return (
    <div>
      <div>
        {specList.map(item => (
          <Cell
            setSelectRole={setSelectRole}
            selectRole={selectRole}
            specCombinationList={specCombinationList}
            data={item}
            setSelectDataSource={setSelectDataSource}
            selectDataSource={selectDataSource}
          />
        ))}
      </div>
    </div>
  );
};

const Cell = props => {
  const {
    data,
    selectRole,
    setSelectRole,
    setSelectDataSource,
    specCombinationList,
    selectDataSource,
  } = props;
  const { title, list, type } = data;

  const selectButton = (item, t, e) => {
    if (Array.from(e.target.classList).includes('disabled')) {
      return;
    }
    const role = { ...selectRole };

    if (Array.from(e.target.classList).includes('selected')) {
      e.target.classList.remove('selected');
      delete role[type];
    } else {
      role[type] = item;
      document
        .querySelectorAll(`.selected.${t} `)
        .forEach(it => it.classList.remove('selected'));
      e.target.classList.add('selected');
    }
    let array = [...specCombinationList];
    Object.keys(role).forEach(key => {
      array = array.filter(it => it[key] === role[key]);
    });
    setSelectDataSource(array);
    setSelectRole(role);
  };

  const findBtn = (t, target) => {
    if (selectDataSource.length === 0) {
      return true;
    }
    const isHave = selectDataSource.some(it => it[t] === target);
    return isHave;
  };
  return (
    <div className="hl-room">
      <span>{title}:</span>
      {list.map(item => (
        <div
          className={`hl-btn ${type} ${findBtn(type, item) ? '' : 'disabled'}`}
          onClick={e => selectButton(item, type, e)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default datasetView;
