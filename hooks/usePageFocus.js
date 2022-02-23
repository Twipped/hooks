
import { useRef, useCallback } from 'react';
import useEventCallback from './useEventCallback';
import useGlobalListener from './useGlobalListener';
import useForceUpdate from './useForceUpdate';

/**
 * State hook which tracks if the current window is focused.
 *
 * @function usePageFocus
 * @param  {object}       [options]
 * @param  {Function}     [options.onChange]         Optional callback to be invoked when the state changes.
 * @param  {boolean}      [options.update]           Controls if the component should update when the state changes. Defaults to true.
 * @param  {Ref<Element>} [options.ownerElementRef]  Ref of an element in the document to be monitored.
 * @returns {Array<boolean, Function, Function>}      Focus state, a function to focus the window, and a function to get the focus state.
 */
export default function usePageFocus ({ onChange, update = true, ownerElementRef } = {}) {
  onChange = useEventCallback(onChange);

  const forceUpdate = useForceUpdate();
  const focusedRef = useRef(document.hasFocus());
  focusedRef.current = document.hasFocus();

  const handleEvent = ({ type } = {}) => {
    let active = focusedRef.current;

    switch (type) {
    case 'focus':
      active = true; break;
    case 'blur':
      active = false; break;
    case 'visibilitychange':
      active = !document.hidden;
    // no default
    }

    if (active !== focusedRef.current) {
      focusedRef.current = active;
      onChange(active);
      if (update) forceUpdate();
    }
  };

  useGlobalListener('focus', handleEvent, ownerElementRef);
  useGlobalListener('blur', handleEvent, ownerElementRef);
  useGlobalListener('visibilitychange', handleEvent, ownerElementRef);

  const getter = useCallback(() => focusedRef.current);
  const setter = useCallback(() => typeof window !== 'undefined' && window.focus());

  return [ focusedRef.current, setter, getter ];
}
