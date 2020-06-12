import React from 'react';
import pic from './assets/icon_status_tick.svg';
import './index.less';

const SubmitSuccess = () => {
  return (
    <div className="submit-room">
      <img
        style={{
          width: 80,
          height: 80,
        }}
        src={pic}
        alt=""
      />
      <h3>提交成功</h3>
      <p>
        我们将于3个工作日内处理完您提交的申请，
        申请通过后将以短信通知您，请耐心等待！
      </p>
    </div>
  );
};

export default SubmitSuccess;
