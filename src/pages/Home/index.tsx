/*
 * @Author: xgj
 * @since: 2020-06-05 14:16:09
 * @lastTime: 2020-06-08 13:56:28
 * @LastAuthor: xgj
 * @FilePath: /um/src/pages/Home/index.tsx
 * @message:
 */
import React from 'react';
import ProTable from '@ant-design/pro-table';
// import './index.less';

const Custom = () => {
  const columns = [
    {
      title: 123,
      key: 1,
    },
  ];
  return (
    <div className="home">
      {/* <PageHeaderWrapper> */}
      <ProTable
        headerTitle="查询表格"
        columns={columns}
        // request={params => queryTableData(params)}
      />
      {/* </PageHeaderWrapper> */}
    </div>
  );
};

export default Custom;
