/*
 * @Author: xgj
 * @since: 2020-07-07 11:25:43
 * @lastTime: 2020-07-07 17:57:16
 * @LastAuthor: xgj
 * @FilePath: /um/src/pages/DoctorView/index.js
 * @message:
 */

import React, { useEffect, useState, useCallback } from 'react';
import CustomTable from '@/components/Custom/CustomTable';
import CustomSearchContainer from '@/components/Custom/CustomSearchContainer';
import { Button } from 'antd';
import api from '@/api';
// import { SUBSCRIBE_STATUS_LIST } from '@/utils/enum';
import { connect } from 'umi';
import Search from './Search';
import ModalForm from './Form';

const Custom = props => {
  // console.log(props);

  const { defaultSearchData, history } = props;

  /* ******* 设置属性 *******  */
  const [modelChild, setModelChild] = useState(null); // 新增弹窗
  const [tableChild, setTableChild] = useState(null); // 列表弹窗
  const [defaultData, setDefaultData] = useState({ id: 0 }); // 新增编辑默认值

  /* ******* 设置属性 *******  */

  /* ******* 设置实例 *******  */
  const modelRef = ref => {
    setModelChild(ref);
  };

  const tableRef = ref => {
    setTableChild(ref);
  };

  /* ******* 设置实例 ******* */

  /* ******* 设置方法 ******* */
  /* 新增弹窗 */
  const handleEdit = async item => {
    setDefaultData(item);
    // if (modelChild) {
    //   modelChild.handleShow();
    // }
    history.push('./doctorEidt/123');
  };

  /* ******* 设置方法 ******* */
  /* 初始化 */
  const initLoad = async () => {
    api.DoctorManage.listDoctor();
  };

  /* ******* 监听 ******* */
  useEffect(() => {
    initLoad();
  }, []);
  /* ******* 监听 ******* */

  /* 新增按钮 */
  const addBtn = useCallback(
    () => (
      <Button
        style={{ marginBottom: 10, width: 100 }}
        type="primary"
        onClick={() => handleEdit({ id: 0 })}
      >
        添加
      </Button>
    ),
    [modelChild],
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
      width: 100,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      width: 124,
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
      <ModalForm
        width={540}
        style={{ top: 20 }}
        // title={modelData.title}
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
        onRef={modelRef}
        // defaultData={modelData}
        // request={modelData.api}
        // callback={() => { ToolChild && ToolChild.handleShow(); tableChild && tableChild.initData(); }}
        // pkgList={pkgList}
        // BATCH_TYPE_LIST={BATCH_TYPE_LIST}
      />
    </>
  );
};

export default Custom;
