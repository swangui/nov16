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
          this.buffer += moment().format('Y/M/D HH:mm:ss') + ' - ' + message + '\n';
      } else {
          let buffer = this.buffer + this.textarea[0].value;
          if (arguments.length === 0) {
              buffer += '';
          } else {
              buffer += moment().format('Y/M/D HH:mm:ss') + ' - ' + message + '\n';
          }
          this.textarea[0].value = buffer;
          this.buffer = '';
      }
  }

  setTextarea(textarea) {
      this.textarea = textarea;
  }
};

export default angular
  .module('ConsoleService', [])
  .service('ConsoleService', ConsoleService);
