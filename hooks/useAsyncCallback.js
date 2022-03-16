import { useCallback } from 'react';
import { warn } from '@twipped/utils';

/**
 * Identical to React.useCallback, except if the callback resolves a rejection,
 * we will forward that rejection to the console.
 *
 * @param  {Function} callback
 * @param  {Array}    dependencies
 * @returns {Function}
 */
export default function useAsyncCallback (callback, dependencies) {
  return useCallback((...args) => {
    const ret = callback(...args);
    if (typeof ret === 'object' && typeof ret.then === 'function') {
      ret.then(null, (err) => {
        warn(typeof err === 'object' && 'message' in err ? err.message : err);
      });
    }
    return ret;
  }, dependencies);
}
