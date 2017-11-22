import angular from 'angular';
import moment from 'moment';

class ConsoleService{
  /*@ngInject*/
  constructor($localStorage) {
      this.textarea = null;
      this.buffer = '';
      this.isScrollEventOptimized = false;
      this.isAutoScroll = true;
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
          if (this.isScrollEventOptimized === false) {
              this.optimizeScrollEvent();
          }
          if (this.isAutoScroll === true) {
              this.textarea[0].scrollTop = this.textarea[0].scrollHeight;
          }
          this.buffer = '';
      }
  }

  optimizeScrollEvent() {
      this.textarea[0].onclick = () => {
          this.isAutoScroll = !this.isAutoScroll;
      }
      this.isScrollEventOptimized = true;
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
