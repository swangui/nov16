'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('app/login/signup.tpl.html', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('app/login/signup.tpl.html', '<h2>Sign up for deals!</h2>');
}]);