
import { useState } from 'react';
import useEventHandler from './useEventHandler.js';
import useWhenElementRefReady from './useWhenElementRefReady.js';


function matches (parent, target, selector) {
  if (!selector) return parent === target;
  const nodes = Array.from(parent.querySelectorAll(selector));
  return nodes.includes(target);
}

/**
 * Returns true if the target element is currently animating a css transition
 *
 * @function useIsTransitioning
 * @param  {import('react').MutableRefObject<HTMLElement>|HTMLElement} elementRef
 * @param  {string} [selector]   Optional css selector to specify the animation delegate
 * @returns {boolean}
 */
export default function useIsTransitioning (elementRef, selector = null) {
  const [ isTransitioning, setTransition ] = useState(false);

  const run = useEventHandler('transitionrun', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(true);
  });

  const start = useEventHandler('transitionstart', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(true);
  });

  const cancel = useEventHandler('transitioncancel', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(false);
  });

  const end = useEventHandler('transitionend', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(false);
  });

  useWhenElementRefReady(elementRef, () => {
    run.attach(elementRef);
    start.attach(elementRef);
    cancel.attach(elementRef);
    end.attach(elementRef);
  });

  return isTransitioning;
}
