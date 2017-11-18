export default class FundingController{

  /*@ngInject*/
  constructor($scope){
      this.strategy = ['FRR', 'CI', 'ON'];
      this.sIndex = 0;
      this.state = {
          sIndex: 0,
      };
  }

}
