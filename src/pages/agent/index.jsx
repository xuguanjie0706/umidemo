import { Flex, Button, Carousel } from 'antd-mobile';
import { Layout, Nav, Package, AgentCard, DispatchModal } from '@/components';
import styles from './style.less';
import commStyle from '../common.less';
import { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'umi';
import { connect } from 'dva';
import { getUserInfo, clearUserInfo } from '../login';
import {
  logout as logoutApi,
  distributionStatistics,
  rightsStatistics,
} from '../api';

const Agent = props => {
  const [dispatchModalShow, setDispatchModalShow] = useState(false);
  const history = useHistory();

  const [dispatchId, setDispatchId] = useState(null);

  function flexHeight() {
    setTimeout(() => {
      const dom = document;
      const list = dom.querySelector('.slider-list');
      if (!list) {
        return;
      }
      if (!list.firstChild) {
        return;
      }
      const sliders = list.childNodes;
      const height = sliders[packageIndex].clientHeight;
      console.log(height);
      const style = list
        .getAttribute('style')
        .replace(/height\s?:\s?[^\;]+\;/, 'height: ' + height + 'px;');
      list.setAttribute('style', style);
    });
  }

  const user = getUserInfo();

  const [userPackages, setUserPackages] = useState([]);
  const [userDistribution, setUserDistribution] = useState({});

  function getUserPackages() {
    rightsStatistics({}).then(res => {
      setUserPackages(res.data);
    });
  }

  function getUserDistribution() {
    distributionStatistics({}).then(res => {
      setUserDistribution(res.data);
    });
  }

  useEffect(() => {
    getUserPackages();
    getUserDistribution();
    return () => {};
  }, []);

  const info = useMemo(() => {
    return {
      ...userDistribution,
      name: user.realName,
      createAt: user.createAt,
    };
  }, [user, userDistribution]);

  const [packageIndex, setPackageIndex] = useState(0);
  const packages = userPackages;
  // const packages = [
  //   { id: 1, rightsDetails: [] },
  //   { id: 2, rightsDetails: [] },
  //   { id: 3, rightsDetails: [] },
  // ];

  const [resendInfo, setResendInfo] = useState(null);
  function resend(item) {
    setDispatchModalShow(true);
    setResendInfo(item);
  }

  function logout() {
    logoutApi({}).then(res => {
      props.dispatch({
        type: 'mobile/logout',
      });
      clearUserInfo();
      history.push('/m/login');
    });
  }

  function onSend(body) {
    getUserDistribution();
  }

  function renderPackage(item) {
    return (
      <Package
        key={item.pkgId}
        data={item}
        flexHeight={flexHeight}
        button={
          <Button
            type="primary"
            size="small"
            className={styles.primaryBg + ' ' + styles.dispatchBtn}
            onClick={() => {
              setResendInfo(null);
              setDispatchModalShow(true);
              setDispatchId(item.pkgId);
            }}
          >
            分发
          </Button>
        }
      ></Package>
    );
  }

  return (
    <Layout nav={<Nav>代理人</Nav>}>
      <div className={commStyle.marginTop30}></div>
      <AgentCard
        info={info}
        // toSubAgent={() => history.push('./subAgent')}
        logout={() => logout()}
      ></AgentCard>
      <Flex className={styles.sectionTitle} justify="between">
        <span>权益套餐</span>
        <span className={styles.smallFont}>
          <span className={styles.activeText}>
            {packages.length === 0 ? 0 : packageIndex + 1}
          </span>
          /{packages.length}
        </span>
      </Flex>
      {packages.length === 0 ? <div>无数据</div> : ''}
      {packages.length === 1 ? renderPackage(packages[0]) : ''}
      {packages.length > 1 ? (
        <Carousel
          autoplay={false}
          infinite
          className={styles.carousel}
          afterChange={setPackageIndex}
        >
          {packages.map(renderPackage)}
        </Carousel>
      ) : (
        ''
      )}
      <div className={styles.moduleWrap}>
        <Flex direction="row">
          <div
            className={styles.moduleEntry}
            onClick={() => history.push('./users')}
          >
            <div
              className={[styles.iconMyUser, styles.iconEntry].join(' ')}
            ></div>
            <span className={styles.entryText}>我的用户</span>
          </div>

          <div
            className={styles.moduleEntry}
            onClick={() => history.push('./subAgent')}
          >
            <div
              className={[styles.iconMyDaili, styles.iconEntry].join(' ')}
            ></div>
            <span className={styles.entryText}>我的代理</span>
          </div>
        </Flex>
        <Flex direction="row " style={{ marginTop: 15 }}>
          <div
            className={styles.moduleEntry}
            onClick={() => history.push('./addagent')}
          >
            <div
              className={[styles.iconMyHuazhuan, styles.iconEntry].join(' ')}
            ></div>
            <span className={styles.entryText}>权益划转</span>
          </div>

          <div
            className={styles.moduleEntry}
            onClick={() => history.push('./dispatchs')}
          >
            <div
              className={[styles.iconMyDispatch, styles.iconEntry].join(' ')}
            ></div>
            <span className={styles.entryText}>分发记录</span>
          </div>
        </Flex>
      </div>
      <DispatchModal
        visible={dispatchModalShow}
        dispatchId={dispatchId}
        user={user}
        resendInfo={resendInfo}
        key={(resendInfo && resendInfo.id) || dispatchId}
        onClose={() => {
          setDispatchModalShow(false);
          setDispatchId(null);
          setResendInfo(null);
        }}
        onSend={onSend}
      ></DispatchModal>
    </Layout>
  );
};

export default connect(({ mobile }) => ({
  ...mobile,
}))(Agent);
