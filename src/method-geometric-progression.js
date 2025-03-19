import { isNumber } from "./helpers/is-number.js";
import { min } from "./helpers/min.js";
import { max } from "./helpers/max.js";
import { roundarray } from "./helpers/rounding.js";
import { TooFewValuesError, ValuesInferiorOrEqualToZeroError } from "./errors.js";
import {validateNbParameter, validatePrecisionParameter} from './helpers/parameter-validation.js';

/**
 * Geometric progression
 *
 * Example: {@link https://observablehq.com/@neocartocnrs/hello-statsbreaks Observable notebook}
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.nb = 5] - Number of classes desired
 * @param {number} [options.precision = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks.
 * @throws {ValuesInferiorOrEqualToZeroError} - If input array contains negative or zero values.
 * @throws {TooFewValuesError} - If the number of values is less than the number of classes.
 * @throws {InvalidNumberOfClassesError} - If the number of classes is not valid (not an integer or less than 2).
 * @throws {InvalidPrecisionError} - If the precision is not valid (not null, not an integer or less than 0).
 */

export function geometricProgression(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let nb = options.nb != null ? validateNbParameter(options.nb) : 5;
  let precision = validatePrecisionParameter(options.precision);
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;

  if (nb > data.length) throw new TooFewValuesError();

  // With geometric progression, the series of values
  // should not contain negative or zero values.
  if (data.some((d) => d <= 0)) throw new ValuesInferiorOrEqualToZeroError();

  let breaks = new Array(nb + 1);
  const mn = min(data);
  const mx = max(data);
  const logMax = Math.log(mx) / Math.LN10;
  const logMin = Math.log(mn) / Math.LN10;
  const logDiff = (logMax - logMin) / nb;

  // The first value is the minimum value.
  breaks[0] = mn;

  // Compute the antilogarithm of each log boundary.
  for (let i = 1; i < nb; i++) {
    breaks[i] = Math.pow(10, logMin + i * logDiff);
  }

  // The last value is the maximum value.
  breaks[nb] = mx;

  // Output
  breaks = breaks.sort((a, b) => a - b);

  if (precision !== null) {
    breaks = roundarray(breaks, precision);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}
