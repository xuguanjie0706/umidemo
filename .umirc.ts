import { defineConfig } from 'umi';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import postcssAspectRatioMini from 'postcss-aspect-ratio-mini';
import postcssWriteSvg from 'postcss-write-svg';
import postcsscssnext from 'postcss-cssnext';
import pxToViewPort from 'postcss-px-to-viewport';
import cssnano from 'cssnano';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/m',
      component: '@/layouts/index',
      routes: [
        // {
        //   path: '/m/',
        //   redirect: '/m/agent',
        // },
        {
          path: 'login',
          name: '登录',
          component: '@/pages/login/index',
        },

        //     {
        //       path: 'agent',
        //       name: '代理人',
        //       component: '@/pages/mobile/agent/index',
        //       __isDynamic: true,
        //     },
        //     {
        //       path: 'success',
        //       name: '提交成功',
        //       component: '@/pages/mobile/SubmitSuccess/index',
        //       __isDynamic: true,
        //     },
        //     {
        //       path: 'addagentbusy/:inviteUid',
        //       name: '添加代理商',
        //       component: '@/pages/mobile/AddAgentBusy/index',
        //       __isDynamic: true,
        //     },
        //     {
        //       path: 'addagent',
        //       name: '添加代理人',
        //       component: '@/pages/mobile/AddAgent/index',
        //       __isDynamic: true,
        //     },
        //     {
        //       path: 'subAgent',
        //       name: '下级代理',
        //       component: '@/pages/mobile/agent/subAgent',
        //       __isDynamic: true,
        //     },
        //     {
        //       path: 'subAgent/:id',
        //       name: '下级代理详情',
        //       component: '@/pages/mobile/agent/subAgentDetail',
        //       __isDynamic: true,
        //     },
        //     {
        //       path: 'dispatchs',
        //       name: '分发记录',
        //       component: '@/pages/mobile/dispatchs',
        //       __isDynamic: true,
        //     },
        //     {
        //       path: 'users',
        //       name: '我的用户',
        //       component: '@/pages/mobile/users',
        //       __isDynamic: true,
        //     },
      ],
    },
    // {
    //   path: '*',
    //   redirect: '/m/agent',
    // },
  ],
  extraPostCSSPlugins: [
    postcssImport({}),
    postcssUrl({}),
    postcssAspectRatioMini({}),
    postcssWriteSvg({ utf8: false }),
    postcsscssnext({}),
    pxToViewPort({
      viewportWidth: 375, // (Number) The width of the viewport.
      viewportHeight: 667, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
    }),
    cssnano({
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false,
      zindex: false,
    }),
  ],
});
