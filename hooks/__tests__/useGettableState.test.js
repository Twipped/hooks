import {
  act,
  renderHook,
  render,
  screen,
  waitFor,
} from './harness/index.js';
import useGettableState from '../useGettableState.js';

describe('useGettableState', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    it('stores a states and retrieves it', () => {
      const { result, rerender } = renderHook(() => (
        useGettableState([ 'one' ])
      ), { strictMode });

      const state = result.current[0];
      const setState = result.current[1];
      const getState = result.current[2];

      expect(state).toEqual([ 'one' ]);
      expect(getState()).toEqual([ 'one' ]);

      act(() => { setState('two'); });

      expect(result.current[0]).toBe('two');
      expect(result.current[1]).toBe(setState);
      expect(result.current[2]).toBe(getState);
      expect(getState()).toBe('two');

      rerender();

      expect(result.current[0]).toBe('two');
      expect(result.current[1]).toBe(setState);
      expect(result.current[2]).toBe(getState);
      expect(getState()).toBe('two');
    });

    it('merges state only when requested', () => {
      const { result } = renderHook(() => (
        useGettableState({ one: 1 })
      ), { strictMode });
      const setState = result.current[1];

      expect(result.current[0]).toEqual({ one: 1 });

      act(() => { setState({ two: 2 }, { merge: true }); });

      expect(result.current[0]).toEqual({ one: 1, two: 2 });

      act(() => { setState({ one: -1 }, { merge: true }); });

      expect(result.current[0]).toEqual({ one: -1, two: 2 });

      act(() => { setState({ two: 2 }, { merge: false }); });

      expect(result.current[0]).toEqual({ two: 2 });
    });

    it('accepts callback state updates', () => {
      const { result } = renderHook(() => (
        useGettableState(1)
      ), { strictMode });
      const setState = result.current[1];

      expect(result.current[0]).toEqual(1);

      act(() => { setState((n) => n + 1); });

      expect(result.current[0]).toEqual(2);
    });

    it('does not update when alwaysUpdate is false and state does not change with primitives', async () => {
      const rendered = jest.fn();
      function Component () {
        const [ state, setState ] = useGettableState(1, { alwaysUpdate: false });
        rendered(state);
        return (
          <>
            <button onClick={() => setState(1)}>1</button>
            <button onClick={() => setState(2)}>2</button>
            <button onClick={() => setState(3)}>3</button>
          </>
        );
      }

      const { click } = render(<Component />, { strictMode: false });

      expect(rendered).toHaveBeenCalledTimes(1);

      await click(screen.getAllByRole('button')[1]);

      expect(rendered).toHaveBeenCalledTimes(2);
      expect(rendered).toHaveBeenNthCalledWith(2, 2);

      await click(screen.getAllByRole('button')[1]);

      expect(rendered).toHaveBeenCalledTimes(2);
      expect(rendered).toHaveBeenNthCalledWith(2, 2);

      await click(screen.getAllByRole('button')[0]);

      expect(rendered).toHaveBeenCalledTimes(3);
      expect(rendered).toHaveBeenNthCalledWith(3, 1);
    });

    it('does not update when alwaysUpdate is false and state does not change with objects', async () => {
      const rendered = jest.fn();
      function Component () {
        const [ state, setState ] = useGettableState(1, { alwaysUpdate: false });
        rendered(state);
        return (
          <>
            <button onClick={() => setState({ value: 1 })}>1</button>
            <button onClick={() => setState({ value: 2 })}>2</button>
            <button onClick={() => setState({ value: 3 })}>3</button>
          </>
        );
      }

      const { click } = render(<Component />, { strictMode: false });

      expect(rendered).toHaveBeenCalledTimes(1);

      await click(screen.getAllByRole('button')[1]);

      expect(rendered).toHaveBeenCalledTimes(2);
      expect(rendered).toHaveBeenNthCalledWith(2, { value: 2 });

      await click(screen.getAllByRole('button')[1]);

      expect(rendered).toHaveBeenCalledTimes(2);

      await click(screen.getAllByRole('button')[0]);

      expect(rendered).toHaveBeenCalledTimes(3);
      expect(rendered).toHaveBeenNthCalledWith(3, { value: 1 });
    });

    it('sanity check: updating in render infinite loops', async () => {
      function Component () {
        const [ , setState ] = useGettableState(1);
        setState(2, { defer: false });
      }

      const { checkErrors } = render(<Component />, { strictMode });

      expect(() => checkErrors()).toThrow();
    });

    it('update with defer allows update during render', async () => {
      function Component () {
        const [ , setState ] = useGettableState(1);
        setState(2, { defer: true });
      }

      const { checkErrors } = render(<Component />, { strictMode });

      expect(() => checkErrors()).not.toThrow();
    });

    it('without immediate, state only changes after update', async () => {
      const feedback = jest.fn();
      function Component () {
        const [ state, setState, getState ] = useGettableState(1);
        const cb = () => {
          setState(state + 1);
          feedback(getState());
        };

        return <button onClick={cb}>{state}</button>;
      }

      const { click } = render(<Component />, { strictMode });

      expect(screen.getByRole('button')).toHaveTextContent(1);

      await click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveTextContent(2);
      expect(feedback).toHaveBeenLastCalledWith(1);
    });

    it('with immediate, state changes immediately without update', async () => {
      const feedback = jest.fn();
      function Component () {
        const [ state, setState, getState ] = useGettableState(1);
        const cb = () => {
          setState(state + 1, { immediate: true });
          feedback(getState());
        };

        return <button onClick={cb}>{state}</button>;
      }

      const { click } = render(<Component />, { strictMode });

      expect(screen.getByRole('button')).toHaveTextContent(1);

      await click(screen.getByRole('button'));

      await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(2));

      expect(feedback).toHaveBeenLastCalledWith(2);
    });
  });
});
