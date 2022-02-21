
import { observe, isObservable, isComputed } from 'mobx';
import { useLayoutEffect } from 'react';
import useForceUpdate from './useForceUpdate';

/**
 * @typedef {object} Observable
 */

/**
 * Observes the passed mobx observable and triggers an update if it changes.
 *
 * @param {Observable} o          The observable to monitor
 * @param {Function}   [onChange] Optional callback to fire when a change happens.
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
