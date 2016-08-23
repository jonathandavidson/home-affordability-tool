import FormViewService from '../form-view.service';

describe('form-view.service', () => {
  const commonInputs = {
    monthlyAfterTaxIncome: 5000,
    downPaymentPercent: 20,
    homeValue: 100000,
    loanTerm: 30,
    loanValue: 80000,
    paymentPercentOfIncome: 25,
    savingsBalance: 2000,
    sellingCosts: 6000,
  };

  describe('when calculate is called with valid inputs', () => {
    it('should return a promise that resolves with the correct outputs', done => {
      const inputs = Object.assign({}, commonInputs);
      const service = new FormViewService({});

      const failTest = error => {
        expect(error).toBeUndefined();
        done();
      };

      const expectedOutput = {
        equity: 20000,
        cashFromSale: 14000,
        availableForDownPayment: 16000,
        valueFromDownPayment: 80000,
        maximumMonthlyPayment: 1250,
      };

      const testResolve = output => {
        expect(output).toEqual(expectedOutput);
        done();
      };

      service.calculate(inputs)
        .then(testResolve)
        .catch(failTest);
    });
  });
});
