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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/hpp/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/hpp/index.tsx":
/*!*****************************!*\
  !*** ./pages/hpp/index.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! airwallex-payment-elements */ \"airwallex-payment-elements\");\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _jsxFileName = \"/Users/josie.ku/awx/airwallex-payment-demo/next-ts/pages/hpp/index.tsx\";\n\nconst intent_id = 'int_o9vn3GSDz3b8s8tM6zvBsKTtag7';\nconst client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDkzOTU1OTgsImV4cCI6MTYwOTM5OTE5OCwiYWNjb3VudF9pZCI6IjZkMzljOGU3LWQyY2EtNGQ0Yy04N2I5LWIzY2Y3MzNkNTU2ZSIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X285dm4zR1NEejNiOHM4dE02enZCc0tUdGFnNyJ9.iBo9pT-UwjiWGwRv10ogx4OrgHOkxa1T6h4l9_kkWVU';\n\nasync function redirectHpp() {\n  try {\n    await Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_1__[\"loadAirwallex\"])({\n      env: 'staging',\n      origin: window.location.origin\n    });\n    await Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_1__[\"redirectToCheckout\"])({\n      env: 'staging',\n      id: intent_id,\n      client_secret: client_secret\n    });\n  } catch (e) {\n    console.error('there was an error', e);\n  }\n}\n\nfunction hpp() {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"Host Payment Page (HPP) Integration\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 26,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: redirectHpp,\n      children: \"Click to redirect\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 27,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 25,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (hpp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9ocHAvaW5kZXgudHN4P2NmNTAiXSwibmFtZXMiOlsiaW50ZW50X2lkIiwiY2xpZW50X3NlY3JldCIsInJlZGlyZWN0SHBwIiwibG9hZEFpcndhbGxleCIsImVudiIsIm9yaWdpbiIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVkaXJlY3RUb0NoZWNrb3V0IiwiaWQiLCJlIiwiY29uc29sZSIsImVycm9yIiwiaHBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFHQSxNQUFNQSxTQUFTLEdBQUcsaUNBQWxCO0FBQ0EsTUFBTUMsYUFBYSxHQUFHLHVSQUF0Qjs7QUFFQSxlQUFlQyxXQUFmLEdBQTRCO0FBQzFCLE1BQUk7QUFDRixVQUFNQyxnRkFBYSxDQUFDO0FBQ2xCQyxTQUFHLEVBQUUsU0FEYTtBQUVsQkMsWUFBTSxFQUFFQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JGO0FBRk4sS0FBRCxDQUFuQjtBQUlBLFVBQU1HLHFGQUFrQixDQUFDO0FBQ3ZCSixTQUFHLEVBQUUsU0FEa0I7QUFFdkJLLFFBQUUsRUFBRVQsU0FGbUI7QUFHdkJDLG1CQUFhLEVBQUVBO0FBSFEsS0FBRCxDQUF4QjtBQUtELEdBVkQsQ0FVRSxPQUFNUyxDQUFOLEVBQVM7QUFDVEMsV0FBTyxDQUFDQyxLQUFSLENBQWMsb0JBQWQsRUFBb0NGLENBQXBDO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTRyxHQUFULEdBQWU7QUFDYixzQkFDRTtBQUFBLDRCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFFRTtBQUFRLGFBQU8sRUFBRVgsV0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQU1EOztBQUVjVyxrRUFBZiIsImZpbGUiOiIuL3BhZ2VzL2hwcC9pbmRleC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWRpcmVjdFRvQ2hlY2tvdXQsIGxvYWRBaXJ3YWxsZXggfSBmcm9tICdhaXJ3YWxsZXgtcGF5bWVudC1lbGVtZW50cyc7XG5cblxuY29uc3QgaW50ZW50X2lkID0gJ2ludF9vOXZuM0dTRHozYjhzOHRNNnp2QnNLVHRhZzcnO1xuY29uc3QgY2xpZW50X3NlY3JldCA9ICdleUpoYkdjaU9pSklVekkxTmlKOS5leUpwWVhRaU9qRTJNRGt6T1RVMU9UZ3NJbVY0Y0NJNk1UWXdPVE01T1RFNU9Dd2lZV05qYjNWdWRGOXBaQ0k2SWpaa016bGpPR1UzTFdReVkyRXROR1EwWXkwNE4ySTVMV0l6WTJZM016TmtOVFUyWlNJc0ltUmhkR0ZmWTJWdWRHVnlYM0psWjJsdmJpSTZJbFZMSWl3aWFXNTBaVzUwWDJsa0lqb2lhVzUwWDI4NWRtNHpSMU5FZWpOaU9ITTRkRTAyZW5aQ2MwdFVkR0ZuTnlKOS5pQm85cFQtVXdqaVdHd1J2MTBvZ3g0T3JnSE9reGExVDZoNGw5X2trV1ZVJztcblxuYXN5bmMgZnVuY3Rpb24gcmVkaXJlY3RIcHAoKXtcbiAgdHJ5IHtcbiAgICBhd2FpdCBsb2FkQWlyd2FsbGV4KHtcbiAgICAgIGVudjogJ3N0YWdpbmcnLFxuICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gICAgfSk7XG4gICAgYXdhaXQgcmVkaXJlY3RUb0NoZWNrb3V0KHtcbiAgICAgIGVudjogJ3N0YWdpbmcnLFxuICAgICAgaWQ6IGludGVudF9pZCxcbiAgICAgIGNsaWVudF9zZWNyZXQ6IGNsaWVudF9zZWNyZXQsXG4gICAgfSlcbiAgfSBjYXRjaChlKSB7XG4gICAgY29uc29sZS5lcnJvcigndGhlcmUgd2FzIGFuIGVycm9yJywgZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaHBwKCkge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDI+SG9zdCBQYXltZW50IFBhZ2UgKEhQUCkgSW50ZWdyYXRpb248L2gyPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtyZWRpcmVjdEhwcH0+Q2xpY2sgdG8gcmVkaXJlY3Q8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBocHBcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/hpp/index.tsx\n");

/***/ }),

/***/ "airwallex-payment-elements":
/*!*********************************************!*\
  !*** external "airwallex-payment-elements" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"airwallex-payment-elements\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhaXJ3YWxsZXgtcGF5bWVudC1lbGVtZW50c1wiP2ZiYzIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYWlyd2FsbGV4LXBheW1lbnQtZWxlbWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhaXJ3YWxsZXgtcGF5bWVudC1lbGVtZW50c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///airwallex-payment-elements\n");

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