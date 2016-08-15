export default class ResultsService {
  constructor() {
    this.results = null;
  }

  setResults(results) {
    this.results = results;
  }

  getResults() {
    return this.results;
  }
}
