import { isNumber } from "./is-number.js";

/**
 * Takes an array of unknown data, filter out non-numeric values, and convert the rest to numbers.
 *
 * @param {any[]} data
 * @returns {number[]}
 */
export function filterConvert(data) {
  return data.filter((d) => isNumber(d)).map((x) => +x);
}