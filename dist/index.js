define(["react"], (__WEBPACK_EXTERNAL_MODULE__297__) => /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 447:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useFetch = void 0;

var react_1 = __webpack_require__(297);

var useFetch = function useFetch(url, isCache) {
  if (isCache === void 0) {
    isCache = false;
  }

  var _a = react_1.useState(),
      options = _a[0],
      setOptions = _a[1];

  var cache = react_1.useRef({});

  var _b = react_1.useState(false),
      isFetch = _b[0],
      setFetch = _b[1];

  var initialState = react_1.useMemo(function () {
    return {
      status: "init",
      error: undefined,
      data: undefined
    };
  }, []);
  var fetchReducer = react_1.useCallback(function (state, action) {
    switch (action.type) {
      case "request":
        return __assign(__assign({}, initialState), {
          status: "request"
        });

      case "success":
        return __assign(__assign({}, initialState), {
          status: "success",
          data: action.payload
        });

      case "failure":
        return __assign(__assign({}, initialState), {
          status: "failure",
          error: action.payload
        });

      default:
        return state;
    }
  }, [initialState]);

  var _c = react_1.useReducer(fetchReducer, initialState),
      state = _c[0],
      dispatch = _c[1];

  var request = react_1.useCallback(function () {
    return dispatch({
      type: "request"
    });
  }, []);
  var success = react_1.useCallback(function (payload) {
    return dispatch({
      type: "success",
      payload: payload
    });
  }, []);
  var failure = react_1.useCallback(function (payload) {
    return dispatch({
      type: "failure",
      payload: payload
    });
  }, []);
  react_1.useEffect(function () {
    if (!url || !isFetch) {
      return;
    }

    var cancelRequest = false;

    (function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              request();

              if (isCache && cache.current[url]) {
                setFetch(function () {
                  return false;
                });
                !cancelRequest && success(cache.current[url]);
                return [2
                /*return*/
                ];
              }

              _a.label = 1;

            case 1:
              _a.trys.push([1, 4,, 5]);

              return [4
              /*yield*/
              , fetch(url, options)];

            case 2:
              response = _a.sent();
              return [4
              /*yield*/
              , response.json()];

            case 3:
              data = _a.sent();

              if (!cancelRequest) {
                cache.current[url] = data;
                setFetch(function () {
                  return false;
                });
                success(data);
              }

              return [3
              /*break*/
              , 5];

            case 4:
              error_1 = _a.sent();

              if (!cancelRequest) {
                setFetch(function () {
                  return false;
                });
                failure(error_1);
              }

              return [3
              /*break*/
              , 5];

            case 5:
              return [2
              /*return*/
              ];
          }
        });
      });
    })();

    return function () {
      cancelRequest = true;
    };
  }, [failure, isCache, isFetch, options, request, success, url]);
  var doFetch = react_1.useCallback(function (options) {
    setOptions(function () {
      return options;
    });
    setFetch(function () {
      return true;
    });
  }, []);
  return [state, doFetch];
};

exports.useFetch = useFetch;

/***/ }),

/***/ 297:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__297__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(447);
/******/ })()
);;
//# sourceMappingURL=index.js.map