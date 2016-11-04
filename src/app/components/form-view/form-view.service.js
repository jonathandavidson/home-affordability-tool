import ValidationError from '../../../lib/error/validation';

function roundCurrency(value) {
  return Math.round(value * 100) / 100;
}

export default class FormViewService {
  constructor($window) {
    this.store = $window.localStorage;
  }

  calculate({
    monthlyAfterTaxIncome, downPaymentRate, homeValue, loanTerm, loanValue,
    grossPaymentRate, savingsBalance, sellingCosts, propertyTaxRate,
    insuranceRate, interestRate,
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

      const paymentFactor = ((1 - Math.pow((1 + (interestRate / 12)), -(loanTerm * 12))) / (interestRate / 12)) / (1 - downPaymentRate);

      const valueFromIncome = roundCurrency((paymentFactor * maximumMonthlyPayment) / (1 + (paymentFactor * insuranceRate / 12) + (paymentFactor * propertyTaxRate / 12)));

      const maxHomeValue = valueFromDownPayment < valueFromIncome
        ? valueFromDownPayment
        : valueFromIncome;

      resolve({
        equity,
        cashFromSale,
        availableForDownPayment,
        valueFromDownPayment,
        maximumMonthlyPayment,
        valueFromIncome,
        maxHomeValue,
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
