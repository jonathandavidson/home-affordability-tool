export default class ResultsService {
  constructor($window) {
    this.store = $window.localStorage;
  }

  setResults(results) {
    this.store.setItem('results', JSON.stringify(results));
  }

  getResults() {
    return JSON.parse(this.store.getItem('results'));
  }
}
