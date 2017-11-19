import angular from 'angular';

import ConsoleServiceModule from 'common/services/console';

let Console = () => {
  return {
      template: '<textarea readonly></textarea>',
      controller: [
         '$scope', '$element', 'ConsoleService',
      function($scope, $element, ConsoleService) {
          let textarea = $element.find('textarea');
          ConsoleService.setTextarea(textarea);
          ConsoleService.ready();
      }],
      controllerAs: 'console',
  }
};

export default angular
  .module('Console', [
      ConsoleServiceModule.name
  ])
  .directive('console', [Console]);
