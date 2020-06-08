/*
 * @Author: xgj
 * @since: 2020-05-27 14:05:32
 * @lastTime: 2020-06-08 13:24:56
 * @LastAuthor: xgj
 * @FilePath: /um/.umirc.ts
 * @message: 
 */
import { defineConfig } from 'umi';
// import { StepForwardOutlined } from "a"

export default defineConfig({
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  title: "管理后台",
  // layout: {},
  routes: [
    {
      path: "login",
      component: '@/layouts/Login'
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          icon: "icon-shouye",
          name: '首页',
          component: '@/pages/Home'
        },
        {
          name: '系统配置',
          icon: "icon-lingdang",
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
        {
          component: '@/layouts/404',
        },
      ]

    }, {
      component: '@/layouts/404',
    }
  ],
  publicPath: "./"
});
