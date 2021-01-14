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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/wechat/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/wechat/index.tsx":
/*!********************************!*\
  !*** ./pages/wechat/index.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! airwallex-payment-elements */ \"airwallex-payment-elements\");\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/Users/josie.ku/awx/airwallex-payment-demo/next-ts/pages/wechat/index.tsx\";\n\n\nconst intent_id = 'int_o9vn3GSDz3b8s8tM6zvBsKTtag7';\nconst client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDkzOTU1OTgsImV4cCI6MTYwOTM5OTE5OCwiYWNjb3VudF9pZCI6IjZkMzljOGU3LWQyY2EtNGQ0Yy04N2I5LWIzY2Y3MzNkNTU2ZSIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X285dm4zR1NEejNiOHM4dE02enZCc0tUdGFnNyJ9.iBo9pT-UwjiWGwRv10ogx4OrgHOkxa1T6h4l9_kkWVU';\nconst ELEMENT_TYPE = 'wechat';\n\nfunction wechat() {\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"loadAirwallex\"])({\n      env: 'staging'\n    }).then(() => {\n      var _createElement;\n\n      (_createElement = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"])(ELEMENT_TYPE, {\n        intent: {\n          id: intent_id,\n          client_secret\n        },\n        origin: window.location.origin\n      })) === null || _createElement === void 0 ? void 0 : _createElement.mount(ELEMENT_TYPE);\n    });\n\n    const onSuccess = event => {\n      /*\n        ... Handle event\n      */\n      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);\n    };\n\n    window.addEventListener('onSuccess', onSuccess);\n    return () => {\n      window.removeEventListener('onSuccess', onSuccess);\n    };\n  }, []);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"Wechat element integration\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 40,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"element\",\n      id: ELEMENT_TYPE\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 39,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (wechat);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy93ZWNoYXQvaW5kZXgudHN4P2NiZmMiXSwibmFtZXMiOlsiaW50ZW50X2lkIiwiY2xpZW50X3NlY3JldCIsIkVMRU1FTlRfVFlQRSIsIndlY2hhdCIsInVzZUVmZmVjdCIsImxvYWRBaXJ3YWxsZXgiLCJlbnYiLCJ0aGVuIiwiY3JlYXRlRWxlbWVudCIsImludGVudCIsImlkIiwib3JpZ2luIiwid2luZG93IiwibG9jYXRpb24iLCJtb3VudCIsIm9uU3VjY2VzcyIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJkZXRhaWwiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQU1BLE1BQU1BLFNBQVMsR0FBRyxpQ0FBbEI7QUFDQSxNQUFNQyxhQUFhLEdBQUcsdVJBQXRCO0FBQ0EsTUFBTUMsWUFBeUIsR0FBRyxRQUFsQzs7QUFFQSxTQUFTQyxNQUFULEdBQWtCO0FBQ2hCQyx5REFBUyxDQUFDLE1BQU07QUFDZEMsb0ZBQWEsQ0FBQztBQUNaQyxTQUFHLEVBQUU7QUFETyxLQUFELENBQWIsQ0FFR0MsSUFGSCxDQUVRLE1BQU07QUFBQTs7QUFDWix3QkFBQUMsZ0ZBQWEsQ0FBQ04sWUFBRCxFQUFlO0FBQzFCTyxjQUFNLEVBQUU7QUFDTkMsWUFBRSxFQUFFVixTQURFO0FBRU5DO0FBRk0sU0FEa0I7QUFLMUJVLGNBQU0sRUFBRUMsTUFBTSxDQUFDQyxRQUFQLENBQWdCRjtBQUxFLE9BQWYsQ0FBYixrRUFNSUcsS0FOSixDQU1VWixZQU5WO0FBT0QsS0FWRDs7QUFXQSxVQUFNYSxTQUFTLEdBQUlDLEtBQUQsSUFBd0I7QUFDeEM7QUFDTjtBQUNBO0FBQ01DLGFBQU8sQ0FBQ0MsR0FBUixDQUFhLHdCQUF1QkMsSUFBSSxDQUFDQyxTQUFMLENBQWVKLEtBQUssQ0FBQ0ssTUFBckIsQ0FBNkIsRUFBakU7QUFDRCxLQUxEOztBQU9BVCxVQUFNLENBQUNVLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDUCxTQUFyQztBQUNBLFdBQU8sTUFBTTtBQUNYSCxZQUFNLENBQUNXLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDUixTQUF4QztBQUNELEtBRkQ7QUFHRCxHQXZCUSxFQXVCTixFQXZCTSxDQUFUO0FBeUJBLHNCQUNFO0FBQUEsNEJBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixlQUVFO0FBQUssZUFBUyxFQUFDLFNBQWY7QUFBeUIsUUFBRSxFQUFFYjtBQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFNRDs7QUFFY0MscUVBQWYiLCJmaWxlIjoiLi9wYWdlcy93ZWNoYXQvaW5kZXgudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgbG9hZEFpcndhbGxleCxcbiAgRWxlbWVudFR5cGVcbn0gZnJvbSAnYWlyd2FsbGV4LXBheW1lbnQtZWxlbWVudHMnO1xuXG5jb25zdCBpbnRlbnRfaWQgPSAnaW50X285dm4zR1NEejNiOHM4dE02enZCc0tUdGFnNyc7XG5jb25zdCBjbGllbnRfc2VjcmV0ID0gJ2V5SmhiR2NpT2lKSVV6STFOaUo5LmV5SnBZWFFpT2pFMk1Ea3pPVFUxT1Rnc0ltVjRjQ0k2TVRZd09UTTVPVEU1T0N3aVlXTmpiM1Z1ZEY5cFpDSTZJalprTXpsak9HVTNMV1F5WTJFdE5HUTBZeTA0TjJJNUxXSXpZMlkzTXpOa05UVTJaU0lzSW1SaGRHRmZZMlZ1ZEdWeVgzSmxaMmx2YmlJNklsVkxJaXdpYVc1MFpXNTBYMmxrSWpvaWFXNTBYMjg1ZG00elIxTkVlak5pT0hNNGRFMDJlblpDYzB0VWRHRm5OeUo5LmlCbzlwVC1Vd2ppV0d3UnYxMG9neDRPcmdIT2t4YTFUNmg0bDlfa2tXVlUnO1xuY29uc3QgRUxFTUVOVF9UWVBFOiBFbGVtZW50VHlwZSA9ICd3ZWNoYXQnO1xuXG5mdW5jdGlvbiB3ZWNoYXQoKSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZEFpcndhbGxleCh7XG4gICAgICBlbnY6ICdzdGFnaW5nJyxcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIGNyZWF0ZUVsZW1lbnQoRUxFTUVOVF9UWVBFLCB7XG4gICAgICAgIGludGVudDoge1xuICAgICAgICAgIGlkOiBpbnRlbnRfaWQsXG4gICAgICAgICAgY2xpZW50X3NlY3JldCxcbiAgICAgICAgfSxcbiAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgfSk/Lm1vdW50KEVMRU1FTlRfVFlQRSk7XG4gICAgfSk7XG4gICAgY29uc3Qgb25TdWNjZXNzID0gKGV2ZW50OiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgLypcbiAgICAgICAgLi4uIEhhbmRsZSBldmVudFxuICAgICAgKi9cbiAgICAgIGNvbnNvbGUubG9nKGBDb25maXJtIHN1Y2Nlc3Mgd2l0aCAke0pTT04uc3RyaW5naWZ5KGV2ZW50LmRldGFpbCl9YCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvblN1Y2Nlc3MnLCBvblN1Y2Nlc3MgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvblN1Y2Nlc3MnLCBvblN1Y2Nlc3MgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMj5XZWNoYXQgZWxlbWVudCBpbnRlZ3JhdGlvbjwvaDI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImVsZW1lbnRcIiBpZD17RUxFTUVOVF9UWVBFfT48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2VjaGF0OyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/wechat/index.tsx\n");

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