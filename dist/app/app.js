'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel/external-helpers');

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

require('angular-ui-router');

require('ocLazyLoad');

require('common/core');

var _routing = require('common/utils/routing');

var _routing2 = _interopRequireDefault(_routing);

require('bootstrap3');

require('bootstrap3/css/bootstrap.css!');

require('angular-ui-bootstrap');

require('ngstorage');

require('font-awesome');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _angular2.default.module('demo', ['ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'ngStorage']);

app.config((0, _routing2.default)(app));

app.config(['$urlRouterProvider', '$locationProvider', '$compileProvider', '$logProvider', '$httpProvider', '$ocLazyLoadProvider', function ($urlRouterProvider, $locationProvider, $compileProvider, $logProvider, $httpProvider, $ocLazyLoadProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/funding');

  if (window.prod) {
    $logProvider.debugEnabled(false);
    // http://ng-perf.com/2014/10/24/simple-trick-to-speed-up-your-angularjs-app-load-time/
    $compileProvider.debugInfoEnabled(false);
  }

  $ocLazyLoadProvider.config({
    debug: true
  });
}]);

_angular2.default.element(document).ready(function () {
  _angular2.default.bootstrap(document.body, [app.name], {
    strictDi: true
  });
});

exports.default = app;
//# sourceMappingURL=../sourcemaps/app/app.js.map
