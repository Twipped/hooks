import { act, render, screen } from '@testing-library/react';
import wait from 'waait';
import { useRef, useCallback } from 'react';

import useScrollToElement, { DEFAULT_DURATION } from '../hooks/useScrollToElement.js';

describe('useScrollTo', () => {
  let scrollSpy;
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      height: 500,
      width: 500,
      left: 100,
      top: 1000,
    }));

    scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(({ top, left }) => {
      window.scrollY = top;
      window.scrollX = left;
    });
  });

  it('scrolls to the element', async () => {
    let scroll;

    function Component () {
      const ref = useRef();

      const scrollToElement = useScrollToElement();

      scroll = useCallback(() => scrollToElement(ref.current), []);

      return <div ref={ref} data-testid="target" style={{ marginTop: 1000 }} />;
    }

    render(<Component />);

    expect(screen.getByTestId('target')).toBeInTheDocument();
    expect(scroll).toEqual(expect.any(Function));

    act(scroll);

    await wait(DEFAULT_DURATION + 100);

    expect(scrollSpy).toHaveBeenCalled();
    expect(window.scrollY).toBeGreaterThanOrEqual(1000);
  });

  it('scrolls automatically and triggers callbacks', async () => {
    const onEntering = jest.fn();
    const onEnter = jest.fn();
    const onEntered = jest.fn();
    const onExiting = jest.fn();
    const onExit = jest.fn();
    const onExited = jest.fn();

    function Component () {
      const ref = useRef();

      useScrollToElement({
        auto: ref,
        onEntering,
        onEnter,
        onEntered,
        onExiting,
        onExit,
        onExited,
      });

      return <div ref={ref} data-testid="target" style={{ marginTop: 1000 }} />;
    }

    render(<Component />);

    expect(screen.getByTestId('target')).toBeInTheDocument();

    await wait(DEFAULT_DURATION / 10);

    expect(onEnter).toHaveBeenCalled();
    expect(onEntering).toHaveBeenCalled();
    expect(onEntered).toHaveBeenCalled();
    expect(onExiting).not.toHaveBeenCalled();
    expect(onExit).not.toHaveBeenCalled();
    expect(onExited).not.toHaveBeenCalled();

    await wait(DEFAULT_DURATION + 100);

    expect(window.scrollY).toBeGreaterThanOrEqual(1000);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEntering).toHaveBeenCalledTimes(1);
    expect(onEntered).toHaveBeenCalledTimes(1);
    expect(onExiting).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onExited).toHaveBeenCalledTimes(1);
  });
});
