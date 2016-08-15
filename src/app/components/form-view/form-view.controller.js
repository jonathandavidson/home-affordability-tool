class FormViewController {
  constructor($state, FormViewService, ResultsService) {
    this.patterns = {
      currency: /^\d+(\.\d{2})?$/,
      percent: /^\d{1,2}(?!\d)|100$/,
    };

    this.$state = $state;
    this.FormViewService = FormViewService;
    this.ResultsService = ResultsService;
  }

  processForm(formValues) {
    this.FormViewService.calculate(formValues)
      .then(results => {
        this.ResultsService.setResults(results);
        this.$state.go('results');
      }, () => {
        alert('There was a problem calulating the result.');
      });
  }
}

FormViewController.$inject = ['$state', 'FormViewService', 'ResultsService'];

export default FormViewController;
