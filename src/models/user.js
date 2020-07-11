import api from '@/api';

const Model = {
  namespace: 'user',
  state: {
    status: false,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(api.Administrator.login, payload);
      if (response) {
        yield put({
          type: 'changeStatus',
          payload: true,
          key: 'status',
        });
        return true
      } else {
        return false
      }
    },
    *loginOut(_, { put }) {
      yield put({
        type: 'changeStatus',
        payload: false,
        key: 'status'
      });
      history.replace({
        pathname: '/login',
      });
    },
  },
  reducers: {
    changeStatus(state, { payload, key }) {
      return { ...state, [key]: payload };
    }
  }
}
export default Model