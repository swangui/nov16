export default class FundingController{

  /*@ngInject*/
  constructor($scope, $localStorage, ConsoleService, BitfinexApi){
      let ctrl = this;

      this.$localStorage = $localStorage;
      this.BitfinexApi = BitfinexApi;

      this.strategy = ['FRR', 'CI', 'ON'];
      this.sIndex = 0;

      this.state = {
          sIndex: 0,
      };

      if ($localStorage.api) {
          $scope.$applyAsync(() => {
              ctrl.api_key = $localStorage.api.key;
              ctrl.api_secret = $localStorage.api.secret;
          });
      }

      this.testConn();
  }

  saveApiCredentials() {
      this.$localStorage.api = {
          key: this.api_key,
          secret: this.api_secret
      };
  }

  testConn() {
      this.BitfinexApi.testConn();
  }
}
