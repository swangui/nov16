'use strict';

ConfigureModule.$inject = ["$stateProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _modal = require('common/components/modal');

var _modal2 = _interopRequireDefault(_modal);

var _forms = require('./forms.tpl');

var _forms2 = _interopRequireDefault(_forms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ngInject */
function ConfigureModule($stateProvider) {
  $stateProvider.state('forms', {
    url: '/forms',
    templateUrl: _forms2.default.name
  });
}

exports.default = _angular2.default.module('forms', [_forms2.default.name, _modal2.default.name]).config(ConfigureModule);
//# sourceMappingURL=../../sourcemaps/app/forms/forms.js.map
