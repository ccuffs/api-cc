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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
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

/***/ "./resources/js/libs/3rdparty/flexsearch.compact.js":
/*!**********************************************************!*\
  !*** ./resources/js/libs/3rdparty/flexsearch.compact.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 FlexSearch v0.6.30
 Copyright 2019 Nextapps GmbH
 Author: Thomas Wilkerling
 Released under the Apache 2.0 Licence
 https://github.com/nextapps-de/flexsearch
*/


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (x, L, O) {
  var I;
  (I = O.define) && I.amd ? I([], function () {
    return L;
  }) : (I = O.modules) ? I[x.toLowerCase()] = L : "object" === ( false ? undefined : _typeof(exports)) ? module.exports = L : O[x] = L;
})("FlexSearch", function () {
  function x(a, b) {
    var c = b ? b.id : a && a.id;
    this.id = c || 0 === c ? c : ja++;
    this.init(a, b);
    ca(this, "index", function () {
      return this.a ? Object.keys(this.a.index[this.a.keys[0]].f) : Object.keys(this.f);
    });
    ca(this, "length", function () {
      return this.index.length;
    });
  }

  function L(a) {
    var b = B();

    for (var c in a) {
      if (a.hasOwnProperty(c)) {
        var d = a[c];
        E(d) ? b[c] = d.slice(0) : J(d) ? b[c] = L(d) : b[c] = d;
      }
    }

    return b;
  }

  function O(a, b) {
    var c = a.length,
        d = P(b),
        e = [];

    for (var h = 0, f = 0; h < c; h++) {
      var k = a[h];
      if (d && b(k) || !d && !b[k]) e[f++] = k;
    }

    return e;
  }

  function I(a, b, c, d, e, h, f, k, g, l) {
    c = da(c, f ? 0 : e, !1, !1, b, g, l);
    var p;
    k && (k = c.page, p = c.next, c = c.result);
    if (f) a = this.where(f, null, e, c);else {
      a = c;
      b = this.j;
      c = a.length;
      e = Array(c);

      for (h = 0; h < c; h++) {
        e[h] = b[a[h]];
      }

      a = e;
    }
    c = a;
    d && (P(d) || (K = d.split(":"), 1 < K.length ? d = ka : (K = K[0], d = la)), c.sort(d));
    return c = Q(k, p, c);
  }

  function ca(a, b, c) {
    Object.defineProperty(a, b, {
      get: c
    });
  }

  function r(a) {
    return new RegExp(a, "g");
  }

  function M(a, b) {
    for (var c = 0; c < b.length; c += 2) {
      a = a.replace(b[c], b[c + 1]);
    }

    return a;
  }

  function S(a, b, c, d, e, h, f, k) {
    if (b[c]) return b[c];
    e = e ? (k - (f || k / 1.5)) * h + (f || k / 1.5) * e : h;
    b[c] = e;
    e >= f && (a = a[k - (e + .5 >> 0)], a = a[c] || (a[c] = []), a[a.length] = d);
    return e;
  }

  function W(a, b) {
    if (a) {
      var c = Object.keys(a);

      for (var d = 0, e = c.length; d < e; d++) {
        var h = c[d],
            f = a[h];
        if (f) for (var k = 0, g = f.length; k < g; k++) {
          if (f[k] === b) {
            1 === g ? delete a[h] : f.splice(k, 1);
            break;
          } else J(f[k]) && W(f[k], b);
        }
      }
    }
  }

  function X(a) {
    var b = "",
        c = "";
    var d = "";

    for (var e = 0; e < a.length; e++) {
      var h = a[e];
      if (h !== c) if (e && "h" === h) {
        if (d = "a" === d || "e" === d || "i" === d || "o" === d || "u" === d || "y" === d, ("a" === c || "e" === c || "i" === c || "o" === c || "u" === c || "y" === c) && d || " " === c) b += h;
      } else b += h;
      d = e === a.length - 1 ? "" : a[e + 1];
      c = h;
    }

    return b;
  }

  function ma(a, b) {
    a = a.length - b.length;
    return 0 > a ? 1 : a ? -1 : 0;
  }

  function la(a, b) {
    a = a[K];
    b = b[K];
    return a < b ? -1 : a > b ? 1 : 0;
  }

  function ka(a, b) {
    var c = K.length;

    for (var d = 0; d < c; d++) {
      a = a[K[d]], b = b[K[d]];
    }

    return a < b ? -1 : a > b ? 1 : 0;
  }

  function Q(a, b, c) {
    return a ? {
      page: a,
      next: b ? "" + b : null,
      result: c
    } : c;
  }

  function da(a, b, c, d, e, h, f) {
    var k,
        g = [];

    if (!0 === c) {
      c = "0";
      var l = "";
    } else l = c && c.split(":");

    var p = a.length;

    if (1 < p) {
      var w = B(),
          t = [];
      var v, z;
      var n = 0,
          m;
      var F;
      var u = !0;
      var C,
          D = 0,
          Y,
          Z,
          T,
          aa;
      l && (2 === l.length ? (T = l, l = !1) : l = aa = parseInt(l[0], 10));

      if (f) {
        for (v = B(); n < p; n++) {
          if ("not" === e[n]) for (z = a[n], F = z.length, m = 0; m < F; m++) {
            v["@" + z[m]] = 1;
          } else Z = n + 1;
        }

        if (N(Z)) return Q(c, k, g);
        n = 0;
      } else Y = G(e) && e;

      var U;

      for (; n < p; n++) {
        var na = n === (Z || p) - 1;
        if (!Y || !n) if ((m = Y || e && e[n]) && "and" !== m) {
          if ("or" === m) U = !1;else continue;
        } else U = h = !0;
        z = a[n];

        if (F = z.length) {
          if (u) if (C) {
            var q = C.length;

            for (m = 0; m < q; m++) {
              u = C[m];
              var y = "@" + u;
              f && v[y] || (w[y] = 1, h || (g[D++] = u));
            }

            C = null;
            u = !1;
          } else {
            C = z;
            continue;
          }
          y = !1;

          for (m = 0; m < F; m++) {
            q = z[m];
            var A = "@" + q;
            var V = h ? w[A] || 0 : n;
            if (!(!V && !d || f && v[A] || !h && w[A])) if (V === n) {
              if (na) {
                if (!aa || --aa < D) if (g[D++] = q, b && D === b) return Q(c, D + (l || 0), g);
              } else w[A] = n + 1;

              y = !0;
            } else d && (A = t[V] || (t[V] = []), A[A.length] = q);
          }

          if (U && !y && !d) break;
        } else if (U && !d) return Q(c, k, z);
      }

      if (C) if (n = C.length, f) for (m = l ? parseInt(l, 10) : 0; m < n; m++) {
        a = C[m], v["@" + a] || (g[D++] = a);
      } else g = C;
      if (d) for (D = g.length, T ? (n = parseInt(T[0], 10) + 1, m = parseInt(T[1], 10) + 1) : (n = t.length, m = 0); n--;) {
        if (q = t[n]) {
          for (F = q.length; m < F; m++) {
            if (d = q[m], !f || !v["@" + d]) if (g[D++] = d, b && D === b) return Q(c, n + ":" + m, g);
          }

          m = 0;
        }
      }
    } else !p || e && "not" === e[0] || (g = a[0], l && (l = parseInt(l[0], 10)));

    b && (f = g.length, l && l > f && (l = 0), l = l || 0, k = l + b, k < f ? g = g.slice(l, k) : (k = 0, l && (g = g.slice(l))));
    return Q(c, k, g);
  }

  function G(a) {
    return "string" === typeof a;
  }

  function E(a) {
    return a.constructor === Array;
  }

  function P(a) {
    return "function" === typeof a;
  }

  function J(a) {
    return "object" === _typeof(a);
  }

  function N(a) {
    return "undefined" === typeof a;
  }

  function ea(a) {
    var b = Array(a);

    for (var c = 0; c < a; c++) {
      b[c] = B();
    }

    return b;
  }

  function B() {
    return Object.create(null);
  }

  var H = {
    encode: "icase",
    c: "forward",
    split: /\W+/,
    cache: !1,
    async: !1,
    u: !1,
    m: !1,
    a: !1,
    b: 9,
    threshold: 0,
    depth: 0
  },
      fa = {
    memory: {
      encode: "extra",
      c: "strict",
      threshold: 0,
      b: 1
    },
    speed: {
      encode: "icase",
      c: "strict",
      threshold: 1,
      b: 3,
      depth: 2
    },
    match: {
      encode: "extra",
      c: "full",
      threshold: 1,
      b: 3
    },
    score: {
      encode: "extra",
      c: "strict",
      threshold: 1,
      b: 9,
      depth: 4
    },
    balance: {
      encode: "balance",
      c: "strict",
      threshold: 0,
      b: 3,
      depth: 3
    },
    fast: {
      encode: "icase",
      c: "strict",
      threshold: 8,
      b: 9,
      depth: 1
    }
  },
      ba = [];
  var ja = 0;
  var ha = {},
      ia = {};

  x.create = function (a, b) {
    return new x(a, b);
  };

  x.registerMatcher = function (a) {
    for (var b in a) {
      a.hasOwnProperty(b) && ba.push(r(b), a[b]);
    }

    return this;
  };

  x.registerEncoder = function (a, b) {
    R[a] = b.bind(R);
    return this;
  };

  x.registerLanguage = function (a, b) {
    ha[a] = b.filter;
    ia[a] = b.stemmer;
    return this;
  };

  x.encode = function (a, b) {
    return R[a](b);
  };

  x.prototype.init = function (a, b) {
    this.o = [];

    if (b) {
      var c = b.preset;
      a = b;
    } else a || (a = H), c = a.preset;

    b = {};
    G(a) ? (b = fa[a], a = {}) : c && (b = fa[c]);
    this.c = a.tokenize || b.c || this.c || H.c;
    this.split = N(c = a.split) ? this.split || H.split : G(c) ? r(c) : c;
    this.m = a.rtl || this.m || H.m;
    this.async = "undefined" === typeof Promise || N(c = a.async) ? this.async || H.async : c;
    this.threshold = N(c = a.threshold) ? b.threshold || this.threshold || H.threshold : c;
    this.b = N(c = a.resolution) ? c = b.b || this.b || H.b : c;
    c <= this.threshold && (this.b = this.threshold + 1);
    this.depth = "strict" !== this.c || N(c = a.depth) ? b.depth || this.depth || H.depth : c;
    this.h = (c = N(c = a.encode) ? b.encode || H.encode : c) && R[c] && R[c].bind(R) || (P(c) ? c : this.h || !1);
    (c = a.matcher) && this.addMatcher(c);

    if (c = (b = a.lang) || a.filter) {
      G(c) && (c = ha[c]);

      if (E(c)) {
        var d = this.h,
            e = B();

        for (var h = 0; h < c.length; h++) {
          var f = d ? d(c[h]) : c[h];
          e[f] = 1;
        }

        c = e;
      }

      this.filter = c;
    }

    if (c = b || a.stemmer) {
      var k;
      b = G(c) ? ia[c] : c;
      d = this.h;
      e = [];

      for (k in b) {
        b.hasOwnProperty(k) && (h = d ? d(k) : k, e.push(r(h + "($|\\W)"), d ? d(b[k]) : b[k]));
      }

      this.stemmer = k = e;
    }

    this.a = e = (c = a.doc) ? L(c) : this.a || H.a;
    this.l = ea(this.b - (this.threshold || 0));
    this.g = B();
    this.f = B();

    if (e) {
      this.j = B();
      a.doc = null;
      k = e.index = {};
      b = e.keys = [];
      d = e.field;
      h = e.store;
      E(e.id) || (e.id = e.id.split(":"));

      if (h) {
        f = B();
        if (G(h)) f[h] = 1;else if (E(h)) for (var g = 0; g < h.length; g++) {
          f[h[g]] = 1;
        } else J(h) && (f = h);
        e.store = f;
      }

      if (d) {
        var _g;

        E(d) || (J(d) ? (_g = d, e.field = d = Object.keys(d)) : e.field = d = [d]);

        for (e = 0; e < d.length; e++) {
          h = d[e], E(h) || (_g && (a = _g[h]), b[e] = h, d[e] = h.split(":")), k[h] = new x(a);
        }
      }

      a.doc = c;
    }

    return this;
  };

  x.prototype.encode = function (a) {
    a && (ba.length && (a = M(a, ba)), this.o.length && (a = M(a, this.o)), this.h && (a = this.h(a)), this.stemmer && (a = M(a, this.stemmer)));
    return a;
  };

  x.prototype.addMatcher = function (a) {
    var b = this.o;

    for (var c in a) {
      a.hasOwnProperty(c) && b.push(r(c), a[c]);
    }

    return this;
  };

  x.prototype.add = function (a, b, c, d, e) {
    if (this.a && J(a)) return this.i("add", a, b);

    if (b && G(b) && (a || 0 === a)) {
      var h = "@" + a;
      if (this.f[h] && !d) return this.update(a, b);

      if (!e) {
        if (this.async) {
          var t = this;
          h = new Promise(function (v) {
            setTimeout(function () {
              t.add(a, b, null, d, !0);
              t = null;
              v();
            });
          });
          if (c) h.then(c);else return h;
          return this;
        }

        if (c) return this.add(a, b, null, d, !0), c(), this;
      }

      b = this.encode(b);
      if (!b.length) return this;
      c = this.c;
      e = P(c) ? c(b) : b.split(this.split);
      this.filter && (e = O(e, this.filter));
      var n = B();
      n._ctx = B();
      var m = e.length,
          u = this.threshold,
          q = this.depth,
          y = this.b,
          A = this.l,
          w = this.m;

      for (var _t = 0; _t < m; _t++) {
        var f = e[_t];

        if (f) {
          var k = f.length,
              g = (w ? _t + 1 : m - _t) / m,
              l = "";

          switch (c) {
            case "reverse":
            case "both":
              for (var p = k; --p;) {
                l = f[p] + l, S(A, n, l, a, w ? 1 : (k - p) / k, g, u, y - 1);
              }

              l = "";

            case "forward":
              for (p = 0; p < k; p++) {
                l += f[p], S(A, n, l, a, w ? (p + 1) / k : 1, g, u, y - 1);
              }

              break;

            case "full":
              for (p = 0; p < k; p++) {
                var v = (w ? p + 1 : k - p) / k;

                for (var z = k; z > p; z--) {
                  l = f.substring(p, z), S(A, n, l, a, v, g, u, y - 1);
                }
              }

              break;

            default:
              if (k = S(A, n, f, a, 1, g, u, y - 1), q && 1 < m && k >= u) for (k = n._ctx[f] || (n._ctx[f] = B()), f = this.g[f] || (this.g[f] = ea(y - (u || 0))), g = _t - q, l = _t + q + 1, 0 > g && (g = 0), l > m && (l = m); g < l; g++) {
                g !== _t && S(f, k, e[g], a, 0, y - (g < _t ? _t - g : g - _t), u, y - 1);
              }
          }
        }
      }

      this.f[h] = 1;
    }

    return this;
  };

  x.prototype.i = function (a, b, c) {
    if (E(b)) {
      var d = b.length;

      if (d--) {
        for (var e = 0; e < d; e++) {
          this.i(a, b[e]);
        }

        return this.i(a, b[d], c);
      }
    } else {
      var h = this.a.index,
          f = this.a.keys,
          k = this.a.tag;
      e = this.a.store;
      var g;
      var l = this.a.id;
      d = b;

      for (var p = 0; p < l.length; p++) {
        d = d[l[p]];
      }

      if ("remove" === a && (delete this.j[d], l = f.length, l--)) {
        for (b = 0; b < l; b++) {
          h[f[b]].remove(d);
        }

        return h[f[l]].remove(d, c);
      }

      if (k) {
        for (g = 0; g < k.length; g++) {
          var n = k[g];
          var m = b;
          l = n.split(":");

          for (p = 0; p < l.length; p++) {
            m = m[l[p]];
          }

          m = "@" + m;
        }

        g = this.s[n];
        g = g[m] || (g[m] = []);
      }

      l = this.a.field;

      for (var u = 0, q = l.length; u < q; u++) {
        n = l[u];
        k = b;

        for (m = 0; m < n.length; m++) {
          k = k[n[m]];
        }

        n = h[f[u]];
        m = "add" === a ? n.add : n.update;
        u === q - 1 ? m.call(n, d, k, c) : m.call(n, d, k);
      }

      if (e) {
        c = Object.keys(e);
        a = B();

        for (h = 0; h < c.length; h++) {
          if (f = c[h], e[f]) {
            f = f.split(":");

            var _u = void 0,
                _q = void 0;

            for (l = 0; l < f.length; l++) {
              k = f[l], _u = (_u || b)[k], _q = (_q || a)[k] = _u;
            }
          }
        }

        b = a;
      }

      g && (g[g.length] = b);
      this.j[d] = b;
    }

    return this;
  };

  x.prototype.update = function (a, b, c) {
    if (this.a && J(a)) return this.i("update", a, b);
    this.f["@" + a] && G(b) && (this.remove(a), this.add(a, b, c, !0));
    return this;
  };

  x.prototype.remove = function (a, b, c) {
    if (this.a && J(a)) return this.i("remove", a, b);
    var d = "@" + a;

    if (this.f[d]) {
      if (!c) {
        if (this.async && "function" !== typeof importScripts) {
          var e = this;
          d = new Promise(function (h) {
            setTimeout(function () {
              e.remove(a, null, !0);
              e = null;
              h();
            });
          });
          if (b) d.then(b);else return d;
          return this;
        }

        if (b) return this.remove(a, null, !0), b(), this;
      }

      for (b = 0; b < this.b - (this.threshold || 0); b++) {
        W(this.l[b], a);
      }

      this.depth && W(this.g, a);
      delete this.f[d];
    }

    return this;
  };

  var K;

  x.prototype.search = function (a, b, c, d) {
    if (J(b)) {
      if (E(b)) for (var e = 0; e < b.length; e++) {
        b[e].query = a;
      } else b.query = a;
      a = b;
      b = 1E3;
    } else b && P(b) ? (c = b, b = 1E3) : b || 0 === b || (b = 1E3);

    var h = [],
        f = a;
    var k, g, l;

    if (J(a) && !E(a)) {
      c || (c = a.callback) && (f.callback = null);
      g = a.sort;
      k = !1;
      b = a.limit;
      var p = a.threshold;
      l = !1;
      a = a.query;
    }

    if (this.a) {
      p = this.a.index;
      var n = f.bool || "or",
          m = f.field;
      var w = n;
      var t, v;
      if (m) E(m) || (m = [m]);else if (E(f)) {
        var u = f;
        m = [];
        w = [];

        for (var q = 0; q < f.length; q++) {
          d = f[q], e = d.bool || n, m[q] = d.field, w[q] = e, "not" === e ? t = !0 : "and" === e && (v = !0);
        }
      } else m = this.a.keys;
      n = m.length;

      for (q = 0; q < n; q++) {
        u && (f = u[q]), k && !G(f) && (f.page = null, f.limit = 0), h[q] = p[m[q]].search(f, 0);
      }

      if (c) return c(I.call(this, a, w, h, g, b, l, !1, k, v, t));

      if (this.async) {
        var z = this;
        return new Promise(function (F) {
          Promise.all(h).then(function (C) {
            F(I.call(z, a, w, C, g, b, l, !1, k, v, t));
          });
        });
      }

      return I.call(this, a, w, h, g, b, l, !1, k, v, t);
    }

    p || (p = this.threshold || 0);

    if (!d) {
      if (this.async && "function" !== typeof importScripts) {
        var _w = this;

        p = new Promise(function (t) {
          setTimeout(function () {
            t(_w.search(f, b, null, !0));
            _w = null;
          });
        });
        if (c) p.then(c);else return p;
        return this;
      }

      if (c) return c(this.search(f, b, null, !0)), this;
    }

    if (!a || !G(a)) return h;
    f = a;
    f = this.encode(f);
    if (!f.length) return h;
    c = this.c;
    c = P(c) ? c(f) : f.split(this.split);
    this.filter && (c = O(c, this.filter));
    u = c.length;
    d = !0;
    e = [];
    var y = B();
    var A = 0;
    1 < u && (this.depth && "strict" === this.c ? m = !0 : c.sort(ma));

    if (!m || (n = this.g)) {
      var _w2 = this.b;

      for (; A < u; A++) {
        var _t2 = c[A];

        if (_t2) {
          if (m) {
            if (!q) if (n[_t2]) q = _t2, y[_t2] = 1;else if (!l) return h;
            if (l && A === u - 1 && !e.length) m = !1, _t2 = q || _t2, y[_t2] = 0;else if (!q) continue;
          }

          if (!y[_t2]) {
            var _v = [];

            var _z = !1,
                F = 0;

            if (q = m ? n[q] : this.l) {
              var C = void 0;

              for (var D = 0; D < _w2 - p; D++) {
                if (C = q[D] && q[D][_t2]) _v[F++] = C, _z = !0;
              }
            }

            if (_z) q = _t2, e[e.length] = 1 < F ? _v.concat.apply([], _v) : _v[0];else {
              d = !1;
              break;
            }
            y[_t2] = 1;
          }
        }
      }
    } else d = !1;

    d && (h = da(e, b, k, !1));
    return h;
  };

  x.prototype.clear = function () {
    return this.destroy().init();
  };

  x.prototype.destroy = function () {
    this.l = this.g = this.f = null;

    if (this.a) {
      var a = this.a.keys;

      for (var b = 0; b < a.length; b++) {
        this.a.index[a[b]].destroy();
      }

      this.a = this.j = null;
    }

    return this;
  };

  var oa = function () {
    var a = r("\\s+"),
        b = r("[^a-z0-9 ]"),
        c = [r("[-/]"), " ", b, "", a, " "];
    return function (d) {
      return X(M(d.toLowerCase(), c));
    };
  }(),
      R = {
    icase: function icase(a) {
      return a.toLowerCase();
    },
    simple: function () {
      var a = r("\\s+"),
          b = r("[^a-z0-9 ]"),
          c = r("[-/]"),
          d = r("[\xE0\xE1\xE2\xE3\xE4\xE5]"),
          e = r("[\xE8\xE9\xEA\xEB]"),
          h = r("[\xEC\xED\xEE\xEF]"),
          f = r("[\xF2\xF3\xF4\xF5\xF6\u0151]"),
          k = r("[\xF9\xFA\xFB\xFC\u0171]"),
          g = r("[\xFD\u0177\xFF]"),
          l = r("\xF1"),
          p = r("[\xE7c]"),
          n = r("\xDF"),
          m = r(" & "),
          u = [d, "a", e, "e", h, "i", f, "o", k, "u", g, "y", l, "n", p, "k", n, "s", m, " and ", c, " ", b, "", a, " "];
      return function (q) {
        q = M(q.toLowerCase(), u);
        return " " === q ? "" : q;
      };
    }(),
    advanced: function () {
      var a = r("ae"),
          b = r("ai"),
          c = r("ay"),
          d = r("ey"),
          e = r("oe"),
          h = r("ue"),
          f = r("ie"),
          k = r("sz"),
          g = r("zs"),
          l = r("ck"),
          p = r("cc"),
          n = r("sh"),
          m = r("th"),
          u = r("dt"),
          q = r("ph"),
          y = r("pf"),
          A = r("ou"),
          w = r("uo"),
          t = [a, "a", b, "ei", c, "ei", d, "ei", e, "o", h, "u", f, "i", k, "s", g, "s", n, "s", l, "k", p, "k", m, "t", u, "t", q, "f", y, "f", A, "o", w, "u"];
      return function (v, z) {
        if (!v) return v;
        v = this.simple(v);
        2 < v.length && (v = M(v, t));
        z || 1 < v.length && (v = X(v));
        return v;
      };
    }(),
    extra: function () {
      var a = r("p"),
          b = r("z"),
          c = r("[cgq]"),
          d = r("n"),
          e = r("d"),
          h = r("[vw]"),
          f = r("[aeiouy]"),
          k = [a, "b", b, "s", c, "k", d, "m", e, "t", h, "f", f, ""];
      return function (g) {
        if (!g) return g;
        g = this.advanced(g, !0);

        if (1 < g.length) {
          g = g.split(" ");

          for (var l = 0; l < g.length; l++) {
            var p = g[l];
            1 < p.length && (g[l] = p[0] + M(p.substring(1), k));
          }

          g = g.join(" ");
          g = X(g);
        }

        return g;
      };
    }(),
    balance: oa
  };

  return x;
}(!1), this);

