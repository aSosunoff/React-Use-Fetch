(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function(__WEBPACK_EXTERNAL_MODULE__297__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 907:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useChangeArrayLength = void 0;

var react_1 = __webpack_require__(297);

var __1 = __webpack_require__(447);

var useChangeArrayLength = function useChangeArrayLength(arr, fn) {
  var prevArrayLength = __1.usePrevState(arr.length);

  react_1.useEffect(function () {
    if (prevArrayLength === undefined) return;
    if (arr.length === prevArrayLength) return;
    fn();
  }, [arr.length, fn, prevArrayLength]);
};

exports.useChangeArrayLength = useChangeArrayLength;

/***/ }),

/***/ 897:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useDidUpdate = void 0;

var react_1 = __webpack_require__(297);

var useDidUpdate = function useDidUpdate(effect, dependencies) {
  var hasMounted = react_1.useRef(true);
  react_1.useEffect(function () {
    if (hasMounted.current) {
      hasMounted.current = false;
      return;
    }

    return effect(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

exports.useDidUpdate = useDidUpdate;

/***/ }),

/***/ 303:
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useFetchReducer = void 0;

var react_1 = __webpack_require__(297);

var useFetchReducer = function useFetchReducer() {
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
          status: "request",
          data: state.data
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

  var _a = react_1.useReducer(fetchReducer, initialState),
      state = _a[0],
      dispatch = _a[1];

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
  return {
    state: state,
    request: request,
    success: success,
    failure: failure
  };
};

exports.useFetchReducer = useFetchReducer;

/***/ }),

/***/ 714:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useLocalStorage = void 0;

var react_1 = __webpack_require__(297);

var tuple_1 = __webpack_require__(619);

var useLocalStorage = function useLocalStorage(key, initialValue) {
  var _a = react_1.useState(function () {
    try {
      var item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  }),
      storedValue = _a[0],
      setStoredValue = _a[1];

  react_1.useEffect(function () {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);
  var setValue = react_1.useCallback(function (value) {
    return setStoredValue(function () {
      return value;
    });
  }, []);
  return tuple_1.tuple(storedValue, setValue);
};

exports.useLocalStorage = useLocalStorage;

/***/ }),

/***/ 95:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.usePrevState = void 0;

var react_1 = __webpack_require__(297);

var usePrevState = function usePrevState(state) {
  var prev = react_1.useRef();
  react_1.useEffect(function () {
    prev.current = state;
  }, [state]);
  return prev.current;
};

exports.usePrevState = usePrevState;

/***/ }),

/***/ 250:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useTrigger = void 0;

var react_1 = __webpack_require__(297);

var tuple_1 = __webpack_require__(619);

var useTrigger = function useTrigger(initialState) {
  if (initialState === void 0) {
    initialState = false;
  }

  var _a = react_1.useState(initialState),
      state = _a[0],
      setState = _a[1];

  var onHandler = react_1.useCallback(function () {
    return setState(function () {
      return true;
    });
  }, []);
  var offHandler = react_1.useCallback(function () {
    return setState(function () {
      return false;
    });
  }, []);
  var togglerHandler = react_1.useCallback(function () {
    return setState(function (prev) {
      return !prev;
    });
  }, []);
  return tuple_1.tuple(state, {
    onHandler: onHandler,
    offHandler: offHandler,
    togglerHandler: togglerHandler
  });
};

exports.useTrigger = useTrigger;

/***/ }),

/***/ 44:
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useWhyDidYouUpdate = void 0;

var react_1 = __webpack_require__(297);

