
import { useRef, useCallback } from 'react';
import useEventCallback from './useEventCallback';
import useGlobalListener from './useGlobalListener';
import useForceUpdate from './useForceUpdate';

export default function usePageFocus ({ onChange, update, ownerElementRef }) {
  onChange = useEventCallback(onChange);

  const forceUpdate = useForceUpdate();
  const focusedRef = useRef(document.hasFocus());

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

  return useCallback(() => focusedRef.current);
}
