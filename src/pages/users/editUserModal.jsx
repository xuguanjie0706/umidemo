import { Modal, List, Picker, InputItem, Toast, Flex } from 'antd-mobile';
import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import styles from './style.less';
import { createForm } from 'rc-form';
import { issuerUserInfoUpdate, tagSave } from '../api';

export default createForm()(props => {
  const { getFieldProps, getFieldValue } = props.form;
  const tagRef = useRef();
  function onClose() {
    props.onClose();
  }
  function submit() {
    if (submitDisable) {
      return;
    }
    const body = {
      id: props.user.id,
      remark: getFieldValue('remark'),
    };
    if (body.remark && body.remark.length > 20) {
      Toast.info('备注不能超过20个字', 1, null, false);
      return;
    }
    if (groupValue.length > 0) {
      body.groupId = groupValue[0];
    }
    props.onClose();
    if (tagRef.current && tagRef.current.value) {
      const arr = tagRef.current.value.map(item => item.id);
      body.tagIdList = arr.filter(item => item !== null);
    }
    issuerUserInfoUpdate({ body }).then(res => {
      Toast.success('修改成功', 2, null, false);
      props.onSuccess && props.onSuccess();
    });
  }

  const [groupValue, setGroupValue] = useState(
    props.user.groupId ? [props.user.groupId] : [],
  );
  const groups = props.groups.map(item => {
    return { value: item.id, label: item.name };
  });

  const [submitDisable, setSubmitDisable] = useState(false);

  return (
    <Modal
      title="编辑用户"
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
        <Flex justify="between" className={styles.inputTop}>
          <span>分组</span>
          <span className={styles.addGroupBtn} onClick={props.onAddGroup}>
            新建分组
          </span>
        </Flex>
        <Picker
          value={groupValue}
          onChange={setGroupValue}
          data={groups}
          cols={1}
        >
          <List.Item
            className={[
              styles.modalInput,
              styles.pickerItem,
              'border-all-1px',
            ].join(' ')}
          >
            {groupValue.length > 0 ? (
              <span>
                {groups.find(item => item.value === groupValue[0]).label}
              </span>
            ) : (
              <span className={styles.placeholder}>请选择分组</span>
            )}

            <div className={styles.btnPicker}></div>
          </List.Item>
        </Picker>
        <div className={styles.inputTop}>标签</div>
        <TagsInput
          tags={props.tags}
          cRef={tagRef}
          value={props.user.tagIdList}
          onSave={props.onSaveTag}
          onInputing={val => setSubmitDisable(val)}
        ></TagsInput>
        <div className={styles.inputTop}>备注</div>
        <InputItem
          type="text"
          clear
          className={[styles.modalInput, 'border-all-1px'].join(' ')}
          placeholder="备注"
          maxLength={20}
          labelNumber={3}
          {...getFieldProps('remark', {
            initialValue: props.user.remark,
          })}
        ></InputItem>
      </List>
    </Modal>
  );
});

function TagsInput(props) {
  console.log(props);

  const el = useRef();
  const [val, setval] = useState([]);

  const tagMap = useMemo(() => {
    const obj = {};
    props.tags.forEach(item => {
      obj[item.id] = item;
    });
    return obj;
  }, [props.tags]);

  useImperativeHandle(props.cRef, () => {
    return {
      value: val,
    };
  });

  useEffect(() => {
    if (props.value) {
      setval(props.value.map(item => tagMap[item] || { name: item, id: item }));
    }
  }, [props.value]);

  function startInput() {
    if (val.length >= 3) {
      Toast.info('标签不能超过3个');
      return;
    }
    inputRef.current.value = '';
    setInputing(true);
    setTimeout(() => {
      inputRef.current.focus();
    });
  }

  function addTag() {
    const value = inputRef.current.value;
    setInputing(false);
    if (!value) {
      return;
    }
    if (value.length > 4) {
      Toast.info('标签不能超过3个', 2, null, false);
    }
    const repeat = isRepeat(value);
    // 库内重复
    if (repeat) {
      // 本人重复
      if (val.findIndex(item => item.id === repeat.id) > -1) {
        Toast.info('不能添加重复标签', 2, null, false);
      } else {
        const arr = val.slice(0);
        arr.push(repeat);
        setval(arr);
      }
    } else {
      // 创建
      const body = {
        name: value,
        type: 2,
      };
      Toast.loading('创建新标签...');
      tagSave({ body })
        .then(res => {
          // 更新值
          const arr = val.slice(0);
          arr.push(res.data);
          setval(arr);
          props.onSave();
          Toast.hide();
        })
        .catch(err => {
          Toast.hide();
        });
    }
  }

  function isRepeat(name) {
    // 库内重复
    const data = props.tags.find(item => name === item.name);
    if (data) {
      return data;
    }
    return false;
  }

  function deleteItem(index) {
    const arr = val.slice(0);
    arr.splice(index, 1);
    setval(arr);
  }

  function focusInput() {
    if (inputing && inputRef.current) {
      inputRef.current.focus();
    }
  }

  const [inputing, setInputing] = useState(false);
  const inputRef = useRef();

  return (
    <div className="border-all-1px">
      <div ref={el} className={styles.tagsInput}>
        <div className={styles.tagItemWrap} onClick={focusInput}>
          {val.map((item, index) => (
            <span
              key={item.id}
              className={styles.tagItem}
              onClick={() => deleteItem(index)}
            >
              <span>{item.name}</span>
              <span className={styles.deleteIcon}></span>
            </span>
          ))}
          <input
            type="text"
            className={styles.tagInnerInput}
            ref={inputRef}
            maxLength={4}
            style={{ display: inputing ? 'inline-block' : 'none' }}
            // onBlur={() => {
            //   setTimeout(() => {
            //     setInputing(false);
            //   });
            // }}
          />
        </div>
        <span
          className={styles.tagItemBtn}
          onClick={addTag}
          style={{ display: inputing ? 'inline-block' : 'none' }}
        >
          确定
        </span>
        <span
          className={styles.tagItemBtn}
          onClick={startInput}
          style={{ display: inputing ? 'none' : 'inline-block' }}
        >
          添加
        </span>
      </div>
    </div>
  );
}

