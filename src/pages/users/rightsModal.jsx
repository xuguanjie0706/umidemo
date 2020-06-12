import { Modal } from 'antd-mobile';
import { useState } from 'react';
import styles from './style.less';

export default props => {
  function onClose() {
    props.onClose();
  }
  function submit() {
    props.onRenew(props.user);
  }
  let list = props.user.privilegeList || [];
  return (
    <Modal
      title="拥有权益"
      visible={props.visible}
      transparent
      onClose={onClose}
      className="userModal"
      footer={[
        { text: '取消', onPress: onClose },
        { text: list.length > 0 ? '续期' : '分发', onPress: submit },
      ]}
    >
      <div className={styles.rightsWrap}>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div className={styles.rightsItem} key={index}>
              <div className={styles.rightsName}>{item.cardName}</div>
              <div className={styles.rightsExpired}>
                <span>剩余有效期：{item.privilegeRemainDays}天&emsp;</span>
                <span>
                  {item.privilegeRemainTimes === 0
                    ? ''
                    : `剩余次数：${item.privilegeRemainTimes}次`}
                </span>
              </div>
              <div className={styles.rightsDetail}>{item.cardDesc}</div>
            </div>
          ))
        ) : (
          <div className={styles.rightsEmpty}>用户当前暂无权益</div>
        )}
      </div>
    </Modal>
  );
};
