const R = require('ramdajs');

import moment from 'moment';
import toastr from 'toastr';

toastr.options = {
  'closeButton': false,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-top-center',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
};

export default class FundingController{

  /*@ngInject*/
  constructor($scope, $localStorage, ConsoleService, BitfinexApi){
      let ctrl = this;

      this.ConsoleService = ConsoleService;
      this.$scope = $scope;
      this.$localStorage = $localStorage;
      this.BitfinexApi = BitfinexApi;

      this.fundingStats = [];
      this.fundingProvided = [];
      this.isWssConnecting = false;
      this.isWssConnected = false;
      this.authStatus = null;
      this.permission = [];

      if ($localStorage.api) {
          $scope.$applyAsync(() => {
              ctrl.api_key = $localStorage.api.key;
              ctrl.api_secret = $localStorage.api.secret;
          });
      }

      this.BitfinexApi.onWssDisconnect((data) => {
          this.updateAuthStatus('disconnected');
      });

      this.BitfinexApi.onAuth((data) => {
          this.setConnectingStatus(false);
          if (data.status === 'OK') {
              this.updateAuthStatus('succeeded');
              this.setPermission(data.caps);
          } else {
              this.updateAuthStatus('failed');
          }
      });

      this.BitfinexApi.onWalletSnapshot((data) => {
          const wallet = data[2];
          const fundingStats = wallet.filter(w => w[0] === 'funding')
              .map(f => {
                   return {
                       currency: f[1],
                       balance: f[1] === 'USD' ? this.round(f[2], 2) : f[2],
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
              credit.RATE = this.round(credit.RATE * 100, 6);
              credit.RATE_REAL = this.round(credit.RATE_REAL * 100, 6);
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

  round(number, adjust) {
      const shift = Math.pow(10, adjust);
      return Math.round(number * shift)/shift;
  }

  updateFundingDetailsUnderCurrency(credits) {
      this.fundingStats.map(funding => {
          const provided = R.pipe(
            R.filter(
              R.allPass([
                R.propEq('SYMBOL', funding.currency),
                R.propEq('SIDE', 1)
              ])
            ),
            R.pluck('AMOUNT'),
            R.sum
          )(credits);

          const unused = funding.balance - provided;
          const efficiency = provided/funding.balance * 100;

          funding.provided = funding.currency === 'USD'
                           ? this.round(provided, 2)
                           : provided;
          funding.unused = funding.currency === 'USD'
                           ? this.round(unused, 2)
                           : unused;
          funding.efficiency = this.round(efficiency, 2);
          return funding;
      });
  }

  updateAuthStatus(status) {
      if (status === 'succeeded') {
          const msg = 'Successfully authenticated';
          this.setConnectionStatus(true);
          toastr['success'](msg);
          this.ConsoleService.log(msg);
      }
      else if (status === 'failed') {
          const msg = 'Authentication Failed';
          this.setConnectionStatus(false);
          toastr['error'](msg);
          this.ConsoleService.log(msg);
      }
      else if (status === 'disconnected') {
          const msg = 'Disconnected';
          if (this.authStatus !== 'failed') {
              toastr['success'](msg);
          }
          this.setConnectionStatus(false);
      }
      this.authStatus = status;
      this.$scope.$apply();
  }

  setConnectingStatus(isConnecting) {
      this.isWssConnecting = isConnecting;
  }

  setConnectionStatus(isConnected) {
      this.isWssConnected = isConnected;
      this.$scope.$apply();
  }

  setPermission(permission) {
      this.permission = R.toPairs(permission);
  }

  updateFundingStats(stats) {
      this.fundingStats = stats;
      this.$scope.$apply();
  }

  updateFundingProvided(credits) {
      this.fundingProvided = credits;
      this.updateFundingDetailsUnderCurrency(credits);
      this.$scope.$apply();
  }

  saveApiCredentials() {
      this.$localStorage.api = {
          key: this.api_key,
          secret: this.api_secret
      };
  }

  connectWss() {
      this.setConnectingStatus(true);
      this.establishWssConnection(() => {
          this.BitfinexApi.authenticate(this.api_key, this.api_secret);
      });
  }

  disconnectWss() {
      this.BitfinexApi.disconnectWss();
  }

  establishWssConnection(callback) {
      this.BitfinexApi.establishWssConnection(callback);
  }
}
