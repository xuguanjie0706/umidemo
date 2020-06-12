import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { Toast } from 'antd-mobile';

const CodeButton = props => {
  const { request, delay = 60, form, style } = props;
  let T = delay;
  const [time, setTime] = useState(delay);
  const [disabled, setDisabled] = useState(false);
  let timer = null;
  const setCode = async () => {
    const contact = form.getFieldValue('contact');
    if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(contact)) {
      Toast.fail('请输入正确的手机号');
      return;
    }
    const r = request && (await request({ contact }));
    if (r) {
      setDisabled(true);
      timer = setInterval(() => {
        T -= 1;
        setTime(T);
        if (T === 0) {
          clearInterval(timer);
          setDisabled(false);
          T = delay;
          setTime(delay);
        }
      }, 1000);
    } else {
      // message.error('发送失败');
    }
  };
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Button onClick={setCode} disabled={disabled} type="link" style={style}>
        {disabled ? `已发送${time}s` : '发送验证码'}
      </Button>
    </>
  );
};

export default CodeButton;
