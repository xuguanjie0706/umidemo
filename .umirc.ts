/*
 * @Author: xgj
 * @since: 2020-05-27 14:05:32
 * @lastTime: 2020-06-05 15:42:06
 * @LastAuthor: xgj
 * @FilePath: /um/.umirc.ts
 * @message: 
 */
import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {},
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        { path: '/home', name: '首页', component: '@/pages/Home' },
        {
          name: '系统配置',
          icon: "StepForwardOutlined",
          routes: [
            {
              path: '/role',
              name: '权限',
              component: '@/pages/Role'
            },
            {
              path: '/user',
              name: '用户',
              component: '@/pages/User',
            }
          ],
        },
      ]
    }, {

    }
  ],
  publicPath: "./"
});
