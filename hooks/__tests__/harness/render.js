/* eslint-disable testing-library/no-manual-cleanup */
/* global JSX */
import { Fragment, StrictMode, cloneElement } from 'react';
import { render as originalRender, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestBoundary, { ErrorDisplay } from './TestBoundary.js';
import Intercept, { Mounted } from './intercept.js';
import { CAUGHT } from './caught.js';

let currentid;

/** @typedef {import('./render.t.ts').RenderOptions} RenderOptions */
/** @typedef {import('./render.t.ts').RenderResult} RenderResult */

/**
 * Renders a component and returns methods for querying the DOM it produces.
 *
 * @param   {JSX.Element}    ui Elements to render.
 * @param   {RenderOptions}  [options]
 *
 * @see https://testing-library.com/docs/react-testing-library/api/#render-result
 * @returns {RenderResult}
 */
export default function render (ui, {
  onError,
  firstErrorOnly = true,
  wrapper: TestWrapper = ({ children }) => children,
  userEventOptions,
  strictMode = false,
  ...options
} = {}) {
  currentid = Math.round(Math.random() * 1000);
  const emitter = Intercept.pre();

  if (onError) {
    if (firstErrorOnly) {
      emitter.once('caught', onError);
    } else {
      emitter.on('caught', onError);
    }
  }

  const SM = strictMode ? StrictMode : Fragment;

  const wrapper = TestWrapper
    ? (props) => (
      <TestBoundary>
        <SM>
          <Mounted />
          <TestWrapper {...options} {...props} />
        </SM>
      </TestBoundary>
    )
    : undefined;

  const user = userEvent.setup(userEventOptions);

  const result = /** @type {RenderResult} */ (originalRender(ui, {
    wrapper,
    ...options,
  }));

  // This will only redraw if an error happens after initial page render
  emitter.on('caught', (err) => {
    const cid = currentid;

    // if this was caught by TestBoundary, we don't need to do anything
    if (err[CAUGHT] === 'render') return;

    // we have to do this on the next event loop so that there's no chance
    // testing-library is in the middle of rendering.
    setTimeout(() => {
      // if another render() was called between the emit and this timeout, bail
      if (currentid !== cid) return;
      cleanup();
      originalRender(<ErrorDisplay error={err} />);
    });
  });

  Intercept.mounted();

  /*
   * convenience helper. Better than repeating all props.
   */
  result.setProps = function setProps (props) {
    result.rerender(cloneElement(ui, props));
    return result;
  };

  result.forceUpdate = function forceUpdate () {
    result.rerender(
      cloneElement(ui, {
        'data-force-update': String(Math.random()),
      })
    );
    return result;
  };

  result.checkErrors = Intercept.validate;
  result.getErrors = () => Intercept.errors;

  Object.assign(result, user);

  return result;
}
