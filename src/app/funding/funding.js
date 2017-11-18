import angular from 'angular';

import FundingController from './FundingController';
import fundingTemplate from './funding.tpl';

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
    fundingTemplate.name
  ])
  .config(FundingModule);
