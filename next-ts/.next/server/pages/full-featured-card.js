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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/full-featured-card/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/full-featured-card/index.tsx":
/*!********************************************!*\
  !*** ./pages/full-featured-card/index.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! airwallex-payment-elements */ \"airwallex-payment-elements\");\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/Users/josie.ku/awx/airwallex-payment-demo/next-ts/pages/full-featured-card/index.tsx\";\n\n\nconst intent_id = 'int_o9vn3GSDz3b8s8tM6zvBsKTtag7';\nconst client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDkzOTU1OTgsImV4cCI6MTYwOTM5OTE5OCwiYWNjb3VudF9pZCI6IjZkMzljOGU3LWQyY2EtNGQ0Yy04N2I5LWIzY2Y3MzNkNTU2ZSIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X285dm4zR1NEejNiOHM4dE02enZCc0tUdGFnNyJ9.iBo9pT-UwjiWGwRv10ogx4OrgHOkxa1T6h4l9_kkWVU';\nconst ELEMENT_TYPE = 'fullFeaturedCard';\n\nfunction fullFeaturedCard() {\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"loadAirwallex\"])({\n      env: 'staging',\n      origin: window.location.origin\n    }).then(() => {\n      console.log('loaded airwallex');\n    }).then(() => {\n      var _createElement;\n\n      (_createElement = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"])(ELEMENT_TYPE, {\n        intent: {\n          id: intent_id,\n          client_secret: client_secret\n        }\n      })) === null || _createElement === void 0 ? void 0 : _createElement.mount(ELEMENT_TYPE);\n    });\n\n    const onSuccess = event => {\n      /*\n        ... Handle event\n      */\n      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);\n    };\n\n    window.addEventListener('onSuccess', onSuccess);\n    return () => {\n      window.removeEventListener('onSuccess', onSuccess);\n    };\n  });\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"Full Featured Card Integration\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"element\",\n      id: ELEMENT_TYPE\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 45,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 43,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (fullFeaturedCard);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9mdWxsLWZlYXR1cmVkLWNhcmQvaW5kZXgudHN4P2ZhZmMiXSwibmFtZXMiOlsiaW50ZW50X2lkIiwiY2xpZW50X3NlY3JldCIsIkVMRU1FTlRfVFlQRSIsImZ1bGxGZWF0dXJlZENhcmQiLCJ1c2VFZmZlY3QiLCJsb2FkQWlyd2FsbGV4IiwiZW52Iiwib3JpZ2luIiwid2luZG93IiwibG9jYXRpb24iLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUVsZW1lbnQiLCJpbnRlbnQiLCJpZCIsIm1vdW50Iiwib25TdWNjZXNzIiwiZXZlbnQiLCJKU09OIiwic3RyaW5naWZ5IiwiZGV0YWlsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFNQSxNQUFNQSxTQUFTLEdBQUcsaUNBQWxCO0FBQ0EsTUFBTUMsYUFBYSxHQUFHLHVSQUF0QjtBQUNBLE1BQU1DLFlBQXlCLEdBQUcsa0JBQWxDOztBQUVBLFNBQVNDLGdCQUFULEdBQTRCO0FBQzFCQyx5REFBUyxDQUFDLE1BQU07QUFDZEMsb0ZBQWEsQ0FBQztBQUNaQyxTQUFHLEVBQUUsU0FETztBQUVaQyxZQUFNLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkY7QUFGWixLQUFELENBQWIsQ0FHR0csSUFISCxDQUdRLE1BQUk7QUFDVkMsYUFBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFDRCxLQUxELEVBTUNGLElBTkQsQ0FNTSxNQUFJO0FBQUE7O0FBQ1Isd0JBQUFHLGdGQUFhLENBQUNYLFlBQUQsRUFBZTtBQUMxQlksY0FBTSxFQUFFO0FBQ05DLFlBQUUsRUFBRWYsU0FERTtBQUVOQyx1QkFBYSxFQUFFQTtBQUZUO0FBRGtCLE9BQWYsQ0FBYixrRUFLSWUsS0FMSixDQUtVZCxZQUxWO0FBTUQsS0FiRDs7QUFlQSxVQUFNZSxTQUFTLEdBQUlDLEtBQUQsSUFBd0I7QUFDeEM7QUFDTjtBQUNBO0FBQ01QLGFBQU8sQ0FBQ0MsR0FBUixDQUFhLHdCQUF1Qk8sSUFBSSxDQUFDQyxTQUFMLENBQWVGLEtBQUssQ0FBQ0csTUFBckIsQ0FBNkIsRUFBakU7QUFDRCxLQUxEOztBQU9BYixVQUFNLENBQUNjLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDTCxTQUFyQztBQUNBLFdBQU8sTUFBTTtBQUNYVCxZQUFNLENBQUNlLG1CQUFQLENBQTJCLFdBQTNCLEVBQXdDTixTQUF4QztBQUNELEtBRkQ7QUFHRCxHQTNCUSxDQUFUO0FBNkJBLHNCQUNFO0FBQUEsNEJBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixlQUVFO0FBQUssZUFBUyxFQUFDLFNBQWY7QUFBeUIsUUFBRSxFQUFFZjtBQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFNRDs7QUFFY0MsK0VBQWYiLCJmaWxlIjoiLi9wYWdlcy9mdWxsLWZlYXR1cmVkLWNhcmQvaW5kZXgudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgbG9hZEFpcndhbGxleCxcbiAgRWxlbWVudFR5cGUsXG59IGZyb20gJ2FpcndhbGxleC1wYXltZW50LWVsZW1lbnRzJztcblxuY29uc3QgaW50ZW50X2lkID0gJ2ludF9vOXZuM0dTRHozYjhzOHRNNnp2QnNLVHRhZzcnO1xuY29uc3QgY2xpZW50X3NlY3JldCA9ICdleUpoYkdjaU9pSklVekkxTmlKOS5leUpwWVhRaU9qRTJNRGt6T1RVMU9UZ3NJbVY0Y0NJNk1UWXdPVE01T1RFNU9Dd2lZV05qYjNWdWRGOXBaQ0k2SWpaa016bGpPR1UzTFdReVkyRXROR1EwWXkwNE4ySTVMV0l6WTJZM016TmtOVFUyWlNJc0ltUmhkR0ZmWTJWdWRHVnlYM0psWjJsdmJpSTZJbFZMSWl3aWFXNTBaVzUwWDJsa0lqb2lhVzUwWDI4NWRtNHpSMU5FZWpOaU9ITTRkRTAyZW5aQ2MwdFVkR0ZuTnlKOS5pQm85cFQtVXdqaVdHd1J2MTBvZ3g0T3JnSE9reGExVDZoNGw5X2trV1ZVJztcbmNvbnN0IEVMRU1FTlRfVFlQRTogRWxlbWVudFR5cGUgPSAnZnVsbEZlYXR1cmVkQ2FyZCc7XG5cbmZ1bmN0aW9uIGZ1bGxGZWF0dXJlZENhcmQoKSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZEFpcndhbGxleCh7XG4gICAgICBlbnY6ICdzdGFnaW5nJyxcbiAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLm9yaWdpblxuICAgIH0pLnRoZW4oKCk9PntcbiAgICAgIGNvbnNvbGUubG9nKCdsb2FkZWQgYWlyd2FsbGV4Jyk7XG4gICAgfSlcbiAgICAudGhlbigoKT0+e1xuICAgICAgY3JlYXRlRWxlbWVudChFTEVNRU5UX1RZUEUsIHtcbiAgICAgICAgaW50ZW50OiB7XG4gICAgICAgICAgaWQ6IGludGVudF9pZCxcbiAgICAgICAgICBjbGllbnRfc2VjcmV0OiBjbGllbnRfc2VjcmV0XG4gICAgICAgIH1cbiAgICAgIH0pPy5tb3VudChFTEVNRU5UX1RZUEUpO1xuICAgIH0pXG4gIFxuICAgIGNvbnN0IG9uU3VjY2VzcyA9IChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIC8qXG4gICAgICAgIC4uLiBIYW5kbGUgZXZlbnRcbiAgICAgICovXG4gICAgICBjb25zb2xlLmxvZyhgQ29uZmlybSBzdWNjZXNzIHdpdGggJHtKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpfWApO1xuICAgIH07XG4gIFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvblN1Y2Nlc3MnLCBvblN1Y2Nlc3MgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvblN1Y2Nlc3MnLCBvblN1Y2Nlc3MgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgfTtcbiAgfSlcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDI+RnVsbCBGZWF0dXJlZCBDYXJkIEludGVncmF0aW9uPC9oMj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWxlbWVudFwiIGlkPXtFTEVNRU5UX1RZUEV9PjwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bGxGZWF0dXJlZENhcmQ7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/full-featured-card/index.tsx\n");

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