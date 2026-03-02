'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var styleInject_es = require('../chunks/style-inject.es-XZHJH68X.cjs.js');
var Icon = require('../chunks/Icon-BohTSe52.cjs.js');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var Pagination = require('../chunks/Pagination-BYD2chba.cjs.js');
require('@fortawesome/react-fontawesome');
require('classnames');

var css_248z = "@charset \"UTF-8\";\n/**\n * Table组件样式\n * 基于CreamDesign设计系统\n * 充分利用色彩系统\n */\n/**\n * CreamDesign 设计系统\n * 基于柔和奶油色调的现代化设计系统\n */\n.text-primary {\n  color: #a855f7;\n}\n\n.text-primary-dark {\n  color: #581c87;\n}\n\n.text-secondary {\n  color: #85c1e9;\n}\n\n.text-success {\n  color: #4caf50;\n}\n\n.text-warning {\n  color: #ffc107;\n}\n\n.text-error {\n  color: #f44336;\n}\n\n.text-info {\n  color: #2196f3;\n}\n\n.text-disabled {\n  color: #9e9e9e;\n}\n\n.text-neutral-50 {\n  color: #ffffff;\n}\n\n.text-neutral-100 {\n  color: #f9f9f9;\n}\n\n.text-neutral-200 {\n  color: #f0f0f0;\n}\n\n.text-neutral-300 {\n  color: #e0e0e0;\n}\n\n.text-neutral-400 {\n  color: #bdbdbd;\n}\n\n.text-neutral-500 {\n  color: #9e9e9e;\n}\n\n.text-neutral-600 {\n  color: #757575;\n}\n\n.text-neutral-700 {\n  color: #616161;\n}\n\n.text-neutral-800 {\n  color: #424242;\n}\n\n.text-neutral-900 {\n  color: #212121;\n}\n\n.text-heading {\n  color: #212121;\n}\n\n.text-body {\n  color: #616161;\n}\n\n.text-muted {\n  color: #757575;\n}\n\n.font-size-base {\n  font-size: 1rem;\n}\n\n.font-size-lg {\n  font-size: 1.25rem;\n}\n\n.font-size-sm {\n  font-size: 0.875rem;\n}\n\n.font-size-xs {\n  font-size: 0.765625rem;\n}\n\n.font-size-h1 {\n  font-size: 2.5rem;\n}\n\n.font-size-h2 {\n  font-size: 2rem;\n}\n\n.font-size-h3 {\n  font-size: 1.75rem;\n}\n\n.font-size-h4 {\n  font-size: 1.5rem;\n}\n\n.font-size-h5 {\n  font-size: 1.25rem;\n}\n\n.font-size-h6 {\n  font-size: 1rem;\n}\n\n.font-weight-light {\n  font-weight: 300;\n}\n\n.font-weight-normal {\n  font-weight: 400;\n}\n\n.font-weight-bold {\n  font-weight: 700;\n}\n\n.font-weight-lighter {\n  font-weight: lighter;\n}\n\n.font-weight-bolder {\n  font-weight: bolder;\n}\n\n.line-height-base {\n  line-height: 1.5;\n}\n\n.line-height-lg {\n  line-height: 2;\n}\n\n.line-height-sm {\n  line-height: 1.25;\n}\n\n.line-height-none {\n  line-height: 1;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.font-family-sans-serif {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n}\n\n.font-family-monospace {\n  font-family: monospace;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212121;\n  background-color: #ffffff;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  line-height: 1.25;\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n}\n\nh1 {\n  font-size: 2.5rem;\n}\n\nh2 {\n  font-size: 2rem;\n}\n\nh3 {\n  font-size: 1.75rem;\n}\n\nh4 {\n  font-size: 1.5rem;\n}\n\nh5 {\n  font-size: 1.25rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  line-height: 1.5;\n}\n\na {\n  color: #a855f7;\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\na:hover {\n  color: rgb(142.8, 72.25, 209.95);\n  text-decoration: underline;\n}\na:focus {\n  outline: 2px solid #a855f7;\n  outline-offset: 2px;\n}\n\n.bg-primary {\n  background-color: #a855f7;\n}\n\n.bg-primary-100 {\n  background-color: #f5f3ff;\n}\n\n.bg-primary-200 {\n  background-color: #ede9fe;\n}\n\n.bg-primary-300 {\n  background-color: #ddd6fe;\n}\n\n.bg-primary-400 {\n  background-color: #c4b5fd;\n}\n\n.bg-primary-600 {\n  background-color: #9333ea;\n}\n\n.bg-primary-700 {\n  background-color: #7e22ce;\n}\n\n.bg-primary-800 {\n  background-color: #6b21a8;\n}\n\n.bg-primary-900 {\n  background-color: #581c87;\n}\n\n.bg-secondary-blue-100 {\n  background-color: #f0f7ff;\n}\n\n.bg-secondary-blue-300 {\n  background-color: #d6eaf8;\n}\n\n.bg-secondary-blue-500 {\n  background-color: #aed6f1;\n}\n\n.bg-secondary-pink-100 {\n  background-color: #fdf2f8;\n}\n\n.bg-secondary-pink-300 {\n  background-color: #fadbd8;\n}\n\n.bg-secondary-pink-500 {\n  background-color: #f5cba7;\n}\n\n.bg-secondary-green-100 {\n  background-color: #f4f6f0;\n}\n\n.bg-secondary-green-300 {\n  background-color: #e8f5e9;\n}\n\n.bg-secondary-green-500 {\n  background-color: #a5d6a7;\n}\n\n.bg-success {\n  background-color: #4caf50;\n}\n\n.bg-warning {\n  background-color: #ffc107;\n}\n\n.bg-error {\n  background-color: #f44336;\n}\n\n.bg-info {\n  background-color: #2196f3;\n}\n\n.bg-neutral-50 {\n  background-color: #ffffff;\n}\n\n.bg-neutral-100 {\n  background-color: #f9f9f9;\n}\n\n.bg-neutral-200 {\n  background-color: #f0f0f0;\n}\n\n.bg-neutral-300 {\n  background-color: #e0e0e0;\n}\n\n.bg-neutral-400 {\n  background-color: #bdbdbd;\n}\n\n.bg-neutral-500 {\n  background-color: #9e9e9e;\n}\n\n.bg-neutral-600 {\n  background-color: #757575;\n}\n\n.bg-neutral-700 {\n  background-color: #616161;\n}\n\n.bg-neutral-800 {\n  background-color: #424242;\n}\n\n.bg-neutral-900 {\n  background-color: #212121;\n}\n\n.bg-primary-light {\n  background-color: rgba(168, 85, 247, 0.7);\n}\n\n.bg-primary-medium {\n  background-color: rgba(168, 85, 247, 0.5);\n}\n\n.bg-primary-dark {\n  background-color: rgba(168, 85, 247, 0.3);\n}\n\n.border {\n  border: 1px solid #e0e0e0;\n}\n\n.border-primary {\n  border-color: #a855f7;\n}\n\n.border-secondary {\n  border-color: #aed6f1;\n}\n\n.border-success {\n  border-color: #4caf50;\n}\n\n.border-warning {\n  border-color: #ffc107;\n}\n\n.border-error {\n  border-color: #f44336;\n}\n\n.border-neutral {\n  border-color: #e0e0e0;\n}\n\n.border-divider {\n  border-color: #f0f0f0;\n}\n\n.rounded {\n  border-radius: 0.375rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.flex {\n  display: flex;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.min-h-screen {\n  min-height: 100vh;\n}\n\n.card {\n  background-color: #ede9fe;\n  border-radius: 0.5rem;\n  box-shadow: 0 2px 8px rgba(33, 33, 33, 0.1);\n  padding: 1.5rem;\n  margin-bottom: 1rem;\n}\n.card.card-hover {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card.card-hover:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(33, 33, 33, 0.15);\n}\n\n.tag {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 9999px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n\n.tag-primary {\n  background-color: #ddd6fe;\n  color: #212121;\n}\n\n.tag-blue {\n  background-color: #d6eaf8;\n  color: #212121;\n}\n\n.tag-pink {\n  background-color: #fadbd8;\n  color: #212121;\n}\n\n.tag-green {\n  background-color: #e8f5e9;\n  color: #212121;\n}\n\n.form-input {\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #e0e0e0;\n  border-radius: 0.375rem;\n  background-color: #ffffff;\n  color: #212121;\n}\n.form-input:focus {\n  outline: none;\n  border-color: #a855f7;\n  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);\n}\n.form-input:disabled {\n  background-color: #f9f9f9;\n  color: #9e9e9e;\n  cursor: not-allowed;\n}\n\n/*\n:export {\n  primaryColor: $color-primary-500;\n  secondaryColor: $color-secondary-blue-700;\n  neutralColor: $color-neutral-500;\n  successColor: $color-success;\n  warningColor: $color-warning;\n  errorColor: $color-error;\n  backgroundColor: $color-background;\n  textColor: $color-text-primary;\n}*/\n.cream-table-container {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  overflow-x: auto;\n  border-radius: 0.5rem;\n  box-shadow: 0 2 px 4 px rgba(33, 33, 33, 0.1);\n  min-height: 200px;\n  background-color: #ffffff;\n}\n\n.cream-table {\n  width: 100%;\n  height: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  background-color: #ffffff;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212121;\n  table-layout: fixed;\n}\n.cream-table thead {\n  background-color: #581c87;\n  border-bottom: 2px solid #ddd6fe;\n}\n.cream-table thead th {\n  padding: 0.875rem 1rem;\n  text-align: left;\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: #f5f3ff !important;\n  border-bottom: 2px solid #ddd6fe;\n  position: relative;\n  transition: background-color 0.2s ease;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 0;\n  box-sizing: border-box;\n}\n.cream-table thead th.text-left {\n  text-align: left;\n}\n.cream-table thead th.text-center {\n  text-align: center;\n}\n.cream-table thead th.text-right {\n  text-align: right;\n}\n.cream-table thead th.cream-table-selection-column {\n  padding: 0.75rem !important;\n}\n.cream-table tbody tr {\n  border-bottom: 1px solid rgba(237, 233, 254, 0.5);\n  background-color: #ffffff;\n  transition: all 0.2s ease;\n}\n.cream-table tbody tr:nth-child(even) {\n  background-color: #ffffff;\n}\n.cream-table tbody tr:nth-child(odd) {\n  background-color: #f5f3ff;\n}\n.cream-table tbody tr:hover {\n  background-color: #ede9fe !important;\n  box-shadow: inset 0 0 0 1px #ddd6fe;\n}\n.cream-table tbody tr.selected {\n  background-color: #ede9fe;\n  box-shadow: inset 0 0 0 2px #a855f7;\n}\n.cream-table tbody tr.selected:hover {\n  background-color: #ddd6fe;\n}\n.cream-table tbody tr.active {\n  background-color: #ede9fe;\n}\n.cream-table tbody td {\n  padding: 0.875rem 1rem;\n  text-align: left;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212121 !important;\n  border-bottom: 1px solid rgba(237, 233, 254, 0.5);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 0;\n  box-sizing: border-box;\n}\n.cream-table tbody td.text-left {\n  text-align: left;\n}\n.cream-table tbody td.text-center {\n  text-align: center;\n}\n.cream-table tbody td.text-right {\n  text-align: right;\n}\n.cream-table tbody td.status-success {\n  color: #4caf50;\n  font-weight: 700;\n}\n.cream-table tbody td.status-warning {\n  color: #ffc107;\n  font-weight: 700;\n}\n.cream-table tbody td.status-error {\n  color: #f44336;\n  font-weight: 700;\n}\n.cream-table .cream-table-selection-column {\n  width: 80px !important;\n  min-width: 80px !important;\n  max-width: 80px !important;\n  text-align: center !important;\n  padding: 0.75rem !important;\n  vertical-align: middle !important;\n  user-select: none !important;\n  box-sizing: border-box !important;\n}\n.cream-table .cream-table-selection-column .cream-icon {\n  font-size: 20px !important;\n  transition: all 0.2s ease;\n  pointer-events: none;\n}\n.cream-table .cream-table-selection-column .cream-icon:hover {\n  transform: scale(1.1);\n}\n.cream-table .cream-table-selection-column:hover {\n  background-color: rgba(245, 243, 255, 0.3);\n}\n.cream-table tfoot.cream-table-foot {\n  background-color: #f5f3ff;\n  border-top: 2px solid #ddd6fe;\n}\n.cream-table tfoot.cream-table-foot tr {\n  text-align: center;\n}\n.cream-table tfoot.cream-table-foot td {\n  padding: 1rem;\n  text-align: center;\n  border-top: 2px solid #ddd6fe;\n}\n.cream-table tfoot.cream-table-foot .cream-table-foot-content {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n\n.editable-cell:hover {\n  background-color: #f5f3ff;\n  cursor: pointer;\n}\n.editable-cell:hover::after {\n  content: \"✎\";\n  margin-left: 0.5rem;\n  color: #a855f7;\n  opacity: 0.5;\n}\n.editable-cell.editing {\n  background-color: #f0f7ff;\n  outline: 2px solid #2196f3;\n}\n\n.cell-link {\n  color: #9333ea;\n  text-decoration: none;\n  font-weight: 700;\n}\n.cell-link:hover {\n  color: #7e22ce;\n  text-decoration: underline;\n}\n\n.cell-actions {\n  display: flex;\n  gap: 0.5rem;\n}\n.cell-actions .btn-action {\n  padding: 0.25rem 0.5rem;\n  border: none;\n  background: transparent;\n  color: #9333ea;\n  cursor: pointer;\n  font-size: 0.875rem;\n  border-radius: 0.25rem;\n  transition: all 0.2s ease;\n}\n.cell-actions .btn-action:hover {\n  background-color: #f5f3ff;\n  color: #7e22ce;\n}\n.cell-actions .btn-action.btn-danger:hover {\n  background-color: rgba(244, 67, 54, 0.1);\n  color: #f44336;\n}\n.cell-actions .btn-action.btn-success:hover {\n  background-color: rgba(76, 175, 80, 0.1);\n  color: #4caf50;\n}\n\n.cream-table-loading {\n  position: relative;\n}\n.cream-table-loading::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.8);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #9333ea;\n  font-weight: 700;\n  z-index: 10;\n}\n\n.cream-table-empty tbody tr:only-child td {\n  text-align: center;\n  padding: 3rem;\n  color: #757575;\n  font-size: 1.25rem;\n  border: none;\n}\n.cream-table-empty tbody tr:only-child td .empty-icon {\n  font-size: 3rem;\n  color: #ddd6fe;\n  margin-bottom: 1rem;\n  display: block;\n}\n.cream-table-empty tbody tr:only-child td .empty-text {\n  font-weight: 400;\n  color: #616161;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQ2hCOzs7O0VBSUU7QUFDRjs7O0VBR0U7QUFDRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsdUdBQXVHO0FBQ3pHOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsdUdBQXVHO0VBQ3ZHLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCx5QkFBeUI7RUFDekIsbUNBQW1DO0VBQ25DLGtDQUFrQztBQUNwQzs7QUFFQTs7Ozs7O0VBTUUsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsMkJBQTJCO0FBQzdCO0FBQ0E7RUFDRSxnQ0FBZ0M7RUFDaEMsMEJBQTBCO0FBQzVCO0FBQ0E7RUFDRSwwQkFBMEI7RUFDMUIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UscUJB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aEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxRQUFRO0VBQ1IsU0FBUztFQUNULG9DQUFvQztFQUNwQywwQkFBMEI7RUFDMUIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsY0FBYztFQUNkLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQiIsImZpbGUiOiJUYWJsZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuLyoqXG4gKiBUYWJsZee7hOS7tuagt+W8j1xuICog5Z+65LqOQ3JlYW1EZXNpZ27orr7orqHns7vnu59cbiAqIOWFheWIhuWIqeeUqOiJsuW9qeezu+e7n1xuICovXG4vKipcbiAqIENyZWFtRGVzaWduIOiuvuiuoeezu+e7n1xuICog5Z+65LqO5p+U5ZKM5aW25rK56Imy6LCD55qE546w5Luj5YyW6K6+6K6h57O757ufXG4gKi9cbi50ZXh0LXByaW1hcnkge1xuICBjb2xvcjogI2E4NTVmNztcbn1cblxuLnRleHQtcHJpbWFyeS1kYXJrIHtcbiAgY29sb3I6ICM1ODFjODc7XG59XG5cbi50ZXh0LXNlY29uZGFyeSB7XG4gIGNvbG9yOiAjODVjMWU5O1xufVxuXG4udGV4dC1zdWNjZXNzIHtcbiAgY29sb3I6ICM0Y2FmNTA7XG59XG5cbi50ZXh0LXdhcm5pbmcge1xuICBjb2xvcjogI2ZmYzEwNztcbn1cblxuLnRleHQtZXJyb3Ige1xuICBjb2xvcjogI2Y0NDMzNjtcbn1cblxuLnRleHQtaW5mbyB7XG4gIGNvbG9yOiAjMjE5NmYzO1xufVxuXG4udGV4dC1kaXNhYmxlZCB7XG4gIGNvbG9yOiAjOWU5ZTllO1xufVxuXG4udGV4dC1uZXV0cmFsLTUwIHtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi50ZXh0LW5ldXRyYWwtMTAwIHtcbiAgY29sb3I6ICNmOWY5Zjk7XG59XG5cbi50ZXh0LW5ldXRyYWwtMjAwIHtcbiAgY29sb3I6ICNmMGYwZjA7XG59XG5cbi50ZXh0LW5ldXRyYWwtMzAwIHtcbiAgY29sb3I6ICNlMGUwZTA7XG59XG5cbi50ZXh0LW5ldXRyYWwtNDAwIHtcbiAgY29sb3I6ICNiZGJkYmQ7XG59XG5cbi50ZXh0LW5ldXRyYWwtNTAwIHtcbiAgY29sb3I6ICM5ZTllOWU7XG59XG5cbi50ZXh0LW5ldXRyYWwtNjAwIHtcbiAgY29sb3I6ICM3NTc1NzU7XG59XG5cbi50ZXh0LW5ldXRyYWwtNzAwIHtcbiAgY29sb3I6ICM2MTYxNjE7XG59XG5cbi50ZXh0LW5ldXRyYWwtODAwIHtcbiAgY29sb3I6ICM0MjQyNDI7XG59XG5cbi50ZXh0LW5ldXRyYWwtOTAwIHtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi50ZXh0LWhlYWRpbmcge1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLnRleHQtYm9keSB7XG4gIGNvbG9yOiAjNjE2MTYxO1xufVxuXG4udGV4dC1tdXRlZCB7XG4gIGNvbG9yOiAjNzU3NTc1O1xufVxuXG4uZm9udC1zaXplLWJhc2Uge1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi5mb250LXNpemUtbGcge1xuICBmb250LXNpemU6IDEuMjVyZW07XG59XG5cbi5mb250LXNpemUtc20ge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuXG4uZm9udC1zaXplLXhzIHtcbiAgZm9udC1zaXplOiAwLjc2NTYyNXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oMSB7XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xufVxuXG4uZm9udC1zaXplLWgyIHtcbiAgZm9udC1zaXplOiAycmVtO1xufVxuXG4uZm9udC1zaXplLWgzIHtcbiAgZm9udC1zaXplOiAxLjc1cmVtO1xufVxuXG4uZm9udC1zaXplLWg0IHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbi5mb250LXNpemUtaDUge1xuICBmb250LXNpemU6IDEuMjVyZW07XG59XG5cbi5mb250LXNpemUtaDYge1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi5mb250LXdlaWdodC1saWdodCB7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG59XG5cbi5mb250LXdlaWdodC1ub3JtYWwge1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4uZm9udC13ZWlnaHQtYm9sZCB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbi5mb250LXdlaWdodC1saWdodGVyIHtcbiAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XG59XG5cbi5mb250LXdlaWdodC1ib2xkZXIge1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuXG4ubGluZS1oZWlnaHQtYmFzZSB7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG5cbi5saW5lLWhlaWdodC1sZyB7XG4gIGxpbmUtaGVpZ2h0OiAyO1xufVxuXG4ubGluZS1oZWlnaHQtc20ge1xuICBsaW5lLWhlaWdodDogMS4yNTtcbn1cblxuLmxpbmUtaGVpZ2h0LW5vbmUge1xuICBsaW5lLWhlaWdodDogMTtcbn1cblxuLnRleHQtbGVmdCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi50ZXh0LWNlbnRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRleHQtcmlnaHQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuLnRleHQtanVzdGlmeSB7XG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG5cbi5mb250LWZhbWlseS1zYW5zLXNlcmlmIHtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIHNhbnMtc2VyaWY7XG59XG5cbi5mb250LWZhbWlseS1tb25vc3BhY2Uge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xufVxuXG5ib2R5IHtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgY29sb3I6ICMyMTIxMjE7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xufVxuXG5oMSxcbmgyLFxuaDMsXG5oNCxcbmg1LFxuaDYge1xuICBmb250LXdlaWdodDogNzAwO1xuICBsaW5lLWhlaWdodDogMS4yNTtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG5oMSB7XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xufVxuXG5oMiB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbn1cblxuaDMge1xuICBmb250LXNpemU6IDEuNzVyZW07XG59XG5cbmg0IHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbmg1IHtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xufVxuXG5oNiB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxucCB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG5cbmEge1xuICBjb2xvcjogI2E4NTVmNztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2U7XG59XG5hOmhvdmVyIHtcbiAgY29sb3I6IHJnYigxNDIuOCwgNzIuMjUsIDIwOS45NSk7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuYTpmb2N1cyB7XG4gIG91dGxpbmU6IDJweCBzb2xpZCAjYTg1NWY3O1xuICBvdXRsaW5lLW9mZnNldDogMnB4O1xufVxuXG4uYmctcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhODU1Zjc7XG59XG5cbi5iZy1wcmltYXJ5LTEwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWYzZmY7XG59XG5cbi5iZy1wcmltYXJ5LTIwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZGU5ZmU7XG59XG5cbi5iZy1wcmltYXJ5LTMwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGQ2ZmU7XG59XG5cbi5iZy1wcmltYXJ5LTQwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjNGI1ZmQ7XG59XG5cbi5iZy1wcmltYXJ5LTYwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5MzMzZWE7XG59XG5cbi5iZy1wcmltYXJ5LTcwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM3ZTIyY2U7XG59XG5cbi5iZy1wcmltYXJ5LTgwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2YjIxYTg7XG59XG5cbi5iZy1wcmltYXJ5LTkwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ODFjODc7XG59XG5cbi5iZy1zZWNvbmRhcnktYmx1ZS0xMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmN2ZmO1xufVxuXG4uYmctc2Vjb25kYXJ5LWJsdWUtMzAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q2ZWFmODtcbn1cblxuLmJnLXNlY29uZGFyeS1ibHVlLTUwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhZWQ2ZjE7XG59XG5cbi5iZy1zZWNvbmRhcnktcGluay0xMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmMmY4O1xufVxuXG4uYmctc2Vjb25kYXJ5LXBpbmstMzAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZGJkODtcbn1cblxuLmJnLXNlY29uZGFyeS1waW5rLTUwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWNiYTc7XG59XG5cbi5iZy1zZWNvbmRhcnktZ3JlZW4tMTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjZmMDtcbn1cblxuLmJnLXNlY29uZGFyeS1ncmVlbi0zMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmNWU5O1xufVxuXG4uYmctc2Vjb25kYXJ5LWdyZWVuLTUwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhNWQ2YTc7XG59XG5cbi5iZy1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWY1MDtcbn1cblxuLmJnLXdhcm5pbmcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3O1xufVxuXG4uYmctZXJyb3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQ0MzM2O1xufVxuXG4uYmctaW5mbyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XG59XG5cbi5iZy1uZXV0cmFsLTUwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cblxuLmJnLW5ldXRyYWwtMTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcbn1cblxuLmJnLW5ldXRyYWwtMjAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbn1cblxuLmJnLW5ldXRyYWwtMzAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcbn1cblxuLmJnLW5ldXRyYWwtNDAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JkYmRiZDtcbn1cblxuLmJnLW5ldXRyYWwtNTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzllOWU5ZTtcbn1cblxuLmJnLW5ldXRyYWwtNjAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc1NzU3NTtcbn1cblxuLmJnLW5ldXRyYWwtNzAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzYxNjE2MTtcbn1cblxuLmJnLW5ldXRyYWwtODAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyNDI0Mjtcbn1cblxuLmJnLW5ldXRyYWwtOTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxMjEyMTtcbn1cblxuLmJnLXByaW1hcnktbGlnaHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2OCwgODUsIDI0NywgMC43KTtcbn1cblxuLmJnLXByaW1hcnktbWVkaXVtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjgsIDg1LCAyNDcsIDAuNSk7XG59XG5cbi5iZy1wcmltYXJ5LWRhcmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2OCwgODUsIDI0NywgMC4zKTtcbn1cblxuLmJvcmRlciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMGUwZTA7XG59XG5cbi5ib3JkZXItcHJpbWFyeSB7XG4gIGJvcmRlci1jb2xvcjogI2E4NTVmNztcbn1cblxuLmJvcmRlci1zZWNvbmRhcnkge1xuICBib3JkZXItY29sb3I6ICNhZWQ2ZjE7XG59XG5cbi5ib3JkZXItc3VjY2VzcyB7XG4gIGJvcmRlci1jb2xvcjogIzRjYWY1MDtcbn1cblxuLmJvcmRlci13YXJuaW5nIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmZjMTA3O1xufVxuXG4uYm9yZGVyLWVycm9yIHtcbiAgYm9yZGVyLWNvbG9yOiAjZjQ0MzM2O1xufVxuXG4uYm9yZGVyLW5ldXRyYWwge1xuICBib3JkZXItY29sb3I6ICNlMGUwZTA7XG59XG5cbi5ib3JkZXItZGl2aWRlciB7XG4gIGJvcmRlci1jb2xvcjogI2YwZjBmMDtcbn1cblxuLnJvdW5kZWQge1xuICBib3JkZXItcmFkaXVzOiAwLjM3NXJlbTtcbn1cblxuLnJvdW5kZWQtbGcge1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG59XG5cbi5yb3VuZGVkLWZ1bGwge1xuICBib3JkZXItcmFkaXVzOiA5OTk5cHg7XG59XG5cbi5mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmZsZXgtd3JhcCB7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLml0ZW1zLWNlbnRlciB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5qdXN0aWZ5LWNlbnRlciB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uZ2FwLTMge1xuICBnYXA6IDAuNzVyZW07XG59XG5cbi5tYi0yIHtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4ubWItNiB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbn1cblxuLnAtNCB7XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbi5taW4taC1zY3JlZW4ge1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbn1cblxuLmNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWRlOWZlO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDMzLCAzMywgMzMsIDAuMSk7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cbi5jYXJkLmNhcmQtaG92ZXIge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTtcbn1cbi5jYXJkLmNhcmQtaG92ZXI6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgzMywgMzMsIDMzLCAwLjE1KTtcbn1cblxuLnRhZyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZzogMC4yNXJlbSAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDk5OTlweDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnRhZy1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDZmZTtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi50YWctYmx1ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkNmVhZjg7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4udGFnLXBpbmsge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFkYmQ4O1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLnRhZy1ncmVlbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGY1ZTk7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4uZm9ybS1pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwLjVyZW0gMC43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcbiAgYm9yZGVyLXJhZGl1czogMC4zNzVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuLmZvcm0taW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICNhODU1Zjc7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDE2OCwgODUsIDI0NywgMC4yKTtcbn1cbi5mb3JtLWlucHV0OmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcbiAgY29sb3I6ICM5ZTllOWU7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi8qXG46ZXhwb3J0IHtcbiAgcHJpbWFyeUNvbG9yOiAkY29sb3ItcHJpbWFyeS01MDA7XG4gIHNlY29uZGFyeUNvbG9yOiAkY29sb3Itc2Vjb25kYXJ5LWJsdWUtNzAwO1xuICBuZXV0cmFsQ29sb3I6ICRjb2xvci1uZXV0cmFsLTUwMDtcbiAgc3VjY2Vzc0NvbG9yOiAkY29sb3Itc3VjY2VzcztcbiAgd2FybmluZ0NvbG9yOiAkY29sb3Itd2FybmluZztcbiAgZXJyb3JDb2xvcjogJGNvbG9yLWVycm9yO1xuICBiYWNrZ3JvdW5kQ29sb3I6ICRjb2xvci1iYWNrZ3JvdW5kO1xuICB0ZXh0Q29sb3I6ICRjb2xvci10ZXh0LXByaW1hcnk7XG59Ki9cbi5jcmVhbS10YWJsZS1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gIGJveC1zaGFkb3c6IDAgMiBweCA0IHB4IHJnYmEoMzMsIDMzLCAzMywgMC4xKTtcbiAgbWluLWhlaWdodDogMjAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbi5jcmVhbS10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIGJvcmRlci1zcGFjaW5nOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBjb2xvcjogIzIxMjEyMTtcbiAgdGFibGUtbGF5b3V0OiBmaXhlZDtcbn1cbi5jcmVhbS10YWJsZSB0aGVhZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ODFjODc7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZGRkNmZlO1xufVxuLmNyZWFtLXRhYmxlIHRoZWFkIHRoIHtcbiAgcGFkZGluZzogMC44NzVyZW0gMXJlbTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgY29sb3I6ICNmNWYzZmYgIWltcG9ydGFudDtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkZGQ2ZmU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzIGVhc2U7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBtYXgtd2lkdGg6IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4uY3JlYW0tdGFibGUgdGhlYWQgdGgudGV4dC1sZWZ0IHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5jcmVhbS10YWJsZSB0aGVhZCB0aC50ZXh0LWNlbnRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5jcmVhbS10YWJsZSB0aGVhZCB0aC50ZXh0LXJpZ2h0IHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG4uY3JlYW0tdGFibGUgdGhlYWQgdGguY3JlYW0tdGFibGUtc2VsZWN0aW9uLWNvbHVtbiB7XG4gIHBhZGRpbmc6IDAuNzVyZW0gIWltcG9ydGFudDtcbn1cbi5jcmVhbS10YWJsZSB0Ym9keSB0ciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDIzNywgMjMzLCAyNTQsIDAuNSk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG59XG4uY3JlYW0tdGFibGUgdGJvZHkgdHI6bnRoLWNoaWxkKGV2ZW4pIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cbi5jcmVhbS10YWJsZSB0Ym9keSB0cjpudGgtY2hpbGQob2RkKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWYzZmY7XG59XG4uY3JlYW0tdGFibGUgdGJvZHkgdHI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWRlOWZlICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDFweCAjZGRkNmZlO1xufVxuLmNyZWFtLXRhYmxlIHRib2R5IHRyLnNlbGVjdGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VkZTlmZTtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMnB4ICNhODU1Zjc7XG59XG4uY3JlYW0tdGFibGUgdGJvZHkgdHIuc2VsZWN0ZWQ6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkNmZlO1xufVxuLmNyZWFtLXRhYmxlIHRib2R5IHRyLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZGU5ZmU7XG59XG4uY3JlYW0tdGFibGUgdGJvZHkgdGQge1xuICBwYWRkaW5nOiAwLjg3NXJlbSAxcmVtO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBjb2xvcjogIzIxMjEyMSAhaW1wb3J0YW50O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyMzcsIDIzMywgMjU0LCAwLjUpO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbWF4LXdpZHRoOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuLmNyZWFtLXRhYmxlIHRib2R5IHRkLnRleHQtbGVmdCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4uY3JlYW0tdGFibGUgdGJvZHkgdGQudGV4dC1jZW50ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uY3JlYW0tdGFibGUgdGJvZHkgdGQudGV4dC1yaWdodCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuLmNyZWFtLXRhYmxlIHRib2R5IHRkLnN0YXR1cy1zdWNjZXNzIHtcbiAgY29sb3I6ICM0Y2FmNTA7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uY3JlYW0tdGFibGUgdGJvZHkgdGQuc3RhdHVzLXdhcm5pbmcge1xuICBjb2xvcjogI2ZmYzEwNztcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5jcmVhbS10YWJsZSB0Ym9keSB0ZC5zdGF0dXMtZXJyb3Ige1xuICBjb2xvcjogI2Y0NDMzNjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5jcmVhbS10YWJsZSAuY3JlYW0tdGFibGUtc2VsZWN0aW9uLWNvbHVtbiB7XG4gIHdpZHRoOiA4MHB4ICFpbXBvcnRhbnQ7XG4gIG1pbi13aWR0aDogODBweCAhaW1wb3J0YW50O1xuICBtYXgtd2lkdGg6IDgwcHggIWltcG9ydGFudDtcbiAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmc6IDAuNzVyZW0gIWltcG9ydGFudDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZSAhaW1wb3J0YW50O1xuICB1c2VyLXNlbGVjdDogbm9uZSAhaW1wb3J0YW50O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94ICFpbXBvcnRhbnQ7XG59XG4uY3JlYW0tdGFibGUgLmNyZWFtLXRhYmxlLXNlbGVjdGlvbi1jb2x1bW4gLmNyZWFtLWljb24ge1xuICBmb250LXNpemU6IDIwcHggIWltcG9ydGFudDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uY3JlYW0tdGFibGUgLmNyZWFtLXRhYmxlLXNlbGVjdGlvbi1jb2x1bW4gLmNyZWFtLWljb246aG92ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG59XG4uY3JlYW0tdGFibGUgLmNyZWFtLXRhYmxlLXNlbGVjdGlvbi1jb2x1bW46aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NSwgMjQzLCAyNTUsIDAuMyk7XG59XG4uY3JlYW0tdGFibGUgdGZvb3QuY3JlYW0tdGFibGUtZm9vdCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWYzZmY7XG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAjZGRkNmZlO1xufVxuLmNyZWFtLXRhYmxlIHRmb290LmNyZWFtLXRhYmxlLWZvb3QgdHIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uY3JlYW0tdGFibGUgdGZvb3QuY3JlYW0tdGFibGUtZm9vdCB0ZCB7XG4gIHBhZGRpbmc6IDFyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNkZGQ2ZmU7XG59XG4uY3JlYW0tdGFibGUgdGZvb3QuY3JlYW0tdGFibGUtZm9vdCAuY3JlYW0tdGFibGUtZm9vdC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZWRpdGFibGUtY2VsbDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWYzZmY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5lZGl0YWJsZS1jZWxsOmhvdmVyOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwi4pyOXCI7XG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG4gIGNvbG9yOiAjYTg1NWY3O1xuICBvcGFjaXR5OiAwLjU7XG59XG4uZWRpdGFibGUtY2VsbC5lZGl0aW5nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjdmZjtcbiAgb3V0bGluZTogMnB4IHNvbGlkICMyMTk2ZjM7XG59XG5cbi5jZWxsLWxpbmsge1xuICBjb2xvcjogIzkzMzNlYTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuLmNlbGwtbGluazpob3ZlciB7XG4gIGNvbG9yOiAjN2UyMmNlO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLmNlbGwtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC41cmVtO1xufVxuLmNlbGwtYWN0aW9ucyAuYnRuLWFjdGlvbiB7XG4gIHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzkzMzNlYTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xufVxuLmNlbGwtYWN0aW9ucyAuYnRuLWFjdGlvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWYzZmY7XG4gIGNvbG9yOiAjN2UyMmNlO1xufVxuLmNlbGwtYWN0aW9ucyAuYnRuLWFjdGlvbi5idG4tZGFuZ2VyOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDQsIDY3LCA1NCwgMC4xKTtcbiAgY29sb3I6ICNmNDQzMzY7XG59XG4uY2VsbC1hY3Rpb25zIC5idG4tYWN0aW9uLmJ0bi1zdWNjZXNzOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3NiwgMTc1LCA4MCwgMC4xKTtcbiAgY29sb3I6ICM0Y2FmNTA7XG59XG5cbi5jcmVhbS10YWJsZS1sb2FkaW5nIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmNyZWFtLXRhYmxlLWxvYWRpbmc6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjb2xvcjogIzkzMzNlYTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgei1pbmRleDogMTA7XG59XG5cbi5jcmVhbS10YWJsZS1lbXB0eSB0Ym9keSB0cjpvbmx5LWNoaWxkIHRkIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAzcmVtO1xuICBjb2xvcjogIzc1NzU3NTtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBib3JkZXI6IG5vbmU7XG59XG4uY3JlYW0tdGFibGUtZW1wdHkgdGJvZHkgdHI6b25seS1jaGlsZCB0ZCAuZW1wdHktaWNvbiB7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbiAgY29sb3I6ICNkZGQ2ZmU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLmNyZWFtLXRhYmxlLWVtcHR5IHRib2R5IHRyOm9ubHktY2hpbGQgdGQgLmVtcHR5LXRleHQge1xuICBmb250LXdlaWdodDogNDAwO1xuICBjb2xvcjogIzYxNjE2MTtcbn0iXX0= */";
styleInject_es.styleInject(css_248z);

