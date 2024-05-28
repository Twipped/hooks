/**
 * Returns true if the passed value is a whole number larger than 0.
 * @param {any} num
 * @returns {boolean}
 */
export function isWholeNumber (num) {
  return !(
    typeof num !== 'number'
    || Number.isNaN(num)
    || num !== Math.floor(num)
    || num < 1
  );
}
