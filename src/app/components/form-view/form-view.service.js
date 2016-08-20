export default class FormViewService {
  constructor($window) {
    this.store = $window.localStorage;
  }

  calculate({
    monthlyAfterTaxIncome,
    downPaymentPercent,
    homeValue,
    loanTerm,
    loanValue,
    paymentPercentOfIncome,
    savingsBalance,
    sellingCosts,
  }) {
    return new Promise((resolve, reject) => {
      const equity = homeValue - loanValue;
      const cashFromSale = equity - sellingCosts;
      const availableForDownPayment = savingsBalance + cashFromSale;
      const valueFromDownPayment = availableForDownPayment / downPaymentPercent;

      const maximumMonthlyPayment = monthlyAfterTaxIncome * (paymentPercentOfIncome / 100);

      const outputs = {
        equity,
        cashFromSale,
        availableForDownPayment,
        valueFromDownPayment,
        maximumMonthlyPayment,
      };

      resolve(outputs);
    });
  }

  setFormValues(formValues) {
    this.store.setItem('formValues', JSON.stringify(formValues));
  }

  getFormValues() {
    return JSON.parse(this.store.getItem('formValues'));
  }
}
