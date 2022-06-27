import { useCallback } from 'react';
import warn from '@twipped/utils/warn';

/**
 * Identical to React.useCallback, except if the callback produces a promise,
 * we dispose of any resolved value and forward rejections to the console.
 *
 * @function useAsyncCallback
 * @param  {Function} callback Callback function
 * @param  {Array}    dependencies Dependencies array
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
