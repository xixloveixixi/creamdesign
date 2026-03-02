'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var axios = require('axios');
var styleInject_es = require('../chunks/style-inject.es-XZHJH68X.cjs.js');
var Progress = require('../chunks/Progress-mW8HAqKd.cjs.js');
var Icon = require('../chunks/Icon-BohTSe52.cjs.js');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var classNames = require('classnames');
var SparkMD5 = require('spark-md5');
require('@fortawesome/react-fontawesome');

var css_248z$1 = "@charset \"UTF-8\";\n/* FileList 组件样式 - 基于 CreamDesign 设计系统 */\n/**\n * CreamDesign 设计系统\n * 基于柔和奶油色调的现代化设计系统\n */\n.text-primary {\n  color: #a855f7;\n}\n\n.text-primary-dark {\n  color: #581c87;\n}\n\n.text-secondary {\n  color: #85c1e9;\n}\n\n.text-success {\n  color: #4caf50;\n}\n\n.text-warning {\n  color: #ffc107;\n}\n\n.text-error {\n  color: #f44336;\n}\n\n.text-info {\n  color: #2196f3;\n}\n\n.text-disabled {\n  color: #9e9e9e;\n}\n\n.text-neutral-50 {\n  color: #ffffff;\n}\n\n.text-neutral-100 {\n  color: #f9f9f9;\n}\n\n.text-neutral-200 {\n  color: #f0f0f0;\n}\n\n.text-neutral-300 {\n  color: #e0e0e0;\n}\n\n.text-neutral-400 {\n  color: #bdbdbd;\n}\n\n.text-neutral-500 {\n  color: #9e9e9e;\n}\n\n.text-neutral-600 {\n  color: #757575;\n}\n\n.text-neutral-700 {\n  color: #616161;\n}\n\n.text-neutral-800 {\n  color: #424242;\n}\n\n.text-neutral-900 {\n  color: #212121;\n}\n\n.text-heading {\n  color: #212121;\n}\n\n.text-body {\n  color: #616161;\n}\n\n.text-muted {\n  color: #757575;\n}\n\n.font-size-base {\n  font-size: 1rem;\n}\n\n.font-size-lg {\n  font-size: 1.25rem;\n}\n\n.font-size-sm {\n  font-size: 0.875rem;\n}\n\n.font-size-xs {\n  font-size: 0.765625rem;\n}\n\n.font-size-h1 {\n  font-size: 2.5rem;\n}\n\n.font-size-h2 {\n  font-size: 2rem;\n}\n\n.font-size-h3 {\n  font-size: 1.75rem;\n}\n\n.font-size-h4 {\n  font-size: 1.5rem;\n}\n\n.font-size-h5 {\n  font-size: 1.25rem;\n}\n\n.font-size-h6 {\n  font-size: 1rem;\n}\n\n.font-weight-light {\n  font-weight: 300;\n}\n\n.font-weight-normal {\n  font-weight: 400;\n}\n\n.font-weight-bold {\n  font-weight: 700;\n}\n\n.font-weight-lighter {\n  font-weight: lighter;\n}\n\n.font-weight-bolder {\n  font-weight: bolder;\n}\n\n.line-height-base {\n  line-height: 1.5;\n}\n\n.line-height-lg {\n  line-height: 2;\n}\n\n.line-height-sm {\n  line-height: 1.25;\n}\n\n.line-height-none {\n  line-height: 1;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.font-family-sans-serif {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n}\n\n.font-family-monospace {\n  font-family: monospace;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212121;\n  background-color: #ffffff;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  line-height: 1.25;\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n}\n\nh1 {\n  font-size: 2.5rem;\n}\n\nh2 {\n  font-size: 2rem;\n}\n\nh3 {\n  font-size: 1.75rem;\n}\n\nh4 {\n  font-size: 1.5rem;\n}\n\nh5 {\n  font-size: 1.25rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  line-height: 1.5;\n}\n\na {\n  color: #a855f7;\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\na:hover {\n  color: rgb(142.8, 72.25, 209.95);\n  text-decoration: underline;\n}\na:focus {\n  outline: 2px solid #a855f7;\n  outline-offset: 2px;\n}\n\n.bg-primary {\n  background-color: #a855f7;\n}\n\n.bg-primary-100 {\n  background-color: #f5f3ff;\n}\n\n.bg-primary-200 {\n  background-color: #ede9fe;\n}\n\n.bg-primary-300 {\n  background-color: #ddd6fe;\n}\n\n.bg-primary-400 {\n  background-color: #c4b5fd;\n}\n\n.bg-primary-600 {\n  background-color: #9333ea;\n}\n\n.bg-primary-700 {\n  background-color: #7e22ce;\n}\n\n.bg-primary-800 {\n  background-color: #6b21a8;\n}\n\n.bg-primary-900 {\n  background-color: #581c87;\n}\n\n.bg-secondary-blue-100 {\n  background-color: #f0f7ff;\n}\n\n.bg-secondary-blue-300 {\n  background-color: #d6eaf8;\n}\n\n.bg-secondary-blue-500 {\n  background-color: #aed6f1;\n}\n\n.bg-secondary-pink-100 {\n  background-color: #fdf2f8;\n}\n\n.bg-secondary-pink-300 {\n  background-color: #fadbd8;\n}\n\n.bg-secondary-pink-500 {\n  background-color: #f5cba7;\n}\n\n.bg-secondary-green-100 {\n  background-color: #f4f6f0;\n}\n\n.bg-secondary-green-300 {\n  background-color: #e8f5e9;\n}\n\n.bg-secondary-green-500 {\n  background-color: #a5d6a7;\n}\n\n.bg-success {\n  background-color: #4caf50;\n}\n\n.bg-warning {\n  background-color: #ffc107;\n}\n\n.bg-error {\n  background-color: #f44336;\n}\n\n.bg-info {\n  background-color: #2196f3;\n}\n\n.bg-neutral-50 {\n  background-color: #ffffff;\n}\n\n.bg-neutral-100 {\n  background-color: #f9f9f9;\n}\n\n.bg-neutral-200 {\n  background-color: #f0f0f0;\n}\n\n.bg-neutral-300 {\n  background-color: #e0e0e0;\n}\n\n.bg-neutral-400 {\n  background-color: #bdbdbd;\n}\n\n.bg-neutral-500 {\n  background-color: #9e9e9e;\n}\n\n.bg-neutral-600 {\n  background-color: #757575;\n}\n\n.bg-neutral-700 {\n  background-color: #616161;\n}\n\n.bg-neutral-800 {\n  background-color: #424242;\n}\n\n.bg-neutral-900 {\n  background-color: #212121;\n}\n\n.bg-primary-light {\n  background-color: rgba(168, 85, 247, 0.7);\n}\n\n.bg-primary-medium {\n  background-color: rgba(168, 85, 247, 0.5);\n}\n\n.bg-primary-dark {\n  background-color: rgba(168, 85, 247, 0.3);\n}\n\n.border {\n  border: 1px solid #e0e0e0;\n}\n\n.border-primary {\n  border-color: #a855f7;\n}\n\n.border-secondary {\n  border-color: #aed6f1;\n}\n\n.border-success {\n  border-color: #4caf50;\n}\n\n.border-warning {\n  border-color: #ffc107;\n}\n\n.border-error {\n  border-color: #f44336;\n}\n\n.border-neutral {\n  border-color: #e0e0e0;\n}\n\n.border-divider {\n  border-color: #f0f0f0;\n}\n\n.rounded {\n  border-radius: 0.375rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.flex {\n  display: flex;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.min-h-screen {\n  min-height: 100vh;\n}\n\n.card {\n  background-color: #ede9fe;\n  border-radius: 0.5rem;\n  box-shadow: 0 2px 8px rgba(33, 33, 33, 0.1);\n  padding: 1.5rem;\n  margin-bottom: 1rem;\n}\n.card.card-hover {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card.card-hover:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(33, 33, 33, 0.15);\n}\n\n.tag {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 9999px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n\n.tag-primary {\n  background-color: #ddd6fe;\n  color: #212121;\n}\n\n.tag-blue {\n  background-color: #d6eaf8;\n  color: #212121;\n}\n\n.tag-pink {\n  background-color: #fadbd8;\n  color: #212121;\n}\n\n.tag-green {\n  background-color: #e8f5e9;\n  color: #212121;\n}\n\n.form-input {\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #e0e0e0;\n  border-radius: 0.375rem;\n  background-color: #ffffff;\n  color: #212121;\n}\n.form-input:focus {\n  outline: none;\n  border-color: #a855f7;\n  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);\n}\n.form-input:disabled {\n  background-color: #f9f9f9;\n  color: #9e9e9e;\n  cursor: not-allowed;\n}\n\n/*\n:export {\n  primaryColor: $color-primary-500;\n  secondaryColor: $color-secondary-blue-700;\n  neutralColor: $color-neutral-500;\n  successColor: $color-success;\n  warningColor: $color-warning;\n  errorColor: $color-error;\n  backgroundColor: $color-background;\n  textColor: $color-text-primary;\n}*/\n/* 文件列表容器 */\n.file-list-container {\n  width: 100%;\n  margin-top: 12px;\n  /* 与按钮的间距 */\n  box-sizing: border-box;\n}\n\n/* 文件列表 */\n.file-list {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin: 2px 0;\n}\n\n/* 文件项 */\n.file-item {\n  display: flex;\n  flex-direction: column;\n  padding: 12px;\n  background-color: #ffffff;\n  border: 1px solid #f0f0f0;\n  border-radius: 0.375rem;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.file-item:hover {\n  border-color: #ddd6fe;\n  box-shadow: 0 1px 4px rgba(237, 233, 254, 0.3);\n}\n.file-item {\n  /* 状态样式 - 移除左边框和特殊背景色，使用统一简洁样式 */\n}\n.file-item.status-uploading, .file-item.status-success, .file-item.status-error, .file-item.status-ready {\n  border-left: none;\n  background-color: transparent;\n}\n\n/* 文件内容布局 */\n.file-content {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 12px;\n}\n\n/* 进度条区域 */\n.progress-section {\n  width: 100%;\n  margin-top: 8px;\n  padding-top: 8px;\n  border-top: 1px solid #f0f0f0;\n}\n\n.file-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n  min-width: 0;\n}\n\n.file-main-icon {\n  font-size: 1.125rem;\n  color: #757575;\n  flex-shrink: 0;\n}\n\n.file-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n  flex: 1;\n}\n\n.file-name {\n  font-weight: 500;\n  color: #424242;\n  font-size: 0.75rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.file-size {\n  font-size: 0.625rem;\n  color: #757575;\n  font-weight: 400;\n}\n\n.file-right {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n\n.status-section {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n}\n\n.status-with-remove {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.status-icon-btn {\n  background: none;\n  border: none;\n  padding: 0;\n  margin: 0;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  position: relative;\n}\n.status-icon-btn:hover {\n  transform: scale(1.1);\n}\n.status-icon-btn:hover .status-icon {\n  color: #f44336 !important;\n}\n.status-icon-btn:hover + .remove-btn-overlay:not(.always-show) {\n  opacity: 1;\n  visibility: visible;\n}\n.status-icon-btn:active {\n  transform: scale(0.95);\n}\n\n.remove-btn-overlay {\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  width: 16px;\n  height: 16px;\n  padding: 0;\n  background: #f44336;\n  color: white;\n  border: 2px solid white;\n  border-radius: 50%;\n  font-size: 0.625rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  z-index: 10;\n}\n.remove-btn-overlay.always-show {\n  opacity: 1;\n  visibility: visible;\n}\n.remove-btn-overlay:not(.always-show) {\n  opacity: 0;\n  visibility: hidden;\n}\n.remove-btn-overlay:hover {\n  transform: scale(1.2);\n  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.4);\n}\n.remove-btn-overlay:active {\n  transform: scale(0.9);\n}\n\n.status-icon {\n  font-size: 0.875rem;\n}\n.status-icon.status-ready {\n  color: #9e9e9e;\n}\n.status-icon.status-uploading {\n  color: #2196f3;\n  animation: spin 1s linear infinite;\n}\n.status-icon.status-success {\n  color: #4caf50;\n}\n.status-icon.status-error {\n  color: #f44336;\n}\n\n.file-status {\n  font-size: 0.625rem;\n  font-weight: 500;\n}\n.file-status.status-ready {\n  color: #757575;\n}\n.file-status.status-uploading {\n  color: #2196f3;\n}\n.file-status.status-success {\n  color: #4caf50;\n}\n.file-status.status-error {\n  color: #f44336;\n}\n\n/* 旋转动画 */\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/* 删除按钮 */\n.remove-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-weight: 500;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: none;\n  outline: none;\n  user-select: none;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  background: none;\n  color: #bdbdbd;\n  border: none;\n  font-size: 0.75rem;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n}\n.remove-btn:hover {\n  background-color: #f44336;\n  color: white;\n  border-radius: 50%;\n  transform: scale(1.1);\n}\n.remove-btn:active {\n  transform: scale(0.95);\n}\n.remove-btn .icon {\n  font-size: 0.75rem;\n}\n\n/* 响应式设计 */\n@media (max-width: 768px) {\n  .file-list-container {\n    max-width: 100%;\n    padding: 0 8px;\n  }\n  .file-item {\n    padding: 12px;\n  }\n  .file-meta {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 4px;\n  }\n  .progress-container {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 8px;\n  }\n  .progress-container .progress-text {\n    text-align: left;\n    min-width: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,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OztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Us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aEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsV0FBVztFQUNYLFlBQVk7RUFDWixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2Qix5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLHFCQUFxQjtBQUN2QjtBQUNBO0VBQ0Usc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUEsVUFBVTtBQUNWO0VBQ0U7SUFDRSxlQUFlO0lBQ2YsY0FBYztFQUNoQjtFQUNBO0lBQ0UsYUFBYTtFQUNmO0VBQ0E7SUFDRSxzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLFFBQVE7RUFDVjtFQUNBO0lBQ0Usc0JBQXNCO0lBQ3RCLG9CQUFvQjtJQUNwQixRQUFRO0VBQ1Y7RUFDQTtJQUNFLGdCQUFnQjtJQUNoQixlQUFlO0VBQ2pCO0FBQ0YiLCJmaWxlIjoiRmlsZUxpc3Quc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbi8qIEZpbGVMaXN0IOe7hOS7tuagt+W8jyAtIOWfuuS6jiBDcmVhbURlc2lnbiDorr7orqHns7vnu58gKi9cbi8qKlxuICogQ3JlYW1EZXNpZ24g6K6+6K6h57O757ufXG4gKiDln7rkuo7mn5TlkozlpbbmsrnoibLosIPnmoTnjrDku6PljJborr7orqHns7vnu59cbiAqL1xuLnRleHQtcHJpbWFyeSB7XG4gIGNvbG9yOiAjYTg1NWY3O1xufVxuXG4udGV4dC1wcmltYXJ5LWRhcmsge1xuICBjb2xvcjogIzU4MWM4Nztcbn1cblxuLnRleHQtc2Vjb25kYXJ5IHtcbiAgY29sb3I6ICM4NWMxZTk7XG59XG5cbi50ZXh0LXN1Y2Nlc3Mge1xuICBjb2xvcjogIzRjYWY1MDtcbn1cblxuLnRleHQtd2FybmluZyB7XG4gIGNvbG9yOiAjZmZjMTA3O1xufVxuXG4udGV4dC1lcnJvciB7XG4gIGNvbG9yOiAjZjQ0MzM2O1xufVxuXG4udGV4dC1pbmZvIHtcbiAgY29sb3I6ICMyMTk2ZjM7XG59XG5cbi50ZXh0LWRpc2FibGVkIHtcbiAgY29sb3I6ICM5ZTllOWU7XG59XG5cbi50ZXh0LW5ldXRyYWwtNTAge1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cblxuLnRleHQtbmV1dHJhbC0xMDAge1xuICBjb2xvcjogI2Y5ZjlmOTtcbn1cblxuLnRleHQtbmV1dHJhbC0yMDAge1xuICBjb2xvcjogI2YwZjBmMDtcbn1cblxuLnRleHQtbmV1dHJhbC0zMDAge1xuICBjb2xvcjogI2UwZTBlMDtcbn1cblxuLnRleHQtbmV1dHJhbC00MDAge1xuICBjb2xvcjogI2JkYmRiZDtcbn1cblxuLnRleHQtbmV1dHJhbC01MDAge1xuICBjb2xvcjogIzllOWU5ZTtcbn1cblxuLnRleHQtbmV1dHJhbC02MDAge1xuICBjb2xvcjogIzc1NzU3NTtcbn1cblxuLnRleHQtbmV1dHJhbC03MDAge1xuICBjb2xvcjogIzYxNjE2MTtcbn1cblxuLnRleHQtbmV1dHJhbC04MDAge1xuICBjb2xvcjogIzQyNDI0Mjtcbn1cblxuLnRleHQtbmV1dHJhbC05MDAge1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLnRleHQtaGVhZGluZyB7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4udGV4dC1ib2R5IHtcbiAgY29sb3I6ICM2MTYxNjE7XG59XG5cbi50ZXh0LW11dGVkIHtcbiAgY29sb3I6ICM3NTc1NzU7XG59XG5cbi5mb250LXNpemUtYmFzZSB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1sZyB7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1zbSB7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG5cbi5mb250LXNpemUteHMge1xuICBmb250LXNpemU6IDAuNzY1NjI1cmVtO1xufVxuXG4uZm9udC1zaXplLWgxIHtcbiAgZm9udC1zaXplOiAyLjVyZW07XG59XG5cbi5mb250LXNpemUtaDIge1xuICBmb250LXNpemU6IDJyZW07XG59XG5cbi5mb250LXNpemUtaDMge1xuICBmb250LXNpemU6IDEuNzVyZW07XG59XG5cbi5mb250LXNpemUtaDQge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oNSB7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oNiB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLmZvbnQtd2VpZ2h0LWxpZ2h0IHtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbn1cblxuLmZvbnQtd2VpZ2h0LW5vcm1hbCB7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5cbi5mb250LXdlaWdodC1ib2xkIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmZvbnQtd2VpZ2h0LWxpZ2h0ZXIge1xuICBmb250LXdlaWdodDogbGlnaHRlcjtcbn1cblxuLmZvbnQtd2VpZ2h0LWJvbGRlciB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi5saW5lLWhlaWdodC1iYXNlIHtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLmxpbmUtaGVpZ2h0LWxnIHtcbiAgbGluZS1oZWlnaHQ6IDI7XG59XG5cbi5saW5lLWhlaWdodC1zbSB7XG4gIGxpbmUtaGVpZ2h0OiAxLjI1O1xufVxuXG4ubGluZS1oZWlnaHQtbm9uZSB7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4udGV4dC1sZWZ0IHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLnRleHQtY2VudGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udGV4dC1yaWdodCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4udGV4dC1qdXN0aWZ5IHtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cblxuLmZvbnQtZmFtaWx5LXNhbnMtc2VyaWYge1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZjtcbn1cblxuLmZvbnQtZmFtaWx5LW1vbm9zcGFjZSB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG59XG5cbmJvZHkge1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBjb2xvcjogIzIxMjEyMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG59XG5cbmgxLFxuaDIsXG5oMyxcbmg0LFxuaDUsXG5oNiB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjI1O1xuICBtYXJnaW4tdG9wOiAwO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbmgxIHtcbiAgZm9udC1zaXplOiAyLjVyZW07XG59XG5cbmgyIHtcbiAgZm9udC1zaXplOiAycmVtO1xufVxuXG5oMyB7XG4gIGZvbnQtc2l6ZTogMS43NXJlbTtcbn1cblxuaDQge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuaDUge1xuICBmb250LXNpemU6IDEuMjVyZW07XG59XG5cbmg2IHtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG5wIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuYSB7XG4gIGNvbG9yOiAjYTg1NWY3O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZTtcbn1cbmE6aG92ZXIge1xuICBjb2xvcjogcmdiKDE0Mi44LCA3Mi4yNSwgMjA5Ljk1KTtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5hOmZvY3VzIHtcbiAgb3V0bGluZTogMnB4IHNvbGlkICNhODU1Zjc7XG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XG59XG5cbi5iZy1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E4NTVmNztcbn1cblxuLmJnLXByaW1hcnktMTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjNmZjtcbn1cblxuLmJnLXByaW1hcnktMjAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VkZTlmZTtcbn1cblxuLmJnLXByaW1hcnktMzAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDZmZTtcbn1cblxuLmJnLXByaW1hcnktNDAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M0YjVmZDtcbn1cblxuLmJnLXByaW1hcnktNjAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzkzMzNlYTtcbn1cblxuLmJnLXByaW1hcnktNzAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzdlMjJjZTtcbn1cblxuLmJnLXByaW1hcnktODAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzZiMjFhODtcbn1cblxuLmJnLXByaW1hcnktOTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU4MWM4Nztcbn1cblxuLmJnLXNlY29uZGFyeS1ibHVlLTEwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGY3ZmY7XG59XG5cbi5iZy1zZWNvbmRhcnktYmx1ZS0zMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDZlYWY4O1xufVxuXG4uYmctc2Vjb25kYXJ5LWJsdWUtNTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FlZDZmMTtcbn1cblxuLmJnLXNlY29uZGFyeS1waW5rLTEwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZGYyZjg7XG59XG5cbi5iZy1zZWNvbmRhcnktcGluay0zMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFkYmQ4O1xufVxuXG4uYmctc2Vjb25kYXJ5LXBpbmstNTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1Y2JhNztcbn1cblxuLmJnLXNlY29uZGFyeS1ncmVlbi0xMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNmYwO1xufVxuXG4uYmctc2Vjb25kYXJ5LWdyZWVuLTMwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGY1ZTk7XG59XG5cbi5iZy1zZWNvbmRhcnktZ3JlZW4tNTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E1ZDZhNztcbn1cblxuLmJnLXN1Y2Nlc3Mge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xufVxuXG4uYmctd2FybmluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmMxMDc7XG59XG5cbi5iZy1lcnJvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNDQzMzY7XG59XG5cbi5iZy1pbmZvIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcbn1cblxuLmJnLW5ldXRyYWwtNTAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xufVxuXG4uYmctbmV1dHJhbC0xMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xufVxuXG4uYmctbmV1dHJhbC0yMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xufVxuXG4uYmctbmV1dHJhbC0zMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xufVxuXG4uYmctbmV1dHJhbC00MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmRiZGJkO1xufVxuXG4uYmctbmV1dHJhbC01MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWU5ZTllO1xufVxuXG4uYmctbmV1dHJhbC02MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzU3NTc1O1xufVxuXG4uYmctbmV1dHJhbC03MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjE2MTYxO1xufVxuXG4uYmctbmV1dHJhbC04MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI0MjQyO1xufVxuXG4uYmctbmV1dHJhbC05MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyMTIxO1xufVxuXG4uYmctcHJpbWFyeS1saWdodCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY4LCA4NSwgMjQ3LCAwLjcpO1xufVxuXG4uYmctcHJpbWFyeS1tZWRpdW0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2OCwgODUsIDI0NywgMC41KTtcbn1cblxuLmJnLXByaW1hcnktZGFyayB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY4LCA4NSwgMjQ3LCAwLjMpO1xufVxuXG4uYm9yZGVyIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcbn1cblxuLmJvcmRlci1wcmltYXJ5IHtcbiAgYm9yZGVyLWNvbG9yOiAjYTg1NWY3O1xufVxuXG4uYm9yZGVyLXNlY29uZGFyeSB7XG4gIGJvcmRlci1jb2xvcjogI2FlZDZmMTtcbn1cblxuLmJvcmRlci1zdWNjZXNzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNGNhZjUwO1xufVxuXG4uYm9yZGVyLXdhcm5pbmcge1xuICBib3JkZXItY29sb3I6ICNmZmMxMDc7XG59XG5cbi5ib3JkZXItZXJyb3Ige1xuICBib3JkZXItY29sb3I6ICNmNDQzMzY7XG59XG5cbi5ib3JkZXItbmV1dHJhbCB7XG4gIGJvcmRlci1jb2xvcjogI2UwZTBlMDtcbn1cblxuLmJvcmRlci1kaXZpZGVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZjBmMGYwO1xufVxuXG4ucm91bmRlZCB7XG4gIGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtO1xufVxuXG4ucm91bmRlZC1sZyB7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbn1cblxuLnJvdW5kZWQtZnVsbCB7XG4gIGJvcmRlci1yYWRpdXM6IDk5OTlweDtcbn1cblxuLmZsZXgge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uZmxleC13cmFwIHtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uaXRlbXMtY2VudGVyIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmp1c3RpZnktY2VudGVyIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5nYXAtMyB7XG4gIGdhcDogMC43NXJlbTtcbn1cblxuLm1iLTIge1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5tYi02IHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuXG4ucC00IHtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLm1pbi1oLXNjcmVlbiB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xufVxuXG4uY2FyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZGU5ZmU7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMzMsIDMzLCAzMywgMC4xKTtcbiAgcGFkZGluZzogMS41cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuLmNhcmQuY2FyZC1ob3ZlciB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xufVxuLmNhcmQuY2FyZC1ob3Zlcjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDMzLCAzMywgMzMsIDAuMTUpO1xufVxuXG4udGFnIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOTk5OXB4O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4udGFnLXByaW1hcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkNmZlO1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLnRhZy1ibHVlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q2ZWFmODtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi50YWctcGluayB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWRiZDg7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4udGFnLWdyZWVuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xuICBib3JkZXItcmFkaXVzOiAwLjM3NXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG4uZm9ybS1pbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJvcmRlci1jb2xvcjogI2E4NTVmNztcbiAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoMTY4LCA4NSwgMjQ3LCAwLjIpO1xufVxuLmZvcm0taW5wdXQ6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuICBjb2xvcjogIzllOWU5ZTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLypcbjpleHBvcnQge1xuICBwcmltYXJ5Q29sb3I6ICRjb2xvci1wcmltYXJ5LTUwMDtcbiAgc2Vjb25kYXJ5Q29sb3I6ICRjb2xvci1zZWNvbmRhcnktYmx1ZS03MDA7XG4gIG5ldXRyYWxDb2xvcjogJGNvbG9yLW5ldXRyYWwtNTAwO1xuICBzdWNjZXNzQ29sb3I6ICRjb2xvci1zdWNjZXNzO1xuICB3YXJuaW5nQ29sb3I6ICRjb2xvci13YXJuaW5nO1xuICBlcnJvckNvbG9yOiAkY29sb3ItZXJyb3I7XG4gIGJhY2tncm91bmRDb2xvcjogJGNvbG9yLWJhY2tncm91bmQ7XG4gIHRleHRDb2xvcjogJGNvbG9yLXRleHQtcHJpbWFyeTtcbn0qL1xuLyog5paH5Lu25YiX6KGo5a655ZmoICovXG4uZmlsZS1saXN0LWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuICAvKiDkuI7mjInpkq7nmoTpl7Tot50gKi9cbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLyog5paH5Lu25YiX6KGoICovXG4uZmlsZS1saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA0cHg7XG4gIG1hcmdpbjogMnB4IDA7XG59XG5cbi8qIOaWh+S7tumhuSAqL1xuLmZpbGUtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmc6IDEycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmMGYwZjA7XG4gIGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uZmlsZS1pdGVtOmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjZGRkNmZlO1xuICBib3gtc2hhZG93OiAwIDFweCA0cHggcmdiYSgyMzcsIDIzMywgMjU0LCAwLjMpO1xufVxuLmZpbGUtaXRlbSB7XG4gIC8qIOeKtuaAgeagt+W8jyAtIOenu+mZpOW3pui+ueahhuWSjOeJueauiuiDjOaZr+iJsu+8jOS9v+eUqOe7n+S4gOeugOa0geagt+W8jyAqL1xufVxuLmZpbGUtaXRlbS5zdGF0dXMtdXBsb2FkaW5nLCAuZmlsZS1pdGVtLnN0YXR1cy1zdWNjZXNzLCAuZmlsZS1pdGVtLnN0YXR1cy1lcnJvciwgLmZpbGUtaXRlbS5zdGF0dXMtcmVhZHkge1xuICBib3JkZXItbGVmdDogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi8qIOaWh+S7tuWGheWuueW4g+WxgCAqL1xuLmZpbGUtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGdhcDogMTJweDtcbn1cblxuLyog6L+b5bqm5p2h5Yy65Z+fICovXG4ucHJvZ3Jlc3Mtc2VjdGlvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIHBhZGRpbmctdG9wOiA4cHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjBmMGYwO1xufVxuXG4uZmlsZS1sZWZ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLmZpbGUtbWFpbi1pY29uIHtcbiAgZm9udC1zaXplOiAxLjEyNXJlbTtcbiAgY29sb3I6ICM3NTc1NzU7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uZmlsZS1pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAycHg7XG4gIG1pbi13aWR0aDogMDtcbiAgZmxleDogMTtcbn1cblxuLmZpbGUtbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiAjNDI0MjQyO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uZmlsZS1zaXplIHtcbiAgZm9udC1zaXplOiAwLjYyNXJlbTtcbiAgY29sb3I6ICM3NTc1NzU7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5cbi5maWxlLXJpZ2h0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uc3RhdHVzLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDJweDtcbn1cblxuLnN0YXR1cy13aXRoLXJlbW92ZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5zdGF0dXMtaWNvbi1idG4ge1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnN0YXR1cy1pY29uLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbn1cbi5zdGF0dXMtaWNvbi1idG46aG92ZXIgLnN0YXR1cy1pY29uIHtcbiAgY29sb3I6ICNmNDQzMzYgIWltcG9ydGFudDtcbn1cbi5zdGF0dXMtaWNvbi1idG46aG92ZXIgKyAucmVtb3ZlLWJ0bi1vdmVybGF5Om5vdCguYWx3YXlzLXNob3cpIHtcbiAgb3BhY2l0eTogMTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cbi5zdGF0dXMtaWNvbi1idG46YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbn1cblxuLnJlbW92ZS1idG4tb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAtNnB4O1xuICByaWdodDogLTZweDtcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcbiAgcGFkZGluZzogMDtcbiAgYmFja2dyb3VuZDogI2Y0NDMzNjtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBmb250LXNpemU6IDAuNjI1cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICB6LWluZGV4OiAxMDtcbn1cbi5yZW1vdmUtYnRuLW92ZXJsYXkuYWx3YXlzLXNob3cge1xuICBvcGFjaXR5OiAxO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuLnJlbW92ZS1idG4tb3ZlcmxheTpub3QoLmFsd2F5cy1zaG93KSB7XG4gIG9wYWNpdHk6IDA7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi5yZW1vdmUtYnRuLW92ZXJsYXk6aG92ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDI0NCwgNjcsIDU0LCAwLjQpO1xufVxuLnJlbW92ZS1idG4tb3ZlcmxheTphY3RpdmUge1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuOSk7XG59XG5cbi5zdGF0dXMtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG59XG4uc3RhdHVzLWljb24uc3RhdHVzLXJlYWR5IHtcbiAgY29sb3I6ICM5ZTllOWU7XG59XG4uc3RhdHVzLWljb24uc3RhdHVzLXVwbG9hZGluZyB7XG4gIGNvbG9yOiAjMjE5NmYzO1xuICBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xufVxuLnN0YXR1cy1pY29uLnN0YXR1cy1zdWNjZXNzIHtcbiAgY29sb3I6ICM0Y2FmNTA7XG59XG4uc3RhdHVzLWljb24uc3RhdHVzLWVycm9yIHtcbiAgY29sb3I6ICNmNDQzMzY7XG59XG5cbi5maWxlLXN0YXR1cyB7XG4gIGZvbnQtc2l6ZTogMC42MjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG4uZmlsZS1zdGF0dXMuc3RhdHVzLXJlYWR5IHtcbiAgY29sb3I6ICM3NTc1NzU7XG59XG4uZmlsZS1zdGF0dXMuc3RhdHVzLXVwbG9hZGluZyB7XG4gIGNvbG9yOiAjMjE5NmYzO1xufVxuLmZpbGUtc3RhdHVzLnN0YXR1cy1zdWNjZXNzIHtcbiAgY29sb3I6ICM0Y2FmNTA7XG59XG4uZmlsZS1zdGF0dXMuc3RhdHVzLWVycm9yIHtcbiAgY29sb3I6ICNmNDQzMzY7XG59XG5cbi8qIOaXi+i9rOWKqOeUuyAqL1xuQGtleWZyYW1lcyBzcGluIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbn1cbi8qIOWIoOmZpOaMiemSriAqL1xuLnJlbW92ZS1idG4ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgcGFkZGluZzogMDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgY29sb3I6ICNiZGJkYmQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmbGV4LXNocmluazogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG59XG4ucmVtb3ZlLWJ0bjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNDQzMzY7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG59XG4ucmVtb3ZlLWJ0bjphY3RpdmUge1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xufVxuLnJlbW92ZS1idG4gLmljb24ge1xuICBmb250LXNpemU6IDAuNzVyZW07XG59XG5cbi8qIOWTjeW6lOW8j+iuvuiuoSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5maWxlLWxpc3QtY29udGFpbmVyIHtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMCA4cHg7XG4gIH1cbiAgLmZpbGUtaXRlbSB7XG4gICAgcGFkZGluZzogMTJweDtcbiAgfVxuICAuZmlsZS1tZXRhIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGdhcDogNHB4O1xuICB9XG4gIC5wcm9ncmVzcy1jb250YWluZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgZ2FwOiA4cHg7XG4gIH1cbiAgLnByb2dyZXNzLWNvbnRhaW5lciAucHJvZ3Jlc3MtdGV4dCB7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBtaW4td2lkdGg6IGF1dG87XG4gIH1cbn0iXX0= */";
styleInject_es.styleInject(css_248z$1);

