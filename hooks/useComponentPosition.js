
import { useCallback, useLayoutEffect } from 'react';
import { isObject } from '@twipped/utils/types';
import shallowEqual from '@twipped/utils/shallowEqual';
import assert from '@twipped/utils/assert';
import useEventCallback from './useEventCallback.js';

import useGettableState from './useGettableState.js';

/**
 * @typedef Position
 * @property {number} top
 * @property {number} left
 * @property {number} width
 * @property {number} height
 */

/**
 * Retrieves the current page position of the element Ref passed.
 *
 * @function useComponentPosition
 * @param  {import('react').MutableRefObject<HTMLElement>} ref React ref (from createRef or useRef) that will contain an element reference.
 * @param  {Function} [onUpdate] Optional function to fire when the position changes.
 * @returns {Position} `top` and `left` properties, relative to the top left of the document. `width` and `height` of the element.
 */
export default function useComponentPosition (ref, onUpdate) {
  assert(isObject(ref) && 'current' in ref, 'First argument of useComponentPosition must be a React Ref object.');

  const onUpdateSafe = useEventCallback((dims) => onUpdate && onUpdate(dims));

  var [ componentSize, setComponentSize, getComponentSize ] = useGettableState(getSize(ref?.current));

  var handleResize = useCallback(() => {
    if (ref.current) {
      const dims = getSize(ref.current);
      if (!shallowEqual(dims, getComponentSize())) {
        setComponentSize(dims);
        onUpdateSafe(dims);
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ref ]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const el = ref.current;
    handleResize();

    if (typeof ResizeObserver === 'function') {
      var resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(el);

      return () => {
        resizeObserver.disconnect();
        resizeObserver = null;
      };
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ref.current, handleResize ]);

  return componentSize;
}

function getSize (el) {
  if (!el) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };
  }

  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}
