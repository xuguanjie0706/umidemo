import React from 'react';
import { Table, Button } from 'antd';

const Home = () => {
  const columns = [
    { title: '菜单编号', dataIndex: 'num', key: 'num' },
    { title: '菜单名称', dataIndex: 'name', key: 'name' },
    { title: '图标选中', dataIndex: 'name1', key: 'name1' },
    { title: '图标未选中', dataIndex: 'name2', key: 'name2' },
    {
      title: '操作', key: 'action', render: (text) => <span><Button type="link">编辑</Button><Button type="link">删除</Button></span>
    },
  ]

  const data = []
  for (let i = 0; i < 3; ++i) {
    // let arr = []
    // for (let j = 0; i < 3; ++i) {
    //   arr.push({
    //     key: j,
    //     name: "你" + j + "nihao",
    //     num: "你" + j + 'This is production name',
    //     name1: "你" + j + "fafd",
    //     name2: "你" + j + 'Upgraded: 56',
    //   })
    // }
    data.push({
      key: i,
      name: i + "nihao",
      num: i + 'This is production name',
      name1: i + "fafd",
      name2: i + 'Upgraded: 56',
      // item: arr
    });
  }
  return (
    <div>
      <Table
        // className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
        footer={() => <Button type="primary">添加</Button>}
      // footer={123}
      />
    </div>
  )
}


const expandedRowRender = () => {
  const columns = [
    { title: '菜单编号', dataIndex: 'num', key: 'num' },
    { title: '菜单名称', dataIndex: 'name', key: 'name' },
    { title: '图标选中', dataIndex: 'name1', key: 'name1' },
    { title: '图标未选中', dataIndex: 'name2', key: 'name2' },
    {
      title: '操作', key: 'action', render: (text) => <span><Button type="link">编辑</Button><Button type="link">删除</Button></span>
    },
  ]
  const data = []
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: i + "nihao",
      num: i + 'This is production name',
      name1: i + "fafd",
      name2: i + 'Upgraded: 56',
    });
  }
  return <Table footer={() => <Button type="primary">添加</Button>} expandable={{ expandedRowRender1 }} columns={columns} dataSource={data} pagination={false} ></Table>
}

const expandedRowRender1 = () => {
  const columns = [
    { title: '菜单编号', dataIndex: 'date', key: 'date' },
    { title: '菜单名称', dataIndex: 'name', key: 'name' },
    { title: '图标选中', dataIndex: 'name', key: 'name1' },
    { title: '图标未选中', dataIndex: 'name', key: 'name2' },
    {
      title: '操作', key: 'action', render: (text) => <div><Button type="link">编辑</Button><Button type="link">删除</Button></div>
    },
  ]
  const data = []
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: i + "nihao",
      num: i + 'This is production name',
      name1: i + "fafd",
      name2: i + 'Upgraded: 56',
    });
  }
  return <Table footer={() => <Button type="primary">添加</Button>} columns={columns} dataSource={data} pagination={false} ></Table>
}




export default Home