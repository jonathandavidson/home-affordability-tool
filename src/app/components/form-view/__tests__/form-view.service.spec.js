import FormViewService from '../form-view.service';

const commonInputs = {
  monthlyAfterTaxIncome: 5000,
  downPaymentRate: 0.20,
  homeValue: 100000,
  loanTerm: 30,
  loanValue: 80000,
  grossPaymentRate: 0.25,
  savingsBalance: 2000,
  sellingCosts: 6000,
  propertyTaxRate: 0.06,
  insuranceRate: 0.03,
};

const formValues = {
  foo: 'fooValue',
  bar: 'barValue',
};

const $window = {
  localStorage: {
    setItem: jasmine.createSpy(),
    getItem: jasmine.createSpy(),
  },
};

const service = new FormViewService($window);

describe('form-view.service', () => {
  describe('when calculate() is called', () => {
    it('returns a promise that resolves with the correct outputs', done => {
      const inputs = Object.assign({}, commonInputs);

      const expectedOutput = {
        equity: 20000,
        cashFromSale: 14000,
        availableForDownPayment: 16000,
        valueFromDownPayment: 80000,
        maximumMonthlyPayment: 1250,
        netPayment: 1137.50
      };

      service.calculate(inputs)
        .then(output => {
          expect(output.equity)
            .toEqual(expectedOutput.equity);

          expect(output.cashFromSale)
            .toEqual(expectedOutput.cashFromSale);

          expect(output.availableForDownPayment)
            .toEqual(expectedOutput.availableForDownPayment);

          expect(output.valueFromDownPayment)
            .toEqual(expectedOutput.valueFromDownPayment);

          expect(output.maximumMonthlyPayment)
            .toEqual(expectedOutput.maximumMonthlyPayment);

          expect(output.netPayment)
            .toEqual(expectedOutput.netPayment);

          done();
        });
    });

    describe('and homeValue - loanValue - sellingCosts + savingsBalance is negative', () => {
      it('returns a promise that rejects with the correct error message', done => {
        const inputs = Object.assign({}, commonInputs, {
          loanValue: 200000,
          savingsBalance: 100000,
          sellingCosts: 1
        });

        service.calculate(inputs)
          .catch(error => {
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe('INSUFFICIENT_SAVINGS');
            done();
          });
        });
    });
  });

  describe('when setFormValues() is called', () => {
    service.setFormValues(formValues);

    it('saves the serialized object in localStorage', () => {
      expect($window.localStorage.setItem.calls.count())
        .toEqual(1);

      expect($window.localStorage.setItem)
        .toHaveBeenCalledWith('formValues', JSON.stringify(formValues));
    });
  });

  describe('when getFormValues() is called', () => {
    $window.localStorage.getItem.and.returnValue(JSON.stringify(formValues));
    const returnValue = service.getFormValues(formValues);

    it('returns the unserialized object from localStorage', () => {
      expect(returnValue).toEqual(formValues);
    });
  });
});
