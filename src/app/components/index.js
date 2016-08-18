import angular from 'angular';
import FormView from './form-view';
import Results from './results';
import ResultsService from './results/results.service.js';

export default angular.module(
    'app.components',
    [FormView, Results]
  )
  .service('ResultsService', ['$window', ResultsService])
  .name;
