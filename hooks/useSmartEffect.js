import { useEffect } from 'react';
import useChanged from './useChanged.js';

/** @typedef {import('./types').EffectCallback} EffectCallback */
/** @typedef {import('./types').Comparison} Comparison */

/**
 * Identical to useEffect, except dependencies may be compared deeply.
 *
 * @function useSmartEffect
 * @param  {EffectCallback} effect The function to execute after render.
 * @param  {any}   dependencies  An object or array of values to compare for changes.
 * @param  {object}   [options]
 * @param  {Comparison}  [options.comparison] The comparison function used to detect if
 * the dependencies change. Defaults to a shallow equal, pass true to use deep equality.
 * @returns {void}
 */
export default function useSmartEffect (effect, dependencies, { comparison = true } = {}) {
  const [ dependenciesKey ] = useChanged(dependencies, { comparison });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [ dependenciesKey ]);
}
