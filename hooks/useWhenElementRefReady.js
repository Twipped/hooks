import { useState, useEffect } from 'react';

export const resolveRef = (ref) => {
  if (typeof document === 'undefined' || !ref) { return null; }
  if (typeof ref === 'function') { ref = ref(); }
  if (ref && 'current' in ref) { ref = ref.current; }
  if (ref?.nodeType) { return ref || null; }
  return null;
};

export default function useWhenElementRefReady (ref, onResolved) {
  const [ resolvedRef, setRef ] = useState(() => resolveRef(ref));

  useEffect(() => {
    const nextRef = resolveRef(ref);
    if (nextRef !== resolvedRef) {
      onResolved && onResolved(resolvedRef);
      setRef(nextRef);
    }
  }, [ ref, resolvedRef, onResolved ]);

  return resolvedRef;
}
