export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};

console.log(1);

// export default {
//   // base: "/app1", // 子应用的 base，默认为 package.json 中的 name 字段
//   base: `/app1`, // 子应用的 base，默认为 package.json 中的 name 字段
//   qiankun: {},
// };
