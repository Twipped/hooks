
import { observe, isObservable, isComputed } from 'mobx';
import { useLayoutEffect } from 'react';
import useForceUpdate from './useForceUpdate';

/**
 * Observes the passed mobx observable and triggers an update if it changes.
 * @param  {Function} fn
 */
export default function useObservable (o, onChange) {

  const update = useForceUpdate();

  useLayoutEffect(() => {
    if (!isObservable(o) && !isComputed(o)) return;
    const dispose = observe(o, () => {
      onChange && onChange();
      update();
    });
    return dispose;
  }, [ o ]);
}
