/**
 * Values inferior or equal to zero error (for geometric progression).
 */
class ValuesInferiorOrEqualToZeroError extends Error {
  constructor() {
    super('Values must be superior or equal to zero');
    this.name = 'ValuesInferiorOrEqualToZeroError';
  }
}

/**
 * Too few values error (when the number of breaks is superior to the number of values).
 */
class TooFewValuesError extends Error {
  constructor() {
    super('Too few values for the given number of breaks');
    this.name = 'TooFewValuesError';
  }
}

export {
  ValuesInferiorOrEqualToZeroError,
  TooFewValuesError,
};