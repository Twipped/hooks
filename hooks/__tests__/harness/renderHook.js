/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable react/prop-types, jsdoc/require-jsdoc */
import {
  createRef,
  useEffect,
} from 'react';
import render from './render.js';
import waitForRefChange from './waitForRefChange.js';

/** @typedef {import('./renderHook.t.ts').RenderHookOptions} RenderHookOptions */
/** @typedef {import('./renderHook.t.ts').RenderHookResult} RenderHookResult */

/**
 * Renders a hook function as if inside a component.
 *
 * @param {Function} renderCallback
 * @param {RenderHookOptions} [options]
 *
 * @returns {RenderHookResult}
 */
export default function renderHook (renderCallback, { initialProps, ...options } = {}) {
  const result = /** @type {import('react').MutableRefObject} */ (createRef());

  function TestComponent ({ renderCallbackArgs }) {
    const pendingResult = renderCallback(...renderCallbackArgs);
    result.current = pendingResult;

    useEffect(() => {
      result.current = pendingResult;
    });

    return null;
  }

  const { rerender: baseRerender, ...rest } = render(
    <TestComponent renderCallbackArgs={[ initialProps ]} />,
    options
  );

  function rerender (...args) {
    return baseRerender(
      <TestComponent renderCallbackArgs={args} />
    );
  }

  function waitForNextUpdate (waitForOptions) {
    return waitForRefChange(result, waitForOptions);
  }

  return {
    result, rerender, waitForNextUpdate, ...rest,
  };
}