const FileList = ({ fileList, onRemoved, onToggleStatus, }) => {
    const [hoveredItem, setHoveredItem] = React.useState(null);
    const getStatusIcon = (status, isHovered = false) => {
        // 如果悬浮在success状态上，显示error图标
        if (status === 'success' && isHovered) {
            return freeSolidSvgIcons.faXmark;
        }
        switch (status) {
            case 'uploading':
                return freeSolidSvgIcons.faSpinner;
            case 'success':
                return freeSolidSvgIcons.faCircleCheck;
            case 'error':
                return freeSolidSvgIcons.faCircleXmark;
            default:
                return freeSolidSvgIcons.faCircleCheck;
        }
    };
    const getStatusClass = (status) => {
        switch (status) {
            case 'uploading':
                return 'status-uploading';
            case 'success':
                return 'status-success';
            case 'error':
                return 'status-error';
            default:
                return 'status-uploading';
        }
    };
    return (jsxRuntime.jsx("div", { className: "file-list-container", children: jsxRuntime.jsx("div", { className: "file-list", children: fileList.map(item => (jsxRuntime.jsxs("div", { className: `file-item ${getStatusClass(item.status)}`, children: [jsxRuntime.jsxs("div", { className: "file-content", children: [jsxRuntime.jsxs("div", { className: "file-left", children: [jsxRuntime.jsx(Icon.Icon, { icon: freeSolidSvgIcons.faFile, className: "file-main-icon" }), jsxRuntime.jsx("div", { className: "file-info", children: jsxRuntime.jsx("span", { className: "file-name", title: item.name, children: item.name }) })] }), jsxRuntime.jsx("div", { className: "file-right", children: jsxRuntime.jsxs("div", { className: "status-section", children: [jsxRuntime.jsx("div", { className: "status-with-remove", children: jsxRuntime.jsx("button", { className: "status-icon-btn", disabled: item.status === 'uploading', onMouseEnter: () => setHoveredItem(item.uid), onMouseLeave: () => setHoveredItem(null), onClick: () => {
                                                    // 如果是success状态悬浮时显示error图标，此时点击就是删除
                                                    // 如果是error状态，直接点击删除
                                                    if (item.status === 'success' &&
                                                        hoveredItem === item.uid) {
                                                        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(item);
                                                    }
                                                    else if (item.status === 'error') {
                                                        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(item);
                                                    }
                                                }, children: jsxRuntime.jsx(Icon.Icon, { icon: getStatusIcon(item.status, hoveredItem === item.uid), className: `status-icon ${getStatusClass(item.status)}` }) }) }), jsxRuntime.jsxs("span", { className: "file-status", children: [item.status === 'uploading' && '上传中...', item.status === 'success' && '上传成功', item.status === 'error' && '上传失败'] })] }) })] }), item.status === 'uploading' && (jsxRuntime.jsx("div", { className: "progress-section", children: jsxRuntime.jsx(Progress.Progress, { percent: item.percent, showText: false }) }))] }, item.uid))) }) }));
};

