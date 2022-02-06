
import { useCallback } from 'react';
import { action } from 'mobx';

/**
 * Shortcut callback wrapper for MobX actions
 * @param  {Function}    fn     Callback function to wrap
 * @param  {Array<any>}  dependencies Array of hook dependencies passed to useCallback
 * @return {void}
 */
export default function useAction (fn, deps) {
  return useCallback(action(fn), deps);
}
