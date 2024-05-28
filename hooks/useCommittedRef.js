/* eslint-disable jsdoc/require-returns */
import { useRef, useEffect } from 'react';

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded before being used.
 *
 * This is safe to access in an event handler.
 *
 * @param {any} value The `Ref` value
 * @template T
 * @returns {import('react').MutableRefObject<T>}
 * @example
 * import { useCallback } from 'react';
 * import useCommittedRef from '@zenbusiness/application-commons-hooks/useCommittedRef';
 * function MyComponent ({ someProp }) {
 *   const somePropRef = useCommittedRef(someProp);
 *   const onClick = useCallback(() => {
 *     const safePropRef = somePropRef.current;
 *   }, []); // no dependency needed
 *   return <button onClick={onClick}>Click Me!</button>;
 * }
 */
export default function useCommittedRef (value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [ value ]);
  return ref;
}
