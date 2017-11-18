'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('app/login/login.tpl.html', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('app/login/login.tpl.html', '<h1>Login: {{loggedin}}</h1><a href="#" ui-sref="login.signup">Signup</a><div style="margin-top:20px"><strong>Theme:</strong><select ng-model="theme"><option value="dark">Dark</option><option value="light">Light</option></select></div><div class="content"></div><div ui-view=""></div>');
}]);