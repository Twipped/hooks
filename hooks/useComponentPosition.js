
import {  useCallback, useLayoutEffect } from 'react';
import { shallowEqual } from '@twipped/utils';
import useGettableState from './useGettableState';

export default function useComponentPosition (ref, onUpdate) {
  var [ componentSize, setComponentSize, getComponentSize ] = useGettableState(getSize(ref?.current));

  var handleResize = useCallback(() => {
    if (ref.current) {
      const dims = getSize(ref.current);
      if (!shallowEqual(dims, getComponentSize())) {
        setComponentSize(dims);
        onUpdate && onUpdate(dims);
      }
    }
  }, [ ref ]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
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
  }, [ ref.current ]);

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
