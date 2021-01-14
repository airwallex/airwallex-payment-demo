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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/split-card/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/split-card/index.tsx":
/*!************************************!*\
  !*** ./pages/split-card/index.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! airwallex-payment-elements */ \"airwallex-payment-elements\");\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/Users/josie.ku/awx/airwallex-payment-demo/next-ts/pages/split-card/index.tsx\";\n\n\nconst intent_id = 'int_o9vn3GSDz3b8s8tM6zvBsKTtag7';\nconst client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDkzOTU1OTgsImV4cCI6MTYwOTM5OTE5OCwiYWNjb3VudF9pZCI6IjZkMzljOGU3LWQyY2EtNGQ0Yy04N2I5LWIzY2Y3MzNkNTU2ZSIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X285dm4zR1NEejNiOHM4dE02enZCc0tUdGFnNyJ9.iBo9pT-UwjiWGwRv10ogx4OrgHOkxa1T6h4l9_kkWVU';\n\nfunction splitCard() {\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"loadAirwallex\"])({\n      env: 'staging',\n      origin: window.location.origin\n    }).then(() => {\n      var _createElement, _createElement2, _createElement3;\n\n      (_createElement = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"])('cardNumber')) === null || _createElement === void 0 ? void 0 : _createElement.mount('card-number');\n      (_createElement2 = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"])('cvc')) === null || _createElement2 === void 0 ? void 0 : _createElement2.mount('cvc');\n      (_createElement3 = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"])('expiry')) === null || _createElement3 === void 0 ? void 0 : _createElement3.mount('expiry');\n    });\n\n    const onReady = event => {\n      /*\n      ... Handle event\n      */\n      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);\n    };\n\n    window.addEventListener('onReady', onReady);\n    return () => {\n      window.removeEventListener('onReady', onReady);\n    };\n  });\n  const containerStyle = {\n    border: '1px solid',\n    padding: '4px 8px',\n    marginBottom: '8px'\n  };\n\n  const triggerConfirm = async () => {\n    try {\n      const cardNumberElement = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"getElement\"])('cardNumber');\n\n      if (cardNumberElement) {\n        const confirmResult = await Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"confirmPaymentIntent\"])({\n          element: cardNumberElement,\n          id: intent_id,\n          client_secret: client_secret,\n          payment_method_options: {\n            card: {\n              auto_capture: true\n            }\n          }\n        });\n        console.log(`confirm success with ${JSON.stringify(confirmResult)}`);\n      }\n    } catch (err) {\n      console.log(`confirm fail with ${JSON.stringify(err)}`);\n    }\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"Split Card element integration\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 64,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"element\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        style: containerStyle,\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          children: \"Card number\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 67,\n          columnNumber: 11\n        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          id: \"card-number\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 68,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 66,\n        columnNumber: 9\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        style: containerStyle,\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          children: \"Expiry\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 71,\n          columnNumber: 11\n        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          id: \"expiry\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 72,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 70,\n        columnNumber: 9\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        style: containerStyle,\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          children: \"Cvc\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 75,\n          columnNumber: 11\n        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          id: \"cvc\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 76,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 74,\n        columnNumber: 9\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        onClick: triggerConfirm,\n        children: \"Confirm\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 78,\n        columnNumber: 9\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 65,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 63,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (splitCard);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9zcGxpdC1jYXJkL2luZGV4LnRzeD9lM2Y1Il0sIm5hbWVzIjpbImludGVudF9pZCIsImNsaWVudF9zZWNyZXQiLCJzcGxpdENhcmQiLCJ1c2VFZmZlY3QiLCJsb2FkQWlyd2FsbGV4IiwiZW52Iiwib3JpZ2luIiwid2luZG93IiwibG9jYXRpb24iLCJ0aGVuIiwiY3JlYXRlRWxlbWVudCIsIm1vdW50Iiwib25SZWFkeSIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJkZXRhaWwiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNvbnRhaW5lclN0eWxlIiwiYm9yZGVyIiwicGFkZGluZyIsIm1hcmdpbkJvdHRvbSIsInRyaWdnZXJDb25maXJtIiwiY2FyZE51bWJlckVsZW1lbnQiLCJnZXRFbGVtZW50IiwiY29uZmlybVJlc3VsdCIsImNvbmZpcm1QYXltZW50SW50ZW50IiwiZWxlbWVudCIsImlkIiwicGF5bWVudF9tZXRob2Rfb3B0aW9ucyIsImNhcmQiLCJhdXRvX2NhcHR1cmUiLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFPQSxNQUFNQSxTQUFTLEdBQUcsaUNBQWxCO0FBQ0EsTUFBTUMsYUFBYSxHQUFHLHVSQUF0Qjs7QUFFQSxTQUFTQyxTQUFULEdBQXFCO0FBQ25CQyx5REFBUyxDQUFDLE1BQU07QUFDZEMsb0ZBQWEsQ0FBQztBQUNaQyxTQUFHLEVBQUUsU0FETztBQUVaQyxZQUFNLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkY7QUFGWixLQUFELENBQWIsQ0FHR0csSUFISCxDQUdRLE1BQU07QUFBQTs7QUFDWix3QkFBQUMsZ0ZBQWEsQ0FBQyxZQUFELENBQWIsa0VBQTZCQyxLQUE3QixDQUFtQyxhQUFuQztBQUNBLHlCQUFBRCxnRkFBYSxDQUFDLEtBQUQsQ0FBYixvRUFBc0JDLEtBQXRCLENBQTRCLEtBQTVCO0FBQ0EseUJBQUFELGdGQUFhLENBQUMsUUFBRCxDQUFiLG9FQUF5QkMsS0FBekIsQ0FBK0IsUUFBL0I7QUFDRCxLQVBEOztBQVNBLFVBQU1DLE9BQU8sR0FBSUMsS0FBRCxJQUF3QjtBQUN0QztBQUNOO0FBQ0E7QUFDTUMsYUFBTyxDQUFDQyxHQUFSLENBQWEsdUJBQXNCQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosS0FBSyxDQUFDSyxNQUFyQixDQUE2QixFQUFoRTtBQUNELEtBTEQ7O0FBT0FYLFVBQU0sQ0FBQ1ksZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUNQLE9BQW5DO0FBQ0EsV0FBTyxNQUFNO0FBQ1hMLFlBQU0sQ0FBQ2EsbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0NSLE9BQXRDO0FBQ0QsS0FGRDtBQUdELEdBckJRLENBQVQ7QUFzQkEsUUFBTVMsY0FBYyxHQUFHO0FBQ3JCQyxVQUFNLEVBQUUsV0FEYTtBQUVyQkMsV0FBTyxFQUFFLFNBRlk7QUFHckJDLGdCQUFZLEVBQUU7QUFITyxHQUF2Qjs7QUFNQSxRQUFNQyxjQUFjLEdBQUcsWUFBWTtBQUNqQyxRQUFJO0FBQ0YsWUFBTUMsaUJBQWlCLEdBQUdDLDZFQUFVLENBQUMsWUFBRCxDQUFwQzs7QUFDQSxVQUFJRCxpQkFBSixFQUF1QjtBQUNyQixjQUFNRSxhQUFhLEdBQUcsTUFBTUMsdUZBQW9CLENBQUM7QUFDL0NDLGlCQUFPLEVBQUVKLGlCQURzQztBQUUvQ0ssWUFBRSxFQUFFL0IsU0FGMkM7QUFHL0NDLHVCQUFhLEVBQUVBLGFBSGdDO0FBSS9DK0IsZ0NBQXNCLEVBQUU7QUFDdEJDLGdCQUFJLEVBQUU7QUFDSkMsMEJBQVksRUFBRTtBQURWO0FBRGdCO0FBSnVCLFNBQUQsQ0FBaEQ7QUFVQXBCLGVBQU8sQ0FBQ0MsR0FBUixDQUFhLHdCQUF1QkMsSUFBSSxDQUFDQyxTQUFMLENBQWVXLGFBQWYsQ0FBOEIsRUFBbEU7QUFDRDtBQUNGLEtBZkQsQ0FlRSxPQUFPTyxHQUFQLEVBQVk7QUFDWnJCLGFBQU8sQ0FBQ0MsR0FBUixDQUFhLHFCQUFvQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVrQixHQUFmLENBQW9CLEVBQXJEO0FBQ0Q7QUFDRixHQW5CRDs7QUFxQkEsc0JBQ0U7QUFBQSw0QkFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURGLGVBRUU7QUFBSyxlQUFTLEVBQUMsU0FBZjtBQUFBLDhCQUNFO0FBQUssYUFBSyxFQUFFZCxjQUFaO0FBQUEsZ0NBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREYsZUFFRTtBQUFLLFlBQUUsRUFBQztBQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREYsZUFLRTtBQUFLLGFBQUssRUFBRUEsY0FBWjtBQUFBLGdDQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLGVBRUU7QUFBSyxZQUFFLEVBQUM7QUFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUxGLGVBU0U7QUFBSyxhQUFLLEVBQUVBLGNBQVo7QUFBQSxnQ0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixlQUVFO0FBQUssWUFBRSxFQUFDO0FBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFGRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FURixlQWFFO0FBQVEsZUFBTyxFQUFFSSxjQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQWJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBb0JEOztBQUVjdkIsd0VBQWYiLCJmaWxlIjoiLi9wYWdlcy9zcGxpdC1jYXJkL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGxvYWRBaXJ3YWxsZXgsXG4gIGdldEVsZW1lbnQsXG4gIGNvbmZpcm1QYXltZW50SW50ZW50LFxufSBmcm9tICdhaXJ3YWxsZXgtcGF5bWVudC1lbGVtZW50cyc7XG5cbmNvbnN0IGludGVudF9pZCA9ICdpbnRfbzl2bjNHU0R6M2I4czh0TTZ6dkJzS1R0YWc3JztcbmNvbnN0IGNsaWVudF9zZWNyZXQgPSAnZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFlYUWlPakUyTURrek9UVTFPVGdzSW1WNGNDSTZNVFl3T1RNNU9URTVPQ3dpWVdOamIzVnVkRjlwWkNJNklqWmtNemxqT0dVM0xXUXlZMkV0TkdRMFl5MDROMkk1TFdJelkyWTNNek5rTlRVMlpTSXNJbVJoZEdGZlkyVnVkR1Z5WDNKbFoybHZiaUk2SWxWTElpd2lhVzUwWlc1MFgybGtJam9pYVc1MFgyODVkbTR6UjFORWVqTmlPSE00ZEUwMmVuWkNjMHRVZEdGbk55SjkuaUJvOXBULVV3amlXR3dSdjEwb2d4NE9yZ0hPa3hhMVQ2aDRsOV9ra1dWVSc7XG5cbmZ1bmN0aW9uIHNwbGl0Q2FyZCgpIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkQWlyd2FsbGV4KHtcbiAgICAgIGVudjogJ3N0YWdpbmcnLFxuICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgY3JlYXRlRWxlbWVudCgnY2FyZE51bWJlcicpPy5tb3VudCgnY2FyZC1udW1iZXInKTtcbiAgICAgIGNyZWF0ZUVsZW1lbnQoJ2N2YycpPy5tb3VudCgnY3ZjJyk7XG4gICAgICBjcmVhdGVFbGVtZW50KCdleHBpcnknKT8ubW91bnQoJ2V4cGlyeScpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb25SZWFkeSA9IChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIC8qXG4gICAgICAuLi4gSGFuZGxlIGV2ZW50XG4gICAgKi9cbiAgICAgIGNvbnNvbGUubG9nKGBFbGVtZW50cyByZWFkeSB3aXRoICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKX1gKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29uUmVhZHknLCBvblJlYWR5IGFzIEV2ZW50TGlzdGVuZXIpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25SZWFkeScsIG9uUmVhZHkgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgfTtcbiAgfSk7XG4gIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCcsXG4gICAgcGFkZGluZzogJzRweCA4cHgnLFxuICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlckNvbmZpcm0gPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNhcmROdW1iZXJFbGVtZW50ID0gZ2V0RWxlbWVudCgnY2FyZE51bWJlcicpO1xuICAgICAgaWYgKGNhcmROdW1iZXJFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbmZpcm1SZXN1bHQgPSBhd2FpdCBjb25maXJtUGF5bWVudEludGVudCh7XG4gICAgICAgICAgZWxlbWVudDogY2FyZE51bWJlckVsZW1lbnQsXG4gICAgICAgICAgaWQ6IGludGVudF9pZCxcbiAgICAgICAgICBjbGllbnRfc2VjcmV0OiBjbGllbnRfc2VjcmV0LFxuICAgICAgICAgIHBheW1lbnRfbWV0aG9kX29wdGlvbnM6IHtcbiAgICAgICAgICAgIGNhcmQ6IHtcbiAgICAgICAgICAgICAgYXV0b19jYXB0dXJlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYGNvbmZpcm0gc3VjY2VzcyB3aXRoICR7SlNPTi5zdHJpbmdpZnkoY29uZmlybVJlc3VsdCl9YCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhgY29uZmlybSBmYWlsIHdpdGggJHtKU09OLnN0cmluZ2lmeShlcnIpfWApO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDI+U3BsaXQgQ2FyZCBlbGVtZW50IGludGVncmF0aW9uPC9oMj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWxlbWVudFwiPlxuICAgICAgICA8ZGl2IHN0eWxlPXtjb250YWluZXJTdHlsZX0+XG4gICAgICAgICAgPGRpdj5DYXJkIG51bWJlcjwvZGl2PlxuICAgICAgICAgIDxkaXYgaWQ9XCJjYXJkLW51bWJlclwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXtjb250YWluZXJTdHlsZX0+XG4gICAgICAgICAgPGRpdj5FeHBpcnk8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGlkPVwiZXhwaXJ5XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e2NvbnRhaW5lclN0eWxlfT5cbiAgICAgICAgICA8ZGl2PkN2YzwvZGl2PlxuICAgICAgICAgIDxkaXYgaWQ9XCJjdmNcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0cmlnZ2VyQ29uZmlybX0+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwbGl0Q2FyZDsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/split-card/index.tsx\n");

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