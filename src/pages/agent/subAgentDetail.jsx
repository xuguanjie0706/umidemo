import { Flex, Drawer, Carousel, Toast } from 'antd-mobile';
import {
  Layout,
  Nav,
  Filter,
  Package,
  AgentCard,
  DispatchList,
  UserFilter,
} from '@/components';
import styles from './style.less';
import commStyles from '../common.less';

import {
  useState,
  useEffect,
  useMemo,
  useRef,
  Fragment,
  useLayoutEffect,
} from 'react';
import { useParams, useLocation, useHistory } from 'umi';
import {
  rightsStatistics,
  distributionStatistics,
  cardIssueRecord,
} from '../api';
import UserSearchBtn from '@/components/filter/userSearchBtn';
import ReactDOM from 'react-dom';

export default props => {
  const history = useHistory();
  const location = useLocation();

  const locationState = useMemo(() => {
    let locationState = null;
    if (location.state) {
      locationState = location.state;
      localStorage.setItem('subAgentDetail', JSON.stringify(location.state));
    } else {
      const string = localStorage.getItem('subAgentDetail');
      try {
        locationState = JSON.parse(string);
      } catch (error) {}
      if (!locationState) {
        history.replace('/m/subAgent');
      }
    }
    return locationState;
  }, [location.state]);

  const [filterShow, setFilterShow] = useState(false);
  const [filterType, setFilterType] = useState('filter');
  const routeParams = useParams();

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

  const [listData, setListData] = useState([]);
  const [packages, setPackages] = useState([]);

  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const currentPage = useRef(1);

  function getDispatchList(page) {
    Toast.loading('加载中...', 0);
    currentPage.current = page || 1;
    const query = {};
    const body = {
      issuerId: locationState.issuerId,
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
      })
      .catch(err => {
        Toast.hide();
      });
  }

  const [agentInfo, setAgentInfo] = useState({});

  function getAgentInfo() {
    const body = {
      issuerId: locationState.issuerId,
    };
    distributionStatistics({ body }).then(result => {
      setAgentInfo({
        ...result.data,
        name: locationState.issuerName,
        createAt: locationState.createAt,
      });
    });
  }

  function getPackages() {
    const body = {
      issuerId: locationState.issuerId,
    };
    rightsStatistics({ body }).then(result => {
      setPackages(result.data);
    });
  }

  function showFilter(type) {
    setFilterType(type);
    setFilterShow(true);
  }

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

  const [packageIndex, setPackageIndex] = useState(0);

  useEffect(() => {
    document.title = locationState.issuerName + ' - 下级代理详情';
    getAgentInfo();
    getPackages();
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
            packages={packages}
            style={{ display: filterType === 'filter' ? 'flex' : 'none' }}
          ></Filter>
          <UserFilter
            onFilter={onUserFilter}
            style={{ display: filterType === 'userFilter' ? 'flex' : 'none' }}
          ></UserFilter>
        </Fragment>
      }
    >
      <Layout nav={<Nav>{locationState.issuerName + ' - 下级代理详情'}</Nav>}>
        <div className={commStyles.marginTop30}></div>
        <AgentCard info={agentInfo} color={2}></AgentCard>
        <Flex className={styles.sectionTitle} justify="between">
          <span>权益套餐</span>
          <span className={styles.smallFont}>
            <span className={styles.activeText}>
              {packages.length === 0 ? 0 : packageIndex + 1}
            </span>
            /{packages.length}
          </span>
        </Flex>
        {packages.length === 0 ? (
          <div>无数据</div>
        ) : (
          <Carousel
            autoplay={false}
            infinite
            className={styles.carousel}
            afterChange={setPackageIndex}
          >
            {packages.map(item => (
              <Package
                key={item.pkgId}
                data={item}
                flexHeight={flexHeight}
              ></Package>
            ))}
          </Carousel>
        )}
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
          list={listData}
          current={currentPage.current}
          total={Math.ceil(total / pageSize)}
          changePage={getDispatchList}
        ></DispatchList>
      </Layout>
    </Drawer>
  );
};
