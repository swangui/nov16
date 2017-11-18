'use strict';

FundingModule.$inject = ["$stateProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _FundingController = require('./FundingController');

var _FundingController2 = _interopRequireDefault(_FundingController);

var _funding = require('./funding.tpl');

var _funding2 = _interopRequireDefault(_funding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ngInject */
function FundingModule($stateProvider) {
  $stateProvider.state('funding', {
    url: '/funding',
    templateUrl: _funding2.default.name,
    controller: _FundingController2.default,
    controllerAs: 'ctrl'
  });
}

exports.default = _angular2.default.module('funding', [_funding2.default.name]).config(FundingModule);
//# sourceMappingURL=../../sourcemaps/app/funding/funding.js.map
