import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Results from './results.component';

export default angular.module('results', [uiRouter])
  .component('results', Results)
  .name;
