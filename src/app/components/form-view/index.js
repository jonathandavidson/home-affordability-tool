import angular from 'angular';
import uiRouter from 'angular-ui-router';
import FormView from './form-view.component';

export default angular.module('formView', [uiRouter])
  .component('formView', FormView)
  .name;
