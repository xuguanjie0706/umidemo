/*
 * @Author: xgj
 * @since: 2020-07-07 11:25:43
 * @lastTime: 2020-07-10 18:11:34
 * @LastAuthor: xgj
 * @FilePath: /um/src/pages/DoctorView/index.js
 * @message:
 */

import React, { useEffect, useState, useCallback } from 'react';
import CustomTable from '@/components/Custom/CustomTable';
import CustomSearchContainer from '@/components/Custom/CustomSearchContainer';
import { Button, message } from 'antd';
import api from '@/api';
// import Search from './Search';
// import ModalForm from './Form';

const Custom = props => {

  const { defaultSearchData, history } = props;

  /* ******* 设置属性 *******  */
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  // const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值

  /* ******* 设置属性 *******  */


  /* ******* 设置实例 *******  */

  const tableRef = ref => {
    setTableChild(ref);
  };

  /* ******* 设置实例 ******* */

  /* ******* 设置方法 ******* */
  /* 新增弹窗 */
  const handleEdit = async ({ id, total }) => {
    if (total >= 10) {
      message.error("房间已达上限！")
    } else {
      history.push('./doctorEidt/' + id);
    }
  }

  /* ******* 设置方法 ******* */
  /* 初始化 */
  const initLoad = async () => {
  };

  /* ******* 监听 ******* */
  useEffect(() => {
    initLoad();
  }, []);
  /* ******* 监听 ******* */




  /* 新增按钮 */
  const addBtn = useCallback(
    (porps) => (
      <Button
        style={{ marginBottom: 10, width: 100 }}
        type="primary"
        onClick={() => handleEdit({ id: 0, total: porps.child.state.total })}
      >
        添加
      </Button>
    ),
    [],
  );


  /* 表单列表 */
  const SearchTable = useCallback(
    CustomSearchContainer(CustomTable, null, null, addBtn),
    [addBtn],
  );

  /* 底部按钮 */
  /* 自定义字段 */
  const columns = [
    {
      title: '房间号',
      dataIndex: 'roomId',
      key: 'roomId',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, rows) => (
        <Button type="link" onClick={() => handleEdit(rows)}>
          编辑
        </Button>
      ),
    },
  ];

  return (
    <>
      <SearchTable
        rowKey="id"
        request={api.DoctorManage.listDoctor}
        loading
        columns={columns}
        onTableRef={tableRef}
        defaultSearchData={defaultSearchData}
      />
    </>
  );
};

export default Custom;
