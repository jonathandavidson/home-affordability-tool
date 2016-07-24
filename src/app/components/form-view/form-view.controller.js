export default class FormViewController {
  constructor() {
    this.patterns = {
      currency: /^\d+(\.\d{2})?$/,
      percent: /^\d{1,2}(?!\d)|100$/,
    };
  }

  processForm(current, desired) {
  }
}
