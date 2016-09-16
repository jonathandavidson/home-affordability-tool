class FormViewController {
  constructor($state, FormViewService, ResultsService) {
    this.patterns = {
      currency: /^\d+(\.\d{2})?$/,
      percent: /^\d{1,2}(?!\d)|100$/,
    };

    this.$state = $state;
    this.FormViewService = FormViewService;
    this.ResultsService = ResultsService;

    this.formValues = this.FormViewService.getFormValues();
  }

  processForm(formValues) {
    formValues.downPaymentRate = formValues.downPaymentPercent / 100;
    formValues.grossPaymentRate = formValues.paymentPercentOfIncome / 100;
    formValues.propertyTaxRate = formValues.propertyTaxPercent / 100;
    formValues.insuranceRate = formValues.insurancePercent / 100;

    this.FormViewService.setFormValues(formValues);
    this.FormViewService.calculate(formValues)
      .then(results => {
        this.ResultsService.setResults(results);
        this.$state.go('results');
      }, error => {
        if (error.message === 'INSUFFICIENT_SAVINGS') {
          this.errorMessage = 'We are unable to calculate since your savings balance is insufficient to cover your loss from selling';
        }
      });
  }
}

FormViewController.$inject = ['$state', 'FormViewService', 'ResultsService'];

export default FormViewController;
