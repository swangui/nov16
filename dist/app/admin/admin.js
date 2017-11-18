'use strict';

ConfigureModule.$inject = ["$stateProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _builder = require('app/admin/builder/builder');

var _builder2 = _interopRequireDefault(_builder);

var _users = require('app/admin/users/users');

var _users2 = _interopRequireDefault(_users);

var _AdminController = require('./AdminController');

var _admin = require('./admin.tpl');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ngInject */
function ConfigureModule($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: _admin2.default.name,
    controller: _AdminController.AdminController,
    controllerAs: 'adminCtrl'
  });
}

exports.default = _angular2.default.module('admin', [_builder2.default.name, _users2.default.name, _admin2.default.name]).config(ConfigureModule);
//# sourceMappingURL=../../sourcemaps/app/admin/admin.js.map
