import { useState, useEffect } from 'react';
import useWhenElementRefReady from './useWhenElementRefReady.js';

/**
 * Tests if a given Ref element exists within a given viewport.
 *
 * @function useElementInViewport
 * @param  {import('react').MutableRefObject<HTMLElement>|HTMLElement} elementRef Ref to the relevant element.
 * @param  {object}  options
 * @param  {import('react').MutableRefObject<HTMLElement>|HTMLElement} [options.root] The element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport.
 * @param  {string}  [options.rootMargin]  Margin to draw around the root element for detecting overlap. Identical to CSS `margin` definition. Defaults to 0 on all sides.
 * @param  {number}  [options.threshold]   How much of the target element must be on screen to be considered visible, from 0 to 1.
 * @returns {boolean}
 */
export default function useElementInViewport (
  elementRef,
  { root = null, rootMargin = '0px', threshold = 0 }
) {
  const [ isOnscreen, setIsOnscreen ] = useState(false);

  const element = useWhenElementRefReady(elementRef);

  useEffect(() => {
    if (!element) {
      return null;
    }

    const observer = new window.IntersectionObserver(
      ([ entry ]) => {
        setIsOnscreen(entry.intersectionRatio > 0);
      },
      {
        root: ('current' in root ? root.current : root),
        rootMargin,
        threshold,
      }
    );
    observer.observe(element);

    return () => { observer.disconnect(); };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ element, root, rootMargin, threshold ]);
  return isOnscreen;
}
