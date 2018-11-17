'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ylCache = require('yl-cache');

var _ylCache2 = _interopRequireDefault(_ylCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deepCopy = function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
};

var YlPersistentVar = function () {
  function YlPersistentVar() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'yl-persistent-var';

    _classCallCheck(this, YlPersistentVar);

    var key = 'yl-persistent-var' + (name ? '-' + name : '');
    this._isBrowser = typeof localStorage !== 'undefined';
    if (this._isBrowser) {
      this._cache = new _ylCache2.default(key);
      this._state = this._cache.get('data') || {};
    } else {
      this._state = {};
    }
    this._save();
  }

  _createClass(YlPersistentVar, [{
    key: 'setState',
    value: function setState(newState) {
      if (typeof newState === 'function') {
        this._state = deepCopy(newState(deepCopy(this._state)));
      } else if ((typeof newState === 'undefined' ? 'undefined' : _typeof(newState)) === 'object') {
        this._state = _extends({}, deepCopy(this._state), deepCopy(newState));
      }
      this._save();
    }
  }, {
    key: 'getState',
    value: function getState() {
      return deepCopy(this._state);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._state = {};
      this._save();
    }
  }, {
    key: '_save',
    value: function _save() {
      if (this._isBrowser) {
        this._cache.set('data', this._state);
      }
    }
  }]);

  return YlPersistentVar;
}();

exports.default = YlPersistentVar;