import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component';
import Components from './components';

angular.module('app', [
  Components,
  uiRouter,
])
  .component('app', AppComponent)
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('form', {
      url: '/',
      template: '<form-view />',
    });

    $stateProvider.state('results', {
      url: '/results',
      template: '<results />',
    });
  });
