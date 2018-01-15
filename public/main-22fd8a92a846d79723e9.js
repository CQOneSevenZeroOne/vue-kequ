/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(21)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAACWCAMAAACcjiYKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNUFFMzM2RTdGNEFFNzExQUQ5NzhBRjIxRjkxRUZCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0ODRFMzVBN0Y2MDExMUU3OTA3REMzRkQzQ0I3OTJDMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0ODRFMzVBNkY2MDExMUU3OTA3REMzRkQzQ0I3OTJDMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwRDk5RTIxMTI1QkU3MTFCRTIzQ0VBRUI4RDlEQjk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE1QUUzMzZFN0Y0QUU3MTFBRDk3OEFGMjFGOTFFRkJGIi8+IDwvcmRmOkRlc2NyaXB0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"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xbanner_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__xadver_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__xtitle_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__xpickets_vue__ = __webpack_require__(27);
//
//
//
//
//
//
//
//
//引入公共组键




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    xbanner: __WEBPACK_IMPORTED_MODULE_0__xbanner_vue__["a" /* default */],
    xadver: __WEBPACK_IMPORTED_MODULE_1__xadver_vue__["a" /* default */],
    xtitle: __WEBPACK_IMPORTED_MODULE_2__xtitle_vue__["a" /* default */],
    xpickets: __WEBPACK_IMPORTED_MODULE_3__xpickets_vue__["a" /* default */]
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_xheader_vue__ = __webpack_require__(36);
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    xheader: __WEBPACK_IMPORTED_MODULE_0__index_xheader_vue__["a" /* default */]
  }
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = _interopRequireDefault(__webpack_require__(10));

var _vueRouter = _interopRequireDefault(__webpack_require__(13));

var _xhome = _interopRequireDefault(__webpack_require__(14));

var _xlogin = _interopRequireDefault(__webpack_require__(33));

var _xindex = _interopRequireDefault(__webpack_require__(35));

__webpack_require__(44);

__webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入路由插件
_vue.default.use(_vueRouter.default); //选项卡组件


