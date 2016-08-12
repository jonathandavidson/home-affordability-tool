class FormViewController {
  constructor($state, FormViewService) {
    this.patterns = {
      currency: /^\d+(\.\d{2})?$/,
      percent: /^\d{1,2}(?!\d)|100$/,
    };

    this.$state = $state;
    this.FormViewService = FormViewService;
  }

  processForm(current, desired) {
    this.FormViewService.calculate()
      .then(() => {
        this.$state.go('results');
      }, () => {
        alert('There was a problem calulating the result.');
      });
  }
}

FormViewController.$inject = ['$state', 'FormViewService'];

export default FormViewController;
