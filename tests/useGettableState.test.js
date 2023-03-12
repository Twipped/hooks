import { act, renderHook } from '@testing-library/react';
import useGettableState from '../hooks/useGettableState.js';

describe('useGettableState', () => {
  it('stores a states and retreives it', () => {
    const { result, rerender } = renderHook(() => (
      useGettableState('one')
    ));

    let state = result.current[0];
    const setState = result.current[1];
    const getState = result.current[2];

    expect(state).toBe('one');
    expect(getState()).toBe('one');

    act(() => { setState('two'); });
    // rerender();

    [ state ] = result.current;
    expect(state).toBe('two');
    expect(getState()).toBe('two');

    rerender();

    [ state ] = result.current;
    expect(state).toBe('two');
    expect(getState()).toBe('two');
  });
});