var css_248z = "@charset \"UTF-8\";\n/* Dragger 组件样式 - 基于 CreamDesign 设计系统 */\n/**\n * CreamDesign 设计系统\n * 基于柔和奶油色调的现代化设计系统\n */\n.text-primary {\n  color: #a855f7;\n}\n\n.text-primary-dark {\n  color: #581c87;\n}\n\n.text-secondary {\n  color: #85c1e9;\n}\n\n.text-success {\n  color: #4caf50;\n}\n\n.text-warning {\n  color: #ffc107;\n}\n\n.text-error {\n  color: #f44336;\n}\n\n.text-info {\n  color: #2196f3;\n}\n\n.text-disabled {\n  color: #9e9e9e;\n}\n\n.text-neutral-50 {\n  color: #ffffff;\n}\n\n.text-neutral-100 {\n  color: #f9f9f9;\n}\n\n.text-neutral-200 {\n  color: #f0f0f0;\n}\n\n.text-neutral-300 {\n  color: #e0e0e0;\n}\n\n.text-neutral-400 {\n  color: #bdbdbd;\n}\n\n.text-neutral-500 {\n  color: #9e9e9e;\n}\n\n.text-neutral-600 {\n  color: #757575;\n}\n\n.text-neutral-700 {\n  color: #616161;\n}\n\n.text-neutral-800 {\n  color: #424242;\n}\n\n.text-neutral-900 {\n  color: #212121;\n}\n\n.text-heading {\n  color: #212121;\n}\n\n.text-body {\n  color: #616161;\n}\n\n.text-muted {\n  color: #757575;\n}\n\n.font-size-base {\n  font-size: 1rem;\n}\n\n.font-size-lg {\n  font-size: 1.25rem;\n}\n\n.font-size-sm {\n  font-size: 0.875rem;\n}\n\n.font-size-xs {\n  font-size: 0.765625rem;\n}\n\n.font-size-h1 {\n  font-size: 2.5rem;\n}\n\n.font-size-h2 {\n  font-size: 2rem;\n}\n\n.font-size-h3 {\n  font-size: 1.75rem;\n}\n\n.font-size-h4 {\n  font-size: 1.5rem;\n}\n\n.font-size-h5 {\n  font-size: 1.25rem;\n}\n\n.font-size-h6 {\n  font-size: 1rem;\n}\n\n.font-weight-light {\n  font-weight: 300;\n}\n\n.font-weight-normal {\n  font-weight: 400;\n}\n\n.font-weight-bold {\n  font-weight: 700;\n}\n\n.font-weight-lighter {\n  font-weight: lighter;\n}\n\n.font-weight-bolder {\n  font-weight: bolder;\n}\n\n.line-height-base {\n  line-height: 1.5;\n}\n\n.line-height-lg {\n  line-height: 2;\n}\n\n.line-height-sm {\n  line-height: 1.25;\n}\n\n.line-height-none {\n  line-height: 1;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.font-family-sans-serif {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n}\n\n.font-family-monospace {\n  font-family: monospace;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212121;\n  background-color: #ffffff;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  line-height: 1.25;\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n}\n\nh1 {\n  font-size: 2.5rem;\n}\n\nh2 {\n  font-size: 2rem;\n}\n\nh3 {\n  font-size: 1.75rem;\n}\n\nh4 {\n  font-size: 1.5rem;\n}\n\nh5 {\n  font-size: 1.25rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  line-height: 1.5;\n}\n\na {\n  color: #a855f7;\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\na:hover {\n  color: rgb(142.8, 72.25, 209.95);\n  text-decoration: underline;\n}\na:focus {\n  outline: 2px solid #a855f7;\n  outline-offset: 2px;\n}\n\n.bg-primary {\n  background-color: #a855f7;\n}\n\n.bg-primary-100 {\n  background-color: #f5f3ff;\n}\n\n.bg-primary-200 {\n  background-color: #ede9fe;\n}\n\n.bg-primary-300 {\n  background-color: #ddd6fe;\n}\n\n.bg-primary-400 {\n  background-color: #c4b5fd;\n}\n\n.bg-primary-600 {\n  background-color: #9333ea;\n}\n\n.bg-primary-700 {\n  background-color: #7e22ce;\n}\n\n.bg-primary-800 {\n  background-color: #6b21a8;\n}\n\n.bg-primary-900 {\n  background-color: #581c87;\n}\n\n.bg-secondary-blue-100 {\n  background-color: #f0f7ff;\n}\n\n.bg-secondary-blue-300 {\n  background-color: #d6eaf8;\n}\n\n.bg-secondary-blue-500 {\n  background-color: #aed6f1;\n}\n\n.bg-secondary-pink-100 {\n  background-color: #fdf2f8;\n}\n\n.bg-secondary-pink-300 {\n  background-color: #fadbd8;\n}\n\n.bg-secondary-pink-500 {\n  background-color: #f5cba7;\n}\n\n.bg-secondary-green-100 {\n  background-color: #f4f6f0;\n}\n\n.bg-secondary-green-300 {\n  background-color: #e8f5e9;\n}\n\n.bg-secondary-green-500 {\n  background-color: #a5d6a7;\n}\n\n.bg-success {\n  background-color: #4caf50;\n}\n\n.bg-warning {\n  background-color: #ffc107;\n}\n\n.bg-error {\n  background-color: #f44336;\n}\n\n.bg-info {\n  background-color: #2196f3;\n}\n\n.bg-neutral-50 {\n  background-color: #ffffff;\n}\n\n.bg-neutral-100 {\n  background-color: #f9f9f9;\n}\n\n.bg-neutral-200 {\n  background-color: #f0f0f0;\n}\n\n.bg-neutral-300 {\n  background-color: #e0e0e0;\n}\n\n.bg-neutral-400 {\n  background-color: #bdbdbd;\n}\n\n.bg-neutral-500 {\n  background-color: #9e9e9e;\n}\n\n.bg-neutral-600 {\n  background-color: #757575;\n}\n\n.bg-neutral-700 {\n  background-color: #616161;\n}\n\n.bg-neutral-800 {\n  background-color: #424242;\n}\n\n.bg-neutral-900 {\n  background-color: #212121;\n}\n\n.bg-primary-light {\n  background-color: rgba(168, 85, 247, 0.7);\n}\n\n.bg-primary-medium {\n  background-color: rgba(168, 85, 247, 0.5);\n}\n\n.bg-primary-dark {\n  background-color: rgba(168, 85, 247, 0.3);\n}\n\n.border {\n  border: 1px solid #e0e0e0;\n}\n\n.border-primary {\n  border-color: #a855f7;\n}\n\n.border-secondary {\n  border-color: #aed6f1;\n}\n\n.border-success {\n  border-color: #4caf50;\n}\n\n.border-warning {\n  border-color: #ffc107;\n}\n\n.border-error {\n  border-color: #f44336;\n}\n\n.border-neutral {\n  border-color: #e0e0e0;\n}\n\n.border-divider {\n  border-color: #f0f0f0;\n}\n\n.rounded {\n  border-radius: 0.375rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.flex {\n  display: flex;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.min-h-screen {\n  min-height: 100vh;\n}\n\n.card {\n  background-color: #ede9fe;\n  border-radius: 0.5rem;\n  box-shadow: 0 2px 8px rgba(33, 33, 33, 0.1);\n  padding: 1.5rem;\n  margin-bottom: 1rem;\n}\n.card.card-hover {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card.card-hover:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(33, 33, 33, 0.15);\n}\n\n.tag {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 9999px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n\n.tag-primary {\n  background-color: #ddd6fe;\n  color: #212121;\n}\n\n.tag-blue {\n  background-color: #d6eaf8;\n  color: #212121;\n}\n\n.tag-pink {\n  background-color: #fadbd8;\n  color: #212121;\n}\n\n.tag-green {\n  background-color: #e8f5e9;\n  color: #212121;\n}\n\n.form-input {\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #e0e0e0;\n  border-radius: 0.375rem;\n  background-color: #ffffff;\n  color: #212121;\n}\n.form-input:focus {\n  outline: none;\n  border-color: #a855f7;\n  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);\n}\n.form-input:disabled {\n  background-color: #f9f9f9;\n  color: #9e9e9e;\n  cursor: not-allowed;\n}\n\n/*\n:export {\n  primaryColor: $color-primary-500;\n  secondaryColor: $color-secondary-blue-700;\n  neutralColor: $color-neutral-500;\n  successColor: $color-success;\n  warningColor: $color-warning;\n  errorColor: $color-error;\n  backgroundColor: $color-background;\n  textColor: $color-text-primary;\n}*/\n/* 拖拽上传区域 */\n.upload-dragger {\n  border: 2px dashed #e0e0e0;\n  border-radius: 0.5rem;\n  background-color: #ffffff;\n  padding: 24px;\n  text-align: center;\n  transition: all 0.3s ease;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  /* 悬停状态 */\n}\n.upload-dragger:hover {\n  border-color: #c4b5fd;\n  background-color: rgb(253.5, 253.2, 255);\n  box-shadow: 0 2px 8px rgba(237, 233, 254, 0.2);\n}\n.upload-dragger {\n  /* 拖拽悬停状态 */\n}\n.upload-dragger.is-dragover {\n  border-color: #a855f7;\n  background-color: white;\n  box-shadow: 0 4px 12px rgba(221, 214, 254, 0.3);\n  transform: scale(1.02);\n  /* 添加闪烁动画效果 */\n}\n.upload-dragger.is-dragover::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(196, 181, 253, 0.1), transparent);\n  animation: drag-shimmer 1.5s infinite;\n}\n.upload-dragger {\n  /* 激活状态 */\n}\n.upload-dragger:active {\n  transform: scale(0.98);\n}\n.upload-dragger {\n  /* 内容样式 */\n}\n.upload-dragger .dragger-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  pointer-events: none;\n  /* 防止内容干扰拖拽 */\n}\n.upload-dragger .dragger-icon {\n  font-size: 3rem;\n  color: #bdbdbd;\n  transition: all 0.3s ease;\n}\n.upload-dragger .dragger-text {\n  font-size: 1rem;\n  color: #757575;\n  font-weight: 500;\n  line-height: 1.5;\n}\n.upload-dragger .dragger-hint {\n  font-size: 0.875rem;\n  color: #9e9e9e;\n  margin-top: 4px;\n}\n.upload-dragger {\n  /* 拖拽悬停时的图标变化 */\n}\n.upload-dragger.is-dragover .dragger-icon {\n  color: #a855f7;\n  transform: scale(1.1);\n}\n.upload-dragger.is-dragover .dragger-text {\n  color: #9333ea;\n  font-weight: 600;\n}\n.upload-dragger.is-dragover .dragger-hint {\n  color: #a855f7;\n}\n.upload-dragger {\n  /* 拖拽动画效果 */\n}\n@keyframes drag-shimmer {\n  0% {\n    left: -100%;\n  }\n  100% {\n    left: 100%;\n  }\n}\n.upload-dragger {\n  /* 脉冲动画 */\n}\n.upload-dragger.is-dragover {\n  animation: drag-pulse 2s infinite;\n}\n@keyframes drag-pulse {\n  0%, 100% {\n    box-shadow: 0 4px 12px rgba(221, 214, 254, 0.3);\n  }\n  50% {\n    box-shadow: 0 6px 16px rgba(196, 181, 253, 0.4);\n  }\n}\n.upload-dragger {\n  /* 响应式设计 */\n}\n@media (max-width: 768px) {\n  .upload-dragger {\n    padding: 16px;\n  }\n  .upload-dragger .dragger-icon {\n    font-size: 2.5rem;\n  }\n  .upload-dragger .dragger-text {\n    font-size: 0.875rem;\n  }\n  .upload-dragger .dragger-hint {\n    font-size: 0.75rem;\n  }\n}\n.upload-dragger {\n  /* 无障碍设计 */\n}\n.upload-dragger:focus {\n  outline: 2px solid #a855f7;\n  outline-offset: 2px;\n}\n.upload-dragger {\n  /* 高对比度模式支持 */\n}\n@media (prefers-contrast: high) {\n  .upload-dragger {\n    border-width: 3px;\n  }\n  .upload-dragger.is-dragover {\n    border-width: 4px;\n    background-color: #f5f3ff;\n  }\n}\n.upload-dragger {\n  /* 减少动画模式支持 */\n}\n@media (prefers-reduced-motion: reduce) {\n  .upload-dragger {\n    transition: none;\n  }\n  .upload-dragger.is-dragover {\n    animation: none;\n  }\n  .upload-dragger.is-dragover::before {\n    display: none;\n  }\n}\n\n/* 上传进度指示器（在拖拽区域内） */\n.upload-dragger-progress {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background-color: #f0f0f0;\n  border-radius: 0 0 0.5rem 0.5rem;\n  overflow: hidden;\n}\n.upload-dragger-progress .progress-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #a855f7, #9333ea);\n  border-radius: 0 0 0.5rem 0.5rem;\n  transition: width 0.3s ease;\n}\n\n/* 拖拽区域内的文件预览 */\n.dragger-file-preview {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 16px;\n  justify-content: center;\n}\n.dragger-file-preview .preview-item {\n  width: 60px;\n  height: 60px;\n  border-radius: 0.375rem;\n  background-color: #f9f9f9;\n  border: 1px solid #e0e0e0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  color: #9e9e9e;\n  position: relative;\n  overflow: hidden;\n}\n.dragger-file-preview .preview-item.image-preview {\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.dragger-file-preview .preview-item.uploading {\n  border-color: #2196f3;\n}\n.dragger-file-preview .preview-item.uploading::after {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 2px;\n  background-color: #2196f3;\n  animation: preview-progress 2s infinite;\n}\n.dragger-file-preview .preview-item.success {\n  border-color: #4caf50;\n  color: #4caf50;\n}\n.dragger-file-preview .preview-item.error {\n  border-color: #f44336;\n  color: #f44336;\n}\n@keyframes preview-progress {\n  0% {\n    width: 0%;\n  }\n  50% {\n    width: 50%;\n  }\n  100% {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRyYWdnZXIuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFDaEIsdUNBQXVDO0FBQ3ZDOzs7RUFHRTtBQUNGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx1R0FBdUc7QUFDekc7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSx1R0FBdUc7RUFDdkcsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixtQ0FBbUM7RUFDbkMsa0NBQWtDO0FBQ3BDOztBQUVBOzs7Ozs7RUFNRSxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtFQUNyQiwyQkFBMkI7QUFDN0I7QUFDQTtFQUNFLGdDQUFnQztFQUNoQywwQkFBMEI7QUFDNUI7QUFDQTtFQUNFLDBCQUEwQjtFQUMxQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxx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QXFCO0VBQ3JCLGNBQWM7QUFDaEI7QUFDQTtFQUNFO0lBQ0UsU0FBUztFQUNYO0VBQ0E7SUFDRSxVQUFVO0VBQ1o7RUFDQTtJQUNFLFdBQVc7RUFDYjtBQUNGIiwiZmlsZSI6IkRyYWdnZXIuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbi8qIERyYWdnZXIg57uE5Lu25qC35byPIC0g5Z+65LqOIENyZWFtRGVzaWduIOiuvuiuoeezu+e7nyAqL1xuLyoqXG4gKiBDcmVhbURlc2lnbiDorr7orqHns7vnu59cbiAqIOWfuuS6juaflOWSjOWltuayueiJsuiwg+eahOeOsOS7o+WMluiuvuiuoeezu+e7n1xuICovXG4udGV4dC1wcmltYXJ5IHtcbiAgY29sb3I6ICNhODU1Zjc7XG59XG5cbi50ZXh0LXByaW1hcnktZGFyayB7XG4gIGNvbG9yOiAjNTgxYzg3O1xufVxuXG4udGV4dC1zZWNvbmRhcnkge1xuICBjb2xvcjogIzg1YzFlOTtcbn1cblxuLnRleHQtc3VjY2VzcyB7XG4gIGNvbG9yOiAjNGNhZjUwO1xufVxuXG4udGV4dC13YXJuaW5nIHtcbiAgY29sb3I6ICNmZmMxMDc7XG59XG5cbi50ZXh0LWVycm9yIHtcbiAgY29sb3I6ICNmNDQzMzY7XG59XG5cbi50ZXh0LWluZm8ge1xuICBjb2xvcjogIzIxOTZmMztcbn1cblxuLnRleHQtZGlzYWJsZWQge1xuICBjb2xvcjogIzllOWU5ZTtcbn1cblxuLnRleHQtbmV1dHJhbC01MCB7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG4udGV4dC1uZXV0cmFsLTEwMCB7XG4gIGNvbG9yOiAjZjlmOWY5O1xufVxuXG4udGV4dC1uZXV0cmFsLTIwMCB7XG4gIGNvbG9yOiAjZjBmMGYwO1xufVxuXG4udGV4dC1uZXV0cmFsLTMwMCB7XG4gIGNvbG9yOiAjZTBlMGUwO1xufVxuXG4udGV4dC1uZXV0cmFsLTQwMCB7XG4gIGNvbG9yOiAjYmRiZGJkO1xufVxuXG4udGV4dC1uZXV0cmFsLTUwMCB7XG4gIGNvbG9yOiAjOWU5ZTllO1xufVxuXG4udGV4dC1uZXV0cmFsLTYwMCB7XG4gIGNvbG9yOiAjNzU3NTc1O1xufVxuXG4udGV4dC1uZXV0cmFsLTcwMCB7XG4gIGNvbG9yOiAjNjE2MTYxO1xufVxuXG4udGV4dC1uZXV0cmFsLTgwMCB7XG4gIGNvbG9yOiAjNDI0MjQyO1xufVxuXG4udGV4dC1uZXV0cmFsLTkwMCB7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4udGV4dC1oZWFkaW5nIHtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi50ZXh0LWJvZHkge1xuICBjb2xvcjogIzYxNjE2MTtcbn1cblxuLnRleHQtbXV0ZWQge1xuICBjb2xvcjogIzc1NzU3NTtcbn1cblxuLmZvbnQtc2l6ZS1iYXNlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uZm9udC1zaXplLWxnIHtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xufVxuXG4uZm9udC1zaXplLXNtIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cblxuLmZvbnQtc2l6ZS14cyB7XG4gIGZvbnQtc2l6ZTogMC43NjU2MjVyZW07XG59XG5cbi5mb250LXNpemUtaDEge1xuICBmb250LXNpemU6IDIuNXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oMiB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oMyB7XG4gIGZvbnQtc2l6ZTogMS43NXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oNCB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG4uZm9udC1zaXplLWg1IHtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xufVxuXG4uZm9udC1zaXplLWg2IHtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uZm9udC13ZWlnaHQtbGlnaHQge1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4uZm9udC13ZWlnaHQtbm9ybWFsIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cblxuLmZvbnQtd2VpZ2h0LWJvbGQge1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uZm9udC13ZWlnaHQtbGlnaHRlciB7XG4gIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xufVxuXG4uZm9udC13ZWlnaHQtYm9sZGVyIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLmxpbmUtaGVpZ2h0LWJhc2Uge1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuXG4ubGluZS1oZWlnaHQtbGcge1xuICBsaW5lLWhlaWdodDogMjtcbn1cblxuLmxpbmUtaGVpZ2h0LXNtIHtcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XG59XG5cbi5saW5lLWhlaWdodC1ub25lIHtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG5cbi50ZXh0LWxlZnQge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4udGV4dC1jZW50ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi50ZXh0LXJpZ2h0IHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cbi50ZXh0LWp1c3RpZnkge1xuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuXG4uZm9udC1mYW1pbHktc2Fucy1zZXJpZiB7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xufVxuXG4uZm9udC1mYW1pbHktbW9ub3NwYWNlIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbn1cblxuYm9keSB7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGNvbG9yOiAjMjEyMTIxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuaDEge1xuICBmb250LXNpemU6IDIuNXJlbTtcbn1cblxuaDIge1xuICBmb250LXNpemU6IDJyZW07XG59XG5cbmgzIHtcbiAgZm9udC1zaXplOiAxLjc1cmVtO1xufVxuXG5oNCB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG5oNSB7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbn1cblxuaDYge1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbnAge1xuICBtYXJnaW4tdG9wOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuXG5hIHtcbiAgY29sb3I6ICNhODU1Zjc7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlO1xufVxuYTpob3ZlciB7XG4gIGNvbG9yOiByZ2IoMTQyLjgsIDcyLjI1LCAyMDkuOTUpO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbmE6Zm9jdXMge1xuICBvdXRsaW5lOiAycHggc29saWQgI2E4NTVmNztcbiAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbn1cblxuLmJnLXByaW1hcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTg1NWY3O1xufVxuXG4uYmctcHJpbWFyeS0xMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmM2ZmO1xufVxuXG4uYmctcHJpbWFyeS0yMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWRlOWZlO1xufVxuXG4uYmctcHJpbWFyeS0zMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkNmZlO1xufVxuXG4uYmctcHJpbWFyeS00MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzRiNWZkO1xufVxuXG4uYmctcHJpbWFyeS02MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTMzM2VhO1xufVxuXG4uYmctcHJpbWFyeS03MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2UyMmNlO1xufVxuXG4uYmctcHJpbWFyeS04MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmIyMWE4O1xufVxuXG4uYmctcHJpbWFyeS05MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTgxYzg3O1xufVxuXG4uYmctc2Vjb25kYXJ5LWJsdWUtMTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjdmZjtcbn1cblxuLmJnLXNlY29uZGFyeS1ibHVlLTMwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkNmVhZjg7XG59XG5cbi5iZy1zZWNvbmRhcnktYmx1ZS01MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWVkNmYxO1xufVxuXG4uYmctc2Vjb25kYXJ5LXBpbmstMTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZjJmODtcbn1cblxuLmJnLXNlY29uZGFyeS1waW5rLTMwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWRiZDg7XG59XG5cbi5iZy1zZWNvbmRhcnktcGluay01MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVjYmE3O1xufVxuXG4uYmctc2Vjb25kYXJ5LWdyZWVuLTEwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNGY2ZjA7XG59XG5cbi5iZy1zZWNvbmRhcnktZ3JlZW4tMzAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcbn1cblxuLmJnLXNlY29uZGFyeS1ncmVlbi01MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTVkNmE3O1xufVxuXG4uYmctc3VjY2VzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FmNTA7XG59XG5cbi5iZy13YXJuaW5nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzEwNztcbn1cblxuLmJnLWVycm9yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcbn1cblxuLmJnLWluZm8ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xufVxuXG4uYmctbmV1dHJhbC01MCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbi5iZy1uZXV0cmFsLTEwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG59XG5cbi5iZy1uZXV0cmFsLTIwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG59XG5cbi5iZy1uZXV0cmFsLTMwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGUwZTA7XG59XG5cbi5iZy1uZXV0cmFsLTQwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNiZGJkYmQ7XG59XG5cbi5iZy1uZXV0cmFsLTUwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5ZTllOWU7XG59XG5cbi5iZy1uZXV0cmFsLTYwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM3NTc1NzU7XG59XG5cbi5iZy1uZXV0cmFsLTcwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2MTYxNjE7XG59XG5cbi5iZy1uZXV0cmFsLTgwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MjQyNDI7XG59XG5cbi5iZy1uZXV0cmFsLTkwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTIxMjE7XG59XG5cbi5iZy1wcmltYXJ5LWxpZ2h0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjgsIDg1LCAyNDcsIDAuNyk7XG59XG5cbi5iZy1wcmltYXJ5LW1lZGl1bSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY4LCA4NSwgMjQ3LCAwLjUpO1xufVxuXG4uYmctcHJpbWFyeS1kYXJrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjgsIDg1LCAyNDcsIDAuMyk7XG59XG5cbi5ib3JkZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xufVxuXG4uYm9yZGVyLXByaW1hcnkge1xuICBib3JkZXItY29sb3I6ICNhODU1Zjc7XG59XG5cbi5ib3JkZXItc2Vjb25kYXJ5IHtcbiAgYm9yZGVyLWNvbG9yOiAjYWVkNmYxO1xufVxuXG4uYm9yZGVyLXN1Y2Nlc3Mge1xuICBib3JkZXItY29sb3I6ICM0Y2FmNTA7XG59XG5cbi5ib3JkZXItd2FybmluZyB7XG4gIGJvcmRlci1jb2xvcjogI2ZmYzEwNztcbn1cblxuLmJvcmRlci1lcnJvciB7XG4gIGJvcmRlci1jb2xvcjogI2Y0NDMzNjtcbn1cblxuLmJvcmRlci1uZXV0cmFsIHtcbiAgYm9yZGVyLWNvbG9yOiAjZTBlMGUwO1xufVxuXG4uYm9yZGVyLWRpdmlkZXIge1xuICBib3JkZXItY29sb3I6ICNmMGYwZjA7XG59XG5cbi5yb3VuZGVkIHtcbiAgYm9yZGVyLXJhZGl1czogMC4zNzVyZW07XG59XG5cbi5yb3VuZGVkLWxnIHtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xufVxuXG4ucm91bmRlZC1mdWxsIHtcbiAgYm9yZGVyLXJhZGl1czogOTk5OXB4O1xufVxuXG4uZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5mbGV4LXdyYXAge1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5pdGVtcy1jZW50ZXIge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uanVzdGlmeS1jZW50ZXIge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmdhcC0zIHtcbiAgZ2FwOiAwLjc1cmVtO1xufVxuXG4ubWItMiB7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLm1iLTYge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5wLTQge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ubWluLWgtc2NyZWVuIHtcbiAgbWluLWhlaWdodDogMTAwdmg7XG59XG5cbi5jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VkZTlmZTtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgzMywgMzMsIDMzLCAwLjEpO1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG4uY2FyZC5jYXJkLWhvdmVyIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XG59XG4uY2FyZC5jYXJkLWhvdmVyOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMzMsIDMzLCAzMywgMC4xNSk7XG59XG5cbi50YWcge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtO1xuICBib3JkZXItcmFkaXVzOiA5OTk5cHg7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi50YWctcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGQ2ZmU7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4udGFnLWJsdWUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDZlYWY4O1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLnRhZy1waW5rIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZGJkODtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi50YWctZ3JlZW4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmNWU5O1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLmZvcm0taW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMC41cmVtIDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMGUwZTA7XG4gIGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogIzIxMjEyMTtcbn1cbi5mb3JtLWlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjYTg1NWY3O1xuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgxNjgsIDg1LCAyNDcsIDAuMik7XG59XG4uZm9ybS1pbnB1dDpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG4gIGNvbG9yOiAjOWU5ZTllO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4vKlxuOmV4cG9ydCB7XG4gIHByaW1hcnlDb2xvcjogJGNvbG9yLXByaW1hcnktNTAwO1xuICBzZWNvbmRhcnlDb2xvcjogJGNvbG9yLXNlY29uZGFyeS1ibHVlLTcwMDtcbiAgbmV1dHJhbENvbG9yOiAkY29sb3ItbmV1dHJhbC01MDA7XG4gIHN1Y2Nlc3NDb2xvcjogJGNvbG9yLXN1Y2Nlc3M7XG4gIHdhcm5pbmdDb2xvcjogJGNvbG9yLXdhcm5pbmc7XG4gIGVycm9yQ29sb3I6ICRjb2xvci1lcnJvcjtcbiAgYmFja2dyb3VuZENvbG9yOiAkY29sb3ItYmFja2dyb3VuZDtcbiAgdGV4dENvbG9yOiAkY29sb3ItdGV4dC1wcmltYXJ5O1xufSovXG4vKiDmi5bmi73kuIrkvKDljLrln58gKi9cbi51cGxvYWQtZHJhZ2dlciB7XG4gIGJvcmRlcjogMnB4IGRhc2hlZCAjZTBlMGUwO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIC8qIOaCrOWBnOeKtuaAgSAqL1xufVxuLnVwbG9hZC1kcmFnZ2VyOmhvdmVyIHtcbiAgYm9yZGVyLWNvbG9yOiAjYzRiNWZkO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUzLjUsIDI1My4yLCAyNTUpO1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgyMzcsIDIzMywgMjU0LCAwLjIpO1xufVxuLnVwbG9hZC1kcmFnZ2VyIHtcbiAgLyog5ouW5ou95oKs5YGc54q25oCBICovXG59XG4udXBsb2FkLWRyYWdnZXIuaXMtZHJhZ292ZXIge1xuICBib3JkZXItY29sb3I6ICNhODU1Zjc7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMjIxLCAyMTQsIDI1NCwgMC4zKTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAyKTtcbiAgLyog5re75Yqg6Zeq54OB5Yqo55S75pWI5p6cICovXG59XG4udXBsb2FkLWRyYWdnZXIuaXMtZHJhZ292ZXI6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAtMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB0cmFuc3BhcmVudCwgcmdiYSgxOTYsIDE4MSwgMjUzLCAwLjEpLCB0cmFuc3BhcmVudCk7XG4gIGFuaW1hdGlvbjogZHJhZy1zaGltbWVyIDEuNXMgaW5maW5pdGU7XG59XG4udXBsb2FkLWRyYWdnZXIge1xuICAvKiDmv4DmtLvnirbmgIEgKi9cbn1cbi51cGxvYWQtZHJhZ2dlcjphY3RpdmUge1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xufVxuLnVwbG9hZC1kcmFnZ2VyIHtcbiAgLyog5YaF5a655qC35byPICovXG59XG4udXBsb2FkLWRyYWdnZXIgLmRyYWdnZXItY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIC8qIOmYsuatouWGheWuueW5suaJsOaLluaLvSAqL1xufVxuLnVwbG9hZC1kcmFnZ2VyIC5kcmFnZ2VyLWljb24ge1xuICBmb250LXNpemU6IDNyZW07XG4gIGNvbG9yOiAjYmRiZGJkO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xufVxuLnVwbG9hZC1kcmFnZ2VyIC5kcmFnZ2VyLXRleHQge1xuICBmb250LXNpemU6IDFyZW07XG4gIGNvbG9yOiAjNzU3NTc1O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuLnVwbG9hZC1kcmFnZ2VyIC5kcmFnZ2VyLWhpbnQge1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBjb2xvcjogIzllOWU5ZTtcbiAgbWFyZ2luLXRvcDogNHB4O1xufVxuLnVwbG9hZC1kcmFnZ2VyIHtcbiAgLyog5ouW5ou95oKs5YGc5pe255qE5Zu+5qCH5Y+Y5YyWICovXG59XG4udXBsb2FkLWRyYWdnZXIuaXMtZHJhZ292ZXIgLmRyYWdnZXItaWNvbiB7XG4gIGNvbG9yOiAjYTg1NWY3O1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG59XG4udXBsb2FkLWRyYWdnZXIuaXMtZHJhZ292ZXIgLmRyYWdnZXItdGV4dCB7XG4gIGNvbG9yOiAjOTMzM2VhO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLnVwbG9hZC1kcmFnZ2VyLmlzLWRyYWdvdmVyIC5kcmFnZ2VyLWhpbnQge1xuICBjb2xvcjogI2E4NTVmNztcbn1cbi51cGxvYWQtZHJhZ2dlciB7XG4gIC8qIOaLluaLveWKqOeUu+aViOaenCAqL1xufVxuQGtleWZyYW1lcyBkcmFnLXNoaW1tZXIge1xuICAwJSB7XG4gICAgbGVmdDogLTEwMCU7XG4gIH1cbiAgMTAwJSB7XG4gICAgbGVmdDogMTAwJTtcbiAgfVxufVxuLnVwbG9hZC1kcmFnZ2VyIHtcbiAgLyog6ISJ5Yay5Yqo55S7ICovXG59XG4udXBsb2FkLWRyYWdnZXIuaXMtZHJhZ292ZXIge1xuICBhbmltYXRpb246IGRyYWctcHVsc2UgMnMgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIGRyYWctcHVsc2Uge1xuICAwJSwgMTAwJSB7XG4gICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDIyMSwgMjE0LCAyNTQsIDAuMyk7XG4gIH1cbiAgNTAlIHtcbiAgICBib3gtc2hhZG93OiAwIDZweCAxNnB4IHJnYmEoMTk2LCAxODEsIDI1MywgMC40KTtcbiAgfVxufVxuLnVwbG9hZC1kcmFnZ2VyIHtcbiAgLyog5ZON5bqU5byP6K6+6K6hICovXG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnVwbG9hZC1kcmFnZ2VyIHtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICB9XG4gIC51cGxvYWQtZHJhZ2dlciAuZHJhZ2dlci1pY29uIHtcbiAgICBmb250LXNpemU6IDIuNXJlbTtcbiAgfVxuICAudXBsb2FkLWRyYWdnZXIgLmRyYWdnZXItdGV4dCB7XG4gICAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgfVxuICAudXBsb2FkLWRyYWdnZXIgLmRyYWdnZXItaGludCB7XG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICB9XG59XG4udXBsb2FkLWRyYWdnZXIge1xuICAvKiDml6Dpmpznoo3orr7orqEgKi9cbn1cbi51cGxvYWQtZHJhZ2dlcjpmb2N1cyB7XG4gIG91dGxpbmU6IDJweCBzb2xpZCAjYTg1NWY3O1xuICBvdXRsaW5lLW9mZnNldDogMnB4O1xufVxuLnVwbG9hZC1kcmFnZ2VyIHtcbiAgLyog6auY5a+55q+U5bqm5qih5byP5pSv5oyBICovXG59XG5AbWVkaWEgKHByZWZlcnMtY29udHJhc3Q6IGhpZ2gpIHtcbiAgLnVwbG9hZC1kcmFnZ2VyIHtcbiAgICBib3JkZXItd2lkdGg6IDNweDtcbiAgfVxuICAudXBsb2FkLWRyYWdnZXIuaXMtZHJhZ292ZXIge1xuICAgIGJvcmRlci13aWR0aDogNHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWYzZmY7XG4gIH1cbn1cbi51cGxvYWQtZHJhZ2dlciB7XG4gIC8qIOWHj+WwkeWKqOeUu+aooeW8j+aUr+aMgSAqL1xufVxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgLnVwbG9hZC1kcmFnZ2VyIHtcbiAgICB0cmFuc2l0aW9uOiBub25lO1xuICB9XG4gIC51cGxvYWQtZHJhZ2dlci5pcy1kcmFnb3ZlciB7XG4gICAgYW5pbWF0aW9uOiBub25lO1xuICB9XG4gIC51cGxvYWQtZHJhZ2dlci5pcy1kcmFnb3Zlcjo6YmVmb3JlIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG5cbi8qIOS4iuS8oOi/m+W6puaMh+ekuuWZqO+8iOWcqOaLluaLveWMuuWfn+WGhe+8iSAqL1xuLnVwbG9hZC1kcmFnZ2VyLXByb2dyZXNzIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDAuNXJlbSAwLjVyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4udXBsb2FkLWRyYWdnZXItcHJvZ3Jlc3MgLnByb2dyZXNzLWZpbGwge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2E4NTVmNywgIzkzMzNlYSk7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCAwLjVyZW0gMC41cmVtO1xuICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzIGVhc2U7XG59XG5cbi8qIOaLluaLveWMuuWfn+WGheeahOaWh+S7tumihOiniCAqL1xuLmRyYWdnZXItZmlsZS1wcmV2aWV3IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogMTZweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4uZHJhZ2dlci1maWxlLXByZXZpZXcgLnByZXZpZXctaXRlbSB7XG4gIHdpZHRoOiA2MHB4O1xuICBoZWlnaHQ6IDYwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGNvbG9yOiAjOWU5ZTllO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uZHJhZ2dlci1maWxlLXByZXZpZXcgLnByZXZpZXctaXRlbS5pbWFnZS1wcmV2aWV3IHtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuLmRyYWdnZXItZmlsZS1wcmV2aWV3IC5wcmV2aWV3LWl0ZW0udXBsb2FkaW5nIHtcbiAgYm9yZGVyLWNvbG9yOiAjMjE5NmYzO1xufVxuLmRyYWdnZXItZmlsZS1wcmV2aWV3IC5wcmV2aWV3LWl0ZW0udXBsb2FkaW5nOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcbiAgYW5pbWF0aW9uOiBwcmV2aWV3LXByb2dyZXNzIDJzIGluZmluaXRlO1xufVxuLmRyYWdnZXItZmlsZS1wcmV2aWV3IC5wcmV2aWV3LWl0ZW0uc3VjY2VzcyB7XG4gIGJvcmRlci1jb2xvcjogIzRjYWY1MDtcbiAgY29sb3I6ICM0Y2FmNTA7XG59XG4uZHJhZ2dlci1maWxlLXByZXZpZXcgLnByZXZpZXctaXRlbS5lcnJvciB7XG4gIGJvcmRlci1jb2xvcjogI2Y0NDMzNjtcbiAgY29sb3I6ICNmNDQzMzY7XG59XG5Aa2V5ZnJhbWVzIHByZXZpZXctcHJvZ3Jlc3Mge1xuICAwJSB7XG4gICAgd2lkdGg6IDAlO1xuICB9XG4gIDUwJSB7XG4gICAgd2lkdGg6IDUwJTtcbiAgfVxuICAxMDAlIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufSJdfQ== */";
styleInject_es.styleInject(css_248z);

