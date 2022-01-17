
import { useState } from 'react';
import useEventHandler from './useEventHandler';
import useWhenElementRefReady from './useWhenElementRefReady';

function matches (parent, target, selector) {
  if (!selector) return parent === target;
  const nodes = Array.from(parent.querySelectorAll(selector));
  return nodes.includes(target);
}

export default function useIsTransitioning (elementRef, selector = null) {
  const [ isTransitioning, setTransition ] = useState(0);

  const run = useEventHandler('transitionrun', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(1);
  });

  const start = useEventHandler('transitionstart', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(1);
  });

  const cancel = useEventHandler('transitioncancel', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(0);
  });

  const end = useEventHandler('transitionend', (ev) => {
    if (!matches(ev.currentTarget, ev.target, selector)) return;
    setTransition(0);
  });

  useWhenElementRefReady(elementRef, () => {
    run.attach(elementRef);
    start.attach(elementRef);
    cancel.attach(elementRef);
    end.attach(elementRef);
  });

  return isTransitioning;
}
