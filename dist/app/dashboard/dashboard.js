'use strict';

ConfigureModule.$inject = ["$stateProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _core = require('common/core');

var _popup = require('common/components/popup');

var _popup2 = _interopRequireDefault(_popup);

var _time = require('common/components/time');

var _time2 = _interopRequireDefault(_time);

var _DashboardController = require('./DashboardController');

var _dashboards = require('./dashboards.tpl');

var _dashboards2 = _interopRequireDefault(_dashboards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ngInject */
function ConfigureModule($stateProvider) {
  $stateProvider.state('dashboards', {
    url: '/dashboards',
    templateUrl: _dashboards2.default.name,
    controller: _DashboardController.DashboardController,
    controllerAs: 'dashboardCtrl'
  });
}

exports.default = _angular2.default.module('dashboard', [_core.modalModule.name, _popup2.default.name, _time2.default.name, _dashboards2.default.name]).config(ConfigureModule);
//# sourceMappingURL=../../sourcemaps/app/dashboard/dashboard.js.map
