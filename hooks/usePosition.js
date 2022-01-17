
import { useState, useCallback, useLayoutEffect } from 'react';

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

export default function useComponentPosition (ref) {
  var _useState = useState(getSize(ref ? ref.current : {}));
  var ComponentSize = _useState[0];
  var setComponentSize = _useState[1];

  var handleResize = useCallback(
    function handleResize () {
      if (ref.current) {
        setComponentSize(getSize(ref.current));
      }
    },
    [ ref ],
  );

  useLayoutEffect(
    () => {
      if (!ref.current) {
        return;
      }

      handleResize();

      if (typeof ResizeObserver === 'function') {
        var resizeObserver = new ResizeObserver(() => {
          handleResize();
        });
        resizeObserver.observe(ref.current);

        return () => {
          resizeObserver.disconnect(ref.current);
          resizeObserver = null;
        };
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    [ ref.current ],
  );

  return ComponentSize;
}
