/*
 * @Author: xgj
 * @since: 2020-07-08 16:21:43
 * @lastTime: 2020-07-09 11:08:15
 * @LastAuthor: xgj
 * @FilePath: /um/.umirc.js
 * @message:
 */

import { defineConfig } from 'umi';
import defaultSettings from './config/defaultSettings';
import proxy from './config/proxy';
import router from './config/router.config';

const { REACT_APP_ENV } = process.env;
console.log(REACT_APP_ENV);

export default defineConfig({
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  hash: true, //开启打包文件的hash值后缀
  antd: {},
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes: router,
  theme: {
    // ...darkTheme,
    // '@primary-color': '#1464E8',
    '@modal-body-padding': '16px',
    '@border-radius-base': '4px',
    '@card-radius': '8px',
    '@item-hover-bg': '#F3F7FF',
    'primary-color': defaultSettings.primaryColor,
  },
  title: defaultSettings.title,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // history: {
  //   type: 'hash',
  // },
  // devtool: 'source-map',//生成map文件
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   antd: true,
  //   // baseNavigator: true,
  // },

  // ignoreMomentLocale: true,
  // layout: {},
  // publicPath: "./",
});
