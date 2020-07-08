/*
 * @Author: xgj
 * @since: 2020-07-08 16:21:43
 * @lastTime: 2020-07-08 16:42:32
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
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  dva: {
    hmr: true,
  },
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   antd: true,
  //   // baseNavigator: true,
  // },
  targets: {
    ie: 11,
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  title: defaultSettings.title,
  theme: {
    // ...darkTheme,
    // '@primary-color': '#1464E8',
    '@modal-body-padding': '16px',
    '@border-radius-base': '4px',
    '@item-hover-bg': '#F3F7FF',
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  // layout: {},
  // publicPath: "./",
  routes: router,
});
