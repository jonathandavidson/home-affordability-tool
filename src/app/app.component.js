import appController from './app.controller';
import './app.scss';

const appTemplate = require('./app.html');

export default {
  template: appTemplate,
  controller: appController,
  controllerAs: 'app',
};
