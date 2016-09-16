import ValidationError from '../../../lib/error/validation';

export default class FormViewService {
  constructor($window) {
    this.store = $window.localStorage;
  }

  calculate({
    monthlyAfterTaxIncome, downPaymentRate, homeValue, loanTerm, loanValue,
    grossPaymentRate, savingsBalance, sellingCosts, propertyTaxRate,
    insuranceRate
  }) {
    return new Promise((resolve, reject) => {
      const equity = homeValue - loanValue;
      const cashFromSale = equity - sellingCosts;
      const availableForDownPayment = savingsBalance + cashFromSale;

      if (availableForDownPayment < 0) {
        reject(new ValidationError('INSUFFICIENT_SAVINGS'));
      }

      const valueFromDownPayment = availableForDownPayment / downPaymentRate;
      const maximumMonthlyPayment = monthlyAfterTaxIncome * grossPaymentRate;
      const netPayment = (1 - propertyTaxRate - insuranceRate) * maximumMonthlyPayment;

      resolve({
        equity,
        cashFromSale,
        availableForDownPayment,
        valueFromDownPayment,
        maximumMonthlyPayment,
        netPayment,
      });
    });
  }

  setFormValues(formValues) {
    this.store.setItem('formValues', JSON.stringify(formValues));
  }

  getFormValues() {
    return JSON.parse(this.store.getItem('formValues'));
  }
}