// 主要是完成表头的渲染
const TableHeader = () => {
    // 获取columns数据：
    const context = React.useContext(TableContext);
    // 获取数据（可能为 undefined）
    const columns = (context === null || context === void 0 ? void 0 : context.columns) || [];
    const rowSelection = context === null || context === void 0 ? void 0 : context.rowSelection;
    const isAllRowsSelected = context === null || context === void 0 ? void 0 : context.isAllRowsSelected;
    const isSomeRowsSelected = context === null || context === void 0 ? void 0 : context.isSomeRowsSelected;
    const toggleAllRowsSelection = context === null || context === void 0 ? void 0 : context.toggleAllRowsSelection;
    const isRowSelectionEnabled = !!rowSelection;
    const selectionType = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.type) || 'checkbox';
    const hideSelectAll = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.hideSelectAll) || false;
    const columnWidth = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnWidth) || 80;
    const columnTitle = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnTitle;
    // 处理全选/反选（必须在早期返回之前定义）
    const handleSelectAll = React.useCallback(() => {
        if (toggleAllRowsSelection) {
            const allSelected = (isAllRowsSelected === null || isAllRowsSelected === void 0 ? void 0 : isAllRowsSelected()) || false;
            toggleAllRowsSelection(!allSelected);
        }
    }, [toggleAllRowsSelection, isAllRowsSelected]);
    // 渲染选择列表头
    const renderSelectionHeader = () => {
        if (!isRowSelectionEnabled || hideSelectAll) {
            return null;
        }
        const allSelected = (isAllRowsSelected === null || isAllRowsSelected === void 0 ? void 0 : isAllRowsSelected()) || false;
        const someSelected = (isSomeRowsSelected === null || isSomeRowsSelected === void 0 ? void 0 : isSomeRowsSelected()) || false;
        return (jsxRuntime.jsx("th", { className: "cream-table-selection-column", style: {
                width: `${columnWidth}px`,
                minWidth: `${columnWidth}px`,
                maxWidth: `${columnWidth}px`,
                textAlign: 'center',
                padding: '0.75rem',
            }, children: columnTitle || (jsxRuntime.jsx("div", { onClick: handleSelectAll, onMouseDown: e => e.preventDefault(), style: {
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    width: '100%',
                    height: '100%',
                    minHeight: '40px',
                    minWidth: '40px',
                }, title: allSelected ? '取消全选' : '全选', children: selectionType === 'checkbox' ? (someSelected ? (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faSquareCheck, style: {
                        color: 'var(--color-primary-500)',
                        fontSize: '20px',
                    } })) : allSelected ? (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faSquareCheck, style: {
                        color: 'var(--color-primary-500)',
                        fontSize: '20px',
                    } })) : (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faSquare, style: { color: '#d9d9d9', fontSize: '20px' } }))) : (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faCircle, style: { color: '#d9d9d9', fontSize: '20px' } })) })) }));
    };
    // 早期返回必须在所有 Hooks 之后
    if (!context) {
        return null;
    }
    return (jsxRuntime.jsx("thead", { children: jsxRuntime.jsxs("tr", { children: [renderSelectionHeader(), columns.map(column => {
                    const alignClass = column.align
                        ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
                        : 'text-left';
                    const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
                    const className = [alignClass, fixedClass].filter(Boolean).join(' ');
                    return (jsxRuntime.jsx("th", { className: className || undefined, style: column.width ? { width: column.width } : undefined, children: column.title }, column.key));
                })] }) }));
};

