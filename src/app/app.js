import angular from 'angular';
import AppComponent from './app.component';
import Components from './components';

angular.module('app', [Components])
  .component('app', AppComponent);
