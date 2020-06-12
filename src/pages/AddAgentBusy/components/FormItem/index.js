import React from 'react';
import './index.less';

const FormItem = props => {
  const { label, children, extra, error, noborder } = props;
  return (
    <div
      className={`form-item ${noborder ? 'noborder' : ''}  ${
        !!error ? 'error' : ''
      }`}
    >
      <p className="label">
        {label}{' '}
        <span style={{ fontSize: 10, color: 'red', fontWeight: 400 }}>
          {error}
        </span>
      </p>
      {extra && <span className="extra">{extra}</span>}
      {children}
    </div>
  );
};

export default FormItem;
