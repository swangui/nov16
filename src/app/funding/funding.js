import angular from 'angular';

import FundingController from './FundingController';
import fundingTemplate from './funding.tpl';
import BfxModule from 'common/services/bfx';
import ConsoleDirective from 'common/directives/console';

/* @ngInject */
function FundingModule($stateProvider){
  $stateProvider.state('funding', {
    url: '/funding',
    templateUrl: fundingTemplate.name,
    controller: FundingController,
    controllerAs: 'ctrl'
  });
}

export default angular
  .module('funding', [
    fundingTemplate.name,
    BfxModule.name,
    ConsoleDirective.name
  ])
  .config(FundingModule);
