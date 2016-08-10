export default class FormViewController {
  constructor($state) {
    this.patterns = {
      currency: /^\d+(\.\d{2})?$/,
      percent: /^\d{1,2}(?!\d)|100$/,
    };

    this.$state = $state;
  }

  processForm(current, desired) {
    this.$state.go('results');
  }
}
