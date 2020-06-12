import { Modal, List, InputItem, Toast } from 'antd-mobile';
import styles from './style.less';
import { createForm } from 'rc-form';
import { useState } from 'react';
import { rcErrorsToString } from '@/components/common';
import { groupSave } from '../api';

export default createForm()(props => {
  const { getFieldProps, getFieldError, validateFields } = props.form;
  function onClose() {
    props.onClose();
  }
  function submit() {
    validateFields(['name'], (errors, values) => {
      if (errors) {
        Toast.info(rcErrorsToString(errors), 2, null, false);
        return;
      }
      const body = {
        name: values.name,
        type: 2,
      };
      if (body.name.length > 20) {
        Toast.info('分组名不能超过20个字', 2, null, false);
        return;
      }
      props.onClose();
      groupSave({ body }).then(res => {
        Toast.success('添加成功', 2, null, false);
        props.onSuccess && props.onSuccess();
      });
    });
  }
  return (
    <Modal
      title="新建分组"
      visible={props.visible}
      transparent
      onClose={onClose}
      className="userModal"
      footer={[
        { text: '取消', onPress: onClose },
        { text: '确认', onPress: submit },
      ]}
    >
      <List className={styles.modalInputWrap}>
        <div className={styles.inputTop}>分组名</div>
        <InputItem
          type="text"
          clear
          className={[styles.modalInput, 'border-all-1px'].join(' ')}
          placeholder="分组名"
          labelNumber={0}
          {...getFieldProps('name', {
            initialValue: '',
            rules: [{ required: true, message: '分组名不能为空' }],
          })}
          error={getFieldError('name')}
          onErrorClick={() => Toast.info(getFieldError('name'), 2, null, false)}
        ></InputItem>
      </List>
    </Modal>
  );
});
