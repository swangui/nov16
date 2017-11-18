'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('ui-router-extras');

var _routes = require('app/routes.json!');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routing = function routing(module) {

  module.requires.push('ct.ui.router.extras.future');

  var RouterConfig = ['$stateProvider', '$futureStateProvider', function ($stateProvider, $futureStateProvider) {

    $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', function ($q, $ocLazyLoad, futureState) {
      var def = $q.defer();

      System.import(futureState.src).then(function (loaded) {
        var newModule = loaded;
        if (!loaded.name) {
          var key = Object.keys(loaded);
          newModule = loaded[key[1]];
        }

        $ocLazyLoad.load(newModule).then(function () {
          def.resolve();
        }, function () {
          console.log('error loading: ' + loaded.name);
        });
      });

      return def.promise;
    }]);

    _routes2.default.forEach(function (r) {
      $futureStateProvider.futureState(r);
    });
  }];

  return RouterConfig;
};

exports.default = routing;
//# sourceMappingURL=../../sourcemaps/common/utils/routing.js.map
