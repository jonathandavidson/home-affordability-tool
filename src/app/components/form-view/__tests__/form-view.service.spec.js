import FormViewService from '../form-view.service';

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

describe('form-view.service', () => {
  describe('when calculate() is called', () => {
    it('returns a promise that resolves with the correct outputs', done => {
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

  describe('when setFormValues() is called', () => {
    const service = new FormViewService($window);

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
    const service = new FormViewService($window);

    const returnValue = service.getFormValues(formValues);

    it('returns the unserialized object from localStorage', () => {
      expect(returnValue).toEqual(formValues);
    });
  });
});
