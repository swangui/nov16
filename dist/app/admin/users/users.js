'use strict';

ConfigureModule.$inject = ["$stateProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _UsersController = require('./UsersController');

var _users = require('./users.tpl');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ngInject */


// import modalModule from 'common/components/modal';
// import selectModule from 'common/components/select';
// import dateModule from 'common/components/date';
// import timeModule from 'common/components/time';

function ConfigureModule($stateProvider) {
  $stateProvider.state('admin.users', {
    url: '/users',
    templateUrl: _users2.default.name,
    controller: _UsersController.UsersController,
    controllerAs: 'usersCtrl'
  });
}

exports.default = _angular2.default.module('admin.users', [
// modalModule.name,
// dateModule.name,
// timeModule.name,
// selectModule.name,
_users2.default.name]).config(ConfigureModule);
//# sourceMappingURL=../../../sourcemaps/app/admin/users/users.js.map
