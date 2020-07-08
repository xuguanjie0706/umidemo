// // https://umijs.org/config/
// import { defineConfig } from 'umi';
// import defaultSettings from './defaultSettings';
// import proxy from './proxy';
// import router from './router.config';

// const { REACT_APP_ENV } = process.env;
// console.log(REACT_APP_ENV);

// export default defineConfig({
//   // history: {
//   //   type: "hash"
//   // },
//   // menu: {
//   //   locale: false,  //关闭国际化
//   // },
//   title: '金泽康养后台',
//   hash: true,
//   antd: {},
//   dva: {
//     hmr: true,
//   },
//   // locale: {
//   //   // default zh-CN
//   //   default: 'zh-CN',
//   //   // default true, when it is true, will use `navigator.language` overwrite default
//   //   antd: true,
//   //   baseNavigator: true,
//   // },
//   dynamicImport: {
//     loading: '@/components/PageLoading/index',
//   },
//   targets: {
//     ie: 11,
//   },
//   // umi routes: https://umijs.org/docs/routing
//   routes: router,
//   // Theme for antd: https://ant.design/docs/react/customize-theme-cn
//   theme: {
//     // ...darkTheme,
//     // '@primary-color': '#1464E8',
//     '@modal-body-padding': '16px',
//     '@border-radius-base': '4px',
//     '@item-hover-bg': '#F3F7FF',
//     'primary-color': defaultSettings.primaryColor,
//   },
//   // @ts-ignore
//   title: false,
//   ignoreMomentLocale: true,
//   proxy: proxy[REACT_APP_ENV || 'dev'],
//   manifest: {
//     basePath: './',
//     // publicPath: './',
//   },
//   base: '/saas',
//   publicPath: './',
//   // chunks: ['umi'],
//   // chainWebpack: function (config, { webpack }) {
//   //   config.merge({
//   //     optimization: {
//   //       minimize: true,
//   //       splitChunks: {
//   //         cacheGroups: {
//   // antd: {
//   //   test: /node_modules\/antd/,
//   //   chunks: "all",
//   //   name: "antd",
//   //   minSize: 0,
//   // },
//   // echarts: {
//   //   test: /node_modules\/echarts/,
//   //   chunks: "all",
//   //   name: "echarts",
//   //   minSize: 0,
//   // },
//   // xlsx: {
//   //   test: /node_modules\/xlsx/,
//   //   chunks: "all",
//   //   name: "xlsx",
//   //   minSize: 0,
//   // },
//   // custom: {
//   //   test: /src\/components\/Custom(ModalContainer|SearchBtnContainer|CustomSearchContainer|Table)/,
//   //   chunks: "all",
//   //   name: "custom",
//   //   minSize: 0,
//   // },
//   //         }
//   //       }
//   //     }
//   //   })
//   // }

//   // 加速打包不进行babel
//   // nodeModulesTransform: {
//   //   type: 'none',
//   //   exclude: [],
//   // },
// });
