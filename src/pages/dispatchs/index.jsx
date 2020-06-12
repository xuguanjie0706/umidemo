import { Flex, Toast, Drawer } from 'antd-mobile';
import {
  Layout,
  Nav,
  Filter,
  UserFilter,
  DispatchList,
  DispatchModal,
} from '@/components';
import styles from './style.less';
import commStyle from '../common.less';
import { useState, useEffect, useRef, Fragment } from 'react';
import { cardIssueRecord } from '../api';
import UserSearchBtn from '@/components/filter/userSearchBtn';
import { getUserInfo } from '../login';

export default function(props) {
  const [filterShow, setFilterShow] = useState(false);
  const [filterType, setFilterType] = useState('filter');
  const [isFinish, setIsFinish] = useState(false);

  const filters = useRef({});
  function onFilter(result) {
    filters.current = result;
    setFilterShow(false);
    getDispatchList(1);
  }

  const [uFilter, setUFilter] = useState(null);
  const uFIlterRef = useRef(null);
  function onUserFilter(result) {
    setFilterShow(false);
    uFIlterRef.current = result;
    setUFilter(result);
    getDispatchList(1);
  }

  const [dispatchModalShow, setDispatchModalShow] = useState(false);
  const user = getUserInfo();

  const [listData, setListData] = useState([]);

  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const currentPage = useRef(1);

  function getDispatchList(page, silent) {
    !silent && Toast.loading('加载中...', 0);
    currentPage.current = page || 1;
    const query = {};
    const body = {
      pageNum: currentPage.current,
      pageSize: pageSize,
      ...filters.current,
    };
    if (uFIlterRef.current) {
      body.userId = uFIlterRef.current.userId;
    }
    cardIssueRecord({ body, query })
      .then(result => {
        Toast.hide();
        setTotal(result.data.total);
        setListData(result.data.list);
        setIsFinish(true);
      })
      .catch(err => {
        Toast.hide();
        setIsFinish(true);
      });
  }

  function showFilter(type) {
    setFilterType(type);
    setFilterShow(true);
  }

  const [resendInfo, setResendInfo] = useState(null);
  function resend(item) {
    setDispatchModalShow(true);
    setResendInfo(item);
  }
  function onSend() {
    getDispatchList(1, 'slient');
  }

  useEffect(() => {
    getDispatchList(1);
    return () => {};
  }, []);

  return (
    <Drawer
      open={filterShow}
      onOpenChange={val => setFilterShow(!filterShow)}
      transitions
      sidebarStyle={{ background: '#fff' }}
      position="right"
      onClick={() => setFilterShow(false)}
      sidebar={
        <Fragment>
          <Filter
            onFilter={onFilter}
            packages={props.userPackagesData}
            style={{ display: filterType === 'filter' ? 'flex' : 'none' }}
          ></Filter>
          <UserFilter
            onFilter={onUserFilter}
            style={{ display: filterType === 'userFilter' ? 'flex' : 'none' }}
          ></UserFilter>
        </Fragment>
      }
    >
      <Layout nav={<Nav>分发记录</Nav>}>
        <div className={commStyle.marginTop30}></div>
        <Flex className={styles.sectionTitle} direction="row" justify="between">
          <span>分发记录</span>
          <Flex direction="row">
            <UserSearchBtn
              onClick={() => showFilter('userFilter')}
              onClear={() => onUserFilter(null)}
            >
              {uFilter ? `${uFilter.nickname}/${uFilter.mobile}` : ''}
            </UserSearchBtn>
            <div
              className={styles.showFilterBtn}
              onClick={() => showFilter('filter')}
            ></div>
          </Flex>
        </Flex>
        <DispatchList
          isFinish={isFinish}
          list={listData}
          current={currentPage.current}
          total={Math.ceil(total / pageSize)}
          changePage={getDispatchList}
          resend={resend}
        ></DispatchList>

        <DispatchModal
          visible={dispatchModalShow}
          user={user}
          resendInfo={resendInfo}
          key={(resendInfo && resendInfo.id) || 'none'}
          onClose={() => {
            setDispatchModalShow(false);
            setResendInfo(null);
          }}
          onSend={onSend}
        ></DispatchModal>
      </Layout>
    </Drawer>
  );
}
