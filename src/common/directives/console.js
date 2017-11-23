import angular from 'angular';

import ConsoleServiceModule from 'common/services/console';

let Console = () => {
  return {
      template: '<div>'
              + '<span ng-click="toggle()">'
              + '<i class="fa fa-toggle-{{isAutoScroll ? \'on\' : \'off\'}}" aria-hidden="true"></i>'
              + ' Auto Scrolling'
              + '</span>'
              + '</div>'
              + '<textarea readonly></textarea>',
      controller: [
         '$scope', '$element', 'ConsoleService',
      function($scope, $element, ConsoleService) {
          let textarea = $element.find('textarea');
          ConsoleService.setTextarea(textarea);
          ConsoleService.ready();
          $scope.isAutoScroll = ConsoleService.getAutoScroll();
          $scope.toggle = () => {
              ConsoleService.toggleAutoScroll();
          }
          $scope.$on('console_autoscroll_toggled', () => {
              $scope.isAutoScroll = ConsoleService.getAutoScroll();
              $scope.$applyAsync();
          });
      }],
      controllerAs: 'console',
  }
};

export default angular
  .module('Console', [
      ConsoleServiceModule.name
  ])
  .directive('console', [Console]);
