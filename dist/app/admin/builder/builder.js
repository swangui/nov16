'use strict';

ConfigureModule.$inject = ["$stateProvider"];
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _modal = require('common/components/modal');

var _modal2 = _interopRequireDefault(_modal);

var _select = require('common/components/select');

var _select2 = _interopRequireDefault(_select);

var _BuilderController = require('./BuilderController');

var _builder = require('./builder.tpl');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @ngInject */
function ConfigureModule($stateProvider) {
  $stateProvider.state('admin.builder', {
    url: '/builder',
    templateUrl: _builder2.default.name,
    controller: _BuilderController.BuilderController,
    controllerAs: 'builderCtrl'
  });
}

exports.default = _angular2.default.module('admin.builder', [_modal2.default.name, _select2.default.name, _builder2.default.name]).config(ConfigureModule);
//# sourceMappingURL=../../../sourcemaps/app/admin/builder/builder.js.map
