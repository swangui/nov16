'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

require('angular-mocks');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CurrentUser', function () {
  beforeEach(_angular2.default.mock.module(_user2.default.name));

  var CurrentUser, scope;

  beforeEach(inject(function ($injector) {
    CurrentUser = $injector.get('CurrentUser');
    scope = $injector.get('$rootScope');
  }));

  describe('.get', function () {
    it('has a user', function () {
      var user;
      CurrentUser.getUser().then(function (data) {
        user = data;
      });

      scope.$digest();

      expect(user).toEqual({ name: 'Panda' });
    });
  });
});
//# sourceMappingURL=../../sourcemaps/common/services/user.spec.js.map