/***/ }),

/***/ "./resources/js/libs/iduffs/autocomplete.js":
/*!**************************************************!*\
  !*** ./resources/js/libs/iduffs/autocomplete.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 IdUFFS Autocomplete v0.1.0
 Copyright 2020 Fernando Bevilacqua
 Author: Fernando Bevilacqua
 Released under the MIT Licence
 https://github.com/ccuffs/api-cc/
*/
var FlexSearch = __webpack_require__(/*! ../3rdparty/flexsearch.compact.js */ "./resources/js/libs/3rdparty/flexsearch.compact.js");

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var IDUFFS = IDUFFS || {};

IDUFFS.AutoComplete = function () {
  var self = this;
  this.API_ENDPOINT = '/api-cc/public/';
  this.index = null;
  this.autocomplete = null;
  this.data = null;

  this.apiURL = function (url) {
    return this.API_ENDPOINT + url;
  };

  this.initIndex = function (data) {
    this.index = new FlexSearch({
      encode: 'advanced',
      tokenize: 'reverse',
      suggest: true,
      cache: true
    });

    if (!data) {
      console.warn('Index is empty.');
      return;
    }

    for (var i = 0; i < data.length; i++) {
      this.index.add(i, data[i].name);
    }

    this.data = data;
  };

  this.indexSearch = function (term) {
    return this.index.search(term, 25);
  };

  this.indexInfo = function (key) {
    return this.data[key] ? this.data[key].name : null;
  };

  this.showResults = function () {
    var value = this.value;
    var results = self.indexSearch(value);
    var entry,
        childs = self.suggestions.childNodes;
    var i = 0,
        len = results.length;

    for (; i < len; i++) {
      entry = childs[i];

      if (!entry) {
        entry = document.createElement('div');
        self.suggestions.appendChild(entry);
      }

      entry.textContent = self.indexInfo(results[i]);
    }

    while (childs.length > len) {
      self.suggestions.removeChild(childs[i]);
    }

    var first_result = self.indexInfo(results[0]);
    var match = first_result && first_result.toLowerCase().indexOf(value.toLowerCase());

    if (first_result && match !== -1) {
      self.autoComplete.value = value + first_result.substring(match + value.length);
      self.autoComplete.current = first_result;
    } else {
      self.autoComplete.value = self.autoComplete.current = value;
    }
  };

  this.acceptAutocomplete = function (event) {
    if ((event || window.event).keyCode === 13) {
      this.value = self.autoComplete.value = self.autoComplete.current;
    }
  };

  this.acceptSuggestion = function (event) {
    var target = (event || window.event).target;
    self.userInput.value = self.autoComplete.value = target.textContent;

    while (self.suggestions.lastChild) {
      self.suggestions.removeChild(self.suggestions.lastChild);
    }

    return false;
  };

  this.loadDataAndInitIndex = function () {
    var self = this;
    axios.get(this.apiURL('/info/users')).then(function (response) {
      self.initIndex(response.data);
    });
  };

  this.initDOMElements = function () {
    this.suggestions = document.getElementById('suggestions');
    this.autoComplete = document.getElementById('autocomplete');
    this.userInput = document.getElementById('userinput');
    this.userInput.addEventListener('input', this.showResults, true);
    this.userInput.addEventListener('keyup', this.acceptAutocomplete, true);
    this.suggestions.addEventListener('click', this.acceptSuggestion, true);
  };

  this.init = function () {
    this.initDOMElements();
    this.loadDataAndInitIndex();
  };
};

document.addEventListener('DOMContentLoaded', function () {
  var app = new IDUFFS.AutoComplete();
  app.init();
});

/***/ }),

/***/ 1:
/*!********************************************************!*\
  !*** multi ./resources/js/libs/iduffs/autocomplete.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/d/wamp/www/api-cc/resources/js/libs/iduffs/autocomplete.js */"./resources/js/libs/iduffs/autocomplete.js");


/***/ })

/******/ });