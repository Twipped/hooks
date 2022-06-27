
import { observe, isObservable, isComputed } from 'mobx';
import { useLayoutEffect } from 'react';
import useForceUpdate from './useForceUpdate.js';

/**
 * @typedef {Object} Observable
 */

/**
 * Observes the passed mobx observable and triggers an update if it changes.
 *
 * @function useObservable
 * @param {Observable} observable          The observable to monitor
 * @param {Function}   [onChange] Optional callback to fire when a change happens.
 */
export default function useObservable (observable, onChange) {

  const update = useForceUpdate();

  useLayoutEffect(() => {
    if (!isObservable(observable) && !isComputed(observable)) return;
    const dispose = observe(observable, () => {
      onChange && onChange();
      update();
    });
    return dispose;
  }, [ observable, onChange, update ]);
}
