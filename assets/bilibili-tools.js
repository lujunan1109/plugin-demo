var browserIns = null
var userAgent = window.navigator.userAgent
var toString = Object.prototype.toString

function typeOf(obj) {
  var maps = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return maps[toString.call(obj)]
}

function uaMatch(ua) {
  var rwebkit = /(webkit)[ \/]([\w.]+)/,
    ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
    rmsie = /(msie) ([\w.]+)/,
    rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
    // Matches dashed string for camelizing
    rdashAlpha = /-([a-z]|[0-9])/ig,
    rmsPrefix = /^-ms-/;
  ua = (ua || window.navigator.userAgent).toLowerCase();
  var match = rwebkit.exec(ua) ||
    ropera.exec(ua) ||
    rmsie.exec(ua) ||
    ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
  return {
    browser: match[1] || "",
    version: match[2] || "0"
  };
}

/**
//  * @description 检测函数
 * @param obj
 * @returns {boolean}
 */
export function isFunction(obj) {
  return typeOf(obj) === 'function'
}
/**
//  * @description 检测数组
 * @param obj
 * @returns {boolean}
 */
export function isArray(obj) {
  return typeOf(obj) === 'array'
}
/**
//  * @description 检测数字
 * @param obj
 * @returns {boolean}
 */
export function isNumber(obj) {
  return typeOf(obj) === 'number'
}

export function isString(obj) {
  return typeOf(obj) === 'string'
}
/**
//  * @description 检测
 * @param obj
 * @returns {boolean}
 */
export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(obj) === proto
}

/**
//  * @description 扩展数据
 * @returns {any | Object | {} | extend}
 */
export function extend() {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (typeof target !== "object" && !this.isFunction(target)) {
    target = {};
  }
  if (length === i) {
    target = this;
    --i;
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && this.isArray(src) ? src : [];
          } else {
            clone = src && this.isPlainObject(src) ? src : {};
          }
          target[name] = this.extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

export function getNowTs() {
  return (new Date()).getTime();
}

export function getBrowser() {
  if (!browserIns) {
    browserIns = uaMatch(userAgent)
  }
  return browserIns
}

/**
 * @description
 * @param obj
 * @returns {string}
 */
export function stringifyQuery(obj) {
  let res = obj ? (Object.keys(obj).map(function(key) {
    let encode = window.encodeURIComponent
    let val = obj[key]
    if (val === undefined) {
      return ''
    }
    if (val === null) {
      return encode(key)
    }
    if (Array.isArray(val)) {
      let result = []
      val.slice().forEach(function(val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key))
        } else {
          result.push(encode(key) + '=' + encode(val2))
        }
      })
      return result.join('&')
    }
    return encode(key) + '=' + encode(val)
  }).filter(function(x) {
    return x.length > 0
  }).join('&')) : null
  return (res || '')
}

/**
 * @description 解析URL参数
 * @param url
 * @returns {string}
 */
export function parseQuery(url) {
  url = url || window.location.href
  var querys = url.split("?");
  var params = querys[1] ? querys[1].split("&") : [];
  var obj = {};
  for (var i = 0; i < params.length; i++) {
    var param = params[i] || ''
    var index = param.indexOf('=');
    obj[param.substr(0, index)] = param.substr(index + 1);
    // var param = params[i].split("=");
    // obj[param[0]] = param[1];
  }
  return obj;
}

/**
 * @description 检测不同的pc和移动端类型
 * @param
 * @returns {object}
 */
export function os() {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;

  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}

/**
 * @description: 对pc和移动端分别做不同的跳转
 * @param
 */
export function diffLink() {
  var os = os();
  if (os.isPc) {
    location.replace("http://www.onlymid.com.cn/");
  }

  if (os.isAndroid || os.isPhone) {
    location.replace('http://www.onlymid.com.cn/html/2016shujia/wap/');
  } else if (os.isTablet) {
    location.replace('http://www.onlymid.com.cn/html/2016shujia/wap/');
  }
}


/**
 * @description: 判断数据是真还是假
 * @param
 */
export function isTrueOrFalse(val) {
  var arr = [undefined, null, "", '', 0, NaN, false]
  if (arr.includes(val)) return false;
  return true;
}



export default {
  isFunction,
  isArray,
  isNumber,
  isPlainObject,
  extend,
  getNowTs,
  getBrowser,
  stringifyQuery,
  parseQuery
}




// WEBPACK FOOTER //
// ./src/utils/index.js