import { rightsStatistics, distributionStatistics, cdkeyPkgList } from '../api';

function getInitialState() {
  return {
    userPackagesData: [],
    userDistributionData: null,
    cdkeyPkgListData: [],
  };
}

export default {
  namespace: 'mobile',

  state: getInitialState(),

  effects: {
    *userPackages({ payload }, { call, put }) {
      const res = yield call(rightsStatistics, payload);
      if (res) {
        yield put({
          type: 'userPackagesData',
          payload: res.data,
        });
        return res;
      }
      return [];
    },
    *userDistribution({ payload }, { call, put }) {
      const res = yield call(distributionStatistics, payload);
      if (res) {
        yield put({
          type: 'userDistributionData',
          payload: res.data,
        });
        return res;
      }
      return [];
    },
    *cdkeyPkgList({ payload }, { call, put }) {
      const res = yield call(cdkeyPkgList, payload);
      if (res) {
        yield put({
          type: 'cdkeyPkgListData',
          payload: res.data,
        });
        return res;
      }
      return [];
    },
    *logout({ payload }, { call, put }) {
      yield put({
        type: 'logoutData',
      });
    },
  },

  reducers: {
    userPackagesData(state, action) {
      return {
        ...state,
        userPackagesData: action.payload,
      };
    },
    userDistributionData(state, action) {
      return {
        ...state,
        userDistributionData: action.payload,
      };
    },
    cdkeyPkgListData(state, action) {
      return {
        ...state,
        cdkeyPkgListData: action.payload,
      };
    },
    logoutData(state, action) {
      return getInitialState();
    },
  },
};