const Dragger = props => {
    const { onFile, children } = props;
    const [isDragover, setIsDragover] = React.useState(false);
    const klass = classNames('upload-dragger', {
        'is-dragover': isDragover,
    });
    const handelDrag = (e, isOver) => {
        e.preventDefault();
        setIsDragover(isOver);
    };
    // 默认内容
    const defaultContent = (jsxRuntime.jsxs("div", { className: "dragger-content", children: [jsxRuntime.jsx("div", { className: "dragger-icon", children: "\uD83D\uDCC1" }), jsxRuntime.jsx("div", { className: "dragger-text", children: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u533A\u57DF" }), jsxRuntime.jsx("div", { className: "dragger-hint", children: "\u652F\u6301\u591A\u6587\u4EF6\u4E0A\u4F20" })] }));
    return (jsxRuntime.jsx("div", { className: klass, onDragOver: e => handelDrag(e, true), onDragLeave: e => {
            e.preventDefault();
            handelDrag(e, false);
        }, onDrop: e => {
            e.preventDefault();
            handelDrag(e, false);
            onFile(e.dataTransfer.files);
        }, children: children || defaultContent }));
};

/**
 * Web Worker 内联代码 - 在子线程中计算文件 MD5 Hash
 * 包含完整的 MD5 算法实现（基于 RFC 1321），无需外部依赖
 * 使用 Blob URL 方式创建 Worker，避免额外的打包配置
 */
const HASH_WORKER_CODE = `
'use strict';

// ========== MD5 Algorithm (RFC 1321) ==========

// T[i] = floor(abs(sin(i + 1)) * 2^32)
var T = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
  0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
  0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
  0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
  0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
  0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
  0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
  0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
  0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
  0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
  0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
  0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
  0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
  0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
];

// 每轮移位量
var S = [
  7,12,17,22, 7,12,17,22, 7,12,17,22, 7,12,17,22,
  5, 9,14,20, 5, 9,14,20, 5, 9,14,20, 5, 9,14,20,
  4,11,16,23, 4,11,16,23, 4,11,16,23, 4,11,16,23,
  6,10,15,21, 6,10,15,21, 6,10,15,21, 6,10,15,21
];

// MD5 内部状态
var _state, _buffer, _bufLen, _totalLen;

function md5Init() {
  _state = new Int32Array([0x67452301, -271733879, -1732584194, 271733878]);
  _buffer = new Uint8Array(64);
  _bufLen = 0;
  _totalLen = 0;
}

// 处理一个 64 字节块
function md5Transform(block) {
  var x = new Int32Array(16);
  for (var i = 0; i < 16; i++) {
    var o = i * 4;
    x[i] = block[o] | (block[o+1] << 8) | (block[o+2] << 16) | (block[o+3] << 24);
  }

  var a = _state[0], b = _state[1], c = _state[2], d = _state[3];

  for (var i = 0; i < 64; i++) {
    var f, g;
    if (i < 16) {
      f = (b & c) | ((~b) & d);
      g = i;
    } else if (i < 32) {
      f = (d & b) | ((~d) & c);
      g = (5 * i + 1) % 16;
    } else if (i < 48) {
      f = b ^ c ^ d;
      g = (3 * i + 5) % 16;
    } else {
      f = c ^ (b | (~d));
      g = (7 * i) % 16;
    }

    var temp = d;
    d = c;
    c = b;
    var sum = (a + f + T[i] + x[g]) | 0;
    b = (b + ((sum << S[i]) | (sum >>> (32 - S[i])))) | 0;
    a = temp;
  }

  _state[0] = (_state[0] + a) | 0;
  _state[1] = (_state[1] + b) | 0;
  _state[2] = (_state[2] + c) | 0;
  _state[3] = (_state[3] + d) | 0;
}

// 增量添加数据
function md5Update(arrayBuffer) {
  var input = new Uint8Array(arrayBuffer);
  var len = input.length;
  _totalLen += len;
  var pos = 0;

  if (_bufLen > 0) {
    var need = 64 - _bufLen;
    var copy = Math.min(need, len);
    _buffer.set(input.subarray(0, copy), _bufLen);
    _bufLen += copy;
    pos = copy;
    if (_bufLen === 64) {
      md5Transform(_buffer);
      _bufLen = 0;
    }
  }

  while (pos + 64 <= len) {
    md5Transform(input.subarray(pos, pos + 64));
    pos += 64;
  }

  if (pos < len) {
    _buffer.set(input.subarray(pos), 0);
    _bufLen = len - pos;
  }
}

// 完成计算，返回 Hash 十六进制字符串
function md5Finalize() {
  var totalBits = _totalLen * 8;
  var lo = totalBits % 4294967296;
  var hi = Math.floor(totalBits / 4294967296);

  // 计算填充长度：填充至 56 mod 64
  var padLen = ((_bufLen < 56) ? 56 : 120) - _bufLen;
  var padding = new Uint8Array(padLen + 8);
  padding[0] = 0x80;

  // 追加原始消息长度（64-bit LE）
  padding[padLen]     = lo & 0xff;
  padding[padLen + 1] = (lo >>> 8) & 0xff;
  padding[padLen + 2] = (lo >>> 16) & 0xff;
  padding[padLen + 3] = (lo >>> 24) & 0xff;
  padding[padLen + 4] = hi & 0xff;
  padding[padLen + 5] = (hi >>> 8) & 0xff;
  padding[padLen + 6] = (hi >>> 16) & 0xff;
  padding[padLen + 7] = (hi >>> 24) & 0xff;

  // 直接处理填充块（不更新 _totalLen）
  var input = padding;
  var pos = 0;

  if (_bufLen > 0) {
    var need = 64 - _bufLen;
    _buffer.set(input.subarray(0, need), _bufLen);
    md5Transform(_buffer);
    pos = need;
    _bufLen = 0;
  }

  while (pos + 64 <= input.length) {
    md5Transform(input.subarray(pos, pos + 64));
    pos += 64;
  }

  var hex = '';
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var byte = (_state[i] >>> (j * 8)) & 0xff;
      hex += ('0' + byte.toString(16)).slice(-2);
    }
  }
  return hex;
}

// ========== Worker 消息处理 ==========

self.onmessage = function(e) {
  var data = e.data;

  if (data.type === 'hash') {
    try {
      var file = data.file;
      var chunkSize = data.chunkSize || 2 * 1024 * 1024;
      var totalChunks = Math.ceil(file.size / chunkSize);

      md5Init();

      var reader = new FileReaderSync();

      for (var i = 0; i < totalChunks; i++) {
        var start = i * chunkSize;
        var end = Math.min(start + chunkSize, file.size);
        var blob = file.slice(start, end);
        var buffer = reader.readAsArrayBuffer(blob);
        md5Update(buffer);

        self.postMessage({
          type: 'progress',
          progress: Math.round(((i + 1) / totalChunks) * 100)
        });
      }

      var hash = md5Finalize();
      self.postMessage({ type: 'complete', hash: hash });
    } catch (err) {
      self.postMessage({ type: 'error', error: err.message || 'Hash 计算失败' });
    }
  }
};
`;

/**
 * 计算文件的 MD5 哈希值
 * 优先使用 Web Worker（不阻塞主线程），失败时回退到主线程计算
 *
 * @param file 要计算哈希的文件
 * @param chunkSize 读取文件时的分块大小，默认 2MB
 * @param onProgress 进度回调函数（可选）
 * @returns Promise<string> 文件的 MD5 哈希值
 */
const calculateFileHash = async (file, chunkSize = 2 * 1024 * 1024, onProgress) => {
    // 优先尝试 Web Worker
    try {
        return await calculateFileHashWithWorker(file, chunkSize, onProgress);
    }
    catch (_a) {
        // Worker 不可用或执行失败，回退到主线程
        return calculateFileHashOnMainThread(file, chunkSize, onProgress);
    }
};
/**
 * 使用 Web Worker 计算文件 Hash（不阻塞 UI）
 */
const calculateFileHashWithWorker = (file, chunkSize, onProgress) => {
    return new Promise((resolve, reject) => {
        let worker = null;
        try {
            // 通过 Blob URL 创建内联 Worker
            const blob = new Blob([HASH_WORKER_CODE], {
                type: 'application/javascript',
            });
            const workerUrl = URL.createObjectURL(blob);
            worker = new Worker(workerUrl);
            worker.onmessage = (e) => {
                const { type, hash, progress, error } = e.data;
                switch (type) {
                    case 'progress':
                        onProgress === null || onProgress === void 0 ? void 0 : onProgress(progress);
                        break;
                    case 'complete':
                        worker === null || worker === void 0 ? void 0 : worker.terminate();
                        URL.revokeObjectURL(workerUrl);
                        resolve(hash);
                        break;
                    case 'error':
                        worker === null || worker === void 0 ? void 0 : worker.terminate();
                        URL.revokeObjectURL(workerUrl);
                        reject(new Error(error));
                        break;
                }
            };
            worker.onerror = (e) => {
                worker === null || worker === void 0 ? void 0 : worker.terminate();
                URL.revokeObjectURL(workerUrl);
                reject(new Error(e.message || 'Worker 执行失败'));
            };
            // 发送文件到 Worker
            worker.postMessage({ type: 'hash', file, chunkSize });
        }
        catch (err) {
            worker === null || worker === void 0 ? void 0 : worker.terminate();
            reject(err);
        }
    });
};
/**
 * 主线程回退方案：使用 SparkMD5 计算文件 Hash
 * 通过 FileReader 异步读取，在 onload 回调间隙让出主线程
 */
const calculateFileHashOnMainThread = (file, chunkSize, onProgress) => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer();
        let processedChunks = 0;
        function readChunk(i) {
            if (i >= totalChunks) {
                resolve(spark.end());
                return;
            }
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const reader = new FileReader();
            reader.onload = e => {
                var _a;
                try {
                    spark.append((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                    processedChunks++;
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(Math.round((processedChunks / totalChunks) * 100));
                    readChunk(i + 1);
                }
                catch (error) {
                    reject(new Error(`处理分块失败: ${error}`));
                }
            };
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsArrayBuffer(file.slice(start, end));
        }
        readChunk(0);
    });
};

// 进行文件的切分
const splitFile = (file, chunkSize = null) => {
    // 思路：
    // 1. 计算总分片数：Math.ceil(file.size / chunkSize)
    // 2. 循环切分：file.slice(start, end)
    // 3. 返回 Blob 数组
    const totalChunks = chunkSize ? Math.ceil(file.size / chunkSize) : 1;
    const chunks = [];
    for (let i = 0; i < totalChunks; i++) {
        const start = chunkSize ? i * chunkSize : 0;
        const end = chunkSize ? Math.min(start + chunkSize, file.size) : file.size;
        chunks.push(file.slice(start, end));
    }
    return chunks;
};

/**
 * 上传单个分片（带重试机制 + 取消支持）
 */
const uploadChunkWithRetry = async (params, retryCount = 0) => {
    const { chunk, chunkIndex, adapter, uploadId, fileHash, fileName, fileSize, totalChunks, maxRetries, retryDelay, signal, } = params;
    // 检查是否已取消
    if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
        throw new DOMException('上传已取消', 'AbortError');
    }
    try {
        await adapter.uploadChunk({
            uploadId,
            chunkIndex,
            chunk,
            fileName,
            fileSize,
            totalChunks,
            fileHash,
            signal,
        });
    }
    catch (error) {
        // 如果是取消操作，直接抛出不重试
        if ((signal === null || signal === void 0 ? void 0 : signal.aborted) ||
            (error instanceof DOMException && error.name === 'AbortError')) {
            throw new DOMException('上传已取消', 'AbortError');
        }
        // 如果还有重试次数，则重试
        if (retryCount < maxRetries) {
            // 指数退避：延迟时间 = retryDelay * 2^retryCount
            const delay = retryDelay * Math.pow(2, retryCount);
            // 等待时也支持取消
            await new Promise((resolve, reject) => {
                const timer = setTimeout(resolve, delay);
                if (signal) {
                    const onAbort = () => {
                        clearTimeout(timer);
                        reject(new DOMException('上传已取消', 'AbortError'));
                    };
                    if (signal.aborted) {
                        clearTimeout(timer);
                        reject(new DOMException('上传已取消', 'AbortError'));
                        return;
                    }
                    signal.addEventListener('abort', onAbort, { once: true });
                }
            });
            // 递归重试
            return uploadChunkWithRetry(params, retryCount + 1);
        }
        // 超过最大重试次数，抛出错误
        throw error;
    }
};

/**
 * IndexedDB 分片上传持久化工具
 * 用于断点续传：记录已上传的分片，刷新/断网后可恢复
 */
const DB_NAME = 'cream_upload_store';
const DB_VERSION = 1;
const STORE_NAME = 'chunk_records';
/**
 * 打开 IndexedDB 数据库
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        // 检查 IndexedDB 是否可用
        if (typeof indexedDB === 'undefined') {
            reject(new Error('IndexedDB 不可用'));
            return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'fileHash' });
                store.createIndex('updatedAt', 'updatedAt', { unique: false });
            }
        };
        request.onsuccess = event => {
            resolve(event.target.result);
        };
        request.onerror = () => {
            reject(new Error('无法打开 IndexedDB'));
        };
    });
};
/**
 * 获取分片上传记录
 */
const getChunkRecord = async (fileHash) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.get(fileHash);
            request.onsuccess = () => {
                resolve(request.result || null);
            };
            request.onerror = () => reject(request.error);
            tx.oncomplete = () => db.close();
        });
    }
    catch (_a) {
        return null;
    }
};
/**
 * 保存/更新分片上传记录
 */
