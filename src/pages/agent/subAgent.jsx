import { useState, useRef, useEffect, useMemo, Fragment } from 'react';
import { useHistory, history } from 'umi';
import {
  Drawer,
  Flex,
  Modal,
  List,
  InputItem,
  Picker,
  ListView,
  Toast,
} from 'antd-mobile';
import { Layout, Nav, SubFilter } from '@/components';
import styles from './subAgent.less';
import agentStyles from './style.less';
import commStyles from '../common.less';
import { createForm } from 'rc-form';
import moment from 'moment';
import { connect } from 'dva';
import { addSubAgent, editSubAgent, chnerIssuerList } from '../api';
import { getUserInfo } from '../login';
import { rcErrorsToString } from '@/components/common';

const initDataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

const SubAgent = props => {
  const [filterShow, setFilterShow] = useState(false);
  const [editSubAgentShow, setEditSubAgentShow] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const [total, setTotal] = useState(0);
  const currentPage = useRef(1);
  const pageSize = 10;
  const scrollEl = useRef();
  const filters = useRef({});

  function onFilter(result) {
    setFilterShow(false);
    console.log(result);
    filters.current = result;
    setList([]);
    getList();
  }

  function getList(page, more) {
    currentPage.current = page || 1;
    setIsLoading(true);
    const query = {};
    const body = {
      pageSize: 10,
      pageNum: currentPage.current,
      ...filters.current,
    };
    Toast.loading('加载中...', 3);
    chnerIssuerList({ body, query })
      .then(result => {
        const data = result.data;
        if (more) {
          setList(list.concat(data.list));
        } else {
          setList(data.list);
        }
        setTotal(data.total);
        setIsLoading(false);
        Toast.hide();
        setIsFinish(true);
      })
      .catch(err => {
        Toast.hide();
        setIsFinish(true);
        setIsLoading(false);
      });
  }

  function showAddSubAgent() {
    setEditSubAgentShow(true);
    setEditItem(null);
    // console.log(history);
    // history.push('./addagent');
  }

  function showEditSubAgent(item) {
    setEditSubAgentShow(true);
    setEditItem(item);
  }

  let dataSource = useMemo(() => {
    if (!dataSource) {
      dataSource = initDataSource;
    }
    return dataSource.cloneWithRows(list);
  }, [list]);

  function onEndReached() {
    if (isLoading || total <= list.length) {
      return;
    }
    getList(currentPage.current + 1, true);
  }

  useEffect(() => {
    getList();
    if (props.cdkeyPkgListData.length === 0) {
      props.dispatch({
        type: 'mobile/cdkeyPkgList',
        payload: {},
      });
    }
    return () => {
      console.log('卸载');
    };
  }, []);

  function afterEdit(body) {
    const record = list.find(item => item.id === body.id);
    if (record) {
      record.issuerMobile = body.issuerMobile;
      record.issuerName = body.issuerName;
    }
    setList(list.slice(0));
  }

  return (
    <Drawer
      open={filterShow}
      onOpenChange={val => setFilterShow(!filterShow)}
      transitions
      sidebarStyle={{ background: '#fff' }}
      position="right"
      onClick={() => setFilterShow(false)}
      sidebar={<SubFilter onFilter={onFilter}></SubFilter>}
    >
      <Layout
        style={{ backgroundColor: '#F2F2F4' }}
        contentStyle={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        nav={<Nav style={{ backgroundColor: '#F2F2F4' }}>下级代理</Nav>}
      >
        <div className={commStyles.marginTop30}></div>
        <Flex direction="row" justify="between" className={styles.subAgentHead}>
          <Flex direction="row" onClick={showAddSubAgent}>
            <div className={styles.agentAddText}>我的代理</div>
            <div className={styles.agentAddIcon}></div>
          </Flex>
          <Flex direction="row" align="center">
            <div
              className={agentStyles.showFilterBtn}
              onClick={() => setFilterShow(true)}
            ></div>
          </Flex>
        </Flex>
        <Flex.Item className={styles.scrollView} ref={scrollEl}>
          <ListView
            dataSource={dataSource}
            style={{
              height: '100%',
              overflow: 'auto',
            }}
            renderFooter={
              () => {
                return list.length === 0 && isFinish ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div className={styles.emptyData}></div>
                    <div>暂无数据</div>
                  </div>
                ) : (
                  <></>
                );
              }

              //   <div className={styles.scrollLoading}>
              //     {isLoading
              //       ? '加载中...'
              //       : total > list.length
              //         ? '滚动加载'
              //         : '加载完成'}
              //   </div>
            }
            renderRow={rowData => (
              <SubAgentCard
                info={rowData}
                edit={() => showEditSubAgent(rowData)}
              ></SubAgentCard>
            )}
            pageSize={pageSize}
            scrollRenderAheadDistance={500}
            onEndReached={onEndReached}
            onEndReachedThreshold={10}
          ></ListView>
        </Flex.Item>

        <EditSubAgentModal
          visible={editSubAgentShow}
          onClose={() => setEditSubAgentShow(false)}
          editItem={editItem}
          key={editItem ? editItem.id : 'add'}
          afterEdit={afterEdit}
          afterAdd={() => getList()}
        ></EditSubAgentModal>
      </Layout>
    </Drawer>
  );
};

export default connect(({ mobile }) => ({
  ...mobile,
}))(SubAgent);

function formatTime(time) {
  return moment(time).format('YYYY-MM-DD HH:mm');
}

