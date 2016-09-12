const types = Object.freeze({
  INSUFFICIENT_SAVINGS: 'INSUFFICIENT_SAVINGS'
});

export default class ValidationError extends Error {
  constructor(type) {
    if (!types.hasOwnProperty(type)) {
      throw new Error('lib/error/valication: Invalid Validation Error Type');
    }

    super(types[type]);
  }
}
