import { waitFor } from '@testing-library/react';

/** @typedef {import('react').RefObject} RefObject */

/**
 * @typedef WaitForRefChangeOptions
 * @property {boolean} [silent=false]
 * @property {number} [timeout]
 * @property {number} [interval]
 */

/**
 * Waits for a ref's contents to change.
 *
 * @param {RefObject} ref
 * @param {WaitForRefChangeOptions} options
 * @returns {Promise}
 */
export default function waitForRefChange (ref, {
  silent = false,
  ...options
} = {}) {
  const initial = ref.current;
  // eslint-disable-next-line jsdoc/require-jsdoc
  function onTimeout (e) {
    if (silent) return null;
    return e;
  }
  return waitFor(() => {
    if (ref.current === initial) throw new Error('Value unchanged');
  }, { onTimeout, ...options });
}