// 使用reactmemo优化
const TableBody = React.memo(() => {
    // 从context中获取数据
    const context = React.useContext(TableContext);
    // 使用分页后的数据（可能为 undefined）
    const paginatedData = (context === null || context === void 0 ? void 0 : context.paginatedData) || [];
    const columns = (context === null || context === void 0 ? void 0 : context.columns) || [];
    const rowSelection = context === null || context === void 0 ? void 0 : context.rowSelection;
    const isRowSelected = context === null || context === void 0 ? void 0 : context.isRowSelected;
    const toggleRowSelection = context === null || context === void 0 ? void 0 : context.toggleRowSelection;
    const isRowSelectionEnabled = !!rowSelection;
    const selectionType = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.type) || 'checkbox';
    const columnWidth = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnWidth) || 80;
    const getCheckboxProps = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.getCheckboxProps;
    // 渲染选择列单元格（必须在早期返回之前定义）
    const renderSelectionCell = React.useCallback((record) => {
        if (!isRowSelectionEnabled) {
            return null;
        }
        const selected = (isRowSelected === null || isRowSelected === void 0 ? void 0 : isRowSelected(record)) || false;
        const checkboxProps = (getCheckboxProps === null || getCheckboxProps === void 0 ? void 0 : getCheckboxProps(record)) || {};
        const disabled = checkboxProps.disabled || false;
        const handleClick = (e) => {
            e.stopPropagation();
            if (!disabled && toggleRowSelection) {
                toggleRowSelection(record);
            }
        };
        return (jsxRuntime.jsx("td", { className: "cream-table-selection-column", style: {
                width: `${columnWidth}px`,
                minWidth: `${columnWidth}px`,
                maxWidth: `${columnWidth}px`,
                textAlign: 'center',
                padding: '0.75rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                position: 'relative',
            }, onClick: handleClick, onMouseDown: e => {
                if (!disabled) {
                    e.preventDefault(); // 防止拖拽选中文本
                }
            }, children: jsxRuntime.jsx("div", { style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    minHeight: '40px',
                    minWidth: '40px',
                }, children: selectionType === 'checkbox' ? (selected ? (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faSquareCheck, style: {
                        color: 'var(--color-primary-500)',
                        fontSize: '20px',
                    } })) : (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faSquare, style: { color: '#d9d9d9', fontSize: '20px' } }))) : selected ? (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faCircleCheck, style: { color: 'var(--color-primary-500)', fontSize: '20px' } })) : (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faCircle, style: { color: '#d9d9d9', fontSize: '20px' } })) }) }));
    }, [
        isRowSelectionEnabled,
        selectionType,
        columnWidth,
        isRowSelected,
        toggleRowSelection,
        getCheckboxProps,
    ]);
    // 早期返回必须在所有 Hooks 之后
    if (!context) {
        return null;
    }
    return (jsxRuntime.jsx("tbody", { children: paginatedData.map((item, rowIndex) => {
            const selected = (isRowSelected === null || isRowSelected === void 0 ? void 0 : isRowSelected(item)) || false;
            return (jsxRuntime.jsxs("tr", { className: selected ? 'selected' : undefined, children: [renderSelectionCell(item), columns.map(column => {
                        const alignClass = column.align
                            ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
                            : 'text-left';
                        const fixedClass = column.fixed ? `fixed-${column.fixed}` : '';
                        const className = [alignClass, fixedClass]
                            .filter(Boolean)
                            .join(' ');
                        // 获取单元格值：优先使用 dataIndex，否则使用 key
                        const getCellValue = (record, column) => {
                            if (column.dataIndex) {
                                if (Array.isArray(column.dataIndex)) {
                                    // 支持嵌套路径，如 ['user', 'name']
                                    return column.dataIndex.reduce((obj, key) => obj === null || obj === void 0 ? void 0 : obj[key], record);
                                }
                                else {
                                    return record[column.dataIndex];
                                }
                            }
                            return record[column.key];
                        };
                        const cellValue = getCellValue(item, column);
                        // 使用 render 函数或直接显示值
                        const cellContent = column.render
                            ? column.render(cellValue, item, rowIndex)
                            : cellValue;
                        return (jsxRuntime.jsx("td", { className: className || undefined, style: column.width ? { width: column.width } : undefined, children: cellContent }, column.key));
                    })] }, item.key || rowIndex));
        }) }));
});

