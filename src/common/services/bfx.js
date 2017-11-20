import angular from 'angular';

import crypto from 'crypto-js';
import ConsoleServiceModule from 'common/services/console';

class BitfinexApi{
  /*@ngInject*/
  constructor($localStorage, ConsoleService) {

    this.ConsoleService = ConsoleService;
    this.wss = null;
    this.eventHandler = {};

    this.apiConfig = {
        rest: {

        },
        wss: {
            url: 'wss://api.bitfinex.com/ws/2'
        }
    }

    ConsoleService.log('wss url =>', this.apiConfig.wss.url);
  }

  addEventHandler(eventType, callback) {
    this.eventHandler[eventType] = callback;
  }

  onWalletSnapshot(callback) {
    this.addEventHandler('ws', callback);
  }

  onFundingCreditsSnapshot(callback) {
    this.addEventHandler('fcs', callback);
  }

  dispatchChannels(data) {
    if (Array.isArray(data) === false) {
        this.ConsoleService.rx(JSON.stringify(data));
    } else {
        const chId = data[0];
        const chName = data[1];
        this.ConsoleService.rx(chId, chName);

        const handler = this.eventHandler[chName];
        if (typeof(handler) === 'function') {
            handler(data);
        }
    }
  }

  establishWssConnection(callback) {
    this.ConsoleService.log('Establishing wss connection');
    const url = this.apiConfig.wss.url;
    this.wss = new WebSocket(url);
    this.wss.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        this.dispatchChannels(data);
    };
    this.wss.onopen = () => {
        this.ConsoleService.log('wss connection established');
        callback();
    }
  }

  authenticate(apiKey, apiSecret) {
    this.ConsoleService.log('Authenticating');

    const authNonce = Date.now() * 1000
    const authPayload = 'AUTH' + authNonce
    const authSig = crypto
      .HmacSHA384(authPayload, apiSecret)
      .toString(crypto.enc.Hex)
    
    const payload = {
      apiKey,
      authSig,
      authNonce,
      authPayload,
      event: 'auth'
    }

    this.wss.send(JSON.stringify(payload));
  }
};

export default angular
  .module('BitfinexApi', [
      ConsoleServiceModule.name
  ])
  .service('BitfinexApi', BitfinexApi);
