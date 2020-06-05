/*
 * @Author: xgj
 * @since: 2020-05-27 14:05:32
 * @lastTime: 2020-06-05 15:03:08
 * @LastAuthor: xgj
 * @FilePath: /um/.umirc.ts
 * @message: 
 */
import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {},
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    {
      path: '/',
      name: '概览',
      icon: "StepForwardOutlined",
      routes: [
        {
          path: '/home',
          name: '概览',
          component: '@/pages/Home'
        },
        {
          path: '/home',
          name: '概览',
          component: '@/pages/index',
        }
      ],
    },
    { path: '/home', name: '概览', component: '@/pages/Home' },
  ],
  publicPath: "./"
});
