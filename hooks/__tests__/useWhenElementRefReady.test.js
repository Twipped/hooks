import { useRef, useState } from 'react';
import {
  act, render, screen,
} from './harness/index.js';

import useWhenElementRefReady from '../useWhenElementRefReady.js';

describe('useWhenElementRefReady', () => {
  it('triggers the callback once the ref is available', async () => {
    const spy = jest.fn();
    let setState;

    function Component () {
      let state;
      [ state, setState ] = useState();

      const ref = useRef();

      useWhenElementRefReady(ref, spy);

      if (state) return <div ref={ref} data-testid="the-div" />;

      return <div data-testid="empty" />;
    }

    render(<Component />);

    expect(screen.getByTestId('empty')).toBeInTheDocument();
    expect(spy).not.toHaveBeenCalled();

    act(() => setState(true));

    expect(await screen.findByTestId('the-div')).toBeInTheDocument();

    expect(spy).toHaveBeenCalledWith(expect.any(Element));
  });

  it('does nothing if ref is null', async () => {
    const spy = jest.fn();

    function Component () {
      useWhenElementRefReady(null, spy);
      return <div data-testid="empty" />;
    }

    render(<Component />);

    expect(screen.getByTestId('empty')).toBeInTheDocument();
    expect(spy).not.toHaveBeenCalled();
  });
});
