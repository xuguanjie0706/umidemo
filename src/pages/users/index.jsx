import { Flex, Toast, Drawer, ListView } from 'antd-mobile';
import { Layout, Nav, MyUserFilter as Filter, UserFilter } from '@/components';
import styles from './style.less';
import commStyle from '../common.less';
import { useState, useEffect, useRef, Fragment, useMemo } from 'react';
import { issuerUserInfoList } from '../api';
import UserSearchBtn from '@/components/filter/userSearchBtn';
import { getUserInfo } from '../login';
import EditUserModal from './editUserModal';
import RightsModal from './rightsModal';
import RenewModal from './renewModal';
import AddGroupModal from './addGroupModal';
import { groupList, tagList } from '../api';
import { connect } from 'dva';
import { userStatusObj } from '@/components/common';

const initDataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

const Users = function(props) {
  const [filterShow, setFilterShow] = useState(false);
  const [filterType, setFilterType] = useState('filter');
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const [editUserModalShow, setEditUserModalShow] = useState(false);
  const [renewModalShow, setRenewModalShow] = useState(false);
  const [rightsModalShow, setRightsModalShow] = useState(false);
  const [addGroupModalShow, setAddGroupModalShow] = useState(false);

  const filters = useRef({});
  function onFilter(result) {
    filters.current = result;
    setFilterShow(false);
    setList([]);
    getList();
  }

  const [uFilter, setUFilter] = useState(null);
  const uFIlterRef = useRef(null);
  function onUserFilter(result) {
    setFilterShow(false);
    uFIlterRef.current = result;
    setUFilter(result);
    setList([]);
    getList();
  }

  const [total, setTotal] = useState(0);
  const currentPage = useRef(1);
  const pageSize = 10;
  const scrollEl = useRef();

  function getList(page, more) {
    currentPage.current = page || 1;
    setIsLoading(true);
    const query = {};
    const body = {
      pageSize: pageSize,
      pageNum: currentPage.current,
      ...filters.current,
    };
    if (uFIlterRef.current) {
      body.userId = uFIlterRef.current.userId;
    }
    Toast.loading('加载中...', 3);
    issuerUserInfoList({ body, query })
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
        setIsLoading(false);
        Toast.hide();
        setIsFinish(true);
      });
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

  function showFilter(type) {
    setFilterType(type);
    setFilterShow(true);
  }

  function showEditUser(data) {
    setCurrentUser(data);
    setEditUserModalShow(true);
  }

  const [currentUser, setCurrentUser] = useState({});
  function showRights(data) {
    setCurrentUser(data);
    setRightsModalShow(true);
  }

  function showRenew(data) {
    setRenewModalShow(true);
  }

  const [groups, setGroups] = useState([]);
  function getGroups() {
    const body = { type: 2 };
    groupList({ body }).then(res => {
      setGroups(res.data);
    });
  }

  const [tags, setTags] = useState([]);
  function getTags() {
    const body = { type: 2 };
    tagList({ body }).then(res => {
      setTags(res.data);
    });
  }

  const initData = () => {
    props.dispatch({
      type: 'mobile/cdkeyPkgList',
      payload: {},
    });
  };

  useEffect(() => {
    getGroups();
    getTags();
    getList();
    initData();
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
            groups={groups}
            tags={tags}
            style={{ display: filterType === 'filter' ? 'flex' : 'none' }}
          ></Filter>
          <UserFilter
            onFilter={onUserFilter}
            style={{ display: filterType === 'userFilter' ? 'flex' : 'none' }}
          ></UserFilter>
        </Fragment>
      }
    >
      <Layout
        style={{ backgroundColor: '#F2F2F4' }}
        contentStyle={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        nav={<Nav style={{ backgroundColor: '#F2F2F4' }}>我的用户</Nav>}
      >
        <Flex className={styles.sectionTitle} direction="row" justify="between">
          <span>我的用户</span>
          <Flex direction="row">
            <UserSearchBtn
              style={{ background: '#fff' }}
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
        <Flex.Item className={styles.scrollView} ref={scrollEl}>
          <ListView
            dataSource={dataSource}
            style={{
              height: '100%',
              overflow: 'auto',
            }}
            renderFooter={() => (
              <div className={styles.scrollLoading}>
                {list.length === 0 && isFinish ? (
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
                ) : null}
              </div>
            )}
            renderRow={rowData => (
              <UserCard
                groups={groups}
                tags={tags}
                info={rowData}
                view={() => showRights(rowData)}
                edit={() => showEditUser(rowData)}
              ></UserCard>
            )}
            pageSize={pageSize}
            scrollRenderAheadDistance={500}
            onEndReached={onEndReached}
            onEndReachedThreshold={10}
          ></ListView>
        </Flex.Item>
        <EditUserModal
          key={currentUser.id || 'none'}
          user={currentUser}
          visible={editUserModalShow}
          groups={groups}
          tags={tags}
          onSuccess={() => getList()}
          onAddGroup={() => {
            setAddGroupModalShow(true);
            setEditUserModalShow(false);
          }}
          onClose={() => setEditUserModalShow(false)}
          onSaveTag={() => {
            getTags();
            getList();
          }}
        ></EditUserModal>
        <RightsModal
          user={currentUser}
          visible={rightsModalShow}
          onClose={() => setRightsModalShow(false)}
          onRenew={data => {
            showRenew(data);
            setRightsModalShow(false);
          }}
        ></RightsModal>
        <RenewModal
          initData={initData}
          visible={renewModalShow}
          pkgList={props.cdkeyPkgListData}
          user={currentUser}
          onSuccess={() => {
            setRightsModalShow(false);
            getList();
          }}
          onClose={() => setRenewModalShow(false)}
        ></RenewModal>
        <AddGroupModal
          visible={addGroupModalShow}
          onSuccess={() => getGroups()}
          onClose={() => {
            setAddGroupModalShow(false);
            setEditUserModalShow(true);
          }}
        ></AddGroupModal>
      </Layout>
    </Drawer>
  );
};