var router = new _vueRouter.default({
  routes: [// （缩写）相当于 routes: routes
  {
    path: '/index',
    component: _xindex.default,
    children: [{
      path: 'xhome',
      component: _xhome.default
    }]
  }, {
    path: '/login',
    component: _xlogin.default
  }]
});
new _vue.default({
  el: "#demo",
  router: router,
  template: "\n        <div>\n            <router-view></router-view> \n        </div>\n    "
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    if (value$1) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}

function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(11).setImmediate))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(12);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(5)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)))

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xhome_vue__ = __webpack_require__(6);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_25837f0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xhome_vue__ = __webpack_require__(32);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xhome_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_25837f0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xhome_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index\\tab\\xhome.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25837f0e", Component.options)
  } else {
    hotAPI.reload("data-v-25837f0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0b5f7de2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xbanner_vue__ = __webpack_require__(16);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0b5f7de2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xbanner_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index\\xbanner.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b5f7de2", Component.options)
  } else {
    hotAPI.reload("data-v-0b5f7de2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "banner" } }, [
      _c("a", { attrs: { href: "#" } }, [
        _c("img", { attrs: { src: __webpack_require__(17) } })
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0b5f7de2", esExports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAEECAMAAABA9EGBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNUFFMzM2RTdGNEFFNzExQUQ5NzhBRjIxRjkxRUZCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0ODEzQzNERkY2MDExMUU3OTA3REMzRkQzQ0I3OTJDMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0ODEzQzNERUY2MDExMUU3OTA3REMzRkQzQ0I3OTJDMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwRDk5RTIxMTI1QkU3MTFCRTIzQ0VBRUI4RDlEQjk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE1QUUzMzZFN0Y0QUU3MTFBRDk3OEFGMjFGOTFFRkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+vM+lhAAAAwBQTFRFuef/yuv/hs7+PHiyasb+7mBwmNb+to6L2apmzLawYpCmc7z3jCcI2dDM1awDdcuu/O0CZV1gqnJxr4h1kk1LjrHXMYLJzJQE6SJEii4s2VQT2O/+vYgF5rsHk8yjhxQEx3SEtW8Ftt7+5tnV1erTeQQDsSNIhhMT/vesua2O8MtXt6+tz8i6qFMGcK7Zkm9u68kD+9wE7Ozqyq2Qi9b+3Pf+6hw4hQQEeRME7fftmUUG3WMYj0I4ehMSzLc4/doTTrry7NoCxZeSlmFSfCYmtdXRMIS6+u7ts01Rlc783MkE//sR6urc/e/5/e+5fyIORZXN9dUulKm5egYSsGpY2LjBhQYSd8br0Wc1/esShYSQ7uoB01UmccnPqNnry93thxUjiMju3Ozo6u/7i5OvZUg/tNBtt5qhVafaVcX7udzomdft/Lx67/oB0c81vOfWl8zt+rAry6Cos1VmeRMjrUkwl9DOk1dg6vfK68YU697i6dezdtb9U7eG8HIq6+7I7fe7cpnAxenpshQ/7Es551cUZsXv7ffa08SSqjU9/MoW+MwE6WMX+OjilBUE7O+8/O7Hadb/djtDhbOYawMD7NsU6LOy3Pfs+uw+8c2E8oJ++I1FmjcI/u+sp8rnw5gpomUGlRUU/e+ISprmps77UTs3rnUzy/f+ll817/msc8b/jNbq2fDF7+gVlQYEkAMV7ueqaxEGahMVtsjalOf7lOPBzffkeNbvRmOC5J4NcgES//e1//////e9///3///e///n//fG///v//fO///W//fWe87///f3//8Ae8b/rd7///f///cA///OcM7/o97///fe9///7/f/c8b39/f3//8I5/f/9//3//cI9/cA7/f37///9/8A9/e9pdb/9/e19/f///fn//fv9/fvfcX3///G5/f37//15v//9/cJ9//v9/fGb872//+9//+xpdb3rd719/fe9/fO9//W9v/n9/8J9/fne8729/fW9//e9v/O5f/29v+y9v+99v/Gr9b7sudbXwABH9ZJREFUeNrsvX1Qk+e6/wv6IMYniTEJxQgYXnz6DCWEF4tJaCIF0oJg5lHCO1ZBrNhaXYpaDv52O0O12VZb5leK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"

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_75fb095a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xadver_vue__ = __webpack_require__(22);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(19)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_75fb095a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xadver_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index\\xadver.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-75fb095a", Component.options)
  } else {
    hotAPI.reload("data-v-75fb095a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5218ac80", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75fb095a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xadver.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75fb095a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xadver.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n#adv {height:0.95rem;font-size:0.28rem;color:#484848;border-left:0.16rem solid #ff4e00;text-align:center;overflow:hidden\n}\n#adv .road{float:left;width:20%;line-height:0.88rem;\n}\n#adv ul {float:left;width:72%;border-left:1px solid #dadada;margin:0.06rem 0;padding:0 0.1rem\n}\n#adv ul li{display:flex;justify-content:space-between;align-items: center;margin-top:0.05rem;\n}\n#adv ul li span i{display:block;padding:0 0.1rem;border:1px solid #FF4E00;border-radius:0.06rem;color:#FF4E00;font-size:0.12rem\n}\n#adv ul li span {display:flex;\n}\n#adv ul li p{margin-left:0.2rem\n}\n#adv ul li b{color:#FF4E00;\n}\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "adv" } }, [
      _c("div", { staticClass: "road" }, [_vm._v("\n        促销线路\n     ")]),
      _vm._v(" "),
      _c("ul", { staticClass: "road-detail" }, [
        _c("li", [
          _c("span", [
            _c("i", [_vm._v("路线")]),
            _vm._v(" "),
            _c("p", [_vm._v("海南三亚五日自助游")])
          ]),
          _vm._v(" "),
          _c("b", [_vm._v("¥5000")])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("span", [
            _c("i", [_vm._v("路线")]),
            _vm._v(" "),
            _c("p", [_vm._v("海南三亚五日自助游")])
          ]),
          _vm._v(" "),
          _c("b", [_vm._v("¥5000")])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("span", [
            _c("i", [_vm._v("路线")]),
            _vm._v(" "),
            _c("p", [_vm._v("海南三亚五日自助游")])
          ]),
          _vm._v(" "),
          _c("b", [_vm._v("¥5000")])
        ])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-75fb095a", esExports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1fe36b12_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xtitle_vue__ = __webpack_require__(26);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(24)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1fe36b12_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xtitle_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index\\xtitle.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fe36b12", Component.options)
  } else {
    hotAPI.reload("data-v-1fe36b12", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ad5af0ae", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1fe36b12\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xtitle.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1fe36b12\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xtitle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n#title{height:0.9rem;border-top:0.3rem solid #ebebeb;\n}\n#title ul{display:flex;justify-content:space-around;align-items:center;height:0.85rem;background-color:#f8f8f8;border-bottom:1px solid #dadada;line-height:0.85rem\n}\n#title ul li{width:33.33%;text-align:center;color:#484848;font-size:0.32rem;font-weight:600;font-family:\"\\5B8B\\4F53\";letter-spacing: 0.1rem;\n}\n#title ul .active{background-color:#0094a3;color:#fff;\n}\n", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "title" } }, [
      _c("ul", [
        _c("li", { staticClass: "active" }, [_vm._v("门票")]),
        _vm._v(" "),
        _c("li", [_vm._v("跟团游")]),
        _vm._v(" "),
        _c("li", [_vm._v("自由行")])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1fe36b12", esExports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d042d6c6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xpickets_vue__ = __webpack_require__(30);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(28)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d042d6c6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xpickets_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index\\xpickets.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d042d6c6", Component.options)
  } else {
    hotAPI.reload("data-v-d042d6c6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5979cc06", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d042d6c6\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xpickets.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d042d6c6\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xpickets.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n#list{margin:0 0.3rem;position:relative\n}\n#list ul li{min-height:1.9rem;border-bottom:1px solid #dadada;display:flex;justify-content: space-between;align-items:center;\n}\n#list .list-left a{display:flex;justify-content: space-between;align-items: center;color:#484848\n}\n#list .list-left .listpic{width:2rem;height:1.5rem\n}\n#list .list-left .intruct{margin-left:0.36rem;width:2.24rem;overflow:hidden\n}\n#list .list-left .intruct h4{font-weight:normal;font-size:0.28rem;line-height:0.28rem;\n}\n.list-left .intruct p{color:#8a8a8a;font-size:0.12rem;line-height:0.4rem\n}\n.intruct p i{color:#FF4E00\n}\n.list-left .intruct span{display:block;font-size:0.16rem;margin-top:0.2rem\n}\n.list-right span{display:block;color:#FF4E00;font-size:0.36rem;text-align:center;line-height:0.58rem\n}\n.list-right span i{font-size:0.22rem\n}\n.list-right a{display:block;text-align:center;color:#fff;background-color:#0094a3;border-radius:0.05rem;font-size:0.22rem;padding:0.15rem 0.4rem\n}\n.list-right .collected{background-color:#b6b6b6\n}\n.returntop{position:absolute;top:4.3rem;right:0;width:0.76rem;height:0.76rem;overflow:hidden\n}\r\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "list" } }, [
      _c("ul", [
        _c("li", [
          _c("div", { staticClass: "list-left" }, [
            _c("a", { attrs: { href: "#" } }, [
              _c("div", { staticClass: "listpic" }, [
                _c("img", { attrs: { src: __webpack_require__(3) } })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "intruct" }, [
                _c("h4", [_vm._v("重庆游乐园")]),
                _vm._v(" "),
                _c("p", [
                  _vm._v("已售"),
                  _c("i", [_vm._v("42424")]),
                  _vm._v("份")
                ]),
                _vm._v(" "),
                _c("span", [_vm._v("重庆")])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "list-right" }, [
            _c("span", [_c("i", [_vm._v("¥")]), _vm._v("50")]),
            _vm._v(" "),
            _c("a", { attrs: { href: "#" } }, [_vm._v("收藏")])
          ])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("div", { staticClass: "list-left" }, [
            _c("a", { attrs: { href: "#" } }, [
              _c("div", { staticClass: "listpic" }, [
                _c("img", { attrs: { src: __webpack_require__(3) } })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "intruct" }, [
                _c("h4", [_vm._v("重庆游乐园")]),
                _vm._v(" "),
                _c("p", [
                  _vm._v("已售"),
                  _c("i", [_vm._v("42424")]),
                  _vm._v("份")
                ]),
                _vm._v(" "),
                _c("span", [_vm._v("重庆")])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "list-right" }, [
            _c("span", [_c("i", [_vm._v("¥")]), _vm._v("50")]),
            _vm._v(" "),
            _c("a", { attrs: { href: "#" } }, [_vm._v("收藏")])
          ])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("div", { staticClass: "list-left" }, [
            _c("a", { attrs: { href: "#" } }, [
              _c("div", { staticClass: "listpic" }, [
                _c("img", { attrs: { src: __webpack_require__(3) } })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "intruct" }, [
                _c("h4", [_vm._v("重庆游乐园")]),
                _vm._v(" "),
                _c("p", [
                  _vm._v("已售"),
                  _c("i", [_vm._v("42424")]),
                  _vm._v("份")
                ]),
                _vm._v(" "),
                _c("span", [_vm._v("重庆")])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "list-right" }, [
            _c("span", [_c("i", [_vm._v("¥")]), _vm._v("50")]),
            _vm._v(" "),
            _c("a", { staticClass: "collected", attrs: { href: "#" } }, [
              _vm._v("已收藏")
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "returntop" }, [
        _c("img", { attrs: { src: __webpack_require__(31) } })
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d042d6c6", esExports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAMAAADwSaEZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNUFFMzM2RTdGNEFFNzExQUQ5NzhBRjIxRjkxRUZCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUIwRDlGNEY2Q0ExMUU3ODk0REY2QzlFOTlGNDAyMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUIwRDlGM0Y2Q0ExMUU3ODk0REY2QzlFOTlGNDAyMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwRDk5RTIxMTI1QkU3MTFCRTIzQ0VBRUI4RDlEQjk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE1QUUzMzZFN0Y0QUU3MTFBRDk3OEFGMjFGOTFFRkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f8GuiwAAAJZQTFRFsrKy////wMDAxcXFt7e34ODg9PT00tLSs7Ozurq67+/v39/f+Pj46+vr7e3t+vr65+fn4eHh+fn5/f396enp19fX8fHx5eXl9fX13d3d6Ojow8PD+/v77u7u9vb25ubm4uLi7Ozs6urqtra2yMjI8/PzwsLC8vLywcHB5OTk8PDwuLi49/f3/v7+4+PjtLS00dHR////HB6L5wAAADJ0Uk5T/////////////////////////////////////////////////////////////////wANUJjvAAADPElEQVR42sTY6XaqMBAA4Jmr0TQsAmJRC+5aly7X93+5O6EuLIFEpOfO6Z/a8gmThcnAuTJs4TEWrY6zGCni2XEVMeYJu/oKqPg8FgfmbbEUW48dRPwQ9rHyvcHlctsNI9+PQte+fDDw/NWHMTaeLkR6WTDvv3XhFt23/jxI/yAW07ERNnDZa3pHkx2HUvDdJL3DV+YO9JhgS/nPzkYhXbyNI/9jyYQGC5yFzNX0DWrjbSpzt3DsOuzdkrf12gFtdGQqltZ7NSasMeJwxMEg+GiIOLZEFeYyesTeHgxj36NHZa4ac336Lm8NxrH26Dl8V4Wl1oTDA8EneQ3u+SJrBA/GiLR73uA2joMGVqoNbmN6wQI5jhNoEBM5pkEOc2h+ebwJxmkUlk4WE180J9bQKNY0Q77EHQsoYcM9NIz9kNIW3DDHaZT8zCA4zhUbM1qPvDnGaZ2y8QWb0i/Ztc27BpH98g7dzPQHm/m052S/yUWDcLNX0I60+EixkPbo3P7VM8F6uf2NdvJQYjFlzMnl4NQxiFPuEhpBFhOWzBE38GRsEOcJYVaANn8W4zYG1hls1nBRlpYosyGhtbV7HtvR2k4g2mKge8oXIV50zxngNgKLUqezaK70dBoNowWUsr7e0mt9ShocCjO2wtJqNG8PECJ2dRZLf+q1LmIIR7R1Vv8P4p++TrPxCLP8klVZIDHQaS7OIKa701g/mE4LMQbESGddMI0WIRLm66wrVq/5tdjNumG12g8W6aw7VqfJx6wagIyVwWo0OQAVUyNrZbFqTU4N9aTNWTmsUrNRqJdT3spjFVq6nFQLvWAVMLWWLnTFFlS0iphSS7cgxeaYFP0iJq9MVJujYttefRbutYTB38+VattWvFD4CXQYnLjqhWLyqlNg6ledyUtYj11ewiblgR67lgflwqUBdi1cyiXV49itpCoXe49j92KvVIY+jGXKUH2BrMFyBbK2dNdgudJde6j4TpJv40PFWSyeO+4sxG8dxJ49Itq/d3ht91jd7oG/3VZEu02Sdts37TaWzme7xZZX2oxzzJpxjrYZ13KbMG1g+kl9AzPxDRuYMmYhq2utsnD2v5q+DdvR/wQYADt486i0bC4mAAAAAElFTkSuQmCC"

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("xbanner"),
      _vm._v(" "),
      _c("xadver"),
      _vm._v(" "),
      _c("xtitle"),
      _vm._v(" "),
      _c("xpickets")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-25837f0e", esExports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xlogin_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xlogin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xlogin_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xlogin_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xlogin_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b356aed8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xlogin_vue__ = __webpack_require__(34);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xlogin_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b356aed8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xlogin_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\container\\xlogin.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b356aed8", Component.options)
  } else {
    hotAPI.reload("data-v-b356aed8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var esExports = {render:function(){},staticRenderFns: []}
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b356aed8", esExports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xindex_vue__ = __webpack_require__(8);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_46a5f506_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xindex_vue__ = __webpack_require__(43);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_xindex_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_46a5f506_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xindex_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\container\\xindex.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46a5f506", Component.options)
  } else {
    hotAPI.reload("data-v-46a5f506", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_82876e7a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xheader_vue__ = __webpack_require__(39);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(37)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_82876e7a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_xheader_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components\\index\\xheader.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-82876e7a", Component.options)
  } else {
    hotAPI.reload("data-v-82876e7a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6e3d7724", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-82876e7a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xheader.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.8@css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-82876e7a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xheader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n#go header{height:1rem;background-color:#0094a3;display:flex;justify-content:space-between;align-items: center;padding:0 0.12rem;\n}\n#go .shopcar{position:absolute;display:none;\n}\n#go .logo{height:0.6rem;width:0.6rem;\n}\n#go .home{height:0.6rem;width:0.6rem;\n}\n#go .person{height:0.6rem;width:0.6rem;\n}\n#go .more{height:0.6rem;width:0.6rem;\n}\n#go .search{width:3.32rem;height:0.58rem;line-height:0.58rem;position:relative;background-color:#fff;border-radius:0.1rem;\n}\n#go .search input{border:0;outline: none;text-indent:0.25rem;width:3rem;position:absolute;top:0.16rem;left:0.15rem;\n}\r\n", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "go" } }, [
      _c("header", [
        _c("div", { staticClass: "logo" }, [
          _c("a", { attrs: { href: "#" } }, [_c("img", { attrs: { src: "" } })])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "home" }, [
          _c("a", { attrs: { href: "#" } }, [
            _c("img", { attrs: { src: __webpack_require__(40) } })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "search" }, [
          _c("span", [_c("img", { attrs: { src: "" } })]),
          _vm._v(" "),
          _c("input", {
            attrs: { type: "text", placeholder: "请输入你想搜索的内容" }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "person" }, [
          _c("a", { attrs: { href: "" } }, [
            _c("img", { attrs: { src: __webpack_require__(41) } })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "more" }, [
          _c("a", { attrs: { href: "#" } }, [
            _c("img", { attrs: { src: __webpack_require__(42) } })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "shopcar" }, [
            _c("div", {}, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "" } }),
                _vm._v(" "),
                _c("p", [_vm._v("收藏")])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "custor" }, [
              _c("a", { attrs: { href: "#" } }, [
                _c("img", { attrs: { src: "" } }),
                _vm._v(" "),
                _c("p", [_vm._v("客服")])
              ])
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-82876e7a", esExports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNUFFMzM2RTdGNEFFNzExQUQ5NzhBRjIxRjkxRUZCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0N0VENzY5RUY2MDExMUU3OTA3REMzRkQzQ0I3OTJDMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0N0VENzY5REY2MDExMUU3OTA3REMzRkQzQ0I3OTJDMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwRDk5RTIxMTI1QkU3MTFCRTIzQ0VBRUI4RDlEQjk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE1QUUzMzZFN0Y0QUU3MTFBRDk3OEFGMjFGOTFFRkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bV0CPwAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAA0klEQVR42uzWSw6AIAwE0Pb+lzYxGvudOuw0sFGRZyIMH1FURPBrbLGWwUItk0VaRgu0zPbUEp4hvlv56zv8NLruCGzbSC4Qhya+1wYc+zh9C+A8Pq4G4mpsQx+0uM6FqQW4y5Qbuwb3ebRZqzHKsslaifE8eLJW4XEGgoSNcz+nh7A5qYxNSaVsTCpnQ1JJ65PKWpdU2tqk8tYkdcHGVVF1Ra9ZDZYZqrQZkVivv07r2ivsVwUa+1m18TruduS/4+YQufHG38PdqXo+b38LHwIMAPW7CpDs1z6/AAAAAElFTkSuQmCC"

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNUFFMzM2RTdGNEFFNzExQUQ5NzhBRjIxRjkxRUZCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0N0VENzZBMkY2MDExMUU3OTA3REMzRkQzQ0I3OTJDMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0N0VENzZBMUY2MDExMUU3OTA3REMzRkQzQ0I3OTJDMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwRDk5RTIxMTI1QkU3MTFCRTIzQ0VBRUI4RDlEQjk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE1QUUzMzZFN0Y0QUU3MTFBRDk3OEFGMjFGOTFFRkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Yt/HOgAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAAt0lEQVR42uzWwQ7DIAwDUPv/f3rXqdiuKWPTJHJrySstRSSgCbyFzbmnnqOhjiNQeZmxSHUa2pZ3qyxzH53VIwqHv5dw3hLD4IjJpA8++OB/wtiCsRNHvfX0XMPMh/7DclNhplpVVsnuhdBVtLI+q0z0mAZzZeYCw/ckdwumWyfXUJkk+0wYHDs2OYiKmgSUVCahpmLlMEEHDs7QC5+lsqPmVCzQtOkmNVf01/Fnvvk3sTA/XwIMAF5JCrf/BDd6AAAAAElFTkSuQmCC"

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAADiMSURBVHgBAHw4g8cA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///+F////8////4X///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAMAAAD6AAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAACFAAAA+QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+QAAAIUB////+QAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD0AgAAAIwAAAD6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7AAAAkgH///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/QAAAAAAAAD6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIkAAAD1AAAAjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD//xkkBo0P0FrUAAAAAElFTkSuQmCC"

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("xheader"), _vm._v(" "), _c("router-view")], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-46a5f506", esExports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(46)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.8@css-loader/index.js!./reset.css", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.8@css-loader/index.js!./reset.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "body,div,p,ul,li,ol,form,fildset,input,h1,h2,h3,h4,h5,h6{margin:0;padding:0;}\r\nhtml,body{max-width:750px;margin: 0 auto;font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";}\r\na{text-decoration: none}\r\nimg{max-width: 100%;max-height: 100%;border: 0;display: block}\r\nem,b,i,strong{font-style:normal;font-weight:normal;}\r\nul li {list-style:none}", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(47);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

(function (doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function recalc() {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;

    if (clientWidth >= 750) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

/***/ })
/******/ ]);