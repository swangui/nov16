import angular from 'angular';

import HmacSHA384 from 'crypto-js/hmac-sha384';
import EncHex from 'crypto-js/enc-hex';
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

    ConsoleService.log('WSS API', this.apiConfig.wss.url);
  }

  addEventHandler(eventType, callback) {
    this.eventHandler[eventType] = callback;
  }

  getEventHandler(eventType) {
    const handler = this.eventHandler[eventType];
    if (typeof(handler) === 'function') {
        return handler;
    } else {
        console.warn('Event Handler not set', eventType);
        return () => {};
    }
  }

  onWssDisconnect(callback) {
    this.addEventHandler('wss-disconnect', callback);
  }

  onAuth(callback) {
    this.addEventHandler('auth', callback);
  }

  onWalletSnapshot(callback) {
    this.addEventHandler('ws', callback);
  }

  onFundingCreditsSnapshot(callback) {
    this.addEventHandler('fcs', callback);
  }

  dispatchChannels(data) {
    if (Array.isArray(data) === false) {

        //this.ConsoleService.rx(JSON.stringify(data));

        if (data.hasOwnProperty('event') === true) {
            this.getEventHandler(data.event)(data);
        }
    } else {
        const chId = data[0];
        const chName = data[1];

        this.ConsoleService.rx(chId, chName);

        this.getEventHandler(chName)(data);
    }
  }

  disconnectWss() {
    if (this.wss) {
        this.wss.close();
    }
  }

  establishWssConnection(callback) {
    this.disconnectWss();
    this.ConsoleService.log('Establishing WSS connection');
    const url = this.apiConfig.wss.url;
    this.wss = new WebSocket(url);
    this.wss.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        this.dispatchChannels(data);
    };
    this.wss.onopen = () => {
        this.ConsoleService.log('WSS connection established');
        callback();
    }
    this.wss.onclose = (data) => {
        this.ConsoleService.log('WSS connection disconnected');
        this.getEventHandler('wss-disconnect')(data);
    }
  }

  authenticate(apiKey, apiSecret) {
    this.ConsoleService.log('Authenticating');

    const authNonce = Date.now() * 1000
    const authPayload = 'AUTH' + authNonce
    const authSig = HmacSHA384(authPayload, apiSecret)
      .toString(EncHex)
    
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
