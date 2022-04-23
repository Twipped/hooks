import { useCallback } from 'react';
import { isPromise, warn } from '@twipped/utils';

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
    try {
      const ret = callback(...args);
      if (isPromise(ret)) {
        ret.then(null, (err) => {
          warn(err);
        });
      }
    } catch (err) {
      warn(err);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}
