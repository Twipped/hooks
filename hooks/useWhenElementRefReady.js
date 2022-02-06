import { useState, useRef } from 'react';
import useIsomorphicEffect from './useIsomorphicEffect.js';
import useEventCallback from './useEventCallback.js';
import resolveRef from './resolveRef.js';

export default function useWhenElementRefReady (ref, onResolved) {
  const [ resolvedRef, setRef ] = useState(() => resolveRef(ref));
  const cleanupRef = useRef();
  onResolved = useEventCallback(onResolved);

  useIsomorphicEffect(() => {
    const nextRef = resolveRef(ref);
    if (nextRef === resolvedRef) return;

    if (typeof cleanupRef.current === 'function') cleanupRef.current();
    if (onResolved) cleanupRef.current = onResolved(nextRef);
    setRef(nextRef);
  }, [ ref, ref.current, resolvedRef ]);

  return resolvedRef;
}
