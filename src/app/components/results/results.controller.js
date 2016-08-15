class ResultsController {
  constructor(ResultsService) {
    this.results = ResultsService.getResults();
  }
}

ResultsController.$inject = ['ResultsService'];

export default ResultsController;