// 分页器
const TableFoot = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const context = React.useContext(TableContext);
    const { pagination } = context !== null && context !== void 0 ? context : {};
    // 1、处理分页配置：类似 antd 的逻辑
    // pagination === false: 禁用分页
    // pagination === true 或 undefined: 使用默认配置（启用分页）
    // pagination === 对象: 使用配置对象
    const isPaginationDisabled = pagination === false;
    const paginationConfig = (() => {
        if (isPaginationDisabled) {
            return undefined;
        }
        if (pagination === true || pagination === undefined) {
            return {};
        }
        return pagination;
    })();
    // 2、计算 total：优先使用 pagination.total（服务端分页），否则使用 dataSource.length（客户端分页）
    const initialTotal = (_a = context === null || context === void 0 ? void 0 : context.total) !== null && _a !== void 0 ? _a : 0;
    const total = (_b = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.total) !== null && _b !== void 0 ? _b : initialTotal;
    // 获取初始分页参数（类似 antd）
    // 受控模式：使用 curren`t/pageSize
    // 非受控模式：使用 defaultCurrent/defaultPageSize 或默认值
    const initialPageSize = (_d = (_c = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.pageSize) !== null && _c !== void 0 ? _c : paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.defaultPageSize) !== null && _d !== void 0 ? _d : 10;
    const initialCurrent = (_f = (_e = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.current) !== null && _e !== void 0 ? _e : paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.defaultCurrent) !== null && _f !== void 0 ? _f : 1;
    const [current, setInternalCurrent] = React.useState(initialCurrent);
    const [pageSize, setInternalPageSize] = React.useState(initialPageSize);
    // 受控模式：如果 pagination 配置中有 current 或 pageSize，使用受控模式（类似 antd）
    const isCurrentControlled = (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.current) !== undefined;
    const isPageSizeControlled = (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.pageSize) !== undefined;
    const finalCurrent = isCurrentControlled
        ? paginationConfig.current
        : current;
    const finalPageSize = isPageSizeControlled
        ? paginationConfig.pageSize
        : pageSize;
    // 计算分页数据（类似 antd）
    const tableData = (_g = context === null || context === void 0 ? void 0 : context.tableData) !== null && _g !== void 0 ? _g : [];
    const paginatedData = React.useMemo(() => {
        if (!context) {
            return [];
        }
        if (isPaginationDisabled) {
            // 如果分页被禁用，返回所有数据
            return tableData;
        }
        // 如果提供了 pagination.total（服务端分页），不进行客户端切片
        if ((paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.total) !== undefined) {
            return tableData;
        }
        // 客户端分页：进行数据切片
        const startIndex = (finalCurrent - 1) * finalPageSize;
        const endIndex = startIndex + finalPageSize;
        return tableData.slice(startIndex, endIndex);
    }, [
        context,
        tableData,
        finalCurrent,
        finalPageSize,
        isPaginationDisabled,
        paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.total,
    ]);
    // 更新 Context 中的 paginatedData，供 TableBody 使用
    // 使用 useRef 来避免 setPaginatedData 变化导致的无限循环
    const setPaginatedDataRef = React.useRef(context === null || context === void 0 ? void 0 : context.setPaginatedData);
    const prevPaginatedDataRef = React.useRef([]);
    const prevPaginatedDataLengthRef = React.useRef(0);
    React.useEffect(() => {
        setPaginatedDataRef.current = context === null || context === void 0 ? void 0 : context.setPaginatedData;
    }, [context === null || context === void 0 ? void 0 : context.setPaginatedData]);
    React.useEffect(() => {
        // 只有当 paginatedData 真的变化时才更新
        // 比较长度和每个元素的引用（浅比较）
        const prevData = prevPaginatedDataRef.current;
        const prevLength = prevPaginatedDataLengthRef.current;
        const currentLength = paginatedData.length;
        const hasChanged = prevLength !== currentLength ||
            (currentLength > 0 &&
                prevData.some((item, index) => item !== paginatedData[index]));
        if (hasChanged && setPaginatedDataRef.current) {
            setPaginatedDataRef.current(paginatedData);
            prevPaginatedDataRef.current = paginatedData;
            prevPaginatedDataLengthRef.current = currentLength;
        }
    }, [paginatedData]);
    // 处理页码变化（类似 antd）
    const handlePageChange = (newPage, newPageSize) => {
        const finalNewPageSize = newPageSize !== null && newPageSize !== void 0 ? newPageSize : finalPageSize;
        // 更新内部状态（非受控模式）
        if (!isCurrentControlled) {
            setInternalCurrent(newPage);
        }
        if (newPageSize !== undefined && !isPageSizeControlled) {
            setInternalPageSize(newPageSize);
        }
        // 调用回调（类似 antd：onChange 在页码或 pageSize 改变时都会触发）
        if (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.onChange) {
            paginationConfig.onChange(newPage, finalNewPageSize);
        }
    };
    // 处理每页条数变化（类似 antd）
    const handlePageSizeChange = (newPageSize) => {
        // 计算新的总页数和当前页（确保不超出范围）
        const newTotalPages = Math.max(1, Math.ceil(total / newPageSize));
        const newCurrent = Math.min(finalCurrent, newTotalPages);
        // 更新内部状态（非受控模式）
        if (!isPageSizeControlled) {
            setInternalPageSize(newPageSize);
        }
        if (!isCurrentControlled) {
            setInternalCurrent(newCurrent);
        }
        // 调用回调（类似 antd：onShowSizeChange 优先触发，然后触发 onChange）
        if (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.onShowSizeChange) {
            paginationConfig.onShowSizeChange(newCurrent, newPageSize);
        }
        if (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.onChange) {
            paginationConfig.onChange(newCurrent, newPageSize);
        }
    };
    // 同步受控的 current 和 pageSize（类似 antd）
    React.useEffect(() => {
        if (isCurrentControlled && (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.current) !== undefined) {
            setInternalCurrent(paginationConfig.current);
        }
    }, [paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.current, isCurrentControlled]);
    React.useEffect(() => {
        if (isPageSizeControlled && (paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.pageSize) !== undefined) {
            setInternalPageSize(paginationConfig.pageSize);
        }
    }, [paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.pageSize, isPageSizeControlled]);
    // 早期返回必须在所有 Hooks 之后
    if (!context) {
        return null;
    }
    // 如果 pagination 为 false，不显示分页器
    if (pagination === false) {
        return null;
    }
    // 从 pagination 配置中获取选项，使用默认值（类似 antd）
    const showTotal = (_h = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.showTotal) !== null && _h !== void 0 ? _h : true;
    const showSizeChanger = (_j = paginationConfig === null || paginationConfig === void 0 ? void 0 : paginationConfig.showSizeChanger) !== null && _j !== void 0 ? _j : true;
    const columns = context.columns;
    const isRowSelectionEnabled = !!context.rowSelection;
    const colSpan = isRowSelectionEnabled ? columns.length + 1 : columns.length;
    return (jsxRuntime.jsx("tfoot", { className: "cream-table-foot", children: jsxRuntime.jsx("tr", { children: jsxRuntime.jsx("td", { colSpan: colSpan, children: jsxRuntime.jsx("div", { className: "cream-table-foot-content", children: jsxRuntime.jsx(Pagination.Pagination, { total: total, current: finalCurrent, pageSize: finalPageSize, showTotal: showTotal, showSizeChanger: showSizeChanger, onChange: (page, newPageSize) => {
                            // 类似 antd：onChange 在页码或 pageSize 改变时都会触发
                            handlePageChange(page, newPageSize);
                        }, onPageSizeChange: newPageSize => {
                            // 类似 antd：onShowSizeChange 专门处理 pageSize 变化
                            handlePageSizeChange(newPageSize);
                        } }) }) }) }) }));
};

