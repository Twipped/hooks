/* eslint-disable jest/require-hook */
/* eslint-disable no-param-reassign, no-underscore-dangle */

import { useEffect } from 'react';
import { EventEmitter } from 'events';
import { CAUGHT, EXPECTED } from './caught.js';

/* eslint-disable jsdoc/require-jsdoc */
let caught = [];
let mediator, mounted;
let firstrun = true;

function handleError (error) {
  mediator.emit('caught', error);
}

function jsdomError (err) {
  const error = err.detail || err;

  // this error was expected to happen, we can ignore it
  if (error[EXPECTED]) return;

  // we've already seen this one
  if (error[CAUGHT]) return;
  error[CAUGHT] = 'jsdom';

  caught.push(error);
  if (mounted) {
    handleError(error);
  }
}

function globalError (event) {
  event.preventDefault();
  const { error } = event;

  // this error was expected to happen, we can ignore it
  if (error[EXPECTED]) return true;

  // we've already seen this one
  if (error[CAUGHT]) return true;
  error[CAUGHT] = 'global';

  caught.push(error);
  if (mounted) {
    handleError(error);
  }
  return true;
}

const Intercept = {
  pre () {
    if (firstrun) {
      firstrun = false;
      // @ts-ignore
      window._virtualConsole?.on?.('jsdomError', jsdomError);
      window.addEventListener('error', globalError);
    }

    caught = [];
    mounted = false;
    mediator = new EventEmitter();
    return mediator;
  },

  report (error, source = 'report') {
    // this error was expected to happen, we can ignore it
    if (error[EXPECTED]) return;

    // we've already seen this one
    if (error[CAUGHT]) return;
    error[CAUGHT] = source;
    caught.push(error);
    if (mounted) {
      handleError(error);
    }
  },

  validate () {
    if (!caught.length) return;
    for (const e of caught) {
      if (e[EXPECTED]) continue;
      throw e;
    }
  },

  mounted () {
    mounted = true;
    caught.map(handleError);
  },

  get errors () {
    return caught;
  },
};
export default Intercept;

export function Mounted () {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(Intercept.mounted, []);
  return null;
}
