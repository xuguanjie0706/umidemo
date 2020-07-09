import React, { useState } from 'react';
import { Form, Card } from 'antd';

/**
 * @description: TableComponent  Table组件 WrappedComponent2  查询表单   CustomComponent 按钮表单
 * @param {type}
 * @return:
 */
const CustomSearchContainer = (
  TableComponent,
  SearchComponent,
  ButtonComponent,
  AddComponent,
) => {
  const Index = props => {
    // const defaultProps = {
    //   dafaultData: {},
    //   formItemLayout: {
    //     labelCol: { span: 7 },
    //     wrapperCol: { span: 14 }
    //   },
    //   title: '数据新增',
    //   width: 520
    // };

    const { formItemLayout, customTitle, customSize = 'small' } = props;
    // let form = null;
    // if (SearchComponent) {

    const [form] = SearchComponent ? Form.useForm() : [null];
    // }
    const [child, setChild] = useState(null);
    // const [defaultData, setDefaultData] = useState({});

    const onRef = ref => {
      setChild(ref);
    };

    const handleSubmit = value => {
      child.initData({ pageNum: 1, ...value });
    };

    return (
      <>
        {TableComponent && (
          <Card
            size={customSize}
            style={{ marginBottom: 12 }}
            title={customTitle}
          >
            {AddComponent && <AddComponent />}
            {SearchComponent && (
              <Form
                style={{
                  backgroundColor: 'rgb(244, 244, 244)',
                  padding: '16px 16px 0',
                  marginBottom: '16px',
                }}
                form={form}
                onFinish={handleSubmit}
                {...formItemLayout}
              >
                <SearchComponent form={form} {...props} />
                {ButtonComponent && <ButtonComponent {...props} />}
              </Form>
            )}
            <TableComponent form={form} onFatherRef={onRef} {...props} />
          </Card>
        )}
      </>
    );
  };

  return Index;
};

export default CustomSearchContainer;