// hooks/useVirtualScroll.ts
function useVirtualScroll({ data, estimateSize, containerHeight, overscan = 3, onScroll, }) {
    const [scrollTop, setScrollTop] = React.useState(0);
    // 使用 useRef 存储状态
    const containerRef = React.useRef(null);
    const scrollTopRef = React.useRef(0);
    const rafRef = React.useRef(null);
    // 查找起始索引（固定高度，直接计算）
    const findStartIndex = React.useCallback((scrollTop) => {
        // 固定高度时，直接通过除法计算起始索引
        const index = Math.floor(scrollTop / estimateSize);
        return Math.max(0, index - 1); // 稍微提前一点开始渲染
    }, [estimateSize]);
    // ==================== 计算虚拟列表项（固定高度） ====================
    const { startIndex, endIndex, startOffset, virtualItems, totalHeight } = React.useMemo(() => {
        // 计算总高度（固定高度，直接计算）
        const totalHeight = data.length * estimateSize;
        // 计算起始索引
        const rawStartIndex = findStartIndex(scrollTop);
        const actualStartIndex = Math.max(0, rawStartIndex - overscan);
        // 计算可见项数量
        const actualContainerHeight = Math.max(containerHeight, 1);
        const visibleCount = Math.ceil(actualContainerHeight / estimateSize);
        // 计算结束索引
        const actualEndIndex = Math.min(actualStartIndex + visibleCount + overscan * 2, // 前后都要有 overscan
        data.length);
        // 获取虚拟列表项
        const virtualItems = data.slice(actualStartIndex, actualEndIndex);
        // 计算起始偏移量（固定高度，直接计算）
        const startOffset = actualStartIndex * estimateSize;
        return {
            startIndex: actualStartIndex,
            endIndex: actualEndIndex,
            startOffset,
            virtualItems,
            totalHeight,
        };
    }, [
        scrollTop,
        data,
        estimateSize,
        containerHeight,
        overscan,
        findStartIndex,
    ]);
    // ==================== 测量元素（固定高度，仅用于 ref 绑定） ====================
    // 固定高度模式下，不需要实际测量，只需要提供 ref 绑定函数
    const measureElement = React.useCallback((node, index) => {
        // 固定高度模式下，不需要做任何处理
        // 保留此函数是为了保持 API 兼容性
    }, []);
    // ==================== 6. 滚动处理（使用 requestAnimationFrame 节流） ====================
    const handleScroll = React.useCallback((e) => {
        const top = e.currentTarget.scrollTop;
        scrollTopRef.current = top;
        // 使用 requestAnimationFrame 节流
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
            setScrollTop(top);
            onScroll === null || onScroll === void 0 ? void 0 : onScroll(top);
        });
    }, [onScroll]);
    // ==================== 7. 设置滚动位置 ====================
    const setScrollTopValue = React.useCallback((top) => {
        scrollTopRef.current = top;
        setScrollTop(top);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(top);
        if (containerRef.current) {
            containerRef.current.scrollTop = top;
        }
    }, [onScroll]);
    // ==================== 清理 ====================
    React.useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);
    return {
        virtualItems,
        totalHeight,
        startOffset,
        containerRef,
        scrollTop,
        setScrollTop: setScrollTopValue,
        measureElement, // 保留以保持 API 兼容性，但固定高度模式下不需要实际测量
        startIndex,
        endIndex,
        handleScroll,
    };
}

