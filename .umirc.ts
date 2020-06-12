/*
 * @Author: xgj
 * @since: 2020-06-12 09:28:21
 * @lastTime: 2020-06-12 10:26:09
 * @LastAuthor: xgj
 * @FilePath: /um/.umirc.ts
 * @message:
 */
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
      path: '/m/',
      redirect: '/m/agent',
    },
    {
      path: 'login',
      name: '登录',
      component: '@/pages/login/index',
      __isDynamic: true,
    },

    {
      path: 'agent',
      name: '代理人',
      component: '@/pages/agent/index',
      __isDynamic: true,
    },
    {
      path: 'success',
      name: '提交成功',
      component: '@/pages/SubmitSuccess/index',
      __isDynamic: true,
    },
    {
      path: 'addagentbusy/:inviteUid',
      name: '添加代理商',
      component: '@/pages/AddAgentBusy/index',
      __isDynamic: true,
    },
    {
      path: 'addagent',
      name: '添加代理人',
      component: '@/pages/AddAgent/index',
      __isDynamic: true,
    },
    {
      path: 'subAgent',
      name: '下级代理',
      component: '@/pages/agent/subAgent',
      __isDynamic: true,
    },
    {
      path: 'subAgent/:id',
      name: '下级代理详情',
      component: '@/pages/agent/subAgentDetail',
      __isDynamic: true,
    },
    {
      path: 'dispatchs',
      name: '分发记录',
      component: '@/pages/dispatchs',
      __isDynamic: true,
    },
    {
      path: 'users',
      name: '我的用户',
      component: '@/pages/users',
      __isDynamic: true,
    },
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
      exclude: ['/node_modules/'],
    }),
    cssnano({
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false,
      zindex: false,
    }),
  ],
  lessLoader: {
    test: /.less$/,
    exclude: [/node_modules/],
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          localIndexName: '[name]__[local]___[hash:base64:5]',
        },
      },
      {
        loader: require.resolve('less-loader'), // compiles Less to CSS
      },
    ],
  },
  // ignoreMomentLocale: {},
});