function SubAgentCard(props) {
  const history = useHistory();
  return (
    <div className={styles.subCard}>
      <div className={styles.subCardTitle}>
        {props.info.issuerName}&emsp;({props.info.issuerMobile})
      </div>
      <div className={styles.subCardContent}>
        <div className={styles.subCardInfo}>
          添加时间：{formatTime(props.info.createAt)}
        </div>
        <div className={styles.subCardInfo}>
          累计发放数量：{props.info.issuingTotal}
        </div>
        <div className={styles.subCardInfo}>
          剩余分发数量：{props.info.stock}
        </div>
      </div>
      <div className={styles.subCardFooter}>
        <a
          className={styles.subCardBtn}
          onClick={() =>
            history.push('./subAgent/' + props.info.issuerId, props.info)
          }
        >
          详情
        </a>
        <a className={styles.subCardBtn} onClick={props.edit}>
          编辑
        </a>
      </div>
    </div>
  );
}

let EditSubAgentModal = createForm()(props => {
  const {
    getFieldProps,
    getFieldError,
    validateFields,
    setFieldsValue,
  } = props.form;

  const packages = props.cdkeyPkgListData.map(item => {
    return {
      label: item.pkgName,
      value: item.pkgId,
      amount: item.amount,
    };
  });

  const [packageValue, setpackageValue] = useState([]);
  const initValues = props.editItem || {};

  function submit() {
    validateFields((errors, values) => {
      if (errors) {
        Toast.info(rcErrorsToString(errors), 2, null, false);
        return;
      }
      values.amount = parseInt(values.amount);
      if (values.amount > amount) {
        Toast.info('数量不可超过可用分发数', 1, null, false);
        return;
      }
      const user = getUserInfo();
      props.onClose();
      if (props.editItem) {
        // 修改
        const query = {};
        const body = {
          id: props.editItem.id,
          groupId: props.editItem.groupId,
          issuerMobile: values.phone,
          issuerName: values.name,
        };
        editSubAgent({ query, body }).then(res => {
          Toast.success('修改成功', 2, null, false);
          props.afterEdit(body);
        });
      } else {
        if (packageValue.length === 0) {
          Toast.info('权益套餐不能为空', 2, null, false);
          return;
        }
        // 添加
        const query = {};
        const body = {
          amount: values.amount,
          issuerMobile: values.phone,
          issuerName: values.name,
          parentIssuerId: user.id,
          parentIssuerName: user.userName,
          pkgId: packageValue[0],
          userNickName: user.nickName,
          userRealName: user.realName,
        };
        addSubAgent({ query, body }).then(res => {
          Toast.success('添加成功', 2, null, false);
          props.afterAdd();
        });
      }
    });
  }

  const amount = useMemo(() => {
    const item = packages.find(item => item.value === packageValue[0]);
    return item ? item.amount : 0;
  }, [packageValue]);

  function onClose() {
    props.onClose();
  }

  return (
    <Modal
      visible={props.visible}
      transparent
      onClose={onClose}
      title={props.editItem ? '修改代理人' : '添加代理人'}
      className={styles.editSubAgentModal}
      footer={[
        { text: '取消', onPress: onClose },
        { text: '确认', onPress: submit },
      ]}
    >
      <List className={styles.modalInputWrap}>
        {props.editItem ? (
          ''
        ) : (
          <Picker
            value={packageValue}
            onChange={setpackageValue}
            data={packages}
            cols={1}
          >
            <List.Item className={styles.modalInput + ' ' + styles.pickerItem}>
              <span className={styles.pickerLabel}>套餐：</span>
              {packageValue.length > 0 ? (
                <span>
                  {packages.find(item => item.value === packageValue[0]).label}
                </span>
              ) : (
                <span className={styles.placeholder}>请选择权益套餐</span>
              )}

              <div className={styles.btnPicker}></div>
            </List.Item>
          </Picker>
        )}
        <InputItem
          type="text"
          clear
          className={styles.modalInput}
          placeholder="请输入姓名"
          labelNumber={3}
          {...getFieldProps('name', {
            initialValue: initValues.issuerName,
            rules: [{ required: true, message: '姓名不能为空' }],
          })}
          error={getFieldError('name')}
          onErrorClick={() => Toast.info(getFieldError('name'), 2, null, false)}
        >
          姓名：
        </InputItem>
        <InputItem
          type="number"
          clear
          className={styles.modalInput}
          placeholder="请输入手机号"
          labelNumber={3}
          disabled={!!props.editItem}
          {...getFieldProps('phone', {
            validateTrigger: 'onBlur',
            initialValue: initValues.issuerMobile,
            rules: [
              { required: true, message: '手机号不能为空' },
              { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' },
            ],
          })}
          error={getFieldError('phone')}
          onErrorClick={() =>
            Toast.info(getFieldError('phone'), 2, null, false)
          }
        >
          手机：
        </InputItem>
        {props.editItem ? (
          ''
        ) : (
          <InputItem
            type="number"
            clear
            className={styles.modalInput}
            placeholder="请输入数量"
            labelNumber={3}
            extra={<span>可用分发：{amount}</span>}
            {...getFieldProps('amount', {
              validateTrigger: 'onBlur',
              initialValue: initValues.amount,
              rules: [{ required: true, message: '数量不能为空' }],
            })}
            error={getFieldError('amount')}
            onErrorClick={() =>
              Toast.info(getFieldError('amount'), 2, null, false)
            }
          >
            数量：
          </InputItem>
        )}
      </List>
    </Modal>
  );
});

EditSubAgentModal = connect(({ mobile }) => ({
  ...mobile,
}))(EditSubAgentModal);
