import { useCallback } from 'react';
import { isPromise } from '@twipped/utils/types';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
