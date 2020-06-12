import React, { useState, useEffect } from 'react';
import BaseForm from './Base';
import SecondFrom from './Second';
import './index.less';
import VConsole from 'vconsole';

const AddAgentBusy = props => {
  const {
    match: {
      params: { inviteUid },
    },
    history,
  } = props;
  console.log(props);
  // var vConsole = new VConsole();
  useEffect(() => {
    document.title = '申请代理';
  }, []);
  const [step, setStep] = useState(0);
  const [agentType, setAgentType] = useState('1');
  const [defaultData, setDefaultData] = useState({});
  console.log(
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
  );
  return (
    <div className="add-agent-busy">
      <h3 style={{ marginBottom: 40 }}>
        您正在登记成为微医通渠道代理，相关信息将影响您的审核结果，请如实填写！
      </h3>
      {!step ? (
        <BaseForm
          setDefaultData={setDefaultData}
          inviteUid={inviteUid}
          setAgentType={setAgentType}
          setStep={setStep}
        />
      ) : (
        // defaultData.id &&
        <SecondFrom
          defaultData={defaultData}
          agentType={agentType}
          inviteUid={inviteUid}
          history={history}
        />
      )}
    </div>
  );
};
export default AddAgentBusy;