const saveChunkRecord = async (record) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.put({ ...record, updatedAt: Date.now() });
            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    }
    catch (_a) {
        // IndexedDB 不可用时静默失败，不影响上传流程
    }
};
/**
 * 标记某个分片已上传
 */
const markChunkUploaded = async (fileHash, chunkIndex) => {
    try {
        const record = await getChunkRecord(fileHash);
        if (record) {
            if (!record.uploadedChunks.includes(chunkIndex)) {
                record.uploadedChunks.push(chunkIndex);
                await saveChunkRecord(record);
            }
        }
    }
    catch (_a) {
        // 静默失败
    }
};
/**
 * 删除分片上传记录（上传完成后清理）
 */
const deleteChunkRecord = async (fileHash) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.delete(fileHash);
            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    }
    catch (_a) {
        // 静默失败
    }
};
/**
 * 清理过期记录（超过指定天数的记录）
 */
const cleanExpiredRecords = async (maxAgeDays = 7) => {
    try {
        const db = await openDB();
        const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const index = store.index('updatedAt');
            const range = IDBKeyRange.upperBound(cutoff);
            const request = index.openCursor(range);
            request.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                }
            };
            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    }
    catch (_a) {
        // 静默失败
    }
};

/**
 * 并发分片上传
 * 支持：跳过已上传分片（断点续传）、AbortSignal 取消、暂停恢复
 */
