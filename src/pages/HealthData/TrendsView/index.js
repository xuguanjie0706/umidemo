import ReactCharts from '@/components/reactCharts';
import React, { useEffect, useState } from 'react';
import { Form, message, Col, Row, Card } from 'antd';

const serviceLineOption = {
  // xAxis: {
  //   type: 'category',
  //   data: []
  // },
  // tooltip: {
  //   show: true,
  //   trigger: 'axis',
  // },
  // legend: {
  //   data: ['分发数', '领取数'],
  //   bottom: 0,
  //   padding: [5, 20],
  //   height: 300
  // },
  // grid: {
  //   top: '4%',
  //   left: '4%',
  //   right: '3%',
  //   bottom: '20%',
  //   containLabel: true
  // },
  // color: ['#39C575', '#3F87FF'],
  // yAxis: {
  //   type: 'value',
  //   minInterval: 1,
  // },
  // series: [
  //   {
  //     name: '分发数',
  //     type: 'line',
  //     data: [1, 2, 3, 4, 5, 6]
  //   },
  //   {
  //     name: '领取数',
  //     type: 'line',
  //     data: []
  //   },
  // ]

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    right: 'right',
    top: 'center',
    data: ['正常', '偏高', '偏低'],
    itemWidth: 10,
    itemHeight: 10,
  },
  color: ['#39C575', '#F4667C', '#FBD54A'],
  series: [
    {
      name: '血糖',
      type: 'pie',
      radius: ['30%', '80%'],
      avoidLabelOverlap: false,
      // center: ['50%', '70%'],
      data: [
        { value: 335, name: '正常' },
        { value: 310, name: '偏高' },
        { value: 234, name: '偏低' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

Object.freeze(serviceLineOption);
const TrendsView = props => {
  const [dataSource, setDataSource] = useState(serviceLineOption);
  return (
    <div className="hl-margin-b16">
      <Row gutter={16}>
        <Col span={12}>
          <Card title={<span className="hl-title-blue">血压分布</span>}>
            <div style={{ height: 300, marginBottom: 30 }}>
              <ReactCharts option={dataSource} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={<span className="hl-title-blue">血糖分布</span>}>
            <div style={{ height: 300, marginBottom: 30 }}>
              <ReactCharts option={dataSource} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default TrendsView;
