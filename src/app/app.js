import 'babel/external-helpers';

import angular from 'angular';
import 'angular-ui-router';
import 'ocLazyLoad';
import 'common/core';
import routing from 'common/utils/routing';
import 'bootstrap3'
import 'bootstrap3/css/bootstrap.css!'
import 'angular-ui-bootstrap';
import 'ngstorage';
import 'font-awesome';

let app = angular.module('demo', [
  'ui.bootstrap',
  'ui.router',
  'oc.lazyLoad',
  'ngStorage'
]);

app.config(routing(app));

app.config(['$urlRouterProvider', '$locationProvider', '$compileProvider', '$logProvider', '$httpProvider', '$ocLazyLoadProvider', function ($urlRouterProvider, $locationProvider, $compileProvider, $logProvider, $httpProvider, $ocLazyLoadProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/funding');

  if(window.prod){
    $logProvider.debugEnabled(false);
    // http://ng-perf.com/2014/10/24/simple-trick-to-speed-up-your-angularjs-app-load-time/
    $compileProvider.debugInfoEnabled(false);
  }

  $ocLazyLoadProvider.config({
    debug: true
  });
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document.body, [ app.name ], {
    strictDi: true
  });
});

export default app;