// function TagsInput(props) {
//   const [val, setval] = useState([]);
//   const el = useRef();
//   const valuesRef = useRef(props.value);

//   const tagMap = useMemo(() => {
//     const obj = {};
//     props.tags.forEach(item => {
//       obj[item.id] = item;
//     });
//     return obj;
//   }, [props.tags]);

//   useImperativeHandle(props.cRef, () => {
//     return {
//       value: val
//     };
//   });

//   useEffect(() => {
//     if (props.value) {
//       setval(props.value.map(item => tagMap[item]));
//     }
//   }, [props.value]);

//   useEffect(() => {
//     const $el = el.current;
//     const input = `<span class="${styles.splitInputWarp}"><input maxlength="4" class="${styles.splitInput}"/></span>`;
//     const forWidth = `<span style="width: 1px;height: 1px;overflow: hidden; display: inline-block;"><span class="forWidth"></span></span>`;
//     $el.innerHTML = forWidth + val.map(createTag).join(input) + input;
//     valuesRef.current = val;
//     console.log(valuesRef.current)
//   }, [val]);

//   function selectAfterDom(ev) {
//     ev = ev || window.event;
//     // target表示在事件冒泡中触发事件的源元素，在IE中是srcElement
//     const target = ev.target || ev.srcElement;
//     if (target.classList.contains(styles.tagItem)) {
//       if (target.nextSibling) {
//         const input = target.nextSibling.querySelector('input');
//         input && input.focus();
//       }
//     }
//     if (target.classList.contains(styles.tagsInput)) {
//       const list = target.querySelectorAll('input');
//       if (list.length > 0) {
//         list[list.length - 1].focus();
//       }
//     }
//   }

//   const lastValue = useRef('');
//   function onKeyUp(ev) {
//     ev = ev || window.event;
//     // target表示在事件冒泡中触发事件的源元素，在IE中是srcElement
//     const target = ev.target || ev.srcElement;
//     if (target.nodeName.toLowerCase() == 'input') {
//       const parent = target.parentNode;
//       // 获取宽度
//       const forWidth = el.current.querySelector('.forWidth');
//       forWidth.innerText = target.value;
//       setTimeout(() => {
//         parent.style.width = forWidth.offsetWidth + 12 + 'px';
//       });

//       // 删除, 上次为空且这次为空，点击回退键，删除
//       if (ev.keyCode === 8 && target.value === '' && lastValue.current === '') {
//         const prev = parent.previousSibling;
//         if (prev && prev.classList.contains(styles.tagItem)) {
//           const index = prev.getAttribute('data-index');
//           const arr = valuesRef.current.slice(0);
//           arr.splice(index, 1);
//           setval(arr);
//         }
//       }
//       // 新增
//       if (ev.keyCode === 32 && target.value !== '') {
//         const str = target.value.replace(/\s/g, '');
//         const prev = parent.previousSibling;
//         let index = 0;
//         if (prev && prev.classList.contains(styles.tagItem)) {
//           index = +prev.getAttribute('data-index') + 1;
//         }
//         const arr = valuesRef.current.slice(0);
//         const obj = { name: str, id: null };
//         arr.splice(index, 0, obj);
//         setval(arr);
//         addNewTag(obj, index);
//       }

//       // 记录上一次的input值
//       lastValue.current = target.value;
//     }
//   }

//   useEffect(() => {
//     const $el = el.current;
//     $el.addEventListener('click', selectAfterDom);
//     $el.addEventListener('keyup', onKeyUp);
//     return () => {
//       $el.removeEventListener('click', selectAfterDom);
//       $el.removeEventListener('keyup', onKeyUp);
//     };
//   }, []);

//   function addNewTag(obj, index) {
//     if (obj.name && obj.name.length > 4) {
//       Toast.info('标签不能超过4个字', 2, null, false);
//       const arr = valuesRef.current.slice(0);
//       arr.splice(index, 1);
//       setval(arr);
//       return false;
//     }
//     // 重复
//     const repeatR = isRepeat(obj);
//     if (repeatR) {
//       valuesRef.current[index] = repeatR;
//       setval(valuesRef.current);
//       return;
//     }
//     const body = {
//       name: obj.name,
//       type: 2,
//     };
//     tagSave({ body })
//       .then(res => {
//         console.log(res);
//         // 更新值
//         valuesRef.current[index].id = res.data.id;
//         setval(valuesRef.current);
//       })
//       .catch(err => {
//         console.log(err);
//         const arr = valuesRef.current.slice(0);
//         arr.splice(index, 1);
//         setval(arr);
//       });
//   }

//   function createTag(item, index) {
//     return `<span class="${styles.tagItem}" data-index="${index}">${item.name}</span>`;
//   }

//   function isRepeat(obj) {
//     const data = props.tags.find(item => obj.name === item.name);
//     if (data) {
//       return data;
//     }
//     return false;
//   }

//   return (
//     <div className="border-all-1px">
//       <div ref={el} className={styles.tagsInput}></div>
//     </div>
//   );
// }
