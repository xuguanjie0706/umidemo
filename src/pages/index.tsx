import React from 'react';
import styles from './index.less';
import { Button } from 'antd-mobile';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button>12313</Button>
      <div className={styles.test}>测试</div>
    </div>
  );
};
