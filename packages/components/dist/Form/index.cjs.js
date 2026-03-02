'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var styleInject_es = require('../chunks/style-inject.es-XZHJH68X.cjs.js');
var Schema = require('async-validator');
var lodashEs = require('lodash-es');
var classNames = require('classnames');

var css_248z = "@charset \"UTF-8\";\n/**\n * Form组件基础样式\n * 基于CreamDesign设计系统\n * 支持多端适配（移动端、平板、桌面）\n */\n/**\n * CreamDesign 设计系统\n * 基于柔和奶油色调的现代化设计系统\n */\n.text-primary {\n  color: #a855f7;\n}\n\n.text-primary-dark {\n  color: #581c87;\n}\n\n.text-secondary {\n  color: #85c1e9;\n}\n\n.text-success {\n  color: #4caf50;\n}\n\n.text-warning {\n  color: #ffc107;\n}\n\n.text-error {\n  color: #f44336;\n}\n\n.text-info {\n  color: #2196f3;\n}\n\n.text-disabled {\n  color: #9e9e9e;\n}\n\n.text-neutral-50 {\n  color: #ffffff;\n}\n\n.text-neutral-100 {\n  color: #f9f9f9;\n}\n\n.text-neutral-200 {\n  color: #f0f0f0;\n}\n\n.text-neutral-300 {\n  color: #e0e0e0;\n}\n\n.text-neutral-400 {\n  color: #bdbdbd;\n}\n\n.text-neutral-500 {\n  color: #9e9e9e;\n}\n\n.text-neutral-600 {\n  color: #757575;\n}\n\n.text-neutral-700 {\n  color: #616161;\n}\n\n.text-neutral-800 {\n  color: #424242;\n}\n\n.text-neutral-900 {\n  color: #212121;\n}\n\n.text-heading {\n  color: #212121;\n}\n\n.text-body {\n  color: #616161;\n}\n\n.text-muted {\n  color: #757575;\n}\n\n.font-size-base {\n  font-size: 1rem;\n}\n\n.font-size-lg {\n  font-size: 1.25rem;\n}\n\n.font-size-sm {\n  font-size: 0.875rem;\n}\n\n.font-size-xs {\n  font-size: 0.765625rem;\n}\n\n.font-size-h1 {\n  font-size: 2.5rem;\n}\n\n.font-size-h2 {\n  font-size: 2rem;\n}\n\n.font-size-h3 {\n  font-size: 1.75rem;\n}\n\n.font-size-h4 {\n  font-size: 1.5rem;\n}\n\n.font-size-h5 {\n  font-size: 1.25rem;\n}\n\n.font-size-h6 {\n  font-size: 1rem;\n}\n\n.font-weight-light {\n  font-weight: 300;\n}\n\n.font-weight-normal {\n  font-weight: 400;\n}\n\n.font-weight-bold {\n  font-weight: 700;\n}\n\n.font-weight-lighter {\n  font-weight: lighter;\n}\n\n.font-weight-bolder {\n  font-weight: bolder;\n}\n\n.line-height-base {\n  line-height: 1.5;\n}\n\n.line-height-lg {\n  line-height: 2;\n}\n\n.line-height-sm {\n  line-height: 1.25;\n}\n\n.line-height-none {\n  line-height: 1;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.font-family-sans-serif {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n}\n\n.font-family-monospace {\n  font-family: monospace;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212121;\n  background-color: #ffffff;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  line-height: 1.25;\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n}\n\nh1 {\n  font-size: 2.5rem;\n}\n\nh2 {\n  font-size: 2rem;\n}\n\nh3 {\n  font-size: 1.75rem;\n}\n\nh4 {\n  font-size: 1.5rem;\n}\n\nh5 {\n  font-size: 1.25rem;\n}\n\nh6 {\n  font-size: 1rem;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  line-height: 1.5;\n}\n\na {\n  color: #a855f7;\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\na:hover {\n  color: rgb(142.8, 72.25, 209.95);\n  text-decoration: underline;\n}\na:focus {\n  outline: 2px solid #a855f7;\n  outline-offset: 2px;\n}\n\n.bg-primary {\n  background-color: #a855f7;\n}\n\n.bg-primary-100 {\n  background-color: #f5f3ff;\n}\n\n.bg-primary-200 {\n  background-color: #ede9fe;\n}\n\n.bg-primary-300 {\n  background-color: #ddd6fe;\n}\n\n.bg-primary-400 {\n  background-color: #c4b5fd;\n}\n\n.bg-primary-600 {\n  background-color: #9333ea;\n}\n\n.bg-primary-700 {\n  background-color: #7e22ce;\n}\n\n.bg-primary-800 {\n  background-color: #6b21a8;\n}\n\n.bg-primary-900 {\n  background-color: #581c87;\n}\n\n.bg-secondary-blue-100 {\n  background-color: #f0f7ff;\n}\n\n.bg-secondary-blue-300 {\n  background-color: #d6eaf8;\n}\n\n.bg-secondary-blue-500 {\n  background-color: #aed6f1;\n}\n\n.bg-secondary-pink-100 {\n  background-color: #fdf2f8;\n}\n\n.bg-secondary-pink-300 {\n  background-color: #fadbd8;\n}\n\n.bg-secondary-pink-500 {\n  background-color: #f5cba7;\n}\n\n.bg-secondary-green-100 {\n  background-color: #f4f6f0;\n}\n\n.bg-secondary-green-300 {\n  background-color: #e8f5e9;\n}\n\n.bg-secondary-green-500 {\n  background-color: #a5d6a7;\n}\n\n.bg-success {\n  background-color: #4caf50;\n}\n\n.bg-warning {\n  background-color: #ffc107;\n}\n\n.bg-error {\n  background-color: #f44336;\n}\n\n.bg-info {\n  background-color: #2196f3;\n}\n\n.bg-neutral-50 {\n  background-color: #ffffff;\n}\n\n.bg-neutral-100 {\n  background-color: #f9f9f9;\n}\n\n.bg-neutral-200 {\n  background-color: #f0f0f0;\n}\n\n.bg-neutral-300 {\n  background-color: #e0e0e0;\n}\n\n.bg-neutral-400 {\n  background-color: #bdbdbd;\n}\n\n.bg-neutral-500 {\n  background-color: #9e9e9e;\n}\n\n.bg-neutral-600 {\n  background-color: #757575;\n}\n\n.bg-neutral-700 {\n  background-color: #616161;\n}\n\n.bg-neutral-800 {\n  background-color: #424242;\n}\n\n.bg-neutral-900 {\n  background-color: #212121;\n}\n\n.bg-primary-light {\n  background-color: rgba(168, 85, 247, 0.7);\n}\n\n.bg-primary-medium {\n  background-color: rgba(168, 85, 247, 0.5);\n}\n\n.bg-primary-dark {\n  background-color: rgba(168, 85, 247, 0.3);\n}\n\n.border {\n  border: 1px solid #e0e0e0;\n}\n\n.border-primary {\n  border-color: #a855f7;\n}\n\n.border-secondary {\n  border-color: #aed6f1;\n}\n\n.border-success {\n  border-color: #4caf50;\n}\n\n.border-warning {\n  border-color: #ffc107;\n}\n\n.border-error {\n  border-color: #f44336;\n}\n\n.border-neutral {\n  border-color: #e0e0e0;\n}\n\n.border-divider {\n  border-color: #f0f0f0;\n}\n\n.rounded {\n  border-radius: 0.375rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.flex {\n  display: flex;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.gap-3 {\n  gap: 0.75rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.min-h-screen {\n  min-height: 100vh;\n}\n\n.card {\n  background-color: #ede9fe;\n  border-radius: 0.5rem;\n  box-shadow: 0 2px 8px rgba(33, 33, 33, 0.1);\n  padding: 1.5rem;\n  margin-bottom: 1rem;\n}\n.card.card-hover {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card.card-hover:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(33, 33, 33, 0.15);\n}\n\n.tag {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 9999px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n\n.tag-primary {\n  background-color: #ddd6fe;\n  color: #212121;\n}\n\n.tag-blue {\n  background-color: #d6eaf8;\n  color: #212121;\n}\n\n.tag-pink {\n  background-color: #fadbd8;\n  color: #212121;\n}\n\n.tag-green {\n  background-color: #e8f5e9;\n  color: #212121;\n}\n\n.form-input {\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #e0e0e0;\n  border-radius: 0.375rem;\n  background-color: #ffffff;\n  color: #212121;\n}\n.form-input:focus {\n  outline: none;\n  border-color: #a855f7;\n  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);\n}\n.form-input:disabled {\n  background-color: #f9f9f9;\n  color: #9e9e9e;\n  cursor: not-allowed;\n}\n\n/*\n:export {\n  primaryColor: $color-primary-500;\n  secondaryColor: $color-secondary-blue-700;\n  neutralColor: $color-neutral-500;\n  successColor: $color-success;\n  warningColor: $color-warning;\n  errorColor: $color-error;\n  backgroundColor: $color-background;\n  textColor: $color-text-primary;\n}*/\n.cream-form {\n  width: 100%;\n  height: 100%;\n  margin: 0 auto;\n  padding: clamp(0.75rem, 2%, 1.5rem);\n  background-color: #ede9fe;\n  border-radius: 0.5rem;\n  box-shadow: 0 2px 8px rgba(33, 33, 33, 0.1);\n  box-shadow: 0 2 px 4 px rgba(33, 33, 33, 0.1);\n  font-size: clamp(0.875rem, 1.2vw, 1rem);\n}\n.cream-form .cream-row {\n  display: flex;\n  align-items: flex-start;\n  margin-bottom: clamp(1rem, 2%, 1.5rem);\n}\n.cream-form .cream-row.cream-row-no-label {\n  margin-left: 0;\n  padding-left: 0;\n}\n@media (min-width: 768px) {\n  .cream-form .cream-row.cream-row-no-label {\n    margin-left: 30%;\n    padding-left: 14px;\n  }\n}\n.cream-form .cream-row .cream-form-item-label {\n  flex-basis: 30%;\n  text-align: right;\n  padding-right: clamp(0.5rem, 1.5%, 1.25rem);\n  font-size: clamp(0.7875rem, 1.1vw, 1rem);\n  line-height: 1.5;\n}\n.cream-form .cream-row .cream-form-item-label > label.cream-form-item-required:before {\n  display: inline-block;\n  margin-right: 4px;\n  color: #f44336;\n  font-size: clamp(0.75rem, 1vw, 0.875rem);\n  font-family: SimSun, sans-serif;\n  line-height: 1;\n  content: \"*\";\n}\n.cream-form .cream-row .cream-form-item {\n  flex-basis: 70%;\n  position: relative;\n}\n.cream-form .cream-row .cream-form-item .cream-form-item-has-error.cream-form-item-control .cream-input-inner {\n  border: 1px solid #f44336;\n}\n.cream-form .cream-row .cream-form-item .cream-form-item-has-error.cream-form-item-control .cream-input-inner:focus {\n  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);\n}\n.cream-form .cream-row .cream-form-item .cream-form-item-explain {\n  position: absolute;\n  bottom: -25px;\n  left: 0;\n  line-height: 1.5;\n  color: #f44336;\n  min-width: 100px;\n  font-size: clamp(0.7rem, 1vw, 0.875rem);\n}\n.cream-form .cream-form-submit-area {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: clamp(0.5rem, 1%, 1rem);\n  flex-wrap: wrap;\n  margin-top: clamp(1rem, 2%, 1.5rem);\n}\n\n@media (max-width: 767px) {\n  .cream-form {\n    padding: clamp(0.5rem, 1.5%, 1rem);\n    font-size: clamp(0.7875rem, 2vw, 0.875rem);\n  }\n  .cream-form .cream-row {\n    flex-direction: column;\n    align-items: stretch;\n    margin-bottom: clamp(0.75rem, 2%, 1.25rem);\n  }\n  .cream-form .cream-row.cream-row-no-label {\n    margin-left: 0;\n    padding-left: 0;\n  }\n  .cream-form .cream-row .cream-form-item-label {\n    flex-basis: 100%;\n    text-align: left;\n    padding-right: 0;\n    padding-bottom: clamp(0.25rem, 0.5%, 0.5rem);\n    font-size: clamp(0.74375rem, 1.8vw, 0.875rem);\n    font-weight: 700;\n    margin-bottom: 0.25rem;\n  }\n  .cream-form .cream-row .cream-form-item {\n    flex-basis: 100%;\n    width: 100%;\n  }\n  .cream-form .cream-row .cream-form-item .cream-form-item-explain {\n    position: relative;\n    bottom: auto;\n    margin-top: 0.25rem;\n    font-size: clamp(0.65rem, 1.5vw, 0.75rem);\n  }\n  .cream-form .cream-form-submit-area {\n    flex-direction: column;\n    width: 100%;\n  }\n  .cream-form .cream-form-submit-area button,\n  .cream-form .cream-form-submit-area .btn {\n    width: 100%;\n    min-height: clamp(40px, 6vh, 44px);\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .cream-form {\n    padding: clamp(1rem, 2%, 1.25rem);\n    font-size: clamp(0.875rem, 1.3vw, 1rem);\n  }\n  .cream-form .cream-row {\n    margin-bottom: clamp(1rem, 1.5%, 1.25rem);\n  }\n  .cream-form .cream-row .cream-form-item-label {\n    flex-basis: 28%;\n    padding-right: clamp(0.75rem, 1.5%, 1rem);\n    font-size: clamp(0.7875rem, 1.2vw, 0.875rem);\n  }\n  .cream-form .cream-row .cream-form-item {\n    flex-basis: 72%;\n  }\n  .cream-form .cream-form-submit-area button,\n  .cream-form .cream-form-submit-area .btn {\n    min-height: clamp(38px, 4vh, 40px);\n    padding: clamp(0.4rem, 0.8%, 0.5rem) clamp(0.75rem, 1.5%, 1rem);\n  }\n}\n@media (min-width: 992px) {\n  .cream-form {\n    padding: clamp(1.25rem, 2%, 1.5rem);\n    font-size: clamp(1rem, 1.2vw, 1.05rem);\n  }\n  .cream-form .cream-row {\n    margin-bottom: clamp(1.25rem, 1.5%, 1.5rem);\n  }\n  .cream-form .cream-row .cream-form-item-label {\n    flex-basis: 30%;\n    padding-right: clamp(1rem, 1.5%, 1.25rem);\n  }\n  .cream-form .cream-row .cream-form-item {\n    flex-basis: 70%;\n  }\n  .cream-form .cream-form-submit-area button,\n  .cream-form .cream-form-submit-area .btn {\n    min-height: clamp(40px, 3vh, 44px);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,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RUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxxQkFB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QUFXO0lBQ1gsa0NBQWtDO0VBQ3BDO0FBQ0Y7QUFDQTtFQUNFO0lBQ0UsaUNBQWlDO0lBQ2pDLHVDQUF1QztFQUN6QztFQUNBO0lBQ0UseUNBQXlDO0VBQzNDO0VBQ0E7SUFDRSxlQUFlO0lBQ2YseUNBQXlDO0lBQ3pDLDRDQUE0QztFQUM5QztFQUNBO0lBQ0UsZUFBZTtFQUNqQjtFQUNBOztJQUVFLGtDQUFrQztJQUNsQywrREFBK0Q7RUFDakU7QUFDRjtBQUNBO0VBQ0U7SUFDRSxtQ0FBbUM7SUFDbkMsc0NBQXNDO0VBQ3hDO0VBQ0E7SUFDRSwyQ0FBMkM7RUFDN0M7RUFDQTtJQUNFLGVBQWU7SUFDZix5Q0FBeUM7RUFDM0M7RUFDQTtJQUNFLGVBQWU7RUFDakI7RUFDQTs7SUFFRSxrQ0FBa0M7RUFDcEM7QUFDRiIsImZpbGUiOiJGb3JtLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4vKipcbiAqIEZvcm3nu4Tku7bln7rnoYDmoLflvI9cbiAqIOWfuuS6jkNyZWFtRGVzaWdu6K6+6K6h57O757ufXG4gKiDmlK/mjIHlpJrnq6/pgILphY3vvIjnp7vliqjnq6/jgIHlubPmnb/jgIHmoYzpnaLvvIlcbiAqL1xuLyoqXG4gKiBDcmVhbURlc2lnbiDorr7orqHns7vnu59cbiAqIOWfuuS6juaflOWSjOWltuayueiJsuiwg+eahOeOsOS7o+WMluiuvuiuoeezu+e7n1xuICovXG4udGV4dC1wcmltYXJ5IHtcbiAgY29sb3I6ICNhODU1Zjc7XG59XG5cbi50ZXh0LXByaW1hcnktZGFyayB7XG4gIGNvbG9yOiAjNTgxYzg3O1xufVxuXG4udGV4dC1zZWNvbmRhcnkge1xuICBjb2xvcjogIzg1YzFlOTtcbn1cblxuLnRleHQtc3VjY2VzcyB7XG4gIGNvbG9yOiAjNGNhZjUwO1xufVxuXG4udGV4dC13YXJuaW5nIHtcbiAgY29sb3I6ICNmZmMxMDc7XG59XG5cbi50ZXh0LWVycm9yIHtcbiAgY29sb3I6ICNmNDQzMzY7XG59XG5cbi50ZXh0LWluZm8ge1xuICBjb2xvcjogIzIxOTZmMztcbn1cblxuLnRleHQtZGlzYWJsZWQge1xuICBjb2xvcjogIzllOWU5ZTtcbn1cblxuLnRleHQtbmV1dHJhbC01MCB7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG4udGV4dC1uZXV0cmFsLTEwMCB7XG4gIGNvbG9yOiAjZjlmOWY5O1xufVxuXG4udGV4dC1uZXV0cmFsLTIwMCB7XG4gIGNvbG9yOiAjZjBmMGYwO1xufVxuXG4udGV4dC1uZXV0cmFsLTMwMCB7XG4gIGNvbG9yOiAjZTBlMGUwO1xufVxuXG4udGV4dC1uZXV0cmFsLTQwMCB7XG4gIGNvbG9yOiAjYmRiZGJkO1xufVxuXG4udGV4dC1uZXV0cmFsLTUwMCB7XG4gIGNvbG9yOiAjOWU5ZTllO1xufVxuXG4udGV4dC1uZXV0cmFsLTYwMCB7XG4gIGNvbG9yOiAjNzU3NTc1O1xufVxuXG4udGV4dC1uZXV0cmFsLTcwMCB7XG4gIGNvbG9yOiAjNjE2MTYxO1xufVxuXG4udGV4dC1uZXV0cmFsLTgwMCB7XG4gIGNvbG9yOiAjNDI0MjQyO1xufVxuXG4udGV4dC1uZXV0cmFsLTkwMCB7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4udGV4dC1oZWFkaW5nIHtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi50ZXh0LWJvZHkge1xuICBjb2xvcjogIzYxNjE2MTtcbn1cblxuLnRleHQtbXV0ZWQge1xuICBjb2xvcjogIzc1NzU3NTtcbn1cblxuLmZvbnQtc2l6ZS1iYXNlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uZm9udC1zaXplLWxnIHtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xufVxuXG4uZm9udC1zaXplLXNtIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cblxuLmZvbnQtc2l6ZS14cyB7XG4gIGZvbnQtc2l6ZTogMC43NjU2MjVyZW07XG59XG5cbi5mb250LXNpemUtaDEge1xuICBmb250LXNpemU6IDIuNXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oMiB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oMyB7XG4gIGZvbnQtc2l6ZTogMS43NXJlbTtcbn1cblxuLmZvbnQtc2l6ZS1oNCB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG4uZm9udC1zaXplLWg1IHtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xufVxuXG4uZm9udC1zaXplLWg2IHtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uZm9udC13ZWlnaHQtbGlnaHQge1xuICBmb250LXdlaWdodDogMzAwO1xufVxuXG4uZm9udC13ZWlnaHQtbm9ybWFsIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cblxuLmZvbnQtd2VpZ2h0LWJvbGQge1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uZm9udC13ZWlnaHQtbGlnaHRlciB7XG4gIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xufVxuXG4uZm9udC13ZWlnaHQtYm9sZGVyIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLmxpbmUtaGVpZ2h0LWJhc2Uge1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuXG4ubGluZS1oZWlnaHQtbGcge1xuICBsaW5lLWhlaWdodDogMjtcbn1cblxuLmxpbmUtaGVpZ2h0LXNtIHtcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XG59XG5cbi5saW5lLWhlaWdodC1ub25lIHtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG5cbi50ZXh0LWxlZnQge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4udGV4dC1jZW50ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi50ZXh0LXJpZ2h0IHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cbi50ZXh0LWp1c3RpZnkge1xuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuXG4uZm9udC1mYW1pbHktc2Fucy1zZXJpZiB7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xufVxuXG4uZm9udC1mYW1pbHktbW9ub3NwYWNlIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbn1cblxuYm9keSB7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGNvbG9yOiAjMjEyMTIxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuaDEge1xuICBmb250LXNpemU6IDIuNXJlbTtcbn1cblxuaDIge1xuICBmb250LXNpemU6IDJyZW07XG59XG5cbmgzIHtcbiAgZm9udC1zaXplOiAxLjc1cmVtO1xufVxuXG5oNCB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG5oNSB7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbn1cblxuaDYge1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbnAge1xuICBtYXJnaW4tdG9wOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuXG5hIHtcbiAgY29sb3I6ICNhODU1Zjc7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlO1xufVxuYTpob3ZlciB7XG4gIGNvbG9yOiByZ2IoMTQyLjgsIDcyLjI1LCAyMDkuOTUpO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbmE6Zm9jdXMge1xuICBvdXRsaW5lOiAycHggc29saWQgI2E4NTVmNztcbiAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbn1cblxuLmJnLXByaW1hcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTg1NWY3O1xufVxuXG4uYmctcHJpbWFyeS0xMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmM2ZmO1xufVxuXG4uYmctcHJpbWFyeS0yMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWRlOWZlO1xufVxuXG4uYmctcHJpbWFyeS0zMDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkNmZlO1xufVxuXG4uYmctcHJpbWFyeS00MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzRiNWZkO1xufVxuXG4uYmctcHJpbWFyeS02MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTMzM2VhO1xufVxuXG4uYmctcHJpbWFyeS03MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2UyMmNlO1xufVxuXG4uYmctcHJpbWFyeS04MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmIyMWE4O1xufVxuXG4uYmctcHJpbWFyeS05MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTgxYzg3O1xufVxuXG4uYmctc2Vjb25kYXJ5LWJsdWUtMTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjdmZjtcbn1cblxuLmJnLXNlY29uZGFyeS1ibHVlLTMwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkNmVhZjg7XG59XG5cbi5iZy1zZWNvbmRhcnktYmx1ZS01MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWVkNmYxO1xufVxuXG4uYmctc2Vjb25kYXJ5LXBpbmstMTAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZjJmODtcbn1cblxuLmJnLXNlY29uZGFyeS1waW5rLTMwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWRiZDg7XG59XG5cbi5iZy1zZWNvbmRhcnktcGluay01MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVjYmE3O1xufVxuXG4uYmctc2Vjb25kYXJ5LWdyZWVuLTEwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNGY2ZjA7XG59XG5cbi5iZy1zZWNvbmRhcnktZ3JlZW4tMzAwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcbn1cblxuLmJnLXNlY29uZGFyeS1ncmVlbi01MDAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTVkNmE3O1xufVxuXG4uYmctc3VjY2VzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FmNTA7XG59XG5cbi5iZy13YXJuaW5nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzEwNztcbn1cblxuLmJnLWVycm9yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcbn1cblxuLmJnLWluZm8ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xufVxuXG4uYmctbmV1dHJhbC01MCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbi5iZy1uZXV0cmFsLTEwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG59XG5cbi5iZy1uZXV0cmFsLTIwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG59XG5cbi5iZy1uZXV0cmFsLTMwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGUwZTA7XG59XG5cbi5iZy1uZXV0cmFsLTQwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNiZGJkYmQ7XG59XG5cbi5iZy1uZXV0cmFsLTUwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5ZTllOWU7XG59XG5cbi5iZy1uZXV0cmFsLTYwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM3NTc1NzU7XG59XG5cbi5iZy1uZXV0cmFsLTcwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2MTYxNjE7XG59XG5cbi5iZy1uZXV0cmFsLTgwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MjQyNDI7XG59XG5cbi5iZy1uZXV0cmFsLTkwMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTIxMjE7XG59XG5cbi5iZy1wcmltYXJ5LWxpZ2h0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjgsIDg1LCAyNDcsIDAuNyk7XG59XG5cbi5iZy1wcmltYXJ5LW1lZGl1bSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY4LCA4NSwgMjQ3LCAwLjUpO1xufVxuXG4uYmctcHJpbWFyeS1kYXJrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjgsIDg1LCAyNDcsIDAuMyk7XG59XG5cbi5ib3JkZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xufVxuXG4uYm9yZGVyLXByaW1hcnkge1xuICBib3JkZXItY29sb3I6ICNhODU1Zjc7XG59XG5cbi5ib3JkZXItc2Vjb25kYXJ5IHtcbiAgYm9yZGVyLWNvbG9yOiAjYWVkNmYxO1xufVxuXG4uYm9yZGVyLXN1Y2Nlc3Mge1xuICBib3JkZXItY29sb3I6ICM0Y2FmNTA7XG59XG5cbi5ib3JkZXItd2FybmluZyB7XG4gIGJvcmRlci1jb2xvcjogI2ZmYzEwNztcbn1cblxuLmJvcmRlci1lcnJvciB7XG4gIGJvcmRlci1jb2xvcjogI2Y0NDMzNjtcbn1cblxuLmJvcmRlci1uZXV0cmFsIHtcbiAgYm9yZGVyLWNvbG9yOiAjZTBlMGUwO1xufVxuXG4uYm9yZGVyLWRpdmlkZXIge1xuICBib3JkZXItY29sb3I6ICNmMGYwZjA7XG59XG5cbi5yb3VuZGVkIHtcbiAgYm9yZGVyLXJhZGl1czogMC4zNzVyZW07XG59XG5cbi5yb3VuZGVkLWxnIHtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xufVxuXG4ucm91bmRlZC1mdWxsIHtcbiAgYm9yZGVyLXJhZGl1czogOTk5OXB4O1xufVxuXG4uZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5mbGV4LXdyYXAge1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5pdGVtcy1jZW50ZXIge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uanVzdGlmeS1jZW50ZXIge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmdhcC0zIHtcbiAgZ2FwOiAwLjc1cmVtO1xufVxuXG4ubWItMiB7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLm1iLTYge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5wLTQge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ubWluLWgtc2NyZWVuIHtcbiAgbWluLWhlaWdodDogMTAwdmg7XG59XG5cbi5jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VkZTlmZTtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgzMywgMzMsIDMzLCAwLjEpO1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG4uY2FyZC5jYXJkLWhvdmVyIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XG59XG4uY2FyZC5jYXJkLWhvdmVyOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMzMsIDMzLCAzMywgMC4xNSk7XG59XG5cbi50YWcge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtO1xuICBib3JkZXItcmFkaXVzOiA5OTk5cHg7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi50YWctcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGQ2ZmU7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4udGFnLWJsdWUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDZlYWY4O1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLnRhZy1waW5rIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZGJkODtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi50YWctZ3JlZW4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmNWU5O1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLmZvcm0taW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMC41cmVtIDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlMGUwZTA7XG4gIGJvcmRlci1yYWRpdXM6IDAuMzc1cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogIzIxMjEyMTtcbn1cbi5mb3JtLWlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjYTg1NWY3O1xuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgxNjgsIDg1LCAyNDcsIDAuMik7XG59XG4uZm9ybS1pbnB1dDpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG4gIGNvbG9yOiAjOWU5ZTllO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4vKlxuOmV4cG9ydCB7XG4gIHByaW1hcnlDb2xvcjogJGNvbG9yLXByaW1hcnktNTAwO1xuICBzZWNvbmRhcnlDb2xvcjogJGNvbG9yLXNlY29uZGFyeS1ibHVlLTcwMDtcbiAgbmV1dHJhbENvbG9yOiAkY29sb3ItbmV1dHJhbC01MDA7XG4gIHN1Y2Nlc3NDb2xvcjogJGNvbG9yLXN1Y2Nlc3M7XG4gIHdhcm5pbmdDb2xvcjogJGNvbG9yLXdhcm5pbmc7XG4gIGVycm9yQ29sb3I6ICRjb2xvci1lcnJvcjtcbiAgYmFja2dyb3VuZENvbG9yOiAkY29sb3ItYmFja2dyb3VuZDtcbiAgdGV4dENvbG9yOiAkY29sb3ItdGV4dC1wcmltYXJ5O1xufSovXG4uY3JlYW0tZm9ybSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiBjbGFtcCgwLjc1cmVtLCAyJSwgMS41cmVtKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VkZTlmZTtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgzMywgMzMsIDMzLCAwLjEpO1xuICBib3gtc2hhZG93OiAwIDIgcHggNCBweCByZ2JhKDMzLCAzMywgMzMsIDAuMSk7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMC44NzVyZW0sIDEuMnZ3LCAxcmVtKTtcbn1cbi5jcmVhbS1mb3JtIC5jcmVhbS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgbWFyZ2luLWJvdHRvbTogY2xhbXAoMXJlbSwgMiUsIDEuNXJlbSk7XG59XG4uY3JlYW0tZm9ybSAuY3JlYW0tcm93LmNyZWFtLXJvdy1uby1sYWJlbCB7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmNyZWFtLWZvcm0gLmNyZWFtLXJvdy5jcmVhbS1yb3ctbm8tbGFiZWwge1xuICAgIG1hcmdpbi1sZWZ0OiAzMCU7XG4gICAgcGFkZGluZy1sZWZ0OiAxNHB4O1xuICB9XG59XG4uY3JlYW0tZm9ybSAuY3JlYW0tcm93IC5jcmVhbS1mb3JtLWl0ZW0tbGFiZWwge1xuICBmbGV4LWJhc2lzOiAzMCU7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiBjbGFtcCgwLjVyZW0sIDEuNSUsIDEuMjVyZW0pO1xuICBmb250LXNpemU6IGNsYW1wKDAuNzg3NXJlbSwgMS4xdncsIDFyZW0pO1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuLmNyZWFtLWZvcm0gLmNyZWFtLXJvdyAuY3JlYW0tZm9ybS1pdGVtLWxhYmVsID4gbGFiZWwuY3JlYW0tZm9ybS1pdGVtLXJlcXVpcmVkOmJlZm9yZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gIGNvbG9yOiAjZjQ0MzM2O1xuICBmb250LXNpemU6IGNsYW1wKDAuNzVyZW0sIDF2dywgMC44NzVyZW0pO1xuICBmb250LWZhbWlseTogU2ltU3VuLCBzYW5zLXNlcmlmO1xuICBsaW5lLWhlaWdodDogMTtcbiAgY29udGVudDogXCIqXCI7XG59XG4uY3JlYW0tZm9ybSAuY3JlYW0tcm93IC5jcmVhbS1mb3JtLWl0ZW0ge1xuICBmbGV4LWJhc2lzOiA3MCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5jcmVhbS1mb3JtIC5jcmVhbS1yb3cgLmNyZWFtLWZvcm0taXRlbSAuY3JlYW0tZm9ybS1pdGVtLWhhcy1lcnJvci5jcmVhbS1mb3JtLWl0ZW0tY29udHJvbCAuY3JlYW0taW5wdXQtaW5uZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjQ0MzM2O1xufVxuLmNyZWFtLWZvcm0gLmNyZWFtLXJvdyAuY3JlYW0tZm9ybS1pdGVtIC5jcmVhbS1mb3JtLWl0ZW0taGFzLWVycm9yLmNyZWFtLWZvcm0taXRlbS1jb250cm9sIC5jcmVhbS1pbnB1dC1pbm5lcjpmb2N1cyB7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDI0NCwgNjcsIDU0LCAwLjIpO1xufVxuLmNyZWFtLWZvcm0gLmNyZWFtLXJvdyAuY3JlYW0tZm9ybS1pdGVtIC5jcmVhbS1mb3JtLWl0ZW0tZXhwbGFpbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtMjVweDtcbiAgbGVmdDogMDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgY29sb3I6ICNmNDQzMzY7XG4gIG1pbi13aWR0aDogMTAwcHg7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMC43cmVtLCAxdncsIDAuODc1cmVtKTtcbn1cbi5jcmVhbS1mb3JtIC5jcmVhbS1mb3JtLXN1Ym1pdC1hcmVhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogY2xhbXAoMC41cmVtLCAxJSwgMXJlbSk7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLXRvcDogY2xhbXAoMXJlbSwgMiUsIDEuNXJlbSk7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAuY3JlYW0tZm9ybSB7XG4gICAgcGFkZGluZzogY2xhbXAoMC41cmVtLCAxLjUlLCAxcmVtKTtcbiAgICBmb250LXNpemU6IGNsYW1wKDAuNzg3NXJlbSwgMnZ3LCAwLjg3NXJlbSk7XG4gIH1cbiAgLmNyZWFtLWZvcm0gLmNyZWFtLXJvdyB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBtYXJnaW4tYm90dG9tOiBjbGFtcCgwLjc1cmVtLCAyJSwgMS4yNXJlbSk7XG4gIH1cbiAgLmNyZWFtLWZvcm0gLmNyZWFtLXJvdy5jcmVhbS1yb3ctbm8tbGFiZWwge1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgfVxuICAuY3JlYW0tZm9ybSAuY3JlYW0tcm93IC5jcmVhbS1mb3JtLWl0ZW0tbGFiZWwge1xuICAgIGZsZXgtYmFzaXM6IDEwMCU7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIHBhZGRpbmctYm90dG9tOiBjbGFtcCgwLjI1cmVtLCAwLjUlLCAwLjVyZW0pO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMC43NDM3NXJlbSwgMS44dncsIDAuODc1cmVtKTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIG1hcmdpbi1ib3R0b206IDAuMjVyZW07XG4gIH1cbiAgLmNyZWFtLWZvcm0gLmNyZWFtLXJvdyAuY3JlYW0tZm9ybS1pdGVtIHtcbiAgICBmbGV4LWJhc2lzOiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5jcmVhbS1mb3JtIC5jcmVhbS1yb3cgLmNyZWFtLWZvcm0taXRlbSAuY3JlYW0tZm9ybS1pdGVtLWV4cGxhaW4ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3R0b206IGF1dG87XG4gICAgbWFyZ2luLXRvcDogMC4yNXJlbTtcbiAgICBmb250LXNpemU6IGNsYW1wKDAuNjVyZW0sIDEuNXZ3LCAwLjc1cmVtKTtcbiAgfVxuICAuY3JlYW0tZm9ybSAuY3JlYW0tZm9ybS1zdWJtaXQtYXJlYSB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuY3JlYW0tZm9ybSAuY3JlYW0tZm9ybS1zdWJtaXQtYXJlYSBidXR0b24sXG4gIC5jcmVhbS1mb3JtIC5jcmVhbS1mb3JtLXN1Ym1pdC1hcmVhIC5idG4ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IGNsYW1wKDQwcHgsIDZ2aCwgNDRweCk7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDk5MXB4KSB7XG4gIC5jcmVhbS1mb3JtIHtcbiAgICBwYWRkaW5nOiBjbGFtcCgxcmVtLCAyJSwgMS4yNXJlbSk7XG4gICAgZm9udC1zaXplOiBjbGFtcCgwLjg3NXJlbSwgMS4zdncsIDFyZW0pO1xuICB9XG4gIC5jcmVhbS1mb3JtIC5jcmVhbS1yb3cge1xuICAgIG1hcmdpbi1ib3R0b206IGNsYW1wKDFyZW0sIDEuNSUsIDEuMjVyZW0pO1xuICB9XG4gIC5jcmVhbS1mb3JtIC5jcmVhbS1yb3cgLmNyZWFtLWZvcm0taXRlbS1sYWJlbCB7XG4gICAgZmxleC1iYXNpczogMjglO1xuICAgIHBhZGRpbmctcmlnaHQ6IGNsYW1wKDAuNzVyZW0sIDEuNSUsIDFyZW0pO1xuICAgIGZvbnQtc2l6ZTogY2xhbXAoMC43ODc1cmVtLCAxLjJ2dywgMC44NzVyZW0pO1xuICB9XG4gIC5jcmVhbS1mb3JtIC5jcmVhbS1yb3cgLmNyZWFtLWZvcm0taXRlbSB7XG4gICAgZmxleC1iYXNpczogNzIlO1xuICB9XG4gIC5jcmVhbS1mb3JtIC5jcmVhbS1mb3JtLXN1Ym1pdC1hcmVhIGJ1dHRvbixcbiAgLmNyZWFtLWZvcm0gLmNyZWFtLWZvcm0tc3VibWl0LWFyZWEgLmJ0biB7XG4gICAgbWluLWhlaWdodDogY2xhbXAoMzhweCwgNHZoLCA0MHB4KTtcbiAgICBwYWRkaW5nOiBjbGFtcCgwLjRyZW0sIDAuOCUsIDAuNXJlbSkgY2xhbXAoMC43NXJlbSwgMS41JSwgMXJlbSk7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xuICAuY3JlYW0tZm9ybSB7XG4gICAgcGFkZGluZzogY2xhbXAoMS4yNXJlbSwgMiUsIDEuNXJlbSk7XG4gICAgZm9udC1zaXplOiBjbGFtcCgxcmVtLCAxLjJ2dywgMS4wNXJlbSk7XG4gIH1cbiAgLmNyZWFtLWZvcm0gLmNyZWFtLXJvdyB7XG4gICAgbWFyZ2luLWJvdHRvbTogY2xhbXAoMS4yNXJlbSwgMS41JSwgMS41cmVtKTtcbiAgfVxuICAuY3JlYW0tZm9ybSAuY3JlYW0tcm93IC5jcmVhbS1mb3JtLWl0ZW0tbGFiZWwge1xuICAgIGZsZXgtYmFzaXM6IDMwJTtcbiAgICBwYWRkaW5nLXJpZ2h0OiBjbGFtcCgxcmVtLCAxLjUlLCAxLjI1cmVtKTtcbiAgfVxuICAuY3JlYW0tZm9ybSAuY3JlYW0tcm93IC5jcmVhbS1mb3JtLWl0ZW0ge1xuICAgIGZsZXgtYmFzaXM6IDcwJTtcbiAgfVxuICAuY3JlYW0tZm9ybSAuY3JlYW0tZm9ybS1zdWJtaXQtYXJlYSBidXR0b24sXG4gIC5jcmVhbS1mb3JtIC5jcmVhbS1mb3JtLXN1Ym1pdC1hcmVhIC5idG4ge1xuICAgIG1pbi1oZWlnaHQ6IGNsYW1wKDQwcHgsIDN2aCwgNDRweCk7XG4gIH1cbn0iXX0= */";
styleInject_es.styleInject(css_248z);

