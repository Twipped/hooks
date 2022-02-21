
import { useState, useCallback, useLayoutEffect } from 'react';

/**
 * @typedef {object} Ref
 * @property {*} current The contents of the ref
 */

/**
 * @typedef Position
 * @property {number} top
 * @property {number} left
 * @property {number} width
 * @property {number} height
 */

/**
 * @param {Element} el
 * @returns {Position}
 */
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

/**
 * State hook which provides the position and dimensions of the passed element Ref.
 *
 * @param  {Ref} ref
 * @returns {Position}
 */
export default function useComponentPosition (ref) {
  var [ ComponentSize, setComponentSize ] = useState(getSize(ref ? ref.current : {}));

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
