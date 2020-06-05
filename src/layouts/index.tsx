import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import PageLoading from '@/components/PageLoading/index';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
const Custom = (props: { children: any }) => {
  console.log(props);
  const { children } = props;
  return (
    <>
      <ProLayout title="123" fixSiderbar loading={PageLoading}>
        <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
      </ProLayout>
    </>
  );
};

export default Custom;
