'use strict';

ConfigureModule.$inject = ["$stateProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _select = require('common/components/select');

var _select2 = _interopRequireDefault(_select);

var _date = require('common/components/date');

var _date2 = _interopRequireDefault(_date);

var _modal = require('common/components/modal');

var _modal2 = _interopRequireDefault(_modal);

var _user = require('common/services/user');

var _user2 = _interopRequireDefault(_user);

var _LoginController = require('./LoginController');

var _login = require('./login.tpl');

var _login2 = _interopRequireDefault(_login);

var _signup = require('./signup.tpl');

var _signup2 = _interopRequireDefault(_signup);

require('./login.css!');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ngInject */
function ConfigureModule($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: _login2.default.name,
    controller: _LoginController.LoginController,
    controllerAs: 'loginCtrl'
  });

  $stateProvider.state('login.signup', {
    url: '/login/signup',
    templateUrl: _signup2.default.name
  });
}

exports.default = _angular2.default.module('login', [_select2.default.name, _date2.default.name, _modal2.default.name, _user2.default.name, _login2.default.name, _signup2.default.name]).config(ConfigureModule);
//# sourceMappingURL=../../sourcemaps/app/login/login.js.map