/**
 * 并发上传所有分片
 */
const uploadChunks = async (params) => {
    const { chunks, adapter, uploadId, fileHash, fileName, fileSize, totalChunks, concurrent, maxRetries, retryDelay, uploadedChunkIndices = [], signal, isPaused, waitForResume, onProgress, onChunkComplete, } = params;
    // 构建待上传的分片索引列表（跳过已上传的）
    const uploadedSet = new Set(uploadedChunkIndices);
    const pendingIndices = Array.from({ length: chunks.length }, (_, i) => i).filter(i => !uploadedSet.has(i));
    let uploadedChunks = uploadedChunkIndices.length;
    // 报告初始进度（已有断点续传的进度）
    if (uploadedChunks > 0) {
        onProgress === null || onProgress === void 0 ? void 0 : onProgress({
            percent: Math.round((uploadedChunks / totalChunks) * 100),
            uploadedChunks,
            totalChunks,
            uploadedSize: (uploadedChunks / totalChunks) * fileSize,
            totalSize: fileSize,
            state: 'uploading',
        });
    }
    // 分批上传
    for (let i = 0; i < pendingIndices.length; i += concurrent) {
        // 检查是否已取消
        if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
            throw new DOMException('上传已取消', 'AbortError');
        }
        // 检查是否暂停，等待恢复
        if ((isPaused === null || isPaused === void 0 ? void 0 : isPaused()) && waitForResume) {
            await waitForResume();
        }
        const batch = pendingIndices.slice(i, i + concurrent);
        // 并发上传当前批次
        await Promise.all(batch.map(async (chunkIndex) => {
            // 再次检查暂停
            if ((isPaused === null || isPaused === void 0 ? void 0 : isPaused()) && waitForResume) {
                await waitForResume();
            }
            await uploadChunkWithRetry({
                chunk: chunks[chunkIndex],
                chunkIndex,
                adapter,
                uploadId,
                fileHash,
                fileName,
                fileSize,
                totalChunks,
                maxRetries,
                retryDelay,
                signal,
            });
            uploadedChunks++;
            onChunkComplete === null || onChunkComplete === void 0 ? void 0 : onChunkComplete(chunkIndex, totalChunks);
            // 持久化已上传分片记录（断点续传）
            markChunkUploaded(fileHash, chunkIndex).catch(() => {
                // 静默失败，不影响上传
            });
            // 更新进度
            onProgress === null || onProgress === void 0 ? void 0 : onProgress({
                percent: Math.round((uploadedChunks / totalChunks) * 100),
                uploadedChunks,
                totalChunks,
                uploadedSize: (uploadedChunks / totalChunks) * fileSize,
                totalSize: fileSize,
                state: 'uploading',
            });
        }));
    }
};

