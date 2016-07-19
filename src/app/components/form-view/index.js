import angular from 'angular';
import FormView from './form-view.component';

export default angular.module('formView', [])
  .component('formview', FormView)
  .name;