export default connect(({ mobile }) => ({
  ...mobile,
}))(Users);

function UserCard(props) {
  const info = props.info || {};

  const groupMap = useMemo(() => {
    const obj = {};
    props.groups.forEach(item => {
      obj[item.id] = item;
    });
    return obj;
  }, [props.groups]);

  const tagMap = useMemo(() => {
    const obj = {};
    props.tags.forEach(item => {
      obj[item.id] = item;
    });
    return obj;
  }, [props.tags]);

  function formatGroup(groupId) {
    const data = groupMap[groupId];
    return (data && data.name) || groupId || '-';
  }

  function formatTag(tagIdList) {
    tagIdList = tagIdList || [];
    const result = tagIdList.map(item => (
      <span key={item} className={styles.tagstext}>
        {(tagMap[item] && tagMap[item].name) || item}
      </span>
    ));
    return result || '-';
  }

  return (
    <div className={styles.userCard}>
      <div className={[styles.userCardHead, 'border-bottom-1px'].join(' ')}>
        <Flex direction="row" align="stretch">
          <div className={styles.userAvatar}>
            <img src={info.headImg} alt="" />
          </div>
          <Flex.Item className={styles.usernameWrap}>
            <div className={styles.username}>{info.nickName}</div>
            <div className={styles.joinTime}>
              加入时间：{info.createAt.slice(0, 10)}
            </div>
          </Flex.Item>
          <div
            className={
              styles.cardStatus +
              ' ' +
              (info.privilegeStatus >= 2 ? 'warning' : '')
            }
          >
            {userStatusObj[info.privilegeStatus]}
          </div>
        </Flex>
      </div>
      <div className={styles.userCardBody}>
        <div className={styles.userInfoItem}>联系方式：{info.userMobile}</div>
        <div className={styles.userInfoItem}>
          分组：{formatGroup(info.groupId)}
        </div>
        <div className={styles.userInfoItem}>
          标签：{formatTag(info.tagIdList)}
        </div>
        <div className={styles.userInfoItem}>备注：{info.remark || '-'}</div>
      </div>
      <Flex direction="row-reverse" className={styles.userCardFooter}>
        <div
          className={[styles.userButton, 'border-all-1px'].join(' ')}
          onClick={() => props.edit(info)}
        >
          编辑
        </div>
        <div
          className={[styles.userButton, 'border-all-1px'].join(' ')}
          onClick={() => props.view(info)}
        >
          查看
        </div>
      </Flex>
    </div>
  );
}
