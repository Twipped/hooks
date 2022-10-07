import { useCallback, useState } from 'react';
import { isPromise } from '@twipped/utils/types';

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
  const [ error, setError ] = useState(null);
  if (error) throw error;
  return useCallback((...args) => {
    try {
      const ret = callback(...args);
      if (isPromise(ret)) {
        ret.then(null, (err) => {
          setError(err);
        });
      }
    } catch (err) {
      setError(err);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}
