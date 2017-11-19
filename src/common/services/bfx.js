import angular from 'angular';

import ConsoleServiceModule from 'common/services/console';

class BitfinexApi{
  /*@ngInject*/
  constructor($localStorage, ConsoleService) {

    this.ConsoleService = ConsoleService;

    this.apiConfig = {
        rest: {

        },
        wss: {
            url: 'wss://api.bitfinex.com/ws/2'
        }
    }

    ConsoleService.log('wss url =>', this.apiConfig.wss.url);
  }

  testConn() {
    this.ConsoleService.log('Testing wss connection');
    const url = this.apiConfig.wss.url;
    const wss = new WebSocket(url);
    wss.onmessage = (msg) => console.log(msg.data)
    wss.onopen = () => {
      // API keys setup here (See "Authenticated Channels")
      this.ConsoleService.log('API keys setup here (See "Authenticated Channels")');
    }
  }
};

export default angular
  .module('BitfinexApi', [
      ConsoleServiceModule.name
  ])
  .service('BitfinexApi', BitfinexApi);
