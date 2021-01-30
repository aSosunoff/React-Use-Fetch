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

/***/ 303:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useFetch": () => (/* binding */ useFetch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useFetch = (url, options, isCache = false) => {
    const cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
    const [isFetch, setFetch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const initialState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
        status: "init",
        error: undefined,
        data: undefined,
    }), []);
    const fetchReducer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((state, action) => {
        switch (action.type) {
            case "request":
                return { ...initialState, status: "request" };
            case "success":
                return { ...initialState, status: "success", data: action.payload };
            case "failure":
                return { ...initialState, status: "failure", error: action.payload };
            default:
                return state;
        }
    }, [initialState]);
    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(fetchReducer, initialState);
    const request = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch({ type: "request" }), []);
    const success = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((payload) => dispatch({ type: "success", payload }), []);
    const failure = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((payload) => dispatch({ type: "failure", payload }), []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!url || !isFetch) {
            return;
        }
        let cancelRequest = false;
        (async () => {
            request();
            if (isCache && cache.current[url]) {
                setFetch(() => false);
                !cancelRequest && success(cache.current[url]);
                return;
            }
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                cache.current[url] = data;
                setFetch(() => false);
                !cancelRequest && success(data);
            }
            catch (error) {
                setFetch(() => false);
                !cancelRequest && failure(error.message);
            }
        })();
        return () => {
            cancelRequest = true;
        };
    }, [failure, isCache, isFetch, options, request, success, url]);
    const doFetch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setFetch(() => true), []);
    return [state, doFetch];
};


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(303);
/******/ })()
;
});
//# sourceMappingURL=index.js.map