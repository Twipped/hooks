import Intercept from './intercept.js';

export { act } from 'react';

export {
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  createEvent,
} from '@testing-library/react';

export * from '@testing-library/react';

export { default as render } from './render.js';
export { default as renderHook } from './renderHook.js';
export { default as TestBoundary } from './TestBoundary.js';

/**
 * Throws any unexpected errors that may have been intercepted during a render
 */
export function checkErrors () {
  Intercept.validate();
}

/**
 * Returns all errors thrown since last render, including ExpectedErrors
 *
 * @returns {Array<Error>}
 */
export function getErrors () {
  return Intercept.errors;
}

export { default as wait } from 'waait';
export { default as waitForRefChange } from './waitForRefChange.js';
