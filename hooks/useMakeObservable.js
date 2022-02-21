
import { observable } from 'mobx';
import { useState, useEffect } from 'react';

/**
 * @typedef {object} Observable
 */

/**
 * Takes any value and makes it into a mobx observable. If the input value
 * changes, then the observable is invalidated and replaced.
 *
 * @param {*} input
 * @returns {Observable<*>}
 */
export default function useMakeObservable (input) {

  var [ state, writeState ] = useState(() => observable(input));
  useEffect(() => {
    writeState(observable(input));
  }, [ input ]);

  return state;

}
