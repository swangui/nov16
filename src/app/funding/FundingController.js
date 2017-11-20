import R from 'ramda';
import moment from 'moment';

export default class FundingController{

  /*@ngInject*/
  constructor($scope, $localStorage, ConsoleService, BitfinexApi){
      let ctrl = this;

      this.$scope = $scope;
      this.$localStorage = $localStorage;
      this.BitfinexApi = BitfinexApi;

      this.strategy = ['FRR', 'CI', 'ON'];
      this.sIndex = 0;
      this.fundingStats = [];
      this.fundingProvided = [];

      if ($localStorage.api) {
          $scope.$applyAsync(() => {
              ctrl.api_key = $localStorage.api.key;
              ctrl.api_secret = $localStorage.api.secret;
          });
      }

      this.establishWssConnection(() => {
          this.BitfinexApi.authenticate(ctrl.api_key, ctrl.api_secret);
      });

      this.BitfinexApi.onWalletSnapshot((data) => {
          const wallet = data[2];
          const fundingStats = wallet.filter(w => w[0] === 'funding')
              .map(f => {
                   return {
                       currency: f[1],
                       balance: f[1] === 'USD' ? f[2].toFixed(2) : f[2],
                   }
              })
          this.updateFundingStats(fundingStats);
          
      });

      this.BitfinexApi.onFundingCreditsSnapshot((data) => {
          const now = moment();
          const credits = data[2].map( credit => {
              credit = R.zipObj([
                  'ID',
                  'SYMBOL',
                  'SIDE',
                  'MTS_CREATE',
                  'MTS_UPDATE',
                  'AMOUNT',
                  'FLAGS',
                  'STATUS',
                  '_PLACEHOLDER_0',
                  '_PLACEHOLDER_1',
                  '_PLACEHOLDER_2',
                  'RATE',
                  'PERIOD',
                  'MTS_OPENING',
                  'MTS_LAST_PAYOUT',
                  'NOTIFY',
                  'HIDDEN',
                  '_PLACEHOLDER',
                  'RENEW',
                  'RATE_REAL',
                  'NO_CLOSE',
                  'POSITION_PAIR',
              ], credit);

              credit.SYMBOL = credit.SYMBOL.replace(/^f/, '');
              credit.RATE_REAL = credit.RATE === 0 ?
                                 credit.RATE_REAL * 100 + ' FRR':
                                 credit.RATE_REAL * 100;
              /*
              credit.MTS_CREATE = moment(credit.MTS_CREATE).format('Y/M/D HH:mm:ss');
              credit.MTS_UPDATE = moment(credit.MTS_UPDATE).format('Y/M/D HH:mm:ss');
              credit.MTS_OPENING = moment(credit.MTS_OPENING).format('Y/M/D HH:mm:ss');
              credit.MTS_LAST_PAYOUT = moment(credit.MTS_LAST_PAYOUT).format('Y/M/D HH:mm:ss');
              //*/
              //*
              credit.MTS_CREATE = moment(credit.MTS_CREATE).fromNow();
              credit.MTS_UPDATE = moment(credit.MTS_UPDATE).fromNow();
              credit.MTS_OPENING = moment(credit.MTS_OPENING).fromNow();
              credit.MTS_LAST_PAYOUT = moment(credit.MTS_LAST_PAYOUT).fromNow();
              //*/

              return credit;
          });
          this.updateFundingProvided(credits);
      });
  }

  updateFundingStats(stats) {
      this.fundingStats = stats;
      this.$scope.$apply();
  }

  updateFundingProvided(credits) {
      this.fundingProvided = credits;
      this.$scope.$apply();
  }

  saveApiCredentials() {
      this.$localStorage.api = {
          key: this.api_key,
          secret: this.api_secret
      };
  }

  establishWssConnection(callback) {
      this.BitfinexApi.establishWssConnection(callback);
  }
}
