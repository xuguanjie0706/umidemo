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
  routes: [{ path: '/', component: '@/pages/index' }],
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
