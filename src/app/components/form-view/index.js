import angular from 'angular';
import uiRouter from 'angular-ui-router';
import FormView from './form-view.component';
import FormViewService from './form-view.service';

export default angular.module('formView', [uiRouter])
  .component('formView', FormView)
  .service('FormViewService', ['$window', FormViewService])
  .name;
