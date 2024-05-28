/* eslint-disable jest/prefer-spy-on */
/* eslint-disable no-console */
/* eslint-disable jest/require-top-level-describe */
/* eslint-disable jest/require-hook */
/* eslint-disable no-underscore-dangle */
/**
 * This file is to be evaluated at the beginning of every test file run.
 * Any packages loaded in this file will be available within a test
 * @module
 * @ignore
 */

/**
 * jest-dom adds custom jest matchers for asserting on DOM nodes.
 * allows you to do things like:
 *   expect(element).toHaveTextContent(/react/i)
 *
 * @see https://github.com/testing-library/jest-dom
 */
import '@testing-library/jest-dom';

/**
 * Adds extra expect functions such as `toHaveBeenCalledBefore` and `toContainKey`
 *
 * @see https://www.npmjs.com/package/jest-extended
 */
import 'jest-extended/all.js';

/**
 * Adds `expect().toBeError([message])` and `expect.exception([message]) to jest, allowing
 * for testing of Error objects and their descendents.
 */
import './expectError.js';

import { format } from 'util';
import WebStorage from './storage.js';

import { EXPECTED } from './caught.js';

WebStorage.setup();

/**
 * Spy out console.error so that we can hook into it for tests, and force PropType warnings
 * and hook order warnings to fail unit tests.
 * Overrides console.error to trap and emit propType warnings as exceptions
 */

// make jsdom shutup about unhandled errors
// @ts-ignore
window._virtualConsole.removeAllListeners('jsdomError');

/* eslint-disable-next-line no-console */
const errorOriginal = console.error.bind(console);
const warnOriginal = console.warn.bind(console);

const SELF = /\[Jest-Caught/;
const PROP_TYPE_RE = /(Invalid prop|Failed prop type)/i;
const HOOK_ORDER_RE = /order of Hooks called/i;
const BAD_PROP_RE = /React does not recognize the `[\w-]+` prop on a DOM element/i;
const UNIQUE_KEY = /Each child in a list should have a unique "key" prop./i;
const TWO_KEYS = /Warning: Encountered two children with the same key/i;
const APOLLO_MISSED = /No more mocked responses for the query:/i;
const APOLLO_BAD_MOCK = /Missing field .* while writing result/i;
const DOM_NESTING = /validateDOMNesting/i;
const ACT_UPDATE = /Warning: An update to \S+ inside a test was not wrapped in act/i;
const ABOVE_ERROR = /The above error occurred in the <\w+> component/i;
const BAD_UPDATE = /Cannot update a component .* while rendering a different component/i;
const MUI_ERROR = /^MUI:/;

let silence = false;

// eslint-disable-next-line jsdoc/require-jsdoc
function handleConsole (...args) {
  if (handleConsole.mock(...args)) return;
  const message = format(...args);

  if (args[0] instanceof Error && args[0][EXPECTED]) {
    // this was an error we should have intercepted at the boundary
    return;
  }

  if (SELF.test(message)) {
    // this is one of our own traps, ignore it.
    errorOriginal(...args);
  }

  if (ACT_UPDATE.test(message) || ABOVE_ERROR.test(message)) {
    return;
  }

  if (PROP_TYPE_RE.test(message)) {
    throw new Error(`[Jest-Caught-PropType-Warning] ${message}`);
  }

  if (MUI_ERROR.test(message)) {
    throw new Error(`[Jest-Caught-MUI-Warning] ${message}`);
  }

  if (HOOK_ORDER_RE.test(message)) {
    throw new Error(`[Jest-Caught-Hook-Order-Warning] ${message}`);
  }

  if (BAD_PROP_RE.test(message)) {
    throw new Error(`[Jest-Caught-Bad-Passthru] ${message}`);
  }

  if (UNIQUE_KEY.test(message)) {
    throw new Error(`[Jest-Caught-Missing-Key-Prop] ${message}`);
  }

  if (TWO_KEYS.test(message)) {
    throw new Error(`[Jest-Caught-Duplicate-Key-Prop] ${message}`);
  }

  if (BAD_UPDATE.test(message)) {
    throw new Error(`[Jest-Caught-Bad-State-Update] ${message}`);
  }

  if (DOM_NESTING.test(message)) {
    throw new Error(`[Jest-Caught-Bad-DOM-Structure] ${message}`);
  }

  if (APOLLO_BAD_MOCK.test(message)) {
    throw new Error(`[Jest-Caught-Incomplete-Query-Mock] ${message}`);
  }

  if (silence) return;
  errorOriginal(...args);
}
handleConsole.mock = jest.fn();
// jest.spyOn(handleConsole, 'mock').mockImplementation();

// eslint-disable-next-line jsdoc/require-jsdoc
function handleWarn (...args) {
  if (handleWarn.mock(...args)) return;
  const message = format(...args);

  if (APOLLO_MISSED.test(message)) {
    throw new Error(`[Jest-Caught-Missing-Missing-Query-Mock] ${message}`);
  }

  if (silence) return;
  warnOriginal(...args);
}
handleWarn.mock = jest.fn();

Object.defineProperty(console, 'error', {
  writable: false,
  value: handleConsole,
});

Object.defineProperty(console, 'warn', {
  writable: false,
  value: handleWarn,
});

// @ts-ignore
console.silence = () => { silence = !silence; };
afterEach(() => { silence = false; });
