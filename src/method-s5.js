import { isNumber } from "./helpers/is-number.js";
import { roundarray } from "./helpers/rounding.js";
import { TooFewValuesError } from './errors.js';
import { validatePrecisionParameter } from './helpers/parameter-validation.js';
import { min } from './helpers/min.js';
import { max } from './helpers/max.js';
import { mean } from './helpers/mean.js';
import { deviation } from './helpers/deviation.js';

/**
 * S5 method
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.precision = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks
 * @throws {TooFewValuesError} - If the number of values is less than the number of classes.
 * @throws {InvalidPrecisionError} - If the precision is not valid (not null, not an integer or less than 0).
 *
 */

export function s5(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let precision = validatePrecisionParameter(options.precision);
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;
  if (5 > data.length) throw new TooFewValuesError();

  const mn = min(data);
  const mx = max(data);
  const avg = mean(data);
  const sd = deviation(data);
  const hsd = sd / 2;

  // For now the definition is the same as in PhilCarto
  // [min, avg - sd, avg - hsd, avg + hsd, avg + sd, max]
  let breaks = [mn, avg - sd, avg - hsd, avg + hsd, avg + sd, mx];

  // Collapse min and max if needed
  if (mn > avg - sd) {
    breaks.shift();
  }
  if (mx < avg + sd) {
    breaks.pop();
  }

  if (precision !== null) {
    breaks = roundarray(breaks, precision);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}