var useWhyDidYouUpdate = function useWhyDidYouUpdate(props, callback) {
  var previousProps = react_1.useRef({});
  react_1.useEffect(function () {
    if (previousProps.current) {
      var allKeys = Object.keys(__assign(__assign({}, previousProps.current), props));
      var changeObj_1 = {};
      allKeys.forEach(function (key) {
        if (previousProps.current[key] !== props[key]) {
          changeObj_1[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      if (Object.keys(changeObj_1).length) {
        callback(changeObj_1);
      }
    }

    previousProps.current = props;
  }, [props, callback]);
};

exports.useWhyDidYouUpdate = useWhyDidYouUpdate;

/***/ }),

/***/ 447:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useChangeArrayLength = exports.usePrevState = exports.useDidUpdate = exports.usePagination = exports.useLocalStorage = exports.useParseJWT = exports.useWhyDidYouUpdate = exports.useTrigger = exports.useFetchReducer = exports.useCallbackAsync = exports.useFetch = void 0;

var use_fetch_1 = __webpack_require__(983);

Object.defineProperty(exports, "useFetch", ({
  enumerable: true,
  get: function get() {
    return use_fetch_1.useFetch;
  }
}));

var use_callback_async_1 = __webpack_require__(142);

Object.defineProperty(exports, "useCallbackAsync", ({
  enumerable: true,
  get: function get() {
    return use_callback_async_1.useCallbackAsync;
  }
}));

var use_fetch_reducer_1 = __webpack_require__(303);

Object.defineProperty(exports, "useFetchReducer", ({
  enumerable: true,
  get: function get() {
    return use_fetch_reducer_1.useFetchReducer;
  }
}));

var use_trigger_1 = __webpack_require__(250);

Object.defineProperty(exports, "useTrigger", ({
  enumerable: true,
  get: function get() {
    return use_trigger_1.useTrigger;
  }
}));

var use_why_did_you_update_1 = __webpack_require__(44);

Object.defineProperty(exports, "useWhyDidYouUpdate", ({
  enumerable: true,
  get: function get() {
    return use_why_did_you_update_1.useWhyDidYouUpdate;
  }
}));

var use_parse_jwt_1 = __webpack_require__(454);

Object.defineProperty(exports, "useParseJWT", ({
  enumerable: true,
  get: function get() {
    return use_parse_jwt_1.useParseJWT;
  }
}));

var use_local_storage_1 = __webpack_require__(714);

Object.defineProperty(exports, "useLocalStorage", ({
  enumerable: true,
  get: function get() {
    return use_local_storage_1.useLocalStorage;
  }
}));

var use_pagination_1 = __webpack_require__(225);

Object.defineProperty(exports, "usePagination", ({
  enumerable: true,
  get: function get() {
    return use_pagination_1.usePagination;
  }
}));

var use_did_update_1 = __webpack_require__(897);

Object.defineProperty(exports, "useDidUpdate", ({
  enumerable: true,
  get: function get() {
    return use_did_update_1.useDidUpdate;
  }
}));

var use_prev_state_1 = __webpack_require__(95);

Object.defineProperty(exports, "usePrevState", ({
  enumerable: true,
  get: function get() {
    return use_prev_state_1.usePrevState;
  }
}));

var use_change_array_length_1 = __webpack_require__(907);

Object.defineProperty(exports, "useChangeArrayLength", ({
  enumerable: true,
  get: function get() {
    return use_change_array_length_1.useChangeArrayLength;
  }
}));

/***/ }),

/***/ 142:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



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
exports.useCallbackAsync = void 0;

var react_1 = __webpack_require__(297);

var use_trigger_1 = __webpack_require__(250);

var tuple_1 = __webpack_require__(619);

var use_fetch_reducer_1 = __webpack_require__(303);

var use_params_1 = __webpack_require__(375);

var useCallbackAsync = function useCallbackAsync(callback) {
  var _a = use_fetch_reducer_1.useFetchReducer(),
      state = _a.state,
      request = _a.request,
      success = _a.success,
      failure = _a.failure;

  var _b = use_trigger_1.useTrigger(),
      isStartFetch = _b[0],
      _c = _b[1],
      fetchStart = _c.onHandler,
      fetchFinish = _c.offHandler;

  var _d = use_params_1.useParams(),
      params = _d.params,
      setParamsHandler = _d.setParamsHandler,
      clearParamsHandler = _d.clearParamsHandler;

  react_1.useEffect(function () {
    if (!isStartFetch) return;
    var cancelRequest = false;
    (function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2,, 3]);

              return [4
              /*yield*/
              , callback.apply(void 0, params)];

            case 1:
              data = _a.sent();
              if (cancelRequest) return [2
              /*return*/
              ];
              fetchFinish();
              success(data);
              clearParamsHandler();
              return [3
              /*break*/
              , 3];

            case 2:
              error_1 = _a.sent();
              if (cancelRequest) return [2
              /*return*/
              ];
              fetchFinish();
              failure(error_1);
              clearParamsHandler();
              return [3
              /*break*/
              , 3];

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    }).apply(void 0, params);
    return function () {
      cancelRequest = true;
    };
  }, [callback, failure, fetchFinish, isStartFetch, success, params, clearParamsHandler]);
  var doFetch = react_1.useCallback(function () {
    var params = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      params[_i] = arguments[_i];
    }

    setParamsHandler(params);
    request();
    fetchStart();
  }, [request, fetchStart, setParamsHandler]);
  return tuple_1.tuple(state, doFetch);
};