/**
 * 大文件上传 Hook
 *
 * 功能特性：
 * - Web Worker 计算文件 Hash（不阻塞 UI）
 * - 秒传：Hash 查后端是否已存在
 * - 断点续传：IndexedDB 持久化分片记录
 * - 上传控制：pause / resume / cancel
 * - 并发上传 + 指数退避重试
 */
const useLargeFileUpload = (props) => {
    const { adapter, chunkSize = 5 * 1024 * 1024, concurrent = 3, maxRetries = 3, retryDelay = 1000, enableResume = true, onProgress, onHashProgress, onSuccess, onError, onChunkComplete, } = props;
    // 当前上传进度
    const [currentProgress, setCurrentProgress] = React.useState(null);
    // 上传状态
    const stateRef = React.useRef('idle');
    // AbortController 用于取消
    const abortControllerRef = React.useRef(null);
    // 暂停控制
    const pausedRef = React.useRef(false);
    const resumeResolverRef = React.useRef(null);
    /**
     * 暂停上传
     */
    const pause = React.useCallback(() => {
        if (stateRef.current === 'uploading') {
            pausedRef.current = true;
            stateRef.current = 'paused';
        }
    }, []);
    /**
     * 恢复上传
     */
    const resume = React.useCallback(() => {
        var _a;
        if (stateRef.current === 'paused') {
            pausedRef.current = false;
            stateRef.current = 'uploading';
            // 释放等待中的 Promise
            (_a = resumeResolverRef.current) === null || _a === void 0 ? void 0 : _a.call(resumeResolverRef);
            resumeResolverRef.current = null;
        }
    }, []);
    /**
     * 取消上传
     */
    const cancel = React.useCallback(() => {
        var _a, _b;
        stateRef.current = 'error';
        pausedRef.current = false;
        // 释放暂停等待
        (_a = resumeResolverRef.current) === null || _a === void 0 ? void 0 : _a.call(resumeResolverRef);
        resumeResolverRef.current = null;
        // 中止所有正在进行的请求
        (_b = abortControllerRef.current) === null || _b === void 0 ? void 0 : _b.abort();
    }, []);
    /**
     * 检查是否暂停
     */
    const isPaused = () => pausedRef.current;
    /**
     * 等待恢复（返回一个 Promise，恢复时 resolve）
     */
    const waitForResume = () => {
        return new Promise(resolve => {
            if (!pausedRef.current) {
                resolve();
                return;
            }
            resumeResolverRef.current = resolve;
        });
    };
    // 上传函数
    const upload = React.useCallback(async (file) => {
        const startTime = Date.now();
        // 初始化控制器
        abortControllerRef.current = new AbortController();
        pausedRef.current = false;
        stateRef.current = 'hashing';
        try {
            // 清理过期的断点续传记录
            if (enableResume) {
                cleanExpiredRecords().catch(() => { });
            }
            // ===== 阶段 1：计算文件 Hash（Web Worker） =====
            stateRef.current = 'hashing';
            const fileHash = await calculateFileHash(file, chunkSize, percent => {
                onHashProgress === null || onHashProgress === void 0 ? void 0 : onHashProgress(percent);
                setCurrentProgress({
                    percent: 0,
                    uploadedChunks: 0,
                    totalChunks: 0,
                    uploadedSize: 0,
                    totalSize: file.size,
                    state: 'hashing',
                    hashPercent: percent,
                });
            });
            // 检查是否已取消
            if (abortControllerRef.current.signal.aborted) {
                throw new DOMException('上传已取消', 'AbortError');
            }
            // ===== 阶段 2：秒传检查 =====
            if (adapter.checkFileExists) {
                const checkResult = await adapter.checkFileExists({
                    fileHash,
                    fileName: file.name,
                    fileSize: file.size,
                });
                if (checkResult.exists && checkResult.fileUrl) {
                    // 秒传成功！
                    const result = {
                        fileId: checkResult.fileId || fileHash,
                        fileUrl: checkResult.fileUrl,
                        fileName: file.name,
                        fileSize: file.size,
                        uploadTime: Date.now() - startTime,
                        instantUpload: true,
                    };
                    stateRef.current = 'success';
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result);
                    return result;
                }
                // 后端返回已上传的分片列表（用于断点续传）
                if (checkResult.uploadedChunks &&
                    checkResult.uploadedChunks.length > 0 &&
                    enableResume) {
                    const record = await getChunkRecord(fileHash);
                    if (!record) {
                        const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
                        await saveChunkRecord({
                            fileHash,
                            fileName: file.name,
                            fileSize: file.size,
                            chunkSize: defaultChunkSize,
                            totalChunks: Math.ceil(file.size / defaultChunkSize),
                            uploadedChunks: checkResult.uploadedChunks,
                            uploadId: null,
                            updatedAt: Date.now(),
                        });
                    }
                }
            }
            // ===== 阶段 3：划分文件 =====
            const defaultChunkSize = chunkSize || 5 * 1024 * 1024;
            const fileChunks = splitFile(file, defaultChunkSize);
            const totalChunks = fileChunks.length;
            // ===== 阶段 4：加载断点续传记录 =====
            let uploadedChunkIndices = [];
            let uploadId = null;
            if (enableResume) {
                const record = await getChunkRecord(fileHash);
                if (record &&
                    record.fileSize === file.size &&
                    record.chunkSize === defaultChunkSize &&
                    record.totalChunks === totalChunks) {
                    uploadedChunkIndices = record.uploadedChunks;
                    uploadId = record.uploadId;
                }
            }
            // ===== 阶段 5：初始化上传 =====
            if (!uploadId && adapter.initUpload) {
                uploadId = await adapter.initUpload({
                    fileName: file.name,
                    fileSize: file.size,
                    fileHash,
                    chunkSize: defaultChunkSize,
                    totalChunks,
                });
            }
            // 保存断点记录
            if (enableResume) {
                await saveChunkRecord({
                    fileHash,
                    fileName: file.name,
                    fileSize: file.size,
                    chunkSize: defaultChunkSize,
                    totalChunks,
                    uploadedChunks: uploadedChunkIndices,
                    uploadId,
                    updatedAt: Date.now(),
                });
            }
            // ===== 阶段 6：上传分片 =====
            stateRef.current = 'uploading';
            await uploadChunks({
                chunks: fileChunks,
                adapter,
                uploadId,
                fileHash,
                fileName: file.name,
                fileSize: file.size,
                totalChunks,
                concurrent,
                maxRetries,
                retryDelay,
                uploadedChunkIndices,
                signal: abortControllerRef.current.signal,
                isPaused,
                waitForResume,
                onProgress: progress => {
                    setCurrentProgress(progress);
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(progress);
                },
                onChunkComplete,
            });
            // ===== 阶段 7：合并分片 =====
            stateRef.current = 'merging';
            const result = await adapter.mergeChunks({
                uploadId,
                fileHash,
                fileName: file.name,
                fileSize: file.size,
                totalChunks,
            });
            // 上传完成，清理断点记录
            if (enableResume) {
                await deleteChunkRecord(fileHash);
            }
            // ===== 阶段 8：返回结果 =====
            const uploadResult = {
                fileId: result.fileId,
                fileUrl: result.fileUrl,
                fileName: file.name,
                fileSize: file.size,
                uploadTime: Date.now() - startTime,
                instantUpload: false,
                response: result,
            };
            stateRef.current = 'success';
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(uploadResult);
            return uploadResult;
        }
        catch (error) {
            const err = error;
            stateRef.current = 'error';
            onError === null || onError === void 0 ? void 0 : onError(err, file);
            throw err;
        }
    }, [
        adapter,
        chunkSize,
        concurrent,
        maxRetries,
        retryDelay,
        enableResume,
        onProgress,
        onHashProgress,
        onSuccess,
        onError,
        onChunkComplete,
    ]);
    return {
        upload,
        getProgress: () => currentProgress,
        getControl: () => ({
            pause,
            resume,
            cancel,
            state: stateRef.current,
        }),
    };
};

/**
 * 默认适配器创建工具
 * 基于 Upload 组件的配置创建适配器
 */
/**
 * 创建默认适配器
 * 基于标准的后端接口规范
 */
const createDefaultAdapter = (config) => {
    const { action, checkUrl, initUrl, chunkUrl, mergeUrl, headers, data, withCredentials, name = 'file', } = config;
    return {
        // 秒传检查（可选）
        checkFileExists: checkUrl
            ? async (params) => {
                try {
                    const response = await axios.post(checkUrl, {
                        fileHash: params.fileHash,
                        fileName: params.fileName,
                        fileSize: params.fileSize,
                        ...data,
                    }, { headers, withCredentials });
                    return {
                        exists: !!response.data.exists,
                        fileUrl: response.data.fileUrl || response.data.file_url,
                        fileId: response.data.fileId || response.data.file_id,
                        uploadedChunks: response.data.uploadedChunks ||
                            response.data.uploaded_chunks ||
                            [],
                    };
                }
                catch (_a) {
                    // 检查失败时视为文件不存在，继续正常上传
                    return { exists: false };
                }
            }
            : undefined,
        // 初始化上传（可选）
        initUpload: initUrl
            ? async (fileInfo) => {
                try {
                    const response = await axios.post(initUrl || `${action}/init`, {
                        fileName: fileInfo.fileName,
                        fileSize: fileInfo.fileSize,
                        fileHash: fileInfo.fileHash,
                        chunkSize: fileInfo.chunkSize,
                        totalChunks: fileInfo.totalChunks,
                        ...data,
                    }, {
                        headers,
                        withCredentials,
                    });
                    return response.data.uploadId || response.data.upload_id || null;
                }
                catch (error) {
                    // 如果初始化失败，返回 null，继续使用文件名作为 uploadId
                    console.warn('初始化上传失败，将使用文件名作为标识:', error);
                    return null;
                }
            }
            : undefined,
        // 上传分片
        uploadChunk: async (params) => {
            const formData = new FormData();
            // 添加 uploadId（如果有）
            if (params.uploadId) {
                formData.append('uploadId', params.uploadId);
            }
            // 添加分片信息
            formData.append('chunkIndex', params.chunkIndex.toString());
            formData.append(name || 'chunk', params.chunk);
            formData.append('fileName', params.fileName);
            formData.append('fileSize', params.fileSize.toString());
            formData.append('totalChunks', params.totalChunks.toString());
            if (params.fileHash) {
                formData.append('fileHash', params.fileHash);
            }
            // 添加额外数据
            if (data) {
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key]);
                });
            }
            const response = await axios.post(chunkUrl || `${action}/chunk`, formData, {
                headers: {
                    ...headers,
                },
                withCredentials,
                // 传递 AbortSignal（axios >= 0.22 支持）
                signal: params.signal,
                onUploadProgress: e => {
                    if (params.onProgress && e.total) {
                        const progress = Math.round((e.loaded * 100) / e.total);
                        params.onProgress(progress);
                    }
                },
            });
            return {
                success: response.data.success !== false,
                chunkIndex: params.chunkIndex,
            };
        },
        // 合并分片
        mergeChunks: async (params) => {
            const response = await axios.post(mergeUrl || `${action}/merge`, {
                uploadId: params.uploadId,
                fileName: params.fileName,
                fileSize: params.fileSize,
                totalChunks: params.totalChunks,
                fileHash: params.fileHash,
                ...data,
            }, {
                headers,
                withCredentials,
            });
            return {
                fileUrl: response.data.fileUrl || response.data.file_url,
                fileId: response.data.fileId ||
                    response.data.file_id ||
                    params.uploadId ||
                    '',
                ...response.data,
            };
        },
    };
};

