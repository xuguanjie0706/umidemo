const Model = {
  namespace: 'global',
  state: {
    collapsed: true,
    notices: [],
  },
  effects: {

  },
  reducers: {
    changeLayoutCollapsed(state = {
      notices: [],
      collapsed: true,
    },
      { payload }, ) {
      return { ...state, collapsed: payload };
    }
  }
}
export default Model