const TableVirtualBody = () => {
    const context = React.useContext(TableContext);
    // 必须无条件地调用所有 Hook
    const containerRef = React.useRef(null);
    // 无条件地调用 useCallback
    const getCellValue = React.useCallback((record, column) => {
        if (column.dataIndex) {
            if (Array.isArray(column.dataIndex)) {
                return column.dataIndex.reduce((obj, key) => obj === null || obj === void 0 ? void 0 : obj[key], record);
            }
            else {
                return record[column.dataIndex];
            }
        }
        return record[column.key];
    }, []);
    // 检查是否有有效的 context
    const hasValidContext = !!context;
    const columns = (context === null || context === void 0 ? void 0 : context.columns) || [];
    const paginatedData = (context === null || context === void 0 ? void 0 : context.paginatedData) || [];
    const virtual = context === null || context === void 0 ? void 0 : context.virtual;
    const rowSelection = context === null || context === void 0 ? void 0 : context.rowSelection;
    const isRowSelected = context === null || context === void 0 ? void 0 : context.isRowSelected;
    const toggleRowSelection = context === null || context === void 0 ? void 0 : context.toggleRowSelection;
    const isRowSelectionEnabled = !!rowSelection;
    const selectionType = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.type) || 'checkbox';
    const columnWidth = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnWidth) || 80;
    const getCheckboxProps = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.getCheckboxProps;
    // 解析虚拟滚动配置
    const virtualConfig = React.useMemo(() => {
        if (!virtual)
            return { enabled: false };
        if (typeof virtual === 'boolean') {
            return {
                enabled: true,
                rowHeight: 50,
                containerHeight: 400,
                overscan: 5,
            };
        }
        return {
            enabled: true,
            rowHeight: 50,
            containerHeight: 400,
            overscan: 5,
            ...virtual,
        };
    }, [virtual]);
    // 使用虚拟滚动 Hook - 必须无条件调用，但可以根据条件传入数据
    const { virtualItems, totalHeight, startOffset, setScrollTop, measureElement, startIndex, } = useVirtualScroll({
        data: virtualConfig.enabled ? paginatedData : [],
        estimateSize: virtualConfig.enabled && 'rowHeight' in virtualConfig
            ? virtualConfig.rowHeight || 50
            : 50,
        containerHeight: virtualConfig.enabled && 'containerHeight' in virtualConfig
            ? virtualConfig.containerHeight || 400
            : 400,
        overscan: virtualConfig.enabled && 'overscan' in virtualConfig
            ? virtualConfig.overscan
            : 2,
    });
    // 处理滚动
    const handleScroll = React.useCallback((e) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, [setScrollTop]);
    // 渲染选择列单元格（必须在早期返回之前定义）
    const renderSelectionCell = React.useCallback((record) => {
        if (!isRowSelectionEnabled) {
            return null;
        }
        const selected = (isRowSelected === null || isRowSelected === void 0 ? void 0 : isRowSelected(record)) || false;
        const checkboxProps = (getCheckboxProps === null || getCheckboxProps === void 0 ? void 0 : getCheckboxProps(record)) || {};
        const disabled = checkboxProps.disabled || false;
        const handleClick = (e) => {
            e.stopPropagation();
            if (!disabled && toggleRowSelection) {
                toggleRowSelection(record);
            }
        };
        return (jsxRuntime.jsx("td", { className: "cream-table-selection-column", style: {
                width: `${columnWidth}px`,
                minWidth: `${columnWidth}px`,
                maxWidth: `${columnWidth}px`,
                textAlign: 'center',
                padding: '0.75rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                position: 'relative',
            }, onClick: handleClick, onMouseDown: e => {
                if (!disabled) {
                    e.preventDefault(); // 防止拖拽选中文本
                }
            }, children: jsxRuntime.jsx("div", { style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                    minHeight: '40px',
                    minWidth: '40px',
                }, children: selectionType === 'checkbox' ? (selected ? (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faSquareCheck, style: {
                        color: 'var(--color-primary-500)',
                        fontSize: '20px',
                    } })) : (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faSquare, style: { color: '#d9d9d9', fontSize: '20px' } }))) : selected ? (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faCircleCheck, style: { color: 'var(--color-primary-500)', fontSize: '20px' } })) : (jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faCircle, style: { color: '#d9d9d9', fontSize: '20px' } })) }) }));
    }, [
        isRowSelectionEnabled,
        selectionType,
        columnWidth,
        isRowSelected,
        toggleRowSelection,
        getCheckboxProps,
    ]);
    // 早期返回必须在所有 Hooks 之后
    if (!hasValidContext) {
        return null;
    }
    // 计算 colSpan（包括选择列）
    const colSpan = isRowSelectionEnabled ? columns.length + 1 : columns.length;
    if (!paginatedData || paginatedData.length === 0) {
        return (jsxRuntime.jsx("tbody", { children: jsxRuntime.jsx("tr", { children: jsxRuntime.jsx("td", { colSpan: colSpan, style: { textAlign: 'center' }, children: "\u6682\u65E0\u6570\u636E" }) }) }));
    }
    return (jsxRuntime.jsx("tbody", { children: jsxRuntime.jsx("tr", { className: "cream-table-virtual-row", children: jsxRuntime.jsx("td", { colSpan: colSpan, style: {
                    padding: 0,
                    border: 0,
                    height: virtualConfig.enabled && 'containerHeight' in virtualConfig
                        ? virtualConfig.containerHeight || '100%'
                        : '100%',
                }, children: jsxRuntime.jsxs("div", { ref: containerRef, className: "cream-table-virtual-container", style: {
                        height: '100%',
                        overflow: 'auto',
                        position: 'relative',
                    }, onScroll: handleScroll, children: [jsxRuntime.jsx("div", { style: { height: totalHeight } }), jsxRuntime.jsx("div", { style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                transform: `translateY(${startOffset}px)`,
                            }, children: jsxRuntime.jsx("table", { className: "cream-table", style: { width: '100%', scrollbarWidth: 'none' }, children: jsxRuntime.jsx("tbody", { children: virtualItems.map((item, idx) => {
                                        const actualIndex = startIndex + idx;
                                        const selected = (isRowSelected === null || isRowSelected === void 0 ? void 0 : isRowSelected(item)) || false;
                                        return (jsxRuntime.jsxs("tr", { ref: node => measureElement(node, actualIndex), "data-index": actualIndex, className: selected ? 'selected' : undefined, children: [renderSelectionCell(item), columns.map(column => {
                                                    const alignClass = column.align
                                                        ? `text-${column.align === 'center' ? 'center' : column.align === 'right' ? 'right' : 'left'}`
                                                        : 'text-left';
                                                    const fixedClass = column.fixed
                                                        ? `fixed-${column.fixed}`
                                                        : '';
                                                    const className = [alignClass, fixedClass]
                                                        .filter(Boolean)
                                                        .join(' ');
                                                    const cellValue = getCellValue(item, column);
                                                    const cellContent = column.render
                                                        ? column.render(cellValue, item, actualIndex)
                                                        : cellValue;
                                                    return (jsxRuntime.jsx("td", { className: className || undefined, style: column.width
                                                            ? { width: column.width }
                                                            : undefined, children: cellContent }, column.key));
                                                })] }, item.key || actualIndex));
                                    }) }) }) })] }) }) }) }));
};

