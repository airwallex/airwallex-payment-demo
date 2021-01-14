module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/redirect/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/redirect/index.tsx":
/*!**********************************!*\
  !*** ./pages/redirect/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! airwallex-payment-elements */ \"airwallex-payment-elements\");\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/Users/josie.ku/awx/airwallex-payment-demo/next-ts/pages/redirect/index.tsx\";\n\n\nconst intent_id = 'int_o9vn3GSDz3b8s8tM6zvBsKTtag7';\nconst client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDkzOTU1OTgsImV4cCI6MTYwOTM5OTE5OCwiYWNjb3VudF9pZCI6IjZkMzljOGU3LWQyY2EtNGQ0Yy04N2I5LWIzY2Y3MzNkNTU2ZSIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X285dm4zR1NEejNiOHM4dE02enZCc0tUdGFnNyJ9.iBo9pT-UwjiWGwRv10ogx4OrgHOkxa1T6h4l9_kkWVU';\nconst redirectMethod = 'replace-with-your-redirect-method';\nconst ELEMENT_TYPE = 'redirect';\n\nfunction redirect() {\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"loadAirwallex\"])({\n      env: 'staging',\n      origin: window.location.origin\n    }).then(() => {\n      var _createElement;\n\n      (_createElement = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"])(ELEMENT_TYPE, {\n        intent: {\n          id: intent_id,\n          client_secret\n        },\n        method: redirectMethod\n      })) === null || _createElement === void 0 ? void 0 : _createElement.mount(ELEMENT_TYPE);\n    });\n\n    const onSuccess = event => {\n      /*\n        ... Handle event\n      */\n      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);\n    };\n\n    window.addEventListener('onSuccess', onSuccess);\n    return () => {\n      window.removeEventListener('onSuccess', onSuccess);\n    };\n  }, []);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"Redirect integration\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 43,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"element\",\n      id: ELEMENT_TYPE\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 42,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (redirect);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9yZWRpcmVjdC9pbmRleC50c3g/OWVhOSJdLCJuYW1lcyI6WyJpbnRlbnRfaWQiLCJjbGllbnRfc2VjcmV0IiwicmVkaXJlY3RNZXRob2QiLCJFTEVNRU5UX1RZUEUiLCJyZWRpcmVjdCIsInVzZUVmZmVjdCIsImxvYWRBaXJ3YWxsZXgiLCJlbnYiLCJvcmlnaW4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInRoZW4iLCJjcmVhdGVFbGVtZW50IiwiaW50ZW50IiwiaWQiLCJtZXRob2QiLCJtb3VudCIsIm9uU3VjY2VzcyIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJkZXRhaWwiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQU9BLE1BQU1BLFNBQVMsR0FBRyxpQ0FBbEI7QUFDQSxNQUFNQyxhQUFhLEdBQUcsdVJBQXRCO0FBQ0EsTUFBTUMsY0FBYyxHQUFHLG1DQUF2QjtBQUNBLE1BQU1DLFlBQXlCLEdBQUcsVUFBbEM7O0FBRUEsU0FBU0MsUUFBVCxHQUFvQjtBQUNsQkMseURBQVMsQ0FBQyxNQUFNO0FBQ2RDLG9GQUFhLENBQUM7QUFDWkMsU0FBRyxFQUFFLFNBRE87QUFFWkMsWUFBTSxFQUFFQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JGO0FBRlosS0FBRCxDQUFiLENBR0dHLElBSEgsQ0FHUSxNQUFNO0FBQUE7O0FBQ1osd0JBQUFDLGdGQUFhLENBQUNULFlBQUQsRUFBZTtBQUMxQlUsY0FBTSxFQUFFO0FBQ05DLFlBQUUsRUFBRWQsU0FERTtBQUVOQztBQUZNLFNBRGtCO0FBSzFCYyxjQUFNLEVBQUViO0FBTGtCLE9BQWYsQ0FBYixrRUFNSWMsS0FOSixDQU1VYixZQU5WO0FBT0QsS0FYRDs7QUFZQSxVQUFNYyxTQUFTLEdBQUlDLEtBQUQsSUFBd0I7QUFDeEM7QUFDTjtBQUNBO0FBQ01DLGFBQU8sQ0FBQ0MsR0FBUixDQUFhLHdCQUF1QkMsSUFBSSxDQUFDQyxTQUFMLENBQWVKLEtBQUssQ0FBQ0ssTUFBckIsQ0FBNkIsRUFBakU7QUFDRCxLQUxEOztBQU9BZCxVQUFNLENBQUNlLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDUCxTQUFyQztBQUNBLFdBQU8sTUFBTTtBQUNYUixZQUFNLENBQUNnQixtQkFBUCxDQUEyQixXQUEzQixFQUF3Q1IsU0FBeEM7QUFDRCxLQUZEO0FBR0QsR0F4QlEsRUF3Qk4sRUF4Qk0sQ0FBVDtBQTBCQSxzQkFDRTtBQUFBLDRCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFFRTtBQUFLLGVBQVMsRUFBQyxTQUFmO0FBQXlCLFFBQUUsRUFBRWQ7QUFBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBTUQ7O0FBRWNDLHVFQUFmIiwiZmlsZSI6Ii4vcGFnZXMvcmVkaXJlY3QvaW5kZXgudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgbG9hZEFpcndhbGxleCxcbiAgRWxlbWVudFR5cGUsXG4gIFJlZGlyZWN0TWV0aG9kT3B0aW9ucyxcbn0gZnJvbSAnYWlyd2FsbGV4LXBheW1lbnQtZWxlbWVudHMnO1xuXG5jb25zdCBpbnRlbnRfaWQgPSAnaW50X285dm4zR1NEejNiOHM4dE02enZCc0tUdGFnNyc7XG5jb25zdCBjbGllbnRfc2VjcmV0ID0gJ2V5SmhiR2NpT2lKSVV6STFOaUo5LmV5SnBZWFFpT2pFMk1Ea3pPVFUxT1Rnc0ltVjRjQ0k2TVRZd09UTTVPVEU1T0N3aVlXTmpiM1Z1ZEY5cFpDSTZJalprTXpsak9HVTNMV1F5WTJFdE5HUTBZeTA0TjJJNUxXSXpZMlkzTXpOa05UVTJaU0lzSW1SaGRHRmZZMlZ1ZEdWeVgzSmxaMmx2YmlJNklsVkxJaXdpYVc1MFpXNTBYMmxrSWpvaWFXNTBYMjg1ZG00elIxTkVlak5pT0hNNGRFMDJlblpDYzB0VWRHRm5OeUo5LmlCbzlwVC1Vd2ppV0d3UnYxMG9neDRPcmdIT2t4YTFUNmg0bDlfa2tXVlUnO1xuY29uc3QgcmVkaXJlY3RNZXRob2QgPSAncmVwbGFjZS13aXRoLXlvdXItcmVkaXJlY3QtbWV0aG9kJztcbmNvbnN0IEVMRU1FTlRfVFlQRTogRWxlbWVudFR5cGUgPSAncmVkaXJlY3QnO1xuXG5mdW5jdGlvbiByZWRpcmVjdCgpIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkQWlyd2FsbGV4KHtcbiAgICAgIGVudjogJ3N0YWdpbmcnLFxuICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgY3JlYXRlRWxlbWVudChFTEVNRU5UX1RZUEUsIHtcbiAgICAgICAgaW50ZW50OiB7XG4gICAgICAgICAgaWQ6IGludGVudF9pZCxcbiAgICAgICAgICBjbGllbnRfc2VjcmV0LFxuICAgICAgICB9LFxuICAgICAgICBtZXRob2Q6IHJlZGlyZWN0TWV0aG9kIGFzIFJlZGlyZWN0TWV0aG9kT3B0aW9ucyxcbiAgICAgIH0pPy5tb3VudChFTEVNRU5UX1RZUEUpO1xuICAgIH0pO1xuICAgIGNvbnN0IG9uU3VjY2VzcyA9IChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIC8qXG4gICAgICAgIC4uLiBIYW5kbGUgZXZlbnRcbiAgICAgICovXG4gICAgICBjb25zb2xlLmxvZyhgQ29uZmlybSBzdWNjZXNzIHdpdGggJHtKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpfWApO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb25TdWNjZXNzJywgb25TdWNjZXNzIGFzIEV2ZW50TGlzdGVuZXIpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25TdWNjZXNzJywgb25TdWNjZXNzIGFzIEV2ZW50TGlzdGVuZXIpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDI+UmVkaXJlY3QgaW50ZWdyYXRpb248L2gyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbGVtZW50XCIgaWQ9e0VMRU1FTlRfVFlQRX0+PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlZGlyZWN0OyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/redirect/index.tsx\n");

/***/ }),

/***/ "airwallex-payment-elements":
/*!*********************************************!*\
  !*** external "airwallex-payment-elements" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"airwallex-payment-elements\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhaXJ3YWxsZXgtcGF5bWVudC1lbGVtZW50c1wiP2ZiYzIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYWlyd2FsbGV4LXBheW1lbnQtZWxlbWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhaXJ3YWxsZXgtcGF5bWVudC1lbGVtZW50c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///airwallex-payment-elements\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });