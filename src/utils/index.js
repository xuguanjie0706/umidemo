/**
 * @description 防抖
 * @param {function}  fn  函数
 * @param {Number}  wait  延迟时间
 * @return {function}
 * @default 1000 毫秒
 * @example debounce(()=>console.log(123),1000)
 */
export const debounce = (fn, wait = 1000) => {
  let timeout = null;
  return function () {
    if (timeout !== null)
      clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
};



/**
 * @description 节流
 * @param {function}  fn  函数
 * @param {Number}  delay  延迟时间
 * @return {function}
 * @default 1000 毫秒
 * @example throttle(()=>console.log(123),1000)
 */
export const throttle = (fn, delay = 1000) => {
  let prev = 0;
  return () => {
    const now = Date.now();
    if (now - prev >= delay) {
      // eslint-disable-next-line prefer-spread
      // eslint-disable-next-line prefer-rest-params
      fn.apply(null, arguments);
      prev = Date.now();
    }
  };
};


/**
 * @description 一次函数
 * @param {function}  fn  函数
 * @return {function}
 * @example const cli = once(() => console.log(123));
 */
export const once = (func) => {
  let done;
  return function () {
    if (!done) {
      func.apply(null, arguments);
      done = true;
    }
  };
};


/**
 * @description 随机字符串
 * @return {String}
 * @example randomString()
 */

export const randomString = () => {
  return Math.random().toString(36).substr(2);
};
/**
 * @description 随机字符串
 * @param {Array}  arr  数字数组
 * @return {Array}
 * @example arraySort([1,2,3,4])
 */
export function arraySort(arr = []) {
  return arr.sort((x, y) => x - y);
}

/**
 * @description 字符串复制的转成数组 通过空格分开 支持多空格
 * @param {String}  str  字符串
 * @param {arr}  arr  属性数字
 * @return {Array}
 * @example getArray("1231 dsafda",["index"])
 */

export const getArray = (str, arr) => {
  const len = arr.length;
  const reg = /(^\s*)|(\s*$)/g;
  const a = str.replace(reg, '').replace(/\s+/g, ' ').split(' ');
  if (!len) {
    return a;
  }
  const array = [];
  for (let i = 0; i < Math.ceil((a.length - 1) / len); i++) {
    const obj = {};
    let index = 0;
    for (const j in arr) {
      obj[arr[j]] = a[len * i + index];
      index = (index + 1) % len;
    }
    array.push(obj);
  }
  return array;
};