// name: 字段名称，对应表单控件的唯一标识
// value: 字段当前值，初始为空字符串
// rules: 验证规则数组，类型为any[]以便灵活扩展
// isValid: 字段验证状态，布尔类型
function fieldsReducer(state, action) {
    switch (action.type) {
        case 'addField':
            return {
                ...state,
                [action.name]: { ...action.value },
            };
        case 'updateField':
            return {
                ...state,
                [action.name]: { ...state[action.name], ...action.value },
            };
        case 'updateValidateResult':
            return {
                ...state,
                [action.name]: { ...state[action.name], ...action.value },
            };
        default:
            return state;
    }
}
function useStore(initialValues) {
    const [form, setForm] = React.useState({
        isValid: true,
    });
    //   创建Reducer:返回更新的数据和dispatch函数
    const [fields, dispatchFields] = React.useReducer(fieldsReducer, {});
    const getFieldValue = (name) => {
        var _a;
        return (_a = fields[name]) === null || _a === void 0 ? void 0 : _a.value;
    };
    // 因为descriptor的类型是{ [x: string]: CustomRule[]; }，所以需要转换为{ [x: string]: RuleItem[]; }
    const transformedRules = function (rules) {
        // 如果 rules 为空或 undefined，返回空数组
        if (!rules || rules.length === 0) {
            return [];
        }
        const result = []; // 结果数组
        rules.forEach(rule => {
            // 过滤掉 null 或 undefined 的规则
            if (rule == null) {
                return;
            }
            if (typeof rule === 'function') {
                const customRule = rule({ getFieldValue });
                // 如果转换后的规则是 null 或 undefined，跳过
                if (customRule != null) {
                    result.push(customRule);
                }
            }
            else {
                // 如果规则是 RuleItem，直接添加
                result.push(rule);
            }
        }); // 遍历规则数组，如果规则是函数，则转换为 RuleItem，否则直接添加到结果数组
        return result;
    };
    const validateField = async (name) => {
        const field = fields[name];
        if (!field)
            return;
        const { value, rules } = field;
        const valueMap = { [name]: value };
        // 转换规则并包装成 descriptor 对象格式
        // 注意！！！而 Schema 需要对象格式的 descriptor
        const transformedRuleItems = transformedRules(rules);
        const descriptor = { [name]: transformedRuleItems };
        // 创建 Schema 实例并验证
        const validator = new Schema(descriptor);
        let isValid = true;
        let errors = [];
        try {
            await validator.validate(valueMap);
            isValid = true;
            errors = [];
        }
        catch (e) {
            isValid = false;
            // async-validator 的错误对象有 errors 属性
            errors = e.errors || [];
        }
        dispatchFields({
            type: 'updateValidateResult',
            name,
            value: { isValid, errors },
        });
    };
    // 整体表单验证函数
    const validateAllFields = async () => {
        let fieldErrors = {};
        // 获取值和规则，我们使用lodash-es的mapValues方法
        // 注意：这里直接使用 fields，因为 useReducer 返回的 fields 总是最新的
        const valueMap = lodashEs.mapValues(fields, field => field.value);
        // 进行转换：将CustomRule[]转换为RuleItem[]
        // 只处理有规则的字段
        const rulesMap = {};
        lodashEs.each(fields, (field, name) => {
            if (field.rules && field.rules.length > 0) {
                const transformedRuleItems = transformedRules(field.rules);
                if (transformedRuleItems.length > 0) {
                    rulesMap[name] = transformedRuleItems;
                }
            }
        });
        // 如果没有需要验证的字段，直接返回
        if (Object.keys(rulesMap).length === 0) {
            return {
                isValid: true,
                errors: {},
                values: valueMap,
            };
        }
        // 创建Schema实例进行验证
        const validator = new Schema(rulesMap);
        // 设置表单状态为开始验证
        // 使用函数式更新，避免闭包问题
        setForm(prevForm => ({ ...prevForm, isSubmitting: true }));
        try {
            await validator.validate(valueMap);
            // 验证通过，清除所有字段的错误
            lodashEs.each(fields, (field, name) => {
                if (field.rules && field.rules.length > 0) {
                    dispatchFields({
                        type: 'updateField',
                        name,
                        value: {
                            isValid: true,
                            errors: [],
                        },
                    });
                }
            });
            // 没有错误
            fieldErrors = {};
        }
        catch (e) {
            // async-validator 的错误对象格式
            const errorFields = e.fields || {};
            fieldErrors = errorFields;
            // 遍历所有字段，更新错误状态
            lodashEs.each(fields, (field, name) => {
                const fieldErrorList = errorFields[name] || [];
                if (fieldErrorList.length > 0) {
                    dispatchFields({
                        type: 'updateField',
                        name,
                        value: {
                            isValid: false,
                            errors: fieldErrorList,
                        },
                    });
                }
                else if (field.rules && field.rules.length > 0) {
                    dispatchFields({
                        type: 'updateField',
                        name,
                        value: {
                            isValid: true,
                            errors: [],
                        },
                    });
                }
            });
        }
        finally {
            // 基于 fieldErrors 计算最终是否有效
            const finalIsValid = Object.keys(fieldErrors).length === 0;
            // 确保使用函数式更新，避免状态合并问题
            setForm(prevForm => ({
                ...prevForm,
                isSubmitting: false,
                isValid: finalIsValid,
            }));
        }
        // 返回信息
        return {
            isValid: Object.keys(fieldErrors).length === 0, // 基于错误计算
            errors: fieldErrors,
            values: valueMap,
        };
    };
    // 获取所有值
    const getAllFields = () => {
        return lodashEs.mapValues(fields, field => field.value);
    };
    // 设置值
    const setFieldValue = (name, value) => {
        if (fields[name]) {
            dispatchFields({
                type: 'updateField',
                name,
                value,
            });
        }
    };
    // 重置字段值
    const resetFields = () => {
        // 重置所有字段的值和错误状态
        lodashEs.each(fields, (field, name) => {
            // 如果有 initialValues，使用 initialValues 中的值，否则使用空值
            const resetValue = initialValues && initialValues[name] !== undefined
                ? initialValues[name]
                : '';
            dispatchFields({
                type: 'updateField',
                name,
                value: {
                    value: resetValue,
                    isValid: true,
                    errors: [],
                },
            });
        });
        // 重置表单状态
        setForm({ isValid: true, isSubmitting: false });
    };
    return {
        form,
        setForm,
        fields,
        dispatchFields,
        validateField,
        getFieldValue,
        validateAllFields,
        resetFields,
        getAllFields,
        setFieldValue,
    };
}