exports.useCallbackAsync = useCallbackAsync;

/***/ }),

/***/ 375:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useParams = void 0;

var react_1 = __webpack_require__(297);

var useParams = function useParams() {
  var _a = react_1.useState([]),
      params = _a[0],
      setParams = _a[1];

  var setParamsHandler = react_1.useCallback(function (params) {
    setParams(function () {
      return params;
    });
  }, []);
  var clearParamsHandler = react_1.useCallback(function () {
    setParams(function () {
      return [];
    });
  }, []);
  return {
    params: params,
    setParamsHandler: setParamsHandler,
    clearParamsHandler: clearParamsHandler
  };
};

exports.useParams = useParams;

/***/ }),

/***/ 983:
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useFetch = void 0;

var index_1 = __webpack_require__(142);

var react_1 = __webpack_require__(297);

var tuple_1 = __webpack_require__(619);

var use_headers_1 = __webpack_require__(816);

var fetchHandler = function fetchHandler(url, options, setHeadersHandlerCallback) {
  return __awaiter(void 0, void 0, void 0, function () {
    var responseType, optionsFetch, response, body, data, _a;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          responseType = options.responseType, optionsFetch = __rest(options, ["responseType"]);
          return [4
          /*yield*/
          , fetch(url.toString(), optionsFetch)];

        case 1:
          response = _b.sent();
          setHeadersHandlerCallback(response.headers);
          if (!!response.ok) return [3
          /*break*/
          , 3];
          return [4
          /*yield*/
          , response.json()];

        case 2:
          body = _b.sent();
          throw body;

        case 3:
          data = null;
          _a = responseType;

          switch (_a) {
            case "text":
              return [3
              /*break*/
              , 4];

            case "json":
              return [3
              /*break*/
              , 6];

            case "formData":
              return [3
              /*break*/
              , 8];

            case "blob":
              return [3
              /*break*/
              , 10];

            case "arrayBuffer":
              return [3
              /*break*/
              , 12];
          }

          return [3
          /*break*/
          , 14];

        case 4:
          return [4
          /*yield*/
          , response.text()];

        case 5:
          data = _b.sent();
          return [3
          /*break*/
          , 15];

        case 6:
          return [4
          /*yield*/
          , response.json()];

        case 7:
          data = _b.sent();
          return [3
          /*break*/
          , 15];

        case 8:
          return [4
          /*yield*/
          , response.formData()];

        case 9:
          data = _b.sent();
          return [3
          /*break*/
          , 15];

        case 10:
          return [4
          /*yield*/
          , response.blob()];

        case 11:
          data = _b.sent();
          return [3
          /*break*/
          , 15];

        case 12:
          return [4
          /*yield*/
          , response.arrayBuffer()];

        case 13:
          data = _b.sent();
          return [3
          /*break*/
          , 15];

        case 14:
          throw new Error("Not found type of response");

        case 15:
          return [2
          /*return*/
          , data];
      }
    });
  });
};

var useFetch = function useFetch(url) {
  var _a = use_headers_1.useHeaders(),
      headers = _a.headers,
      setHeadersHandler = _a.setHeadersHandler;

  var _b = index_1.useCallbackAsync(fetchHandler),
      state = _b[0],
      doFetch = _b[1];

  var doFetchHandler = react_1.useCallback(function (options) {
    return doFetch(url, __assign({
      responseType: "json"
    }, options), setHeadersHandler);
  }, [doFetch, setHeadersHandler, url]);
  return tuple_1.tuple(state, doFetchHandler, headers);
};

