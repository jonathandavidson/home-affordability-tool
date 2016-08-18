class ResultsController {
  constructor($state, ResultsService) {
    this.results = ResultsService.getResults();

    if (this.results === null) {
      $state.go('form');
    }
  }
}

ResultsController.$inject = ['$state', 'ResultsService'];

export default ResultsController;