const FormContext = React.createContext({
    dispatchFields: () => { },
    fields: {},
    validateField: async (name) => { },
    initialValues: {},
});
// 注意这里的类型要使用泛型来定义，因为ref是React.RefObject<HTMLFormElement>类型
const Form = React.forwardRef((props, ref) => {
    const { name = 'form', children, className, style, initialValues, onFinish, onFinishFailed, } = props;
    // 初始化store
    const { form, setForm, fields, dispatchFields, ...restProps } = useStore(initialValues);
    const { validateField, validateAllFields } = restProps;
    // 创建内部 ref 用于 DOM 元素
    const formRef = React.useRef(null);
    // 使用 useImperativeHandle 暴露表单方法给外部 ref
    React.useImperativeHandle(ref, () => ({
        ...restProps,
        setForm, // 添加 setForm，因为 FormRefType 需要它
    }));
    // filedItem挂载之后需要修改store的状态，使用dispatchFields进行修改
    // 父传子显然是行不通的
    // 我们采用context进行状态管理
    const contextValue = {
        dispatchFields,
        fields,
        validateField,
        initialValues,
    };
    async function onFormSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        // 执行表单验证
        const { isValid, errors, values } = await validateAllFields();
        // 根据验证结果调用相应的回调
        if (isValid) {
            if (onFinish) {
                onFinish(values);
            }
        }
        else {
            if (onFinishFailed) {
                onFinishFailed(values, errors);
            }
        }
    }
    let childrenNode = null;
    if (typeof children === 'function') {
        childrenNode = children(form);
    }
    else {
        childrenNode = children;
    }
    return (jsxRuntime.jsx("form", { className: "cream-form", style: style, onSubmit: onFormSubmit, ref: formRef, children: jsxRuntime.jsx(FormContext.Provider, { value: contextValue, children: childrenNode }) }));
});

