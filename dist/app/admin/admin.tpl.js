'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('app/admin/admin.tpl.html', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('app/admin/admin.tpl.html', '<h5>Admin</h5><a ui-sref="admin.builder" href="#">Builder</a> <a ui-sref="admin.users" href="#">Users</a><ui-view></ui-view>');
}]);