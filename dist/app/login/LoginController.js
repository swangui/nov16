'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController =

/* @ngInject */
["$scope", function LoginController($scope) {
  _classCallCheck(this, LoginController);

  $scope.loggedin = false;

  $scope.$watch('theme', function (newVal, oldVal, ev) {
    if (!newVal) return;
    System.import('assets/' + newVal + '.css!').then(function (loaded) {
      angular.element(document.body).addClass(newVal);
    });
  });
}];

exports.default = LoginController;
//# sourceMappingURL=../../sourcemaps/app/login/LoginController.js.map