const FormItem = props => {
    var _a, _b;
    const { name = 'form-item', valuePropsName = 'value', trigger = 'onChange', getValueFormEvent = (e) => {
        return e.target.value;
    }, validateTrigger = 'onBlur', rules = [], children, label, error, className, } = props;
    const rowClassName = classNames('cream-row', label ? '' : 'cream-row-no-label', className);
    // 构造标签样式
    const labelClassName = classNames('cream-form-item-label', label ? 'cream-form-item-required' : '', className);
    // 构造控件样式
    const controlClassName = classNames('cream-form-item', error ? 'cream-form-item-has-error' : '', className);
    // 从context中获取dispatchFields和fields
    const { dispatchFields, fields, initialValues, validateField } = React.useContext(FormContext);
    // 通过name获取fields中的字段-就是value
    const field = fields[name || 'form'];
    // 使用空字符串作为默认值，避免 uncontrolled -> controlled 警告
    const value = (_a = field === null || field === void 0 ? void 0 : field.value) !== null && _a !== void 0 ? _a : '';
    const errors = (_b = field === null || field === void 0 ? void 0 : field.errors) !== null && _b !== void 0 ? _b : [];
    const onValueUpdate = (e) => {
        const value = getValueFormEvent(e);
        // console.log('newValue', value);
        // console.log('newValue e.target', e.target);
        dispatchFields({
            type: 'updateField',
            name: name || 'form',
            value: {
                value,
            },
        });
    };
    // 1.手动创建一个列表,需要有value和onChange属性
    const propsList = {};
    // Q:需要适应不同的事件和value属性名称
    // 需要验证children类型并显示警告
    // 目前仅支持单一表单元素作为children
    // 使用默认值确保这些属性不为 undefined
    const finalValuePropsName = valuePropsName || 'value';
    const finalTrigger = trigger || 'onChange';
    propsList[finalValuePropsName] = value;
    propsList[finalTrigger] = onValueUpdate;
    // 2.我们要获取children数组的第一个元素
    const childList = React.Children.toArray(children);
    // 对childList进行判断，只有一个元素才行
    if (childList.length !== 1) {
        console.warn('FormItem组件只能有一个子元素');
    }
    const child = childList[0];
    // 默认在onBlur事件触发验证
    // 可通过validateTrigger属性自定义触发事件
    // 验证规则rules作为可选属性传递给FormItem
    // 使用默认值确保 validateTrigger 不为 undefined
    const finalValidateTrigger = validateTrigger || 'onBlur';
    if (rules && rules.length > 0) {
        const existingHandler = child.props[finalValidateTrigger];
        // 合并事件处理函数，避免覆盖原有的处理函数
        propsList[finalValidateTrigger] = async (e) => {
            // 先执行原有的事件处理函数
            if (existingHandler) {
                existingHandler(e);
            }
            // 然后执行验证
            await validateField(name);
        };
    }
    // 3.使用cloneElement,混合这个child以及手动的属性列表
    // 过滤掉 undefined 值，避免 React 警告
    const filteredPropsList = Object.fromEntries(Object.entries(propsList).filter(([_, value]) => value !== undefined));
    const clonedChild = React.cloneElement(child, {
        ...child.props,
        ...filteredPropsList,
        id: name,
    });
    // 在挂载的时候挂载一次form-item
    React.useEffect(() => {
        if (!name)
            return;
        // 检查字段是否已存在，避免重复初始化
        // if (fields[name]) return;
        // 从 initialValues 中获取初始值
        let value = '';
        if (initialValues && initialValues[name]) {
            value = initialValues[name];
        }
        dispatchFields({
            type: 'addField',
            name,
            // 传入字段基本信息：name、label、rules等
            value: {
                label,
                name,
                value,
                rules: rules,
                isValid: true,
                errors: [],
            },
        });
        // 只在挂载时执行一次，所以依赖数组为空
        // 注意：由于闭包，这里读取的 initialValues 和 name 是挂载时的值
        // 如果 initialValues 在挂载时已经传入，应该能正常工作
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (jsxRuntime.jsxs("div", { className: rowClassName, children: [label && (jsxRuntime.jsx("div", { className: labelClassName, children: jsxRuntime.jsx("label", { htmlFor: name, children: label }) })), jsxRuntime.jsxs("div", { className: controlClassName, children: [jsxRuntime.jsx("div", { className: "cream-input-wrapper", children: clonedChild }), errors.length > 0 ? (jsxRuntime.jsx("div", { className: "cream-form-item-explain", children: errors[0].message })) : (error && jsxRuntime.jsx("div", { className: "cream-form-item-explain", children: error }))] })] }));
};

// 组件需求：
// 元素多样性：支持Input、Radio、Checkbox、Select等多种表单元素类型
// 布局灵活性：可自定义表单元素的排列方式，支持无label或添加辅助文本
// 提交区域定制：完全自定义提交区域的按钮样式、文本和排列方式
// 单个元素验证：默认在blur事件触发，可配置为input事件实时验证
// 全局验证：点击提交按钮时触发所有表单元素的验证
// 验证规则
// 内置规则：支持非空检查、字符串类型验证、长度限制等常见规则
// 自定义规则：可实现跨字段验证（如密码一致性检查）
// 异步验证：支持发送请求后根据返回结果进行验证
// 多规则组合：单个字段可配置多条验证规则
// 重置功能：支持一键重置所有表单元素到初始状态
// 组件结构设计：
// 最简单的是使用json进行配置，每个表单元素对应一个json对象，包含类型、名称、标签、验证规则等信息。
// 缺点：不够语义化，布局灵活性差，组件属性扩展困难
// 所以使用语义化方案：
// <Form>
//   <FormItem name="username" label="用户名">
//     <Input />
//   </FormItem>
//   <FormItem name="gender" label="性别">
//     <RadioGroup>
//       <Radio value="male">男</Radio>
//       <Radio value="female">女</Radio>
//     </RadioGroup>
//   </FormItem>
//   <FormItem name="hobbies" label="爱好">
//     <CheckboxGroup>
//       <Checkbox value="reading">阅读</Checkbox>
//       <Checkbox value="travel">旅行</Checkbox>
//       <Checkbox value="sports">运动</Checkbox>
//     </CheckboxGroup>
//   </FormItem>
//   <FormItem name="city" label="城市">
//     <Select>
//       <SelectOption value="beijing">北京</SelectOption>
//       <SelectOption value="shanghai">上海</SelectOption>
//       <SelectOption value="guangzhou">广州</SelectOption>
//     </Select>
//    <FormItem/>
// </Form>
// 开发的步骤：
// 实现基础布局和静态展示
// 添加数据初始化和更新功能
// 实现验证功能（包括时机和规则）
// 处理后续衍生需求
// 关于数据交互：
// 表单数据在父子组件间的流转需要解决三个关键问题：
// 表单值存储位置
// 单个输入项的验证触发机制
// 整体表单的验证触发方式
// 方法1：
// 值存储：采用受控组件模式，每个Item组件内部使用useState管理value
// 验证机制：
// 每个Item内部实现validateInput函数
// 在blur等特定时机触发验证
// 验证时结合当前value和rules属性进行校验
// 但是：Form组件无法通过ref获取children中的Item实例
// 无法在onSubmit时调用所有Item的validateInput函数
// 法2：引入中央存储store作为数据中介，统一管理表单状态和验证逻辑
// Form组件初始化store
// store结构：
// {
//     files: {
//         username: {
//             value: '',
//             rules: [],
//             error: '',
//             name: 'username',
//         }
//     },
//     // 整个表单的验证状态
//     form: {
//         isValid: false
//     }
// }
// Item组件注册字段到store
// Item组件在初始化时，将自身的name、value、rules等属性注册到store的files对象中
// 输入的时候，Item组件监听input事件，更新store中对应字段的value
// 在blur事件触发时，调用validateInput函数进行验证，更新error字段
// 两者共享store中的数据和验证方法
// 在Form组件中，监听submit事件，调用validateAllInputs函数进行验证
// 遍历所有fields执行validateInput
// 汇总结果更新form.isValid
// 拓展方法：clearInputs：清空所有字段值
// 自动更新store中的数据：
// 采用受控组件设计模式，每个表单元素的value都由store管理，输入时实时更新store中的数据。
// 因为是受控组件，所以我们是要修改children中的value属性
// 先创建一个新的propsList对象，将value属性和onChange事件添加到其中
// 使用cloneElement进行创建新的元素，将新的propsList合并到其中
// 但是目前还有一个问题，value和onChange事件是手动创建的，需要适应不同的事件和value属性名称
// 我们多添加三个属性：valuePropsName、trgger、getValueFormEvent
// valuePropsName：value属性的名称
// trgger：触发事件
// getValueFormEvent：获取value的函数
// export interface FormItemProps {
//     name?: string;
//     children?: ReactNode;
//     label?: string;
//     required?: boolean;
//     error?: string;
//     labelWidth?: string; // 可选：自定义标签宽度
//     controlWidth?: string; // 可选：自定义控件宽度
//     className?: string;
//     // 添加三个属性来适应不同的事件和value属性名称
//     valuePropsName?: string;
//     trigger?: string;
//     getValueFormEvent?: (e: any) => any;
//   }
// const onValueUpdate = (e: any) => {
//     const value = getValueFormEvent!(e);
//     // console.log('newValue', value);
//     // console.log('newValue e.target', e.target);
//     dispatchFields({
//       type: 'updateField',
//       name: name || 'form',
//       value: {
//         value,
//       },
//     });
//   };
//   // 1.手动创建一个列表,需要有value和onChange属性
//   const propsList: Record<string, any> = {};
//   // Q:需要适应不同的事件和value属性名称
//   // 需要验证children类型并显示警告
//   // 目前仅支持单一表单元素作为children
//   propsList[valuePropsName!] = value;
//   propsList[trigger!] = onValueUpdate;
//   // 2.我们要获取children数组的第一个元素
//   const childList = React.Children.toArray(children);
//   const child = childList[0] as ReactElement<any, string>;
//   // 3.使用cloneElement,混合这个child以及手动的属性列表
//   const clonedChild = React.cloneElement(child, {
//     ...child.props,
//     ...propsList,
//   });
// 初始值：使用initialValue属性来设置初始值
// 单个Form Item添加验证
// 一、验证功能
// 1. 验证的流程
// 核心要素：由规则(rules)和值(value)组成，在特定时机（如onBlur）触发验证逻辑
// 验证场景：
// 单个Item的验证
// 整个Form的验证
// 执行过程：通过规则+值的组合，在特定时机调用验证逻辑处理最终结果
// 2. 第三方库
// 1）第三方库介绍
// 库名称：async-validator（GitHub 7.6k star）
// 特点：
// 被多个主流框架采用（如React、Vue等）
// 提供丰富的预设验证类型
// 支持异步验证
// 基本结构：
// 2）第三方库使用案例
// 预设类型：
// string：字符串类型（默认）
// number：数字类型
// boolean：布尔类型
// regexp：正则表达式
// integer：整数
// float：浮点数
// array：数组
// object：对象
// enum：枚举值
// 验证器创建：
// 验证方式：
// 回调方式：
// Promise方式：
// 规则属性：
// required：是否必填
// pattern：正则匹配
// min/max：范围限制
// len：精确长度
// validator：自定义验证函数
// 多规则验证：
// 二、单个Item验证
// 1. 验证store设计
// 核心字段:
// rules: RuleItem[]; // 验证规则数组，类型为RuleItem[]以便灵活扩展
// isValid: boolean; // 字段验证状态，布尔类型
// errors: ValidateError[]; // 错误信息数组，存储多条验证错误信息
// 2. 验证function编写
// 关键依赖:
// 从async-validator导入Schema、RuleItem和ValidateError类型
// 使用React的useReducer管理表单状态
// 验证流程:
// 创建descriptor对象，将字段名与对应规则关联
// 构建valueMap包含待验证的字段值
// 初始化验证器实例new Schema(descriptor)
// 使用try-catch处理验证结果，更新isValid和errors状态
// const validateField = async (name: string) => {
//     const field = fields[name];
//     if (!field) return;
//     const { value, rules } = field;
//     const descriptor = { [name]: rules };
//     const valueMap = { [name]: value };
//     // 创建 Schema 实例并验证
//     const validator = new Schema(descriptor);
//     let isValid = true;
//     let errors: ValidateError[] = [];
//     try {
//       await validator.validate(valueMap);
//       isValid = true;
//       errors = [];
//     } catch (e: any) {
//       isValid = false;
//       // async-validator 的错误对象有 errors 属性
//       errors = e.errors || [];
//     }
//     dispatchFields({
//       type: 'updateValidateResult',
//       name,
//       value: { isValid, errors },
//     });
//   };
// 3. 验证form编写
// Context设计:
// 通过FormContext传递dispatch、fields和validateField方法
// FormItem组件通过context获取验证能力
// 触发机制:
// 默认在onBlur事件触发验证
// 可通过validateTrigger属性自定义触发事件
// 验证规则rules作为可选属性传递给FormItem
//   // 默认在onBlur事件触发验证
//   // 可通过validateTrigger属性自定义触发事件
//   // 验证规则rules作为可选属性传递给FormItem
//   if (rules && rules.length > 0 && validateTrigger) {
//     const existingHandler = child.props[validateTrigger];
//     // 合并事件处理函数，避免覆盖原有的处理函数
//     propsList[validateTrigger] = async (e: any) => {
//       // 先执行原有的事件处理函数
//       if (existingHandler) {
//         existingHandler(e);
//       }
//       // 然后执行验证
//       await validateField(name!);
//     };
//   }
//   // 默认在onBlur事件触发验证
//   // 可通过validateTrigger属性自定义触发事件
//   // 验证规则rules作为可选属性传递给FormItem
//   if (rules && rules.length > 0) {
//     const trigger = validateTrigger;
//     propsList[trigger] = async () => {
//       await validateField(name!);
//     };
//   }
// // FormItem中的控制属性添加
// if (rules) {
//   controlProps[validateTrigger] = async () => {
//     await validateField(name);
//   };
// }
// "username": {
//     "label": "用户名",
//     "name": "username",
//     "value": "",
//     "rules": [
//       {
//         "required": true,
//         "message": "请输入用户名"
//       }
//     ],
//     "isValid": false,
//     "errors": [
//       {
//         "message": "请输入用户名",
//         "fieldValue": "",
//         "field": "username"
//       }
//     ]
//   },
// 添加错误提示，根据fields中的errors数组，显示错误提示
// {/* <div className={controlClassName}>
// <div className="cream-input-wrapper">{clonedChild}</div>
// {errors.length > 0 ? (
//   <div className="cream-form-item-explain">{errors[0].message}</div>
// ) : (
//   error && <div className="cream-form-item-explain">{error}</div>
// )}
// </div> */}
// 现在的rule是这样的：
// rules={[
//     {
//       required: true,
//       message: '请输入用户名',
//     },
//     {
//       min: 3,
//       message: '用户名长度不能小于3位',
//     },
//     {
//       max: 10,
//       message: '用户名长度不能大于10位',
//     },
//   ]}
// 现在我们发现难以处理跨字段验证，比如密码和确认密码的验证
// const password = getFieldValue('password');
// const passwordConfirm = getFieldValue('passwordConfirm');
// console.log('password', password);
// console.log('passwordConfirm', passwordConfirm);
// if (password !== passwordConfirm) {
//    Promise.reject({ message: '密码和确认密码不一致' });
// }
//  Promise.resolve();
// 我们通过函数参数传递getValue方法，实现跨字段验证
// CustomRuleFunc: 接收包含getFieldValue方法的对象，返回RuleItem
// CustomRule: RuleItem与CustomRuleFunc的联合类型
// 使用混合类型就可以了
// 但是这里要注意，descriptor的类型是{ [x: string]: CustomRule[]; }，所以需要转换为{ [x: string]: RuleItem[]; }
// const transformedRules = function (rules: CustomRule[]): RuleItem[] {
//     const result: RuleItem[] = []; // 结果数组
//     rules.forEach(rule => {
//       if (typeof rule === 'function') {
//         const customRule = rule({ getFieldValue });
//         result.push(customRule);
//       } else {
//         // 如果规则是 RuleItem，直接添加
//         result.push(rule);
//       }
//     }); // 遍历规则数组，如果规则是函数，则转换为 RuleItem，否则直接添加到结果数组
//     return result;
//   };
//     // 转换规则并包装成 descriptor 对象格式
//     // 注意！！！而 Schema 需要对象格式的 descriptor
//     const transformedRuleItems = transformedRules(rules);
//     const descriptor = { [name]: transformedRuleItems };
// 测试：
// ({ getFieldValue }) => {
//     return {
//       validator: (rule: any, value: any, callback: (error?: Error) => void) => {
//         const password = getFieldValue('password');
//         const passwordConfirm = getFieldValue('passwordConfirm');
//         if (password !== passwordConfirm) {
//           Promise.reject({ message: '密码和确认密码不一致' });
//         } else {
//           Promise.resolve();
//         }
//       },
//     };
//   },
// 但是现在又有问题了，我们应该是return一个Promise，但是async-validator的validator不支持直接返回Promise，需要使用回调模式，并在内部处理Promise：
// const customRule: CustomRule[] = [
//     { type: 'string', required: true, message: ' 请再次输入密码' },
//     { min: 3, message: '用户名长度不能小于3位' },
//     { max: 10, message: '用户名长度不能大于10位' },
//     ({ getFieldValue }) => {
//       return {
//         validator: (rule: any, value: any, callback: (error?: Error) => void) => {
//           const password = getFieldValue('password');
//           const passwordConfirm = getFieldValue('passwordConfirm');
//           // 使用 Promise 进行验证，但通过 callback 返回结果
//           // 验证逻辑：如果密码不一致，reject；否则 resolve
//           const validationPromise =
//             password !== passwordConfirm
//               ? Promise.reject({ message: '密码和确认密码不一致' })
//               : Promise.resolve();
//           validationPromise
//             .then(() => {
//               // 验证通过
//               callback();
//             })
//             .catch((error: any) => {
//               // 验证失败
//               const message = error?.message || '验证失败';
//               callback(new Error(message));
//             });
//         },
//       };
//     },
//   ];
// 整个表单的验证：
// 最开始的思路应该是遍历所有FormItem上的validate进行一个验证，但是这样做太费性能，也很麻烦
// 验过程当中，验证值和验证规则是很重要的，那我们就可以拿到所有的验证值和验证规则然后进行整体校验
// 添加张泰：
// isValid: 初始值为true，表示表单验证状态
// isSubmitting: 初始值为false，表示表单提交状态
// errors: 初始为空对象，记录所有字段的错误信息
// 函数validateAllFields：验证整体的白哦单
// 我们需要切换格式：
// 将字段对象从{username: {value: 'abc', rules: [...]}}格式
// 转换为{username: 'abc'}和{username: [...]}两种格式
// 借助工具库：
// 工具库选择:
// 使用lodash-es而非原生lodash
// 原因：lodash-es导出ES模块，打包体积更小
// 核心方法:
// mapValues：对对象每个值进行转换
// 进行验证：
// 使用mapValues生成valueMap
// 使用mapValues生成rules描述符
//  // 获取值和规则，我们使用lodash-es的mapValues方法
//  const valueMap = mapValues(fields, field => field.value);
//  // 进行转换：将CustomRule[]转换为RuleItem[]
//  const rulesMap = mapValues(fields, field => transformedRules(field.rules));
// 创建Schema实例进行验证
// 错误处理：
// 定义ValidateErrorType接口
// export interface FormErrors extends Error {
//     fields?: Record<string, ValidateError>;
//     errors?: ValidateError[];
//   }
// 使用类型断言处理错误对象
// catch (e: any) {
//     isValid = false;
//     const error = e as FormErrors;
//     const errors = error.errors || [];
//     // 开始each进行遍历
//     each(fields, (value, name: string) => {
//       // 如果说errors中存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
//       if (errors[name as any]) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: false,
//             errors: errors[name as any],
//           },
//         });
//         // 如果说errors中不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
//       }
// dispatch进行更新：
// 字段循环处理：需要循环处理表单中的fields字段，每个字段包含两个关键参数
// 参数说明：
// value：对应字段的当前值
// name：字段的标识名称（字幕中提到的"t"应为name的误读）
// 这里要注意的是，如果errors里面存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
// 如果errors里面不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
// try {
//     await validator.validate(valueMap);
//   } catch (e: any) {
//     isValid = false;
//     const error = e as FormErrors;
//     const errors = error.errors || [];
//     // 开始each进行遍历
//     each(fields, (value, name: string) => {
//       // 如果说errors中存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
//       if (errors[name as any]) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: false,
//             errors: errors[name as any],
//           },
//         });
//         // 如果说errors中不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
//       } else if (!errors[name as any] && !value.rules) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: true,
//           },
//         });
//       }
//     });
//   } finally {
//     setForm({ ...form, isSubmitting: false, isValid, errors });
//   }
//   最后记得返回一些参数供后面使用
//   return {
//     isValid,
//     errors,
//     values: valueMap,
//   };
// 1、特定时机表单验证
// 提交时机验证: 在表单提交时(onSubmit事件)进行整体验证，这是最关键的验证时机
// <form className="cream-form" style={style} onSubmit={onFormSubmit}>
// 事件处理: 需要阻止默认事件(e.preventDefault())和停止冒泡(e.stopPropagation())
// 验证流程: 通过validateAllFields方法获取验证结果，包含isValid、errors和values三个关键属性
// async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     e.stopPropagation();
//     const { isValid, errors, values } = await validateAllFields();
//     if (isValid) {
//       onFinish?.(values);
//     } else {
//       onFinishFailed?.(values, errors);
//     }
//   }
// 2、添加特定事件
// 在and里面发现有onFinish和onFinishFailed事件，我们可以在onFormSubmit中调用这两个事件
// onFinish事件:
// 触发条件: 表单验证成功后触发
// 参数: 包含所有表单值的values对象(Record<string, any>)
// 返回值: void
// onFinishFailed事件:
// 触发条件: 表单验证失败后触发
// 参数: values对象和errors对象(Record<string, ValidateError[]>)
// 返回值: void
// 事件调用: 根据validateAllFields返回的isValid值决定触发哪个事件
// 基于前面的表单验证体系，我们已经实现了：
// ✅ 完整的验证规则机制（基础规则 + 自定义函数规则）
// ✅ 灵活的状态管理（单独验证 + 整体验证）
// ✅ 智能的错误处理（onFinish/onFinishFailed回调）
// 但存在一个关键限制：UI 展示被硬编码在组件内部。
// // 当前实现：UI 与逻辑耦合
// <FormItem name="username">
//   <Input /> {/* 只能渲染 Input 组件 */}
// </FormItem>
// ReactProps: 我们可以通过ReactProps来实现UI展示，
// 比如可以实现多平台适配：
// // Web 使用 Input
// <FormItem name="username" render={() => <input />} />
// // 移动端使用 TextInput
// <FormItem name="username" render={() => <TextInput />} />
// // 自定义设计系统
// <FormItem name="username" render={() => <MyCustomInput />} />
// 比如可以实现条件渲染：
// <FormItem
//   name="email"
//   render={(fieldProps) => (
//     fieldProps.value.includes('@gmail.com')
//       ? <GmailInput {...fieldProps} />
//       : <NormalInput {...fieldProps} />
//   )}
// />
// 如何实现呢？就是对children进行处理，如果children是函数，则调用函数，如果children是组件，则渲染组件
// export type ReactProps = (formProps: FormState) => ReactNode;
// let childrenNode = null;
// if (typeof children === 'function') {
//   childrenNode = children(form);
// } else {
//   childrenNode = children;
// }
// 提供实例给外界提供更多的自定义方法
// 设置值
// 重置值
// 1、获取所有值
// 通过之前的mapValues进行设置
// 2、设置值
// 判断是否存在后进行dispatch，type为update value，值为name和value <end>
// 3、重置字段值
// reset fields功能：将字段恢复到初始值
// initialValues参数：
// 类型：key为string，值为any
// 是否必须：否
// 实现恢复功能的方法：传入initialvalues参数，循环对应值进行恢复，判断是否存在并更新值
// // 获取所有值
// const getAllFields = () => {
//     return mapValues(fields, field => field.value);
//   };
//   // 设置值
//   const setFieldValue = (name: string, value: any) => {
//     if (fields[name]) {
//       dispatchFields({
//         type: 'updateField',
//         name,
//         value,
//       });
//     }
//   };
//   // 重置字段值
//   const resetFields = () => {
//     if (initialValues) {
//       each(initialValues, (value, name) => {
//         if (fields[name]) {
//           dispatchFields({
//             type: 'updateField',
//             name,
//             value,
//           });
//         }
//       });
//     }
//     暴露组件实例
//     1. ref属性
//     基本用法: 使用useRef()创建ref对象，通过ref属性绑定到DOM元素后，可通过访问DOM节点
//     2. forwardRef
//     作用: 将ref自动传递通过组件到其子元素的技术
//     实现方式: 使用包裹组件，接收props和ref两个参数
//     // 注意这里的类型要使用泛型来定义，因为ref是React.RefObject<HTMLFormElement>类型
// export const Form: FC<FormProps> = forwardRef<HTMLFormElement, FormProps>(
//     <div>
//     <form
//       className="cream-form"
//       style={style}
//       onSubmit={onFormSubmit}
//       ref={ref}
//     >
//     使用：
//     const ref = useRef<HTMLFormElement>(null);
//   return (
//     <Form style={{ width: '400px' }} {...args} ref={ref}>
//       {formState => {
//         return (
//             <Button
//             btnType={ButtonType.Primary}
//             onClick={() => {
//               console.log(ref.current);
//             }}
//           >
//             获取表单实例
//           </Button>
//         </Form>
//       );
// <form class="cream-form" style="width: 400px;"><div class="cream-row"><div class="cream-form-item-label cream-form-item-required"><label>用户名</label></div><div class="cream-form-item"><div class="cream-input-wrapper"><input type="text" value=""></div><div class="cream-form-item-explain">请输入用户名</div></div></div><div class="cream-row"><div class="cream-form-item-label cream-form-item-required"><label>密码</label></div><div class="cream-form-item"><div class="cream-input-wrapper"><input type="password" value=""></div><div class="cream-form-item-explain">请输入密码</div></div></div><div class="cream-row"><div class="cream-form-item-label cream-form-item-required"><label>确认密码</label></div><div class="cream-form-item"><div class="cream-input-wrapper"><input type="password" value=""></div><div class="cream-form-item-explain"> 请再次输入密码</div></div></div><div class="cream-row cream-row-no-label"><div class="cream-form-item"><div class="cream-input-wrapper"><input type="email" value=""></div></div></div><div class="cream-row cream-row-no-label"><div class="cream-form-item"><div class="cream-input-wrapper"><button class="btn btn-primary btn-normal" aria-disabled="false" aria-busy="false" type="submit" value="">提交失败</button></div></div></div><button class="btn btn-primary btn-normal" aria-disabled="false" aria-busy="false">获取表单实例</button></form>
// 3. useImperativeHandle
// 我们不希望Ref返回的是节点，而是上面的方法(实例)
// 功能: 自定义通过ref暴露给父组件的实例值
// 参数结构:
// 工作原理: 返回的对象会成为ref.current的值
// Form实例方法暴露
// 实现步骤:
// 定义IFormRef类型，使用Omit排除不需要暴露的字段，剩下的就是我们想要的。
// 修改forwardRef泛型为
// 使用useImperativeHandle暴露指定方法
// ...restProps拿出剩下的函数，后面传入对象的时候不必把所有的方法拿出来，只需要传入这个就可以了
// useImperativeHandle进行自定义，传入ref和对应的方法
//   // 使用 useImperativeHandle 暴露表单方法给外部 ref
//   useImperativeHandle(ref, () => ({
//     ...restProps,
//     setForm, // 添加 setForm，因为 FormRefType 需要它
//   }));
//   const { form, setForm, fields, dispatchFields, ...restProps } =
//   useStore(initialValues);
//   export type FormRefType = Omit<
//   ReturnType<typeof useStore>,
//   'form' | 'dispatchFields' | 'fields'
// >;
// 使用的时候要注意，不要把按钮放在FormItem里面，因为FormItem会自动添加一个div包裹，这样会导致按钮无法正常显示
// <div>
// <Button
//   btnType={ButtonType.Primary}
//   type="button"
//   onClick={e => {
//     e.preventDefault();
//     e.stopPropagation();
//     ref.current?.resetFields();
//   }}
// >
//   重置
// </Button>
// </div>
// 总结：
// 一、Form表单开发流程总结
// 1. 分析需求，明确组件结构
// 需求分析：根据业务需求确定组件应具备的功能和结构，明确JSX的编写方式
// 结构设计：规划表单组件的基础布局和父子组件关系
// 2. 完成组件基本的静态展示
// 静态阶段：仅实现UI展示，不包含任何数据交互和功能逻辑
// 开发重点：专注于视觉呈现和基础DOM结构搭建
// 3. 提取store作为中枢及桥梁
// 核心思想：使用提取公共store作为数据中枢
// 架构优势：store同时承担父子组件通信桥梁的角色
// 实现方式：通过useStore自定义hook管理全局状态
// 4. 注册Item到store
// 注册时机：组件mount后通过dispatch执行addField操作
// 注册内容：将label、name、value、rules等表单元信息存入store
// 数据关联：通过useContext获取store中的dispatch和fields
// 5. Item表单更新，更新store中的数据
// 黑魔法技术：使用混入control props
// 更新流程：表单变化→触发onValueUpdate→dispatchupdateValue
// props注入：动态添加value和onChange等控制属性
// 6. 自定义Item的字段及完善默认值
// 扩展机制：在controlProps中添加个性化字段如valuePropName
// 默认值处理：通过initialValues初始化表单字段值
// 子组件校验：确保children是有效的ReactElement且数量唯一
// 7. 添加单个Item的验证
// 验证核心：使用库处理校验逻辑
// 方法封装：validateField函数负责单个字段校验
// 规则转换：通过transfromRules处理自定义校验规则
// 8. 添加表单整体的验证
// 批量验证：validateAllFields收集所有字段值统一校验
// 状态管理：验证时设置isSubmitting为true
// 错误处理：捕获ValidateErrorType并更新错误状态
// 9. 添加组件实例方法
// 方法集合：包括getFieldsValue、setFieldValue、resetFields等
// 暴露技术：组合使用forwardRef和useImperativeHandle
// 类型定义：通过IFormRef类型约束暴露的方法签名
// 10. 内容总结
// 设计原则：先设计后编码，确立核心架构（树根和树干）
// 扩展建议：参考antd API继续完善组件功能
// 后续任务：补充单元测试和不同场景的stories案例
// 开发心得：复杂组件需要良好的前期设计和状态管理方案
const TransForm = Form;
TransForm.FormItem = FormItem;

exports.default = TransForm;
//# sourceMappingURL=index.cjs.js.map
