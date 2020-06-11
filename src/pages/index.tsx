import React from 'react';
import styles from './index.less';
// import { useRootExports } from 'umi';
// import { useRootExports } from 'umi';
export default function() {
  // const rootExports = useRootExports();
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div className={styles.test}>测试</div>
    </div>
  );
}
