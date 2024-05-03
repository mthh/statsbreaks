import { isNumber } from './helpers/is-number';
import { validateNbParameter, validatePrecisionParameter } from './helpers/parameter-validation';
import { TooFewValuesError } from './errors';
import { roundarray } from './helpers/rounding';

/*
 * This segment of code has been adapted from "simple-statistics" under the ISC license.
 * Original Author: Tom MacWright
 * Source: https://github.com/simple-statistics/simple-statistics/
 *
 * Copyright (c) 2014, Tom MacWright
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
/**
 * Create a new column x row matrix.
 *
 * @private
 * @param {number} columns
 * @param {number} rows
 * @return {Array<Array<number>>} matrix
 */
function makeMatrix(columns, rows) {
  const matrix = [];
  for (let i = 0; i < columns; i++) {
    const column = [];
    for (let j = 0; j < rows; j++) {
      column.push(0);
    }
    matrix.push(column);
  }
  return matrix;
}

/**
 * For a sorted input, counting the number of unique values
 * is possible in constant time and constant memory. This is
 * a simple implementation of the algorithm.
 *
 * Values are compared with `===`, so objects and non-primitive objects
 * are not handled in any special way.
 *
 * @param {Array<number>} x an array of numbers
 * @returns {number} count of unique values
 */
function uniqueCountSorted(x) {
  let uniqueValueCount = 0,
    lastSeenValue;
  for (let i = 0; i < x.length; i++) {
    if (i === 0 || x[i] !== lastSeenValue) {
      lastSeenValue = x[i];
      uniqueValueCount++;
    }
  }
  return uniqueValueCount;
}

/**
 * Generates incrementally computed values based on the sums and sums of
 * squares for the data array
 *
 * @private
 * @param {number} j
 * @param {number} i
 * @param {Array<number>} sums
 * @param {Array<number>} sumsOfSquares
 * @return {number}
 * @example
 * ssq(0, 1, [-1, 0, 2], [1, 1, 5]);
 */
function ssq(j, i, sums, sumsOfSquares) {
  let sji; // s(j, i)
  if (j > 0) {
    const muji = (sums[i] - sums[j - 1]) / (i - j + 1); // mu(j, i)
    sji =
      sumsOfSquares[i] - sumsOfSquares[j - 1] - (i - j + 1) * muji * muji;
  } else {
    sji = sumsOfSquares[i] - (sums[i] * sums[i]) / (i + 1);
  }
  if (sji < 0) {
    return 0;
  }
  return sji;
}

/**
 * Function that recursively divides and conquers computations
 * for cluster j
 *
 * @private
 * @param {number} iMin Minimum index in cluster to be computed
 * @param {number} iMax Maximum index in cluster to be computed
 * @param {number} cluster Index of the cluster currently being computed
 * @param {Array<Array<number>>} matrix
 * @param {Array<Array<number>>} backtrackMatrix
 * @param {Array<number>} sums
 * @param {Array<number>} sumsOfSquares
 */
function fillMatrixColumn(
  iMin,
  iMax,
  cluster,
  matrix,
  backtrackMatrix,
  sums,
  sumsOfSquares
) {
  if (iMin > iMax) {
    return;
  }

  // Start at midpoint between iMin and iMax
  const i = Math.floor((iMin + iMax) / 2);

  matrix[cluster][i] = matrix[cluster - 1][i - 1];
  backtrackMatrix[cluster][i] = i;

  let jlow = cluster; // the lower end for j

  if (iMin > cluster) {
    jlow = Math.max(jlow, backtrackMatrix[cluster][iMin - 1] || 0);
  }
  jlow = Math.max(jlow, backtrackMatrix[cluster - 1][i] || 0);

  let jhigh = i - 1; // the upper end for j
  if (iMax < matrix[0].length - 1) {
    jhigh = Math.min(jhigh, backtrackMatrix[cluster][iMax + 1] || 0);
  }

  let sji;
  let sjlowi;
  let ssqjlow;
  let ssqj;
  for (let j = jhigh; j >= jlow; --j) {
    sji = ssq(j, i, sums, sumsOfSquares);

    if (sji + matrix[cluster - 1][jlow - 1] >= matrix[cluster][i]) {
      break;
    }

    // Examine the lower bound of the cluster border
    sjlowi = ssq(jlow, i, sums, sumsOfSquares);

    ssqjlow = sjlowi + matrix[cluster - 1][jlow - 1];

    if (ssqjlow < matrix[cluster][i]) {
      // Shrink the lower bound
      matrix[cluster][i] = ssqjlow;
      backtrackMatrix[cluster][i] = jlow;
    }
    jlow++;

    ssqj = sji + matrix[cluster - 1][j - 1];
    if (ssqj < matrix[cluster][i]) {
      matrix[cluster][i] = ssqj;
      backtrackMatrix[cluster][i] = j;
    }
  }

  fillMatrixColumn(
    iMin,
    i - 1,
    cluster,
    matrix,
    backtrackMatrix,
    sums,
    sumsOfSquares
  );
  fillMatrixColumn(
    i + 1,
    iMax,
    cluster,
    matrix,
    backtrackMatrix,
    sums,
    sumsOfSquares
  );
}

