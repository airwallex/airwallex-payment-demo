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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/card/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/card/index.tsx":
/*!******************************!*\
  !*** ./pages/card/index.tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return card; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! airwallex-payment-elements */ \"airwallex-payment-elements\");\n/* harmony import */ var airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/Users/josie.ku/awx/airwallex-payment-demo/next-ts/pages/card/index.tsx\";\n\n\nconst intent_id = 'replace-with-your-intent-id';\nconst client_secret = 'replace-with-your-client-secret';\nconst ELEMENT_TYPE = 'card';\nfunction card() {\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"loadAirwallex\"])({\n      env: 'staging',\n      origin: window.location.origin\n    }).then(() => {\n      var _createElement;\n\n      (_createElement = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"])(ELEMENT_TYPE)) === null || _createElement === void 0 ? void 0 : _createElement.mount(ELEMENT_TYPE);\n    });\n\n    const onReady = event => {\n      /*\n      ... Handle event\n      */\n      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);\n    };\n\n    window.addEventListener('onReady', onReady);\n    return () => {\n      window.removeEventListener('onReady', onReady);\n    };\n  });\n\n  const triggerConfirm = async () => {\n    try {\n      const cardNumberElement = Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"getElement\"])(ELEMENT_TYPE);\n\n      if (cardNumberElement) {\n        const confirmResult = await Object(airwallex_payment_elements__WEBPACK_IMPORTED_MODULE_2__[\"confirmPaymentIntent\"])({\n          element: cardNumberElement,\n          id: intent_id,\n          client_secret,\n          payment_method_options: {\n            card: {\n              auto_capture: true\n            }\n          }\n        });\n        console.log(`confirm success with ${JSON.stringify(confirmResult)}`);\n      }\n    } catch (err) {\n      console.log(`confirm fail with ${JSON.stringify(err)}`);\n    }\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"Card element integration\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 59,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"element\",\n      id: ELEMENT_TYPE\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 60,\n      columnNumber: 7\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: triggerConfirm,\n      style: {\n        marginTop: '8px'\n      },\n      children: \"Confirm\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 58,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9jYXJkL2luZGV4LnRzeD8zYTFhIl0sIm5hbWVzIjpbImludGVudF9pZCIsImNsaWVudF9zZWNyZXQiLCJFTEVNRU5UX1RZUEUiLCJjYXJkIiwidXNlRWZmZWN0IiwibG9hZEFpcndhbGxleCIsImVudiIsIm9yaWdpbiIsIndpbmRvdyIsImxvY2F0aW9uIiwidGhlbiIsImNyZWF0ZUVsZW1lbnQiLCJtb3VudCIsIm9uUmVhZHkiLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiZGV0YWlsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VyQ29uZmlybSIsImNhcmROdW1iZXJFbGVtZW50IiwiZ2V0RWxlbWVudCIsImNvbmZpcm1SZXN1bHQiLCJjb25maXJtUGF5bWVudEludGVudCIsImVsZW1lbnQiLCJpZCIsInBheW1lbnRfbWV0aG9kX29wdGlvbnMiLCJhdXRvX2NhcHR1cmUiLCJlcnIiLCJtYXJnaW5Ub3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBUUEsTUFBTUEsU0FBUyxHQUFHLDZCQUFsQjtBQUNBLE1BQU1DLGFBQWEsR0FBRyxpQ0FBdEI7QUFDQSxNQUFNQyxZQUF5QixHQUFHLE1BQWxDO0FBRWUsU0FBU0MsSUFBVCxHQUFnQjtBQUM3QkMseURBQVMsQ0FBQyxNQUFNO0FBQ2RDLG9GQUFhLENBQUM7QUFDWkMsU0FBRyxFQUFFLFNBRE87QUFFWkMsWUFBTSxFQUFFQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JGO0FBRlosS0FBRCxDQUFiLENBR0dHLElBSEgsQ0FHUSxNQUFNO0FBQUE7O0FBQ1osd0JBQUFDLGdGQUFhLENBQUNULFlBQUQsQ0FBYixrRUFBNkJVLEtBQTdCLENBQW1DVixZQUFuQztBQUNELEtBTEQ7O0FBT0EsVUFBTVcsT0FBTyxHQUFJQyxLQUFELElBQXdCO0FBQ3RDO0FBQ047QUFDQTtBQUNNQyxhQUFPLENBQUNDLEdBQVIsQ0FBYSx1QkFBc0JDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixLQUFLLENBQUNLLE1BQXJCLENBQTZCLEVBQWhFO0FBQ0QsS0FMRDs7QUFPQVgsVUFBTSxDQUFDWSxnQkFBUCxDQUF3QixTQUF4QixFQUFtQ1AsT0FBbkM7QUFDQSxXQUFPLE1BQU07QUFDWEwsWUFBTSxDQUFDYSxtQkFBUCxDQUEyQixTQUEzQixFQUFzQ1IsT0FBdEM7QUFDRCxLQUZEO0FBR0QsR0FuQlEsQ0FBVDs7QUFxQkEsUUFBTVMsY0FBYyxHQUFHLFlBQVk7QUFDakMsUUFBSTtBQUNGLFlBQU1DLGlCQUFpQixHQUFHQyw2RUFBVSxDQUFDdEIsWUFBRCxDQUFwQzs7QUFDQSxVQUFJcUIsaUJBQUosRUFBdUI7QUFDckIsY0FBTUUsYUFBYSxHQUFHLE1BQU1DLHVGQUFvQixDQUFDO0FBQy9DQyxpQkFBTyxFQUFFSixpQkFEc0M7QUFFL0NLLFlBQUUsRUFBRTVCLFNBRjJDO0FBRy9DQyx1QkFIK0M7QUFJL0M0QixnQ0FBc0IsRUFBRTtBQUN0QjFCLGdCQUFJLEVBQUU7QUFDSjJCLDBCQUFZLEVBQUU7QUFEVjtBQURnQjtBQUp1QixTQUFELENBQWhEO0FBVUFmLGVBQU8sQ0FBQ0MsR0FBUixDQUFhLHdCQUF1QkMsSUFBSSxDQUFDQyxTQUFMLENBQWVPLGFBQWYsQ0FBOEIsRUFBbEU7QUFDRDtBQUNGLEtBZkQsQ0FlRSxPQUFPTSxHQUFQLEVBQVk7QUFDWmhCLGFBQU8sQ0FBQ0MsR0FBUixDQUFhLHFCQUFvQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVhLEdBQWYsQ0FBb0IsRUFBckQ7QUFDRDtBQUNGLEdBbkJEOztBQXFCQSxzQkFDRTtBQUFBLDRCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFFRTtBQUFLLGVBQVMsRUFBQyxTQUFmO0FBQXlCLFFBQUUsRUFBRTdCO0FBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGRixlQUdFO0FBQVEsYUFBTyxFQUFFb0IsY0FBakI7QUFBaUMsV0FBSyxFQUFFO0FBQUVVLGlCQUFTLEVBQUU7QUFBYixPQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBU0QiLCJmaWxlIjoiLi9wYWdlcy9jYXJkL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGxvYWRBaXJ3YWxsZXgsXG4gIGdldEVsZW1lbnQsXG4gIGNvbmZpcm1QYXltZW50SW50ZW50LFxuICBFbGVtZW50VHlwZSxcbn0gZnJvbSAnYWlyd2FsbGV4LXBheW1lbnQtZWxlbWVudHMnO1xuXG5jb25zdCBpbnRlbnRfaWQgPSAncmVwbGFjZS13aXRoLXlvdXItaW50ZW50LWlkJztcbmNvbnN0IGNsaWVudF9zZWNyZXQgPSAncmVwbGFjZS13aXRoLXlvdXItY2xpZW50LXNlY3JldCc7XG5jb25zdCBFTEVNRU5UX1RZUEU6IEVsZW1lbnRUeXBlID0gJ2NhcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjYXJkKCkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWRBaXJ3YWxsZXgoe1xuICAgICAgZW52OiAnc3RhZ2luZycsXG4gICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICBjcmVhdGVFbGVtZW50KEVMRU1FTlRfVFlQRSk/Lm1vdW50KEVMRU1FTlRfVFlQRSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvblJlYWR5ID0gKGV2ZW50OiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgLypcbiAgICAgIC4uLiBIYW5kbGUgZXZlbnRcbiAgICAqL1xuICAgICAgY29uc29sZS5sb2coYEVsZW1lbnRzIHJlYWR5IHdpdGggJHtKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpfWApO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb25SZWFkeScsIG9uUmVhZHkgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvblJlYWR5Jywgb25SZWFkeSBhcyBFdmVudExpc3RlbmVyKTtcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCB0cmlnZ2VyQ29uZmlybSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY2FyZE51bWJlckVsZW1lbnQgPSBnZXRFbGVtZW50KEVMRU1FTlRfVFlQRSk7XG4gICAgICBpZiAoY2FyZE51bWJlckVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29uZmlybVJlc3VsdCA9IGF3YWl0IGNvbmZpcm1QYXltZW50SW50ZW50KHtcbiAgICAgICAgICBlbGVtZW50OiBjYXJkTnVtYmVyRWxlbWVudCxcbiAgICAgICAgICBpZDogaW50ZW50X2lkLFxuICAgICAgICAgIGNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgcGF5bWVudF9tZXRob2Rfb3B0aW9uczoge1xuICAgICAgICAgICAgY2FyZDoge1xuICAgICAgICAgICAgICBhdXRvX2NhcHR1cmU6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhgY29uZmlybSBzdWNjZXNzIHdpdGggJHtKU09OLnN0cmluZ2lmeShjb25maXJtUmVzdWx0KX1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBjb25maXJtIGZhaWwgd2l0aCAke0pTT04uc3RyaW5naWZ5KGVycil9YCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMj5DYXJkIGVsZW1lbnQgaW50ZWdyYXRpb248L2gyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbGVtZW50XCIgaWQ9e0VMRU1FTlRfVFlQRX0gLz5cbiAgICAgIDxidXR0b24gb25DbGljaz17dHJpZ2dlckNvbmZpcm19IHN0eWxlPXt7IG1hcmdpblRvcDogJzhweCcgfX0+XG4gICAgICAgIENvbmZpcm1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/card/index.tsx\n");

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