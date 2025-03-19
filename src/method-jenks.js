import { isNumber } from "./helpers/is-number.js";
import { roundarray } from "./helpers/rounding.js";
import { TooFewValuesError } from './errors.js';
import {validateNbParameter, validatePrecisionParameter} from './helpers/parameter-validation.js';

function breaks(data, lower_class_limits, n_classes) {
  const kclass = [];
  let m = data.length,
    j,
    jj;
  kclass[n_classes] = data[data.length - 1];
  kclass[0] = data[0];
  for (j = 1; j < n_classes; j++) {
    jj = n_classes - j + 1;
    kclass[jj - 1] = data[lower_class_limits[m - 1][jj - 1] - 2];
    m = lower_class_limits[m - 1][jj - 1] - 1;
  }
  return kclass;
}

/**
 * Compute the jenks natural breaks from the given data and lower class limits
 * matrix. Contrary to the original breaks code, we don't return the class limit
 * that falls on a data point, but a nicer class limit that falls between two data points
 * (as we do for the ckmeans method).
 * @param data
 * @param lowerClassLimits
 * @param nClasses
 */
function breaks2(data, lowerClassLimits, nClasses) {
  const kclass = [];
  let m = data.length;
  let j, jj;
  kclass[nClasses] = data[data.length - 1];
  kclass[0] = data[0];
  for (j = 1; j < nClasses; j++) {
    jj = nClasses - j + 1;
    kclass[jj - 1] = (data[lowerClassLimits[m - 1][jj - 1] - 2] + data[lowerClassLimits[m - 1][jj - 1] - 1]) / 2;
    m = lowerClassLimits[m - 1][jj - 1] - 1;
  }
  return kclass;
}

function getMatrices(data, n_classes) {
  const lower_class_limits = [],
    variance_combinations = [],
    length_data = data.length;
  let i,
    j,
    m,
    l,
    variance,
    val,
    sum,
    sum_squares,
    w,
    temp_val,
    i4,
    lower_class_limit;

  // In original fortran code, matrices are of size (length_data x n_classes),
  // not ((length_data + 1) x (n_classes + 1)), even if most ports are doing this.
  for (i = 0; i < length_data; i++) {
    const tmp1 = [],
      tmp2 = [];
    const t = i === 0 ? 1 : 0;
    for (j = 0; j < n_classes; j++) {
      tmp1.push(t);
      tmp2.push(Infinity);
    }
    lower_class_limits.push(tmp1);
    variance_combinations.push(tmp2);
  }

  variance = 0;

  // All the indexing / arithmetic here is done using the C / JavaScript way
  // (so we are indexing from 0, we start the loop from 0,
  //  we don't add '1' to lower_class_limit (l - m) to remove it in
  //  the next line when indexing 'data', we check that i4 > -1 instead of i4 > 0, etc.)
  for (l = 0; l < length_data; l++) {
    sum = sum_squares = w = 0;
    for (m = 0; m <= l; m++) {
      lower_class_limit = l - m;
      val = data[lower_class_limit];

      w++;
      sum += val;
      sum_squares += val * val;
      variance = sum_squares - (sum * sum) / w;
      i4 = lower_class_limit - 1;

      if (i4 > -1) {
        for (j = 1; j < n_classes; j++) {
          temp_val = variance + variance_combinations[i4][j - 1];
          if (variance_combinations[l][j] >= temp_val) {
            // We still add 1 here (to compare the returned matrices to the original fortran matrices
            // and to the result that most lib are producing - we are ofc removing this "1" value
            // when indexing in the array of values to be classified when constructing classes).
            lower_class_limits[l][j] = lower_class_limit + 1;
            variance_combinations[l][j] = temp_val;
          }
        }
      }
    }
    lower_class_limits[l][0] = 1;
    variance_combinations[l][0] = variance;
  }

  return {
    lower_class_limits,
    variance_combinations,
  };
}

/**
 * Jenks algorithm
 *
 * Example: {@link https://observablehq.com/@neocartocnrs/hello-statsbreaks Observable notebook}
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.nb = 5] - Number of classes desired
 * @param {number} [options.precision = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks.
 * @throws {TooFewValuesError} - If the number of (unique) values is less than the number of classes.
 * @throws {InvalidNumberOfClassesError} - If the number of classes is not valid (not an integer or less than 2).
 * @throws {InvalidPrecisionError} - If the precision is not valid (not null, not an integer or less than 0).
 */
export function jenks(data, options = {}) {
  data = data
    .filter((d) => isNumber(d))
    .map((x) => +x)
    .sort(function (a, b) {
      return a - b;
    });

  let nb = options.nb != null ? validateNbParameter(options.nb) : 5;
  let precision = validatePrecisionParameter(options.precision);
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;

  if (nb > data.length) throw new TooFewValuesError();
  const unique = [...new Set(data)];
  if (nb > unique.length) throw new TooFewValuesError('Too few unique values for the given number of breaks');
  let matrices = getMatrices(data, nb);
  let lower_class_limits = matrices.lower_class_limits;
  let result = breaks2(data, lower_class_limits, nb);

  if (precision !== null) {
    result = roundarray(result, precision);
  }
  if (!minmax) {
    result = result.slice(1, -1);
  }
  return result;
}