exports.useFetch = useFetch;
/* export const useFetch = <TData, TError = any>(url: string) => {
  const [options, setOptions] = useState<UseFetchOption>({} as UseFetchOption);

  const { headers, setHeadersHandler, clearHeadersHandler } = useHeaders();

  const { state, request, success, failure } = useFetchReducer<TData, TError>();

  const [isFetch, { onHandler: fetchStart, offHandler: fetchFinish }] =
    useTrigger();

  useEffect(() => {
    if (!isFetch) return;

    let cancelRequest = false;

    (async () => {
      try {
        const { responseType, ...optionsFetch } = options;

        const response = await fetch(url.toString(), optionsFetch);

        setHeadersHandler(response.headers);

        if (!response.ok) {
          const body = await response.json();
          throw body;
        }

        let data = null;

        switch (responseType) {
          case "text":
            data = await response.text();
            break;
          case "json":
            data = await response.json();
            break;
          case "formData":
            data = await response.formData();
            break;
          case "blob":
            data = await response.blob();
            break;
          case "arrayBuffer":
            data = await response.arrayBuffer();
            break;
          default:
            throw new Error("Not found type of response");
        }

        if (cancelRequest) return;

        fetchFinish();
        success(data);
      } catch (error) {
        if (cancelRequest) return;

        fetchFinish();
        clearHeadersHandler();
        failure(error);
      }
    })();

    return () => {
      cancelRequest = true;
    };
  }, [
    clearHeadersHandler,
    failure,
    isFetch,
    options,
    setHeadersHandler,
    success,
    url,
    fetchFinish,
  ]);

  const doFetch = useCallback(
    (options?: UseFetchOption) => {
      request();

      setOptions(() => ({
        responseType: "json",
        ...options,
      }));

      fetchStart();
    },
    [request, fetchStart]
  );

  return tuple(state, doFetch, headers);
}; */

/***/ }),

/***/ 816:
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useHeaders = void 0;

var react_1 = __webpack_require__(297);

var useHeaders = function useHeaders() {
  var _a = react_1.useState(null),
      headers = _a[0],
      setHeaders = _a[1];

  var setHeadersHandler = react_1.useCallback(function (headers) {
    var headersFinal = Array.from(headers.entries()).reduce(function (res, _a) {
      var _b;

      var key = _a[0],
          value = _a[1];
      return __assign(__assign({}, res), (_b = {}, _b[key] = value, _b));
    }, {});
    setHeaders(function () {
      return headersFinal;
    });
  }, []);
  var clearHeadersHandler = react_1.useCallback(function () {
    setHeaders(function () {
      return null;
    });
  }, []);
  return {
    headers: headers,
    setHeadersHandler: setHeadersHandler,
    clearHeadersHandler: clearHeadersHandler
  };
};

exports.useHeaders = useHeaders;

/***/ }),

/***/ 403:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.chunkArray = void 0;

var chunkArray = function chunkArray(arr, size) {
  if (size === void 0) {
    size = 1;
  }

  var a = arr || [];
  return Array(Math.ceil(a.length / size)).fill([]).map(function (_, inx) {
    return a.slice(inx * size, inx * size + size);
  });
};

exports.chunkArray = chunkArray;

/***/ }),

/***/ 225:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.usePagination = void 0;

var chunkFromArray_1 = __webpack_require__(403);

var react_1 = __webpack_require__(297);

var usePagination = function usePagination(size, list) {
  if (size === void 0) {
    size = 5;
  }

  var _a = react_1.useState(1),
      currentPage = _a[0],
      setCurrentPage = _a[1];

  var chunkList = react_1.useMemo(function () {
    return chunkFromArray_1.chunkArray(list, size);
  }, [list, size]);
  var itemOnPage = react_1.useMemo(function () {
    return chunkList[currentPage - 1] || chunkList[0] || [];
  }, [chunkList, currentPage]);
  var setPageHandler = react_1.useCallback(function (page) {
    if (!chunkList[page - 1]) {
      setCurrentPage(1);
    } else {
      setCurrentPage(function () {
        return page;
      });
    }
  }, [chunkList]);
  return {
    itemOnPage: itemOnPage,
    currentPage: currentPage,
    pageCount: chunkList.length,
    setPageHandler: setPageHandler
  };
};

exports.usePagination = usePagination;

/***/ }),

/***/ 454:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useParseJWT = void 0;

var react_1 = __webpack_require__(297);

var parse_jwt_1 = __webpack_require__(607);

var useParseJWT = function useParseJWT(token) {
  var JWT = react_1.useMemo(function () {
    return parse_jwt_1.parseJWT(token);
  }, [token]);
  return JWT;
};

exports.useParseJWT = useParseJWT;

/***/ }),

/***/ 607:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.parseJWT = void 0;

var parseJWT = function parseJWT(token) {
  try {
    if (!token) return null;
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.parseJWT = parseJWT;

/***/ }),

/***/ 619:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.tuple = void 0;

var tuple = function tuple() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return args;
};

exports.tuple = tuple;

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
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(447);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map