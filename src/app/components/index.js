import angular from 'angular';
import FormView from './form-view';
import Results from './results';

export default angular.module(
    'app.components',
    [FormView, Results]
  )
  .name;
