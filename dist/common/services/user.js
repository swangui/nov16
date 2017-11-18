'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurrentUser = function () {
  /*@ngInject*/
  CurrentUser.$inject = ["$q"];
  function CurrentUser($q) {
    _classCallCheck(this, CurrentUser);

    this.$q = $q;
  }

  _createClass(CurrentUser, [{
    key: 'getUser',
    value: function getUser() {
      var deferred = $q.defer();

      deferred.resolve({
        name: 'Panda'
      });

      return deferred.promise;
    }
  }]);

  return CurrentUser;
}();

;

exports.default = _angular2.default.module('user', []).factory('CurrentUser', CurrentUser);
//# sourceMappingURL=../../sourcemaps/common/services/user.js.map
