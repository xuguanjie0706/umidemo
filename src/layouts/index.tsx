import React from 'react';
import './index.less';
const Custom = (props: { children: any }) => {
  const { children } = props;
  return <div className="room">{children}</div>;
};

export default Custom;
