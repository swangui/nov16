import angular from 'angular';
import moment from 'moment';

class ConsoleService{
  /*@ngInject*/
  constructor($localStorage) {
      this.textarea = null;
      this.buffer = '';
  }

  ready() {
      this.log();
  }

  log() {
      let messages = Array.prototype.slice.call(arguments);
      let message = messages.join(' ');
      if (!this.textarea) {
          this.buffer += moment().format('Y/M/D HH:mm:ss') + '\n' + message + '\n';
      } else {
          let buffer = this.buffer + this.textarea[0].value;
          if (arguments.length === 0) {
              buffer += '';
          } else {
              buffer += moment().format('Y/M/D HH:mm:ss') + '\n' + message + '\n';
          }
          this.textarea[0].value = buffer;
          this.buffer = '';
      }
  }

  rx() {
      let messages = Array.prototype.slice.call(arguments);
      messages.splice(0, 0, 'RX');
      let message = messages.join(' ');
      this.log(message);
  }

  setTextarea(textarea) {
      this.textarea = textarea;
  }
};

export default angular
  .module('ConsoleService', [])
  .service('ConsoleService', ConsoleService);
