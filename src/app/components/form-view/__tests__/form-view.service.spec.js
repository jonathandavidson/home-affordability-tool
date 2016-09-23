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
  interestRate: 0.045,
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

      service.calculate(inputs)
        .then(output => {
          expect(output.equity).toEqual(20000);
          expect(output.cashFromSale).toEqual(14000);
          expect(output.availableForDownPayment).toEqual(16000);
          expect(output.valueFromDownPayment).toEqual(80000);
          expect(output.maximumMonthlyPayment).toEqual(1250);
          expect(output.netPayment).toEqual(1137.50);
          expect(output.maxLoanAmount).toEqual(224498.32);
          expect(output.valueFromIncome).toEqual(280622.9);
          expect(output.maxHomeValue).toEqual(80000);

          done();
        });
    });

    describe('and homeValue - loanValue - sellingCosts + savingsBalance is negative', () => {
      it('returns a promise that rejects with the correct error message', done => {
        const inputs = Object.assign({}, commonInputs, {
          loanValue: 200000,
          savingsBalance: 100000,
          sellingCosts: 1,
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
