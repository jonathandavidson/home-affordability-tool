export default class FormViewService {
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
      const savingsAfterSale = savingsBalance + cashFromSale;
      const valueFromDownPayment = savingsAfterSale / downPaymentPercent;

      const maximumMonthlyPayment = monthlyAfterTaxIncome * (paymentPercentOfIncome / 100);

      const outputs = {
        equity,
        cashFromSale,
        savingsAfterSale,
        valueFromDownPayment,
        maximumMonthlyPayment,
      };

      resolve(outputs);
    });
  }
}
