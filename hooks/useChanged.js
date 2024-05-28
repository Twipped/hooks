import { useRef } from 'react';
import DEFAULT from '@twipped/utils/default';
import shallowEqual from '@twipped/utils/shallowEqual';
import deepEqual from '@twipped/utils/deepEqual';

/** @typedef {import('./types.js').Comparison} Comparison */

/**
 * Produces a unique string which will change if the given value differs from what was
 * previously provided. Use this integer in place of the actual value on react hooks,
 * when the dependency is an object or array which may change in key count.
 *
 * Note, this is NOT a hash of the object's contents. Passing the same object
 * to two different components using this hook will not produce the same value.
 *
 * @function useChanged
 * @param  {any}   dependency  An object or array of values to compare for changes.
 * @param  {object}   [options]
 * @param  {Comparison}  [options.comparison] The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {[string, boolean]}
 */
export default function useChanged (dependency, { comparison = false } = {}) {
  /* eslint-disable no-param-reassign */
  if (!comparison) comparison = shallowEqual;
  if (comparison === true) comparison = deepEqual;
  /* eslint-enable no-param-reassign */

  if (typeof comparison !== 'function') {
    throw new Error('The `comparison` option must be either a boolean or a function.');
  }

  /** @type {import('react').MutableRefObject<DEFAULT|any>} */
  const depsRef = useRef(DEFAULT);

  /** @type {import('react').MutableRefObject<string>} */
  const keyRef = useRef();

  let hasChanged = false;
  if (depsRef.current === DEFAULT || !comparison(depsRef.current, dependency)) {
    // update dependencies to newest value
    depsRef.current = dependency;
    keyRef.current = Math.round(Math.random() * (10 ** 10)).toString(32).padStart(8, '0');
    hasChanged = true;
  }

  return [ `$!${keyRef.current}`, hasChanged ];
}