// 创建 Context
const TableContext = React.createContext(undefined);
const TableContainer = (props) => {
    const { columns, dataSource, pagination, virtual, rowSelection } = props;
    const [tableData, setTableData] = React.useState(dataSource !== null && dataSource !== void 0 ? dataSource : []);
    const [paginatedData, setPaginatedData] = React.useState(dataSource !== null && dataSource !== void 0 ? dataSource : []);
    // 同步 dataSource 变化
    React.useEffect(() => {
        if (dataSource !== undefined) {
            setTableData(dataSource);
        }
    }, [dataSource]);
    // 容器和表头的 ref
    const containerRef = React.useRef(null); //容器ref
    const tableRef = React.useRef(null);
    const [containerHeight, setContainerHeight] = React.useState(400);
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const [footerHeight, setFooterHeight] = React.useState(0);
    // 计算实际可视区域高度（容器高度 - 表头高度 - 表尾高度）
    const calculateVisibleHeight = React.useCallback(() => {
        if (!containerRef.current || !tableRef.current)
            return;
        const container = containerRef.current;
        const table = tableRef.current;
        const thead = table.querySelector('thead');
        const tfoot = table.querySelector('tfoot');
        const totalHeight = container.clientHeight;
        const header = (thead === null || thead === void 0 ? void 0 : thead.offsetHeight) || 0;
        const footer = (tfoot === null || tfoot === void 0 ? void 0 : tfoot.offsetHeight) || 0;
        const visibleHeight = Math.max(0, totalHeight - header - footer);
        setContainerHeight(visibleHeight);
        setHeaderHeight(header);
        setFooterHeight(footer);
        return visibleHeight;
    }, []);
    // 在布局完成后计算高度
    React.useLayoutEffect(() => {
        if (!virtual)
            return;
        // 延迟一帧确保 DOM 已渲染
        requestAnimationFrame(() => {
            calculateVisibleHeight();
        });
    }, [virtual, calculateVisibleHeight, columns]);
    // 监听容器尺寸变化
    React.useEffect(() => {
        if (!virtual || !containerRef.current)
            return;
        const resizeObserver = new ResizeObserver(() => {
            calculateVisibleHeight();
        });
        resizeObserver.observe(containerRef.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [virtual, calculateVisibleHeight]);
    // 解析虚拟滚动配置
    const virtualConfig = React.useMemo(() => {
        var _a;
        // 如果用户明确禁用，则禁用
        if (!virtual)
            return { enabled: false };
        // 计算可视区域高度（容器高度 - 表头高度 - 表尾高度）
        const visibleHeight = Math.max(0, containerHeight - headerHeight - footerHeight);
        const effectiveHeight = visibleHeight > 0 ? visibleHeight : 400; // 如果还没计算出来，使用默认值
        const defaultConfig = {
            enabled: true,
            rowHeight: 50,
            containerHeight: effectiveHeight,
            overscan: 2,
        };
        if (typeof virtual === 'boolean') {
            return defaultConfig;
        }
        return {
            ...defaultConfig,
            ...virtual,
            containerHeight: (_a = virtual.containerHeight) !== null && _a !== void 0 ? _a : effectiveHeight,
        };
    }, [virtual, containerHeight, headerHeight, footerHeight]);
    // 使用虚拟滚动 Hook（固定高度模式）
    const virtualScroll = useVirtualScroll({
        data: paginatedData,
        estimateSize: virtualConfig.rowHeight || 50, // 固定行高
        containerHeight: virtualConfig.containerHeight || 400, // 使用计算出的容器高度
        overscan: virtualConfig.overscan || 2,
    });
    // 计算 total
    const total = tableData.length;
    // ==================== 行选择相关逻辑 ====================
    const isRowSelectionEnabled = !!rowSelection;
    const selectionType = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.type) || 'checkbox';
    const isControlled = (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys) !== undefined;
    // 选中状态管理
    const [internalSelectedRowKeys, setInternalSelectedRowKeys] = React.useState((rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.defaultSelectedRowKeys) || []);
    const selectedRowKeys = isControlled
        ? rowSelection.selectedRowKeys
        : internalSelectedRowKeys;
    const setSelectedRowKeys = React.useCallback((keys) => {
        if (!isControlled) {
            setInternalSelectedRowKeys(keys);
        }
        // 获取选中的行数据
        const selectedRows = tableData.filter(item => {
            const key = item.key;
            return keys.includes(key);
        });
        // 触发 onChange 回调
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange) {
            rowSelection.onChange(keys, selectedRows);
        }
    }, [isControlled, tableData, rowSelection]);
    // 判断某行是否被选中
    const isRowSelected = React.useCallback((record) => {
        const key = record.key;
        return selectedRowKeys.includes(key);
    }, [selectedRowKeys]);
    // 切换某行的选中状态
    const toggleRowSelection = React.useCallback((record, selected) => {
        const key = record.key;
        const currentSelected = isRowSelected(record);
        const newSelected = selected !== undefined ? selected : !currentSelected;
        let newSelectedRowKeys;
        if (selectionType === 'radio') {
            // 单选模式：只能选中一个
            newSelectedRowKeys = newSelected ? [key] : [];
        }
        else {
            // 复选模式
            if (newSelected) {
                newSelectedRowKeys = [...selectedRowKeys, key];
            }
            else {
                newSelectedRowKeys = selectedRowKeys.filter(k => k !== key);
            }
        }
        setSelectedRowKeys(newSelectedRowKeys);
        // 触发 onSelect 回调
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelect) {
            const selectedRows = tableData.filter(item => {
                const itemKey = item.key;
                return newSelectedRowKeys.includes(itemKey);
            });
            rowSelection.onSelect(record, newSelected, selectedRows);
        }
    }, [
        selectedRowKeys,
        selectionType,
        tableData,
        rowSelection,
        isRowSelected,
        setSelectedRowKeys,
    ]);
    // 切换所有行的选中状态
    const toggleAllRowsSelection = React.useCallback((selected) => {
        if (selectionType === 'radio') {
            // 单选模式不支持全选
            return;
        }
        const currentData = paginatedData;
        const allKeys = currentData.map(item => item.key);
        const allSelected = allKeys.every(key => selectedRowKeys.includes(key));
        const newSelected = selected !== undefined ? selected : !allSelected;
        let newSelectedRowKeys;
        if (newSelected) {
            // 合并当前选中和当前页的所有 key
            newSelectedRowKeys = Array.from(new Set([...selectedRowKeys, ...allKeys]));
        }
        else {
            // 移除当前页的所有 key
            newSelectedRowKeys = selectedRowKeys.filter(key => !allKeys.includes(key));
        }
        const changeRows = currentData.filter(item => {
            const key = item.key;
            return newSelected
                ? !selectedRowKeys.includes(key)
                : selectedRowKeys.includes(key);
        });
        setSelectedRowKeys(newSelectedRowKeys);
        // 触发 onSelectAll 回调
        if (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelectAll) {
            const selectedRows = tableData.filter(item => {
                const itemKey = item.key;
                return newSelectedRowKeys.includes(itemKey);
            });
            rowSelection.onSelectAll(newSelected, selectedRows, changeRows);
        }
    }, [
        selectedRowKeys,
        paginatedData,
        selectionType,
        tableData,
        rowSelection,
        setSelectedRowKeys,
    ]);
    // 判断是否所有行都被选中
    const isAllRowsSelected = React.useCallback(() => {
        if (selectionType === 'radio') {
            return false;
        }
        const currentData = paginatedData;
        if (currentData.length === 0)
            return false;
        return currentData.every(item => {
            const key = item.key;
            return selectedRowKeys.includes(key);
        });
    }, [paginatedData, selectedRowKeys, selectionType]);
    // 判断是否部分行被选中
    const isSomeRowsSelected = React.useCallback(() => {
        if (selectionType === 'radio') {
            return false;
        }
        const currentData = paginatedData;
        if (currentData.length === 0)
            return false;
        const selectedCount = currentData.filter(item => {
            const key = item.key;
            return selectedRowKeys.includes(key);
        }).length;
        return selectedCount > 0 && selectedCount < currentData.length;
    }, [paginatedData, selectedRowKeys, selectionType]);
    // 同步受控的 selectedRowKeys
    React.useEffect(() => {
        if (isControlled && (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys)) {
            setInternalSelectedRowKeys(rowSelection.selectedRowKeys);
        }
    }, [isControlled, rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys]);
    // 通过 context 传递数据
    const contextValue = {
        columns,
        tableData,
        setTableData,
        total,
        paginatedData,
        setPaginatedData,
        pagination,
        virtual: virtualConfig,
        // 虚拟滚动相关
        virtualItems: virtualScroll.virtualItems,
        totalHeight: virtualScroll.totalHeight,
        startOffset: virtualScroll.startOffset,
        measureRowElement: virtualScroll.measureElement,
        containerRef: virtualScroll.containerRef,
        handleScroll: virtualScroll.handleScroll,
        // 行选择相关
        rowSelection: isRowSelectionEnabled ? rowSelection : undefined,
        selectedRowKeys,
        setSelectedRowKeys,
        isRowSelected,
        toggleRowSelection,
        toggleAllRowsSelection,
        isAllRowsSelected,
        isSomeRowsSelected,
    };
    const tableClassName = 'cream-table';
    return (jsxRuntime.jsx(TableContext.Provider, { value: contextValue, children: jsxRuntime.jsx("div", { ref: containerRef, className: "cream-table-container", style: virtualConfig.enabled ? { overflow: 'hidden' } : undefined, children: jsxRuntime.jsxs("table", { ref: tableRef, className: tableClassName, children: [jsxRuntime.jsx(TableHeader, {}), virtualConfig.enabled ? jsxRuntime.jsx(TableVirtualBody, {}) : jsxRuntime.jsx(TableBody, {}), jsxRuntime.jsx(TableFoot, {})] }) }) }));
};

exports.default = TableContainer;
//# sourceMappingURL=index.cjs.js.map
