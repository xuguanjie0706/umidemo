import React from 'react';
import { Button, Form, Row, Col } from 'antd';

// const { confirm } = Modal;

const CustomSearchBtnContainer = WrappedComponent1 => {
  const Index = props => {
    // const { form, handleEdit, table, handleDelete, isAdd = true } = props;
    // const { resetFields } = form;
    // const Delete = () => {
    //   confirm({
    //     title: "确定要删除吗?",
    //     async onOk() {
    //       await handleDelete({ ids: table.state.selectedKey });
    //       table.cleanSelectedKey();
    //     },
    //     onCancel() {}
    //   });
    // };
    return (
      <Row>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <Button
              type="primary"
              style={{ marginRight: 10, width: 80 }}
              htmlType="submit"
            >
              筛选
            </Button>
          </Form.Item>
        </Col>
        {WrappedComponent1 && <WrappedComponent1 {...props} />}
      </Row>
    );
  };

  return Index;
};

export default CustomSearchBtnContainer;