const Upload = React.forwardRef(({ action, defaultFileList, headers, name, data, withCredentials, accept, multiple, beforeUpload, onProgress, onSuccess, onError, onChange, onBeforeUploadSuccess, onRemoved, children, drag, 
// 大文件上传配置
enableLargeFileUpload = true, chunkSize = 5 * 1024 * 1024, chunkThreshold = 10 * 1024 * 1024, concurrent = 3, maxRetries = 3, retryDelay = 1000, adapter, checkUrl, initUrl, chunkUrl, mergeUrl, enableResume = true, onHashProgress, }, ref) => {
    // 创建文件列表状态
    const [fileList, setFileList] = React.useState(defaultFileList || []);
    // 存储当前上传的文件信息（用于进度更新）
    const currentUploadingFileIdRef = React.useRef(null);
    const currentUploadingFileRef = React.useRef(null);
    // 创建默认适配器（如果未提供自定义适配器）
    const defaultAdapter = React.useMemo(() => {
        if (adapter) {
            return adapter;
        }
        return createDefaultAdapter({
            action,
            checkUrl,
            initUrl,
            chunkUrl,
            mergeUrl,
            headers,
            data,
            withCredentials,
            name,
        });
    }, [
        adapter,
        action,
        checkUrl,
        initUrl,
        chunkUrl,
        mergeUrl,
        headers,
        data,
        withCredentials,
        name,
    ]);
    // 大文件上传 Hook（集成秒传 / 断点续传 / 暂停恢复取消 / Web Worker Hash）
    const largeFileUpload = useLargeFileUpload({
        adapter: defaultAdapter,
        chunkSize,
        concurrent,
        maxRetries,
        retryDelay,
        enableResume,
        onHashProgress,
        onProgress: progress => {
            // 更新文件列表中的进度
            if (currentUploadingFileIdRef.current) {
                updateFileList(currentUploadingFileIdRef.current, {
                    status: 'uploading',
                    percent: progress.percent,
                });
                // 调用原有的 onProgress 回调（兼容原有 API）
                if (onProgress && currentUploadingFileRef.current) {
                    onProgress(progress.percent, currentUploadingFileRef.current);
                }
            }
        },
        onSuccess: _result => {
            // 上传成功的处理在 uploadLargeFile 中完成
        },
        onError: (_error, _file) => {
            // 上传失败的处理在 uploadLargeFile 中完成
        },
    });
    // 通过 ref 暴露上传控制能力
    React.useImperativeHandle(ref, () => ({
        pause: () => largeFileUpload.getControl().pause(),
        resume: () => largeFileUpload.getControl().resume(),
        cancel: () => largeFileUpload.getControl().cancel(),
        getControl: () => largeFileUpload.getControl(),
        getProgress: () => largeFileUpload.getProgress(),
        getFileList: () => fileList,
    }));
    // 创建一个更新文件列表的函数
    const updateFileList = (targetUid, updateObj) => {
        setFileList(prevList => {
            const newList = prevList.map(item => item.uid === targetUid ? { ...item, ...updateObj } : item);
            return newList;
        });
    };
    const handelFileChange = () => {
        //触发文件选择对话框
        if (uploadInputRef.current) {
            uploadInputRef.current.click();
        }
    };
    const uploadInputRef = React.useRef(null);
    // 值变化的时候添加文件
    const handelChange = (e) => {
        const file = e.target.files;
        // 如果文件不存在，直接返回
        if (!file) {
            return;
        }
        // 如果文件存在，调用handelFileUpload函数
        if (file) {
            handelFileUpload(file);
        }
        // 最后清空当前文件选择
        if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
        }
    };
    const post = (file) => {
        // 文件对象创建
        const fileItem = {
            uid: Date.now() + '-' + file.name,
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file,
        };
        // 更新文件列表状态
        setFileList(prevList => [...prevList, fileItem]);
        // 1、创建FormData对象
        const formData = new FormData();
        // 2、追加文件到FormData
        // todo:添加name属性，解决后端接收文件名问题
        formData.append(name || 'file', file);
        // todo:添加data属性，解决后端接收自定义字段问题
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        // 3、发送POST请求
        axios
            .post(action, formData, {
            // 4、设置请求头为multipart/form-data
            // todo:自定义请求头
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
            // todo:自定义请求头
            headers: headers || {},
            withCredentials: withCredentials || false,
            // 5、设置上传进度回调
            onUploadProgress: e => {
                // 6、计算上传进度
                const progress = Math.round((e.loaded * 100) / e.total);
                if (progress < 100) {
                    // 在这个地方需要更新文件列表，在setState中更新
                    // 打印当前文件项的详细信息
                    updateFileList(fileItem.uid, {
                        status: 'uploading',
                        percent: progress,
                    });
                    if (onProgress) {
                        onProgress(progress, file);
                    }
                }
            },
        })
            .then(response => {
            // 更新文件状态为成功
            updateFileList(fileItem.uid, {
                status: 'success',
                percent: 100,
                response: response.data,
            });
            if (onSuccess) {
                // 7、调用成功回调
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(response.data, file);
            }
            if (onChange) {
                // 9、调用onChange回调
                onChange === null || onChange === void 0 ? void 0 : onChange(file);
            }
        })
            .catch(error => {
            // 更新文件状态为失败
            updateFileList(fileItem.uid, {
                status: 'error',
                error: error,
            });
            if (onError) {
                // 8、调用失败回调
                onError === null || onError === void 0 ? void 0 : onError(error, file);
            }
            if (onChange) {
                // 10、调用onChange回调
                onChange === null || onChange === void 0 ? void 0 : onChange(file);
            }
        });
    };
    // 大文件上传函数（集成秒传 / 断点续传 / 暂停恢复取消）
    const uploadLargeFile = async (file) => {
        const fileId = Date.now() + '-' + file.name;
        currentUploadingFileIdRef.current = fileId;
        currentUploadingFileRef.current = file;
        // 创建文件项
        const fileItem = {
            uid: fileId,
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file,
        };
        // 添加到文件列表
        setFileList(prevList => [...prevList, fileItem]);
        try {
            updateFileList(fileId, { status: 'uploading' });
            const result = await largeFileUpload.upload(file);
            updateFileList(fileId, {
                status: 'success',
                percent: 100,
                response: result.response || result,
            });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result.response || result, file);
            onChange === null || onChange === void 0 ? void 0 : onChange(file);
        }
        catch (error) {
            updateFileList(fileId, {
                status: 'error',
                error: error,
            });
            onError === null || onError === void 0 ? void 0 : onError(error, file);
            onChange === null || onChange === void 0 ? void 0 : onChange(file);
        }
        finally {
            currentUploadingFileIdRef.current = null;
            currentUploadingFileRef.current = null;
        }
    };
    //   文件上传函数
    const handelFileUpload = (files) => {
        // 1、把文件列表转换为数组
        const fileArray = Array.from(files);
        // 2、遍历文件数组，对每个文件进行上传
        fileArray.forEach(file => {
            // 3、如果beforeUpload存在，调用beforeUpload函数
            if (beforeUpload) {
                const result = beforeUpload(file);
                // 4、判断结果的类型
                if (result instanceof Promise) {
                    result
                        .then(res => {
                        // 使用返回的新文件对象而不是原始文件
                        if (res) {
                            // 调用beforeUpload成功回调
                            if (onBeforeUploadSuccess) {
                                onBeforeUploadSuccess(file, res);
                            }
                            // 判断是否需要分片上传
                            const shouldChunk = enableLargeFileUpload && res.size >= chunkThreshold;
                            if (shouldChunk) {
                                uploadLargeFile(res);
                            }
                            else {
                                post(res);
                            }
                        }
                    })
                        .catch(err => {
                        if (onError) {
                            onError === null || onError === void 0 ? void 0 : onError(err, file);
                        }
                    });
                }
                else if (result) {
                    // 5、如果结果为true，调用post函数，传递原始文件
                    if (onBeforeUploadSuccess) {
                        onBeforeUploadSuccess(file, file);
                    }
                    // 判断是否需要分片上传
                    const shouldChunk = enableLargeFileUpload && file.size >= chunkThreshold;
                    if (shouldChunk) {
                        uploadLargeFile(file);
                    }
                    else {
                        post(file);
                    }
                }
                else {
                    // 如果beforeUpload返回false，不上传文件
                    if (onError) {
                        onError === null || onError === void 0 ? void 0 : onError(new Error('beforeUpload校验失败'), file);
                    }
                }
            }
            else {
                // 如果没有beforeUpload，直接上传文件
                // 判断是否需要分片上传
                const shouldChunk = enableLargeFileUpload && file.size >= chunkThreshold;
                if (shouldChunk) {
                    uploadLargeFile(file);
                }
                else {
                    post(file);
                }
            }
        });
    };
    const handelRemove = (file) => {
        // console.log('删除文件:', file);
        // 1、从文件列表中删除该文件项
        setFileList(prevList => prevList.filter(item => item.uid !== file.uid));
        // 2、调用onRemoved回调
        onRemoved === null || onRemoved === void 0 ? void 0 : onRemoved(file);
    };
    return (jsxRuntime.jsxs("div", { style: { margin: '20px' }, children: [jsxRuntime.jsxs("div", { className: "upload-container", onClick: handelFileChange, children: [drag ? (jsxRuntime.jsx(Dragger, { onFile: handelFileUpload, children: children })) : (children), jsxRuntime.jsx("input", { type: "file", className: "upload-input", style: { display: 'none' }, ref: uploadInputRef, onChange: handelChange, accept: accept, multiple: multiple })] }), jsxRuntime.jsx(FileList, { fileList: fileList, onRemoved: handelRemove })] }));
});
// 设置显示名称，便于调试
Upload.displayName = 'Upload';

/**
 * 大文件上传 Mock 适配器
 * 用于 Storybook 和开发测试，模拟分片上传流程
 */
/**
 * 创建 Mock 适配器
 * 模拟真实的分片上传流程，包括进度更新、延迟、错误处理等
 */
const createMockAdapter = (config = {}) => {
    const { uploadDelay = 500, // 默认每个分片上传延迟 500ms
    mergeDelay = 1000, // 默认合并延迟 1s
    failChunks = [], // 默认不失败
    failProbability = 0, // 默认失败概率 0%
    enableProgress = true, // 默认启用进度模拟
    instantUploadHashes = [], // 默认不模拟秒传
     } = config;
    // 存储上传任务信息（模拟服务端）
    const uploadTasks = new Map();
    return {
        /**
         * 秒传检查（可选）
         * 如果文件 Hash 在 instantUploadHashes 列表中，模拟秒传成功
         */
        checkFileExists: async (params) => {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (instantUploadHashes.includes(params.fileHash)) {
                console.log(`[Mock] 秒传命中: ${params.fileName} (hash: ${params.fileHash})`);
                return {
                    exists: true,
                    fileUrl: `https://mock-storage.example.com/files/${params.fileName}`,
                    fileId: `instant-${params.fileHash.slice(0, 8)}`,
                };
            }
            return { exists: false };
        },
        /**
         * 初始化上传（可选）
         */
        initUpload: async (fileInfo) => {
            // 模拟网络延迟
            await new Promise(resolve => setTimeout(resolve, 100));
            const uploadId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            // 初始化任务
            uploadTasks.set(uploadId, {
                chunks: new Map(),
                totalChunks: fileInfo.totalChunks,
                fileName: fileInfo.fileName,
                fileSize: fileInfo.fileSize,
            });
            console.log(`[Mock] 初始化上传: ${uploadId}`, fileInfo);
            return uploadId;
        },
        /**
         * 上传分片
         */
        uploadChunk: async (params) => {
            var _a, _b;
            const uploadId = params.uploadId || `mock-${params.fileName}`;
            const task = uploadTasks.get(uploadId);
            // 检查取消
            if ((_a = params.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
                throw new DOMException('上传已取消', 'AbortError');
            }
            if (!task) {
                throw new Error(`上传任务不存在: ${uploadId}`);
            }
            // 检查是否应该失败
            const shouldFail = failChunks.includes(params.chunkIndex) ||
                (failProbability > 0 && Math.random() < failProbability);
            if (shouldFail) {
                await new Promise(resolve => setTimeout(resolve, uploadDelay));
                throw new Error(`分片 ${params.chunkIndex} 上传失败（模拟错误）`);
            }
            // 模拟上传进度（支持取消）
            if (enableProgress && params.onProgress) {
                const steps = 5;
                for (let i = 1; i <= steps; i++) {
                    if ((_b = params.signal) === null || _b === void 0 ? void 0 : _b.aborted) {
                        throw new DOMException('上传已取消', 'AbortError');
                    }
                    await new Promise(resolve => setTimeout(resolve, uploadDelay / steps));
                    params.onProgress((i / steps) * 100);
                }
            }
            else {
                await new Promise(resolve => setTimeout(resolve, uploadDelay));
            }
            // 保存分片（模拟服务端存储）
            task.chunks.set(params.chunkIndex, params.chunk);
            console.log(`[Mock] 分片上传完成: ${params.chunkIndex + 1}/${params.totalChunks}`, {
                chunkSize: params.chunk.size,
                uploadedChunks: task.chunks.size,
                totalChunks: params.totalChunks,
            });
            return {
                success: true,
                chunkIndex: params.chunkIndex,
            };
        },
        /**
         * 合并分片
         */
        mergeChunks: async (params) => {
            const uploadId = params.uploadId || `mock-${params.fileName}`;
            const task = uploadTasks.get(uploadId);
            if (!task) {
                throw new Error(`上传任务不存在: ${uploadId}`);
            }
            // 验证所有分片是否都已上传
            const missingChunks = [];
            for (let i = 0; i < params.totalChunks; i++) {
                if (!task.chunks.has(i)) {
                    missingChunks.push(i);
                }
            }
            if (missingChunks.length > 0) {
                throw new Error(`缺少分片: ${missingChunks.join(', ')}`);
            }
            // 模拟合并过程
            console.log(`[Mock] 开始合并分片: ${params.totalChunks} 个分片`);
            await new Promise(resolve => setTimeout(resolve, mergeDelay));
            // 计算合并后的文件大小（验证）
            let totalSize = 0;
            for (let i = 0; i < params.totalChunks; i++) {
                totalSize += task.chunks.get(i).size;
            }
            // 清理任务
            uploadTasks.delete(uploadId);
            const fileUrl = `https://mock-storage.example.com/files/${params.fileName}`;
            const fileId = uploadId;
            console.log(`[Mock] 合并完成:`, {
                fileName: params.fileName,
                fileSize: totalSize,
                fileUrl,
                fileId,
            });
            return {
                fileUrl,
                fileId,
                fileSize: totalSize,
                uploadedAt: new Date().toISOString(),
            };
        },
    };
};
/**
 * 默认 Mock 适配器（快速测试）
 */
createMockAdapter();
/**
 * 慢速 Mock 适配器（用于测试进度显示）
 */
createMockAdapter({
    uploadDelay: 2000, // 每个分片 2s
    mergeDelay: 3000, // 合并 3s
});
/**
 * 错误测试 Mock 适配器（用于测试错误处理）
 */
createMockAdapter({
    uploadDelay: 500,
    mergeDelay: 1000,
    failChunks: [2, 5], // 第 3 和第 6 个分片会失败
    failProbability: 0.1, // 10% 的随机失败率
});

exports.createDefaultAdapter = createDefaultAdapter;
exports.createMockAdapter = createMockAdapter;
exports.default = Upload;
//# sourceMappingURL=index.cjs.js.map