/**
 * Initializes the main matrices used in Ckmeans and kicks
 * off the divide and conquer cluster computation strategy
 *
 * @private
 * @param {Array<number>} data sorted array of values
 * @param {Array<Array<number>>} matrix
 * @param {Array<Array<number>>} backtrackMatrix
 */
function fillMatrices(data, matrix, backtrackMatrix) {
  const nValues = matrix[0].length;

  // Shift values by the median to improve numeric stability
  const shift = data[Math.floor(nValues / 2)];

  // Cumulative sum and cumulative sum of squares for all values in data array
  const sums = [];
  const sumsOfSquares = [];

  // Initialize first column in matrix & backtrackMatrix
  for (let i = 0, shiftedValue; i < nValues; ++i) {
    shiftedValue = data[i] - shift;
    if (i === 0) {
      sums.push(shiftedValue);
      sumsOfSquares.push(shiftedValue * shiftedValue);
    } else {
      sums.push(sums[i - 1] + shiftedValue);
      sumsOfSquares.push(
        sumsOfSquares[i - 1] + shiftedValue * shiftedValue
      );
    }

    // Initialize for cluster = 0
    matrix[0][i] = ssq(0, i, sums, sumsOfSquares);
    backtrackMatrix[0][i] = 0;
  }

  // Initialize the rest of the columns
  let iMin;
  for (let cluster = 1; cluster < matrix.length; ++cluster) {
    if (cluster < matrix.length - 1) {
      iMin = cluster;
    } else {
      // No need to compute matrix[K-1][0] ... matrix[K-1][N-2]
      iMin = nValues - 1;
    }

    fillMatrixColumn(
      iMin,
      nValues - 1,
      cluster,
      matrix,
      backtrackMatrix,
      sums,
      sumsOfSquares
    );
  }
}

export function ckmeans(data, options = {}) {
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

  const uniqueCount = uniqueCountSorted(data);

  if (nb > uniqueCount) throw new TooFewValuesError('Too few unique values for the given number of breaks');

  // named 'S' originally
  const matrix = makeMatrix(nb, data.length);
  // named 'J' originally
  const backtrackMatrix = makeMatrix(nb, data.length);

  // This is a dynamic programming way to solve the problem of minimizing
  // within-cluster sum of squares. It's similar to linear regression
  // in this way, and this calculation incrementally computes the
  // sum of squares that are later read.
  fillMatrices(data, matrix, backtrackMatrix);

  // The real work of Ckmeans clustering happens in the matrix generation:
  // the generated matrices encode all possible clustering combinations, and
  // once they're generated we can solve for the best clustering groups
  // very quickly.
  const clusters = [];
  let clusterRight = backtrackMatrix[0].length - 1;

  // Backtrack the clusters from the dynamic programming matrix. This
  // starts at the bottom-right corner of the matrix (if the top-left is 0, 0),
  // and moves the cluster target with the loop.
  for (let cluster = backtrackMatrix.length - 1; cluster >= 0; cluster--) {
    const clusterLeft = backtrackMatrix[cluster][clusterRight];

    // fill the cluster from the sorted input by taking a slice of the
    // array. the backtrack matrix makes this easy - it stores the
    // indexes where the cluster should start and end.
    clusters[cluster] = data.slice(clusterLeft, clusterRight + 1);

    if (cluster > 0) {
      clusterRight = clusterLeft - 1;
    }
  }

  // Convert clusters values to breaks:
  // First value is the minimum of the series
  // Last element of each cluster is the bin's upper limit
  // (this already includes the maximum of the series)
  // But we choose to make the returned class break nicer
  // by taking the average of the last element of a cluster and the first element of the next cluster
  let result = [
    data[0],
    ...clusters.map((cluster, i) => (
      clusters[i + 1]
        ? (cluster[cluster.length - 1] + clusters[i + 1][0]) / 2
        : cluster[cluster.length - 1]
      )),
  ];

  if (precision !== null) {
    result = roundarray(result, precision);
  }
  if (!minmax) {
    result = result.slice(1, -1);
  }
  return result;
}