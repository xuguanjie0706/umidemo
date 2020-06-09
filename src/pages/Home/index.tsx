/*
 * @Author: xgj
 * @since: 2020-06-05 14:16:09
 * @lastTime: 2020-06-09 11:16:06
 * @LastAuthor: xgj
 * @FilePath: /um/src/pages/Home/index.tsx
 * @message:
 */
import React from 'react';
import styles from './index.less';
import { Button } from 'antd-mobile';

const Custom = () => {
  return (
    <div className="home">
      <h1>Page index</h1>
      <span>12321</span>
      <div className={styles.test}>测试</div>
      <Button>123</Button>
    </div>
  );
};

export default Custom;
