import { Modal, List, InputItem, Picker, Toast } from 'antd-mobile';
import { useState, useEffect } from 'react';
import styles from './style.less';
import { createForm } from 'rc-form';
import { allocateToUser } from '../api';

export default createForm()(props => {
  const { getFieldProps, getFieldValue, resetFields } = props.form;

  function onClose() {
    props.onClose();
  }

  function submit() {
    if (packageValue.length === 0) {
      Toast.info('请选择套餐', 2, null, false);
      return;
    }
    const body = {
      chnerUserId: props.user.id,
      pkgId: packageValue[0],
      remark: getFieldValue('remark'),
      issueType: 5,
    };
    if (body.remark && body.remark.length > 20) {
      Toast.info('备注不能超过20个字', 1, null, false);
      return;
    }
    props.onClose();
    allocateToUser({ body }).then(res => {
      Toast.success('续期成功', 2, null, false);
      props.initData();
      setpackageValue([]);
      setAmount(0);
      resetFields();
      props.onSuccess && props.onSuccess();
    });
  }

  const [packageValue, setpackageValue] = useState([]);
  const packages = props.pkgList.map(item => {
    return { value: item.pkgId, label: item.pkgName };
  });
  const [amont, setAmount] = useState(0);
  useEffect(() => {
    if (packageValue.length > 0) {
      const data = props.pkgList.find(item => item.pkgId === packageValue[0]);
      if (data) {
        setAmount(data.amount);
      }
    }
  }, [packageValue]);

  return (
    <Modal
      title="续期"
      visible={props.visible}
      transparent
      onClose={onClose}
      className="userModal"
      footer={[
        { text: '取消', onPress: onClose },
        { text: '续期', onPress: submit },
      ]}
    >
      <List className={styles.modalInputWrap}>
        <div className={styles.inputTop}>套餐</div>
        <Picker
          value={packageValue}
          onChange={setpackageValue}
          data={packages}
          cols={1}
        >
          <List.Item
            className={[
              styles.modalInput,
              styles.pickerItem,
              'border-all-1px',
            ].join(' ')}
          >
            {packageValue.length > 0 ? (
              <span>
                {packages.find(item => item.value === packageValue[0]).label}
              </span>
            ) : (
              <span className={styles.placeholder}>请选择权益套餐</span>
            )}
            <div className={styles.btnPicker}></div>
          </List.Item>
        </Picker>
        <div className={styles.inputTop}>备注</div>
        <InputItem
          type="text"
          clear
          className={[styles.modalInput, 'border-all-1px'].join(' ')}
          placeholder="备注"
          maxLength={20}
          labelNumber={0}
          {...getFieldProps('remark', {
            initialValue: '',
          })}
        ></InputItem>
      </List>
      <div className={styles.renewTips}>
        向用户发送一次所选中套餐，剩余{amont}
      </div>
    </Modal>
  );